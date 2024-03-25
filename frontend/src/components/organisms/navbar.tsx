import { useEffect, useState } from "react"
import { useLocation, Location } from "react-router-dom"
import { Link } from "react-router-dom"
import Hamburger from "hamburger-react"
import { Box, HStack, Tab, Tabs, TabList, Flex, Icon, Text, Select, Image } from "@chakra-ui/react"
import NavbarModal from "../molecules/navbar-modal"
import { FaBell, FaRegFileCode } from "react-icons/fa"
import { BiGridAlt } from "react-icons/bi"
import { MdCloudUpload, MdSupervisorAccount } from "react-icons/md"
import { useNodeContext } from "../../context/NodeContext"
import { CasperServiceByJsonRPC } from "casper-js-sdk"
import Logo from "../../assets/logo.svg"

interface NavbarProps {
    isLaptop: boolean
    isMobile: boolean
}

const Navbar: React.FC<NavbarProps> = ({ isLaptop, isMobile }) => {
    const { nodeNumber, setNodeNumber } = useNodeContext()
    const [currentBlock, setCurrentBlock] = useState<number>(0)
    const client = new CasperServiceByJsonRPC(`http://localhost:3001/net/${nodeNumber}/rpc`)
    const [startTime, setStartTime] = useState<Date | null>(null)
    const [uptime, setUptime] = useState<string>("")
    const [isSystemRunning, setIsSystemRunning] = useState<boolean>(
        JSON.parse(localStorage.getItem("isSystemRunning") || "true")
    )
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [resetTrigger, setResetTrigger] = useState<boolean>(false)
    const [isResetting, setIsResetting] = useState<boolean>(false)
    const location: Location = useLocation()
    const [activePath, setActivePath] = useState<string>(location.pathname)
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        setActivePath(location.pathname)
    }, [location])

    useEffect(() => {
        fetchStartTime()
    }, [])

    useEffect(() => {
        fetchBlocks()
        const intervalId = setInterval(() => {
            fetchBlocks()
        }, 10000) // 10 seconds interval
        return () => clearInterval(intervalId)
        // eslint-disable-next-line
    }, [nodeNumber])

    useEffect(() => {
        fetchStartTime()
        fetchStatus()

        const intervalId = setInterval(() => {
            fetchStatus()
        }, 5000) // 5 seconds interval

        return () => clearInterval(intervalId)
    }, [resetTrigger])

    useEffect(() => {
        localStorage.setItem("isSystemRunning", JSON.stringify(isSystemRunning))
    }, [isSystemRunning])

    useEffect(() => {
        if (open) {
            setOpen(false)
        }
        // eslint-disable-next-line
    }, [isMobile])

    useEffect(() => {
        const updateUptime = () => {
            if (startTime) {
                const now = new Date()
                const elapsed = new Date(now.getTime() - startTime.getTime())
                const hours = elapsed.getUTCHours()
                const minutes = elapsed.getUTCMinutes()
                const seconds = elapsed.getUTCSeconds()
                setUptime(`${hours}h ${minutes}m ${seconds}s`)
            }
        }
        const intervalId = setInterval(updateUptime, 1000)
        return () => clearInterval(intervalId)
    }, [startTime])

    const fetchStartTime = async () => {
        try {
            const response = await fetch("http://localhost:3001/get-start-time")
            const data = await response.json()
            setStartTime(new Date(data.startupTime))
        } catch (error) {
            console.error("Error fetching start time:", error)
        }
    }

    const handleStart = async () => {
        try {
            const response = await fetch("http://localhost:3001/start", {
                method: "POST",
            })
            if (response.ok) {
                setIsSystemRunning(true)
                console.log("System started successfully")
            }
        } catch (error) {
            console.error("Error starting the system:", error)
        }
    }

    const handleStop = async () => {
        try {
            const response = await fetch("http://localhost:3001/stop", {
                method: "POST",
            })
            if (response.ok) {
                setIsSystemRunning(false)
                console.log("System stopped successfully")
            }
        } catch (error) {
            console.error("Error stopping the system:", error)
        }
    }

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const fetchStatus = async () => {
        try {
            const response = await fetch("http://localhost:3001/status")
            if (response.ok) {
                setIsSystemRunning(true)
            }
        } catch (error) {
            setIsSystemRunning(false)
            console.error("Error fetching system status:", error)
        }
    }

    const fetchBlocks = async () => {
        try {
            const latestBlockInfo = await client.getLatestBlockInfo()
            if (latestBlockInfo && latestBlockInfo.block) {
                setCurrentBlock(latestBlockInfo.block.header.height)
            }
        } catch (error) {
            console.error("Error fetching latest block info:", error)
        }
    }

    const handleReset = async () => {
        setIsResetting(true)
        try {
            const response = await fetch("http://localhost:3001/nctl-start", {
                method: "POST",
            })
            if (response.status === 200) {
                console.log("Reset successful:", response.status)
                setTimeout(() => {
                    setIsResetting(false)
                }, 5000)
                setResetTrigger((prev) => !prev)
            }
        } catch (error) {
            console.error("Error sending reset request:", error)
            setIsResetting(false)
        }
    }

    const nodeOptions = []
    for (let i = 1; i <= 10; i++) {
        nodeOptions.push(
            <option key={i} value={i}>
                Node {i}
            </option>
        )
    }

    return (
        <Flex w="100%" direction="column">
            <HStack
                w="100%"
                bg="pri.dark"
                justify="center"
                position={["fixed", "fixed", "absolute"]}
                zIndex={1}
            >
                <HStack
                    maxW="1440px"
                    w="100%"
                    p={["12px 16px", "12px 16px", "12px 32px"]}
                    justify="space-between"
                >
                    <Link to="/accounts">
                        <Flex alignItems="center" gap="8px">
                            <Image src={Logo} width="56px" />
                            <Text fontFamily="logo" fontSize={"3xl"} color={"pri.orange"}>
                                Fondant
                            </Text>
                        </Flex>
                    </Link>
                    <Tabs variant="line" color="pri.orange" size={isLaptop ? "sm" : "lg"}>
                        {isMobile ? (
                            <Flex w="100%" height="50%">
                                <Hamburger
                                    toggled={open}
                                    toggle={setOpen}
                                    size={35}
                                    color="white"
                                    rounded
                                />
                                {open ? (
                                    <Flex position="fixed" right="0" top="146px" zIndex={65}>
                                        <Flex
                                            w={["270px", "300px", "0"]}
                                            h="100vh"
                                            flexDir="column"
                                            background="pri.dark"
                                            color="grey.100"
                                            padding="30px 24px 50px 0"
                                            alignItems="flex-end"
                                            gap="15px"
                                        >
                                            <Link to="/accounts" onClick={() => setOpen(false)}>
                                                <Flex
                                                    alignItems="center"
                                                    gap="15px"
                                                    justifyContent="center"
                                                    color={
                                                        activePath === "/accounts"
                                                            ? "pri.orange"
                                                            : "grey.100"
                                                    }
                                                    borderBottom={
                                                        activePath === "/accounts"
                                                            ? "2px solid"
                                                            : "none"
                                                    }
                                                >
                                                    <MdSupervisorAccount size="24px" />
                                                    <Text fontSize={["36px", "42px"]}>
                                                        {" "}
                                                        Accounts
                                                    </Text>
                                                </Flex>
                                            </Link>
                                            <Link to="/blocks" onClick={() => setOpen(false)}>
                                                <Flex
                                                    alignItems="center"
                                                    gap="15px"
                                                    justifyContent="center"
                                                    color={
                                                        activePath === "/blocks"
                                                            ? "pri.orange"
                                                            : "grey.100"
                                                    }
                                                    borderBottom={
                                                        activePath === "/blocks"
                                                            ? "2px solid"
                                                            : "none"
                                                    }
                                                >
                                                    <BiGridAlt size="24px" />
                                                    <Text fontSize={["36px", "42px"]}>Blocks</Text>
                                                </Flex>
                                            </Link>
                                            <Link to="/deploys" onClick={() => setOpen(false)}>
                                                <Flex
                                                    alignItems="center"
                                                    gap="15px"
                                                    justifyContent="center"
                                                    color={
                                                        activePath === "/deploys"
                                                            ? "pri.orange"
                                                            : "grey.100"
                                                    }
                                                    borderBottom={
                                                        activePath === "/deploys"
                                                            ? "2px solid"
                                                            : "none"
                                                    }
                                                >
                                                    <MdCloudUpload size="24px" />
                                                    <Text fontSize={["36px", "42px"]}>Deploys</Text>
                                                </Flex>
                                            </Link>
                                            <Link to="/events" onClick={() => setOpen(false)}>
                                                <Flex
                                                    alignItems="center"
                                                    gap="15px"
                                                    justifyContent="center"
                                                    color={
                                                        activePath === "/events"
                                                            ? "pri.orange"
                                                            : "grey.100"
                                                    }
                                                    borderBottom={
                                                        activePath === "/events"
                                                            ? "2px solid"
                                                            : "none"
                                                    }
                                                >
                                                    <FaBell size="24px" />
                                                    <Text fontSize={["36px", "42px"]}>Events</Text>
                                                </Flex>
                                            </Link>
                                            <Link to="/logs" onClick={() => setOpen(false)}>
                                                <Flex
                                                    alignItems="center"
                                                    gap="15px"
                                                    justifyContent="center"
                                                    color={
                                                        activePath === "/logs"
                                                            ? "pri.orange"
                                                            : "grey.100"
                                                    }
                                                    borderBottom={
                                                        activePath === "/logs"
                                                            ? "2px solid"
                                                            : "none"
                                                    }
                                                >
                                                    <FaRegFileCode size="24px" />
                                                    <Text fontSize={["36px", "42px"]}>Logs</Text>
                                                </Flex>
                                            </Link>
                                        </Flex>
                                    </Flex>
                                ) : null}
                            </Flex>
                        ) : (
                            <TabList
                                border="none"
                                justifyContent={isLaptop ? "space-between" : "unset"}
                            >
                                <Link to="/accounts">
                                    <Tab
                                        _hover={{
                                            color: "grey.400",
                                            borderColor: "grey.400",
                                        }}
                                        color={
                                            activePath === "/accounts" ? "pri.orange" : "grey.100"
                                        }
                                        borderBottom={
                                            activePath === "/accounts" ? "2px solid" : "none"
                                        }
                                    >
                                        <Icon as={MdSupervisorAccount} size="24px" />
                                        Accounts
                                    </Tab>
                                </Link>
                                <Link to="/blocks">
                                    <Tab
                                        _hover={{
                                            color: "grey.400",
                                            borderColor: "grey.400",
                                        }}
                                        color={activePath === "/blocks" ? "pri.orange" : "grey.100"}
                                        borderBottom={
                                            activePath === "/blocks" ? "2px solid" : "none"
                                        }
                                    >
                                        <Icon as={BiGridAlt} size="24px" />
                                        Blocks
                                    </Tab>
                                </Link>
                                <Link to="/deploys">
                                    <Tab
                                        _hover={{
                                            color: "grey.400",
                                            borderColor: "grey.400",
                                        }}
                                        color={
                                            activePath === "/deploys" ? "pri.orange" : "grey.100"
                                        }
                                        borderBottom={
                                            activePath === "/deploys" ? "2px solid" : "none"
                                        }
                                    >
                                        <Icon as={MdCloudUpload} size="24px" />
                                        Deploys
                                    </Tab>
                                </Link>
                                <Link to="/events">
                                    <Tab
                                        _hover={{
                                            color: "grey.400",
                                            borderColor: "grey.400",
                                        }}
                                        color={activePath === "/events" ? "pri.orange" : "grey.100"}
                                        borderBottom={
                                            activePath === "/events" ? "2px solid" : "none"
                                        }
                                    >
                                        <Icon as={FaBell} size="24px" />
                                        Events
                                    </Tab>
                                </Link>
                                <Link to="/logs">
                                    <Tab
                                        _hover={{
                                            color: "grey.400",
                                            borderColor: "grey.400",
                                        }}
                                        color={activePath === "/logs" ? "pri.orange" : "grey.100"}
                                        borderBottom={activePath === "/logs" ? "2px solid" : "none"}
                                    >
                                        <Icon as={FaRegFileCode} size="24px" />
                                        Logs
                                    </Tab>
                                </Link>
                            </TabList>
                        )}
                    </Tabs>
                </HStack>
            </HStack>
            <HStack
                h="66px"
                w="100%"
                bg="pri.beige"
                justify="center"
                position={["fixed", "fixed", "relative"]}
                right="0"
                top="80px"
                zIndex={10}
            >
                <HStack
                    maxW="1440px"
                    w="100%"
                    p={["8px 16px 8px 16px", "8px 16px", "8px 32px"]}
                    justify="space-between"
                >
                    <HStack alignItems="flex-start">
                        <Box
                            borderRight="1px solid"
                            borderColor="#2a3050"
                            alignItems="flex-start"
                            width={["66px", "82px", "116px"]}
                            p={["8px 0"]}
                        >
                            <Text fontSize={["8px", "10px"]} color="grey.400" fontWeight="semibold">
                                {isMobile ? "CURR." : "CURRENT"} BLOCK
                            </Text>
                            <Text fontSize={["10px", "14px"]} color="black">
                                {currentBlock}
                            </Text>
                        </Box>
                        <Box
                            p={["8px 0 0 5px", "8px0 0  13px", "8px 0 0 25px"]}
                            alignItems="flex-start"
                            width={["87px", "103px", "unset"]}
                        >
                            <Text fontSize={["8px", "10px"]} color="grey.400" fontWeight="semibold">
                                UPTIME
                            </Text>
                            <Text fontSize={["10px", "13px"]} color="black" wordBreak="keep-all">
                                {isResetting
                                    ? "Resetting..."
                                    : uptime.length === 0
                                      ? "Loading..."
                                      : uptime}
                            </Text>
                        </Box>
                    </HStack>
                    <HStack gap={["5px", "6px", "16px"]}>
                        {/* Conditionally render Start/Stop buttons based on isSystemRunning */}
                        {!isSystemRunning ? (
                            <Box
                                bg="green.500"
                                color="white"
                                borderRadius="4px"
                                p={["4px 7px", "4px 12px"]}
                                fontWeight="semibold"
                                fontSize={["10px", "14px"]}
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
                                p={["5px 7px", "4px 12px"]}
                                fontWeight="semibold"
                                fontSize={["10px", "14px"]}
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
                            p={["4px 7px", "4px 12px"]}
                            fontWeight="semibold"
                            fontSize={["10px", "14px"]}
                            cursor="pointer"
                            onClick={handleModalOpen}
                        >
                            Reset
                        </Box>

                        <Select
                            size={["xs", "sm"]}
                            onChange={(e) => setNodeNumber(Number(e.target.value))}
                            value={nodeNumber}
                            bg="white"
                            color="pri.orange"
                            borderColor="grey.400"
                            fontWeight={500}
                            fontSize={["11px", "14px"]}
                            margin="0 0 1px 0"
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
    )
}

export default Navbar
