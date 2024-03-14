import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  HStack,
  Tab,
  Tabs,
  TabList,
  Flex,
  Icon,
  Text,
  Select,
  Image,
} from "@chakra-ui/react";
import NavbarModal from "../molecules/navbar-modal";
import { FaBell, FaRegFileCode } from "react-icons/fa";
import { BiGridAlt } from "react-icons/bi";
import { MdCloudUpload, MdSupervisorAccount } from "react-icons/md";
import { useNodeContext } from "../../context/NodeContext";
import { CasperServiceByJsonRPC } from "casper-js-sdk";
import Logo from "../../assets/logo.svg";

const Navbar = () => {
  const { nodeNumber, setNodeNumber } = useNodeContext();
  const [currentBlock, setCurrentBlock] = useState<number>(0);
  const client = new CasperServiceByJsonRPC(
    `http://localhost:3001/net/${nodeNumber}/rpc`
  );
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [uptime, setUptime] = useState<string>("");
  const [isSystemRunning, setIsSystemRunning] = useState<boolean>(
    JSON.parse(localStorage.getItem("isSystemRunning") || "true")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);

  useEffect(() => {
    fetchStartTime();
  }, []);

  useEffect(() => {
    fetchBlocks();
    const intervalId = setInterval(() => {
      fetchBlocks();
    }, 10000); // 10 seconds interval
    return () => clearInterval(intervalId);
  }, [nodeNumber]);

  useEffect(() => {
    fetchStartTime();
    fetchStatus();

    const intervalId = setInterval(() => {
      fetchStatus();
    }, 5000); // 5 seconds interval

    return () => clearInterval(intervalId);
  }, [resetTrigger]);

  useEffect(() => {
    localStorage.setItem("isSystemRunning", JSON.stringify(isSystemRunning));
  }, [isSystemRunning]);

  const fetchStartTime = async () => {
    try {
      const response = await fetch("http://localhost:3001/get-start-time");
      const data = await response.json();
      setStartTime(new Date(data.startupTime));
    } catch (error) {
      console.error("Error fetching start time:", error);
    }
  };

  const handleStart = async () => {
    try {
      const response = await fetch("http://localhost:3001/start", {
        method: "POST",
      });
      if (response.ok) {
        setIsSystemRunning(true);
        console.log("System started successfully");
      }
    } catch (error) {
      console.error("Error starting the system:", error);
    }
  };

  const handleStop = async () => {
    try {
      const response = await fetch("http://localhost:3001/stop", {
        method: "POST",
      });
      if (response.ok) {
        setIsSystemRunning(false);
        console.log("System stopped successfully");
      }
    } catch (error) {
      console.error("Error stopping the system:", error);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const fetchStatus = async () => {
    try {
      const response = await fetch("http://localhost:3001/status");
      if (response.ok) {
        setIsSystemRunning(true);
      }
    } catch (error) {
      setIsSystemRunning(false);
      console.error("Error fetching system status:", error);
    }
  };

  const fetchBlocks = async () => {
    try {
      const latestBlockInfo = await client.getLatestBlockInfo();
      if (latestBlockInfo && latestBlockInfo.block) {
        setCurrentBlock(latestBlockInfo.block.header.height);
      }
    } catch (error) {
      console.error("Error fetching latest block info:", error);
    }
  };

  useEffect(() => {
    const updateUptime = () => {
      if (startTime) {
        const now = new Date();
        const elapsed = new Date(now.getTime() - startTime.getTime());
        const hours = elapsed.getUTCHours();
        const minutes = elapsed.getUTCMinutes();
        const seconds = elapsed.getUTCSeconds();
        setUptime(`${hours}h ${minutes}m ${seconds}s`);
      }
    };
    const intervalId = setInterval(updateUptime, 1000);
    return () => clearInterval(intervalId);
  }, [startTime]);

  const handleReset = async () => {
    try {
      const response = await fetch("http://localhost:3001/nctl-start", {
        method: "POST",
      });
      console.log("Reset successful:", response.status);
      setResetTrigger((prev) => !prev);
    } catch (error) {
      console.error("Error sending reset request:", error);
    }
  };

  const nodeOptions = [];
  for (let i = 1; i <= 10; i++) {
    nodeOptions.push(
      <option key={i} value={i}>
        Node {i}
      </option>
    );
  }

  return (
    <Flex w="100%" direction="column">
      <HStack w="100%" bg="pri.dark" justify="center">
        <HStack maxW="1440px" w="100%" p="12px 32px" justify="space-between">
          <Link to="/accounts">
            <Flex alignItems="center" gap="8px">
              <Image src={Logo} width="56px" />
              <Text fontFamily="logo" fontSize={"3xl"} color={"pri.orange"}>
                Fondant
              </Text>
            </Flex>
          </Link>
          <Tabs variant="line" color="pri.orange" size="lg">
            <TabList
              border="none"
              gap={{ "2xl": "32px", xl: "20px", lg: "16px", md: "12px" }}
            >
              <Link to="/accounts">
                <Tab _hover={{ color: "grey.400", borderColor: "grey.400" }}>
                  <Icon as={MdSupervisorAccount} size="24px" />
                  Accounts
                </Tab>
              </Link>
              <Link to="/blocks">
                <Tab _hover={{ color: "grey.400", borderColor: "grey.400" }}>
                  <Icon as={BiGridAlt} size="24px" />
                  Blocks
                </Tab>
              </Link>
              <Link to="/deploys">
                <Tab _hover={{ color: "grey.400", borderColor: "grey.400" }}>
                  <Icon as={MdCloudUpload} size="24px" />
                  Deploys
                </Tab>
              </Link>
              <Link to="/events">
                <Tab _hover={{ color: "grey.400", borderColor: "grey.400" }}>
                  <Icon as={FaBell} size="24px" />
                  Events
                </Tab>
              </Link>
              <Link to="/logs">
                <Tab _hover={{ color: "grey.400", borderColor: "grey.400" }}>
                  <Icon as={FaRegFileCode} size="24px" />
                  Logs
                </Tab>
              </Link>
            </TabList>
          </Tabs>
        </HStack>
      </HStack>
      <HStack minH="56px" w="100%" bg="pri.beige" justify="center">
        <HStack maxW="1440px" w="100%" p="8px 32px" justify="space-between">
          <HStack>
            <Box
              borderRight="1px solid"
              borderColor="#2a3050"
              p={"8px 20px 8px 0px"}
            >
              <Text fontSize="10px" color="grey.400" fontWeight="semibold">
                CURRENT BLOCK
              </Text>
              <Text fontSize="14px" color="black">
                {currentBlock}
              </Text>
            </Box>
            <Box p={"8px 20px"}>
              <Text fontSize="10px" color="grey.400" fontWeight="semibold">
                UPTIME
              </Text>
              <Text fontSize="14px" color="black">
                {uptime}
              </Text>
            </Box>
          </HStack>
          <HStack gap="16px">
            {/* Conditionally render Start/Stop buttons based on isSystemRunning */}
            {!isSystemRunning ? (
              <Box
                bg="green.500"
                color="white"
                borderRadius="4px"
                p="4px 12px"
                fontWeight="semibold"
                fontSize="14px"
                cursor="pointer"
                onClick={handleStart}
              >
                Start
              </Box>
            ) : (
              <Box
                bg="red.500"
                color="white"
                borderRadius="4px"
                p="4px 12px"
                fontWeight="semibold"
                fontSize="14px"
                cursor="pointer"
                onClick={handleStop}
              >
                Stop
              </Box>
            )}

            <Box
              bg="pri.orange"
              color="white"
              borderRadius="4px"
              p="4px 12px"
              fontWeight="semibold"
              fontSize="14px"
              cursor="pointer"
              onClick={handleModalOpen}
            >
              Reset
            </Box>

            <Select
              size="sm"
              onChange={(e) => setNodeNumber(Number(e.target.value))}
              value={nodeNumber}
              bg="white"
              color="pri.orange"
              borderColor="grey.400"
              fontWeight={500}
            >
              {nodeOptions}
            </Select>
          </HStack>
        </HStack>
      </HStack>
      <NavbarModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        handleReset={handleReset}
      />
    </Flex>
  );
};

export default Navbar;