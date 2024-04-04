import { useEffect, useState } from "react"
import { useLocation, Location } from "react-router-dom"
import { Link } from "react-router-dom"
import Hamburger from "hamburger-react"
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
    Spinner,
    Button,
} from "@chakra-ui/react"
import NavbarModal from "../molecules/navbar-modal"
import { FaBell, FaRegFileCode } from "react-icons/fa"
import { BiGridAlt } from "react-icons/bi"
import { MdCloudUpload, MdSupervisorAccount } from "react-icons/md"
import { useNodeContext } from "../../context/NodeContext"
import { CasperServiceByJsonRPC } from "casper-js-sdk"
import { NODE_URL_PORT, NUM_OF_NODES_CONSIDERED_RUNNING } from "../../constant"
import { defaultClient } from "../../casper-client"

import Logo from "../../assets/logo.svg"

interface NavbarProps {
    isLaptop: boolean
    isMobile: boolean
    isNetworkLaunched: boolean
    setIsNetworkLaunched: React.Dispatch<React.SetStateAction<boolean>>
    isNetworkRunning: boolean
    setIsNetworkRunning: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: React.FC<NavbarProps> = ({
    isLaptop,
    isMobile,
    isNetworkLaunched,
    setIsNetworkLaunched,
    isNetworkRunning,
    setIsNetworkRunning,
}) => {
    const { nodeNumber, setNodeNumber } = useNodeContext()
    const [currentBlock, setCurrentBlock] = useState<number>(0)
    const client = new CasperServiceByJsonRPC(`http://localhost:3001/net/${nodeNumber}/rpc`)
    // const [startTime, setStartTime] = useState<Date | null>(null)
    const [uptime, setUptime] = useState<string>("")
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [resetTrigger, setResetTrigger] = useState<boolean>(false)
    const [isResetting, setIsResetting] = useState<boolean>(false)
    const location: Location = useLocation()
    const [activePath, setActivePath] = useState<string>(location.pathname)
    const [open, setOpen] = useState<boolean>(false)
    const [isLaunching, setIsLaunching] = useState<boolean>(false)
    const [isNetworkStarting, setIsNetworkStarting] = useState<boolean>(false)
    const [isNetworkStopping, setIsNetworkStopping] = useState<boolean>(false)

    useEffect(() => {
        setActivePath(location.pathname)
    }, [location])

    useEffect(() => {
        // fetchStartTime()
    }, [])

    useEffect(() => {
        fetchUptime()

        const intervalId = setInterval(() => {
            fetchUptime()
        }, 10000) // 10 seconds interval
        return () => clearInterval(intervalId)
        // eslint-disable-next-line
    }, [])

    const fetchUptime = async () => {
        try {
            const response = await defaultClient.casperService.getStatus()
            console.log("!!!" + response)
        } catch (error) {
            console.error("Network error:", error)
            // Handle network errors here
        }
    }

    // useEffect(() => {
    //     fetchBlocks()
    //     const intervalId = setInterval(() => {
    //         fetchBlocks()
    //     }, 10000) // 10 seconds interval
    //     return () => clearInterval(intervalId)
    //     // eslint-disable-next-line
    // }, [nodeNumber])

    // useEffect(() => {
    //     fetchStartTime()
    //     fetchStatus()

    //     const intervalId = setInterval(() => {
    //         fetchStatus()
    //     }, 5000) // 5 seconds interval

    //     return () => clearInterval(intervalId)
    // }, [resetTrigger])

    useEffect(() => {
        if (open) {
            setOpen(false)
        }
        // eslint-disable-next-line
    }, [isMobile])

    // useEffect(() => {
    //     const updateUptime = () => {
    //         if (startTime) {
    //             const now = new Date()
    //             const elapsed = new Date(now.getTime() - startTime.getTime())
    //             const hours = elapsed.getUTCHours()
    //             const minutes = elapsed.getUTCMinutes()
    //             const seconds = elapsed.getUTCSeconds()
    //             setUptime(`${hours}h ${minutes}m ${seconds}s`)
    //         }
    //     }
    //     const intervalId = setInterval(updateUptime, 1000)
    //     return () => clearInterval(intervalId)
    // }, [startTime])

    // const fetchStartTime = async () => {
    //     try {
    // const response = await fetch("http://localhost:3001/run/cctl-infra-net-start")
    // const data = await response.json()
    // setStartTime(new Date(data.startupTime))
    //     } catch (error) {
    //         console.error("Error fetching start time:", error)
    //     }
    // }

    //Launching network
    const handleLaunch = async () => {
        setIsLaunching(true)
        try {
            const response = await fetch(`${NODE_URL_PORT}/init`, {
                method: "POST",
            })
            if (response.ok) {
                setIsNetworkLaunched(true)
                setIsNetworkRunning(true)
                setIsLaunching(false)
                console.log("Launched successfully")
            } else {
                console.error("Server error:", response.status)
                // Handle server errors here
            }
        } catch (error) {
            console.error("Network error:", error)
            // Handle network errors here
        }
    }

    //Start network
    const handleStart = async () => {
        setIsNetworkStarting(true)
        try {
            const response = await fetch(`${NODE_URL_PORT}/start`, {
                method: "POST",
            })
            if (response.ok) {
                setIsNetworkRunning(true)
                setIsNetworkStarting(false)
                console.log("System started successfully")
            }
        } catch (error) {
            console.error("Error starting the system:", error)
        }
    }

    //Stop network
    const handleStop = async () => {
        setIsNetworkStopping(true)
        try {
            const response = await fetch(`${NODE_URL_PORT}/stop`, {
                method: "POST",
            })
            if (response.ok) {
                setIsNetworkRunning(false)
                setIsNetworkStopping(false)
                console.log("System stopped successfully")
            }
        } catch (error) {
            console.error("Error stopping the system:", error)
        }
    }

    const fetchStatus = async () => {
        try {
            const response = await fetch(`${NODE_URL_PORT}/status`)
            console.log(response.json())
            if (response.ok) {
                setIsNetworkRunning(true)
            }
        } catch (error) {
            setIsNetworkRunning(false)
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

    // Open/Close modal to confirm restart
    // const handleModalOpen = () => {
    //     setIsModalOpen(true)
    // }
    // const handleModalClose = () => {
    //     setIsModalOpen(false)
    // }

    //Dropdown nodes to choose
    const nodeOptions = []
    for (let i = 1; i <= NUM_OF_NODES_CONSIDERED_RUNNING; i++) {
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
                    <Link to="/">
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
                                            w={["250px", "250px", "0"]}
                                            h="100vh"
                                            flexDir="column"
                                            background="pri.dark"
                                            color="grey.100"
                                            padding="30px 24px 50px 0"
                                            alignItems="flex-end"
                                            gap="15px"
                                        >
                                            <Link to="/" onClick={() => setOpen(false)}>
                                                <Flex
                                                    alignItems="center"
                                                    gap="15px"
                                                    justifyContent="center"
                                                    color={
                                                        activePath === "/"
                                                            ? "pri.orange"
                                                            : "grey.100"
                                                    }
                                                    borderBottom={
                                                        activePath === "/" ? "2px solid" : "none"
                                                    }
                                                >
                                                    <MdSupervisorAccount size="24px" />
                                                    <Text fontSize="28px">Accounts</Text>
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
                                                    <Text fontSize="28px">Blocks</Text>
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
                                                    <Text fontSize="28px">Deploys</Text>
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
                                                    <Text fontSize="28px">Events</Text>
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
                                                    <Text fontSize="28px">Logs</Text>
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
                                <Link to="/">
                                    <Tab
                                        _hover={{
                                            color: "grey.400",
                                            borderColor: "grey.400",
                                        }}
                                        color={activePath === "/" ? "pri.orange" : "grey.100"}
                                        borderBottom={activePath === "/" ? "2px solid" : "none"}
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
                        {/* Conditionally render Start/Stop buttons based on isNetworkRunning */}
                        {isNetworkLaunched ? null : (
                            <Button
                                width="100px"
                                height="29px"
                                bg="green.500"
                                color="white"
                                borderRadius="4px"
                                p={["4px 7px", "4px 12px"]}
                                fontWeight="semibold"
                                fontSize={["10px", "14px"]}
                                cursor="pointer"
                                onClick={handleLaunch}
                                isDisabled={isLaunching}
                                _hover={{ bg: "green.400" }}
                            >
                                {isLaunching ? <Spinner size="sm" /> : "Launch"}
                            </Button>
                        )}
                        {!isNetworkRunning && isNetworkLaunched ? (
                            <Button
                                width="100px"
                                height="29px"
                                bg="green.500"
                                color="white"
                                borderRadius="4px"
                                p={["4px 7px", "4px 12px"]}
                                fontWeight="semibold"
                                fontSize={["10px", "14px"]}
                                cursor="pointer"
                                onClick={handleStart}
                                isDisabled={isNetworkStarting}
                                _hover={{ bg: "green.400" }}
                            >
                                {isNetworkStarting ? <Spinner size="sm" /> : "Start"}
                            </Button>
                        ) : null}
                        {isNetworkRunning && isNetworkLaunched ? (
                            <Button
                                width="100px"
                                height="29px"
                                bg="red.500"
                                color="white"
                                borderRadius="4px"
                                p={["5px 7px", "4px 12px"]}
                                fontWeight="semibold"
                                fontSize={["10px", "14px"]}
                                cursor="pointer"
                                onClick={handleStop}
                                isDisabled={isNetworkStopping}
                                _hover={{ bg: "red.400" }}
                            >
                                {isNetworkStopping ? <Spinner size="sm" /> : "Stop"}
                            </Button>
                        ) : null}

                        {/* <Box              //Reset feature will be develope later 
                                height="29px"
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
                            </Box> */}
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
            {/* <NavbarModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                handleReset={handleReset}
            /> */}
        </Flex>
    )
}

export default Navbar
