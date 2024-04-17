import { Box, Button, HStack, Select, Spinner, Text } from "@chakra-ui/react"
import { NUM_OF_NODES_CONSIDERED_RUNNING, NODE_URL_PORT } from "../../constant"
import { useNodeContext } from "../../context/NodeContext"
import React, { useEffect, useState } from "react"
import { defaultClient } from "../../casper-client"
import { GetStatusResult } from "casper-js-sdk"
import { useIsNetworkRunningContext } from "../../context/IsNetworkRunningContext"
import { useIsNetworkLaunchedContext } from "../../context/IsNetworkLaunchedContext"

interface NavbarSubbarProps {
    isMobile: boolean
}

const NavbarSubbar: React.FC<NavbarSubbarProps> = ({ isMobile }) => {
    const { isNetworkRunning, setIsNetworkRunning } = useIsNetworkRunningContext()
    const { isNetworkLaunched, setIsNetworkLaunched } = useIsNetworkLaunchedContext()
    const { nodeNumber, setNodeNumber } = useNodeContext()
    const [currentBlock, setCurrentBlock] = useState<number>(0)
    const [uptime, setUptime] = useState<string>("")
    const [isLaunching, setIsLaunching] = useState<boolean>(false)
    const [isNetworkStarting, setIsNetworkStarting] = useState<boolean>(false)
    const [isNetworkStopping, setIsNetworkStopping] = useState<boolean>(false)

    useEffect(() => {
        if (isNetworkRunning) {
            fetchUptime()
        }
        const intervalId = setInterval(() => {
            if (isNetworkRunning) {
                fetchUptime()
            }
        }, 1000) // 1 seconds interval
        return () => clearInterval(intervalId)
    }, [isNetworkRunning])

    // Need to optimize to not fetch every 1sec
    const fetchUptime = async () => {
        try {
            const response: GetStatusResult = await defaultClient.casperService.getStatus()
            setUptime(response.uptime.split(" ").slice(0, -1).join(" "))
        } catch (error) {
            // Handle network errors here
            console.error("Network error:", error)
        }
    }

    useEffect(() => {
        if (isNetworkRunning) {
            fetchLatestBlock()
        }
        const intervalId = setInterval(() => {
            if (isNetworkRunning) {
                fetchLatestBlock()
            }
        }, 5 * 1000) // 10 seconds interval
        return () => clearInterval(intervalId)
    }, [isNetworkRunning])

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

    //Get block height
    const fetchLatestBlock = async () => {
        try {
            const latestBlockInfo = await defaultClient.casperService.getLatestBlockInfo()
            if (latestBlockInfo && latestBlockInfo.block) {
                setCurrentBlock(latestBlockInfo.block.header.height)
            }
        } catch (error) {
            console.error("Error fetching latest block info:", error)
        }
    }

    //Dropdown nodes to choose
    const nodeOptions = []
    for (let i = 1; i <= NUM_OF_NODES_CONSIDERED_RUNNING; i++) {
        nodeOptions.push(
            <option key={i} value={i}>
                Node {i}
            </option>
        )
    }

    // Uptime displaying
    const uptimeDisplayingMode = () => {
        if (isLaunching || isNetworkStarting) {
            return "Loading..."
        } else if ((isNetworkLaunched && !isNetworkRunning) || !isNetworkLaunched) {
            return "---"
        } else {
            return uptime
        }
    }

    return (
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
                            {uptimeDisplayingMode()}
                        </Text>
                        <Text fontSize={["10px", "13px"]} color="black" wordBreak="keep-all"></Text>
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
                            {isNetworkStopping ? <Spinner size="sm" /> : "Pause"}
                        </Button>
                    ) : null}
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
    )
}

export default NavbarSubbar
