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
    fetchBlocks();
  }, [nodeNumber]);

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
            <Box
              borderRight="1px solid"
              borderColor="#2a3050"
              p={{
                "2xl": "8px 24px",
                xl: "8px 20px",
                lg: "8px 16px",
                md: "8px 12px",
              }}
            >
              <Text fontSize="10px" color="grey.400" fontWeight="semibold">
                CURRENT NODE
              </Text>
              <Text fontSize="14px" color="black">
                {nodeNumber}
              </Text>
            </Box>
          </HStack>
          <HStack gap="16px">
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
    </Flex>
  );
};

export default Navbar;
