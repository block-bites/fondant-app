import { useState, useEffect, ChangeEvent } from "react"
import { Box, Text, Flex, Button, Select, VStack } from "@chakra-ui/react"
import { useNodeContext } from "../../context/NodeContext"
import formatJson from "../atoms/format-json"
import SpinnerFrame from "../atoms/spinner-frame"

interface LogEntry {
    [key: string]: string
}

const LogsPerPage = 10
const LogLevels = ["All", "DEBUG", "INFO", "WARN", "ERROR"]

export default function Logs() {
    const [logs, setLogs] = useState<LogEntry[]>([])
    const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([])
    const [currentLevel, setCurrentLevel] = useState<string>("All")
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [expandedLogIndex, setExpandedLogIndex] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { nodeNumber } = useNodeContext()

    useEffect(() => {
        const fetchLogs = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`http://localhost:3001/run/cctl-infra-node-view-log`, {
                    method: "POST",
                })

                const logs = await response.json()
                const logsWithCommas = logs.stdout.replaceAll("}\n{", "},\n{")
                const logsParsed = JSON.parse(`[${logsWithCommas}]`)
                setLogs(logsParsed)
                filterLogs(logsParsed, currentLevel)
            } catch (error) {
                setFilteredLogs([])
                console.error("Error fetching logs:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchLogs()
    }, [nodeNumber, currentLevel])

    const filterLogs = (logs: LogEntry[], level: string) => {
        const filtered = level === "All" ? logs : logs.filter((log) => log.level === level)
        setFilteredLogs(filtered)
    }

    const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCurrentLevel(event.target.value)
        filterLogs(logs, event.target.value)
    }

    const handlePrevPage = () => {
        setCurrentPage((current) => Math.max(current - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((current) => Math.min(current + 1, Math.ceil(logs.length / LogsPerPage)))
    }

    const toggleLog = (index: number) => {
        setExpandedLogIndex(expandedLogIndex === index ? null : index)
    }

    const startIndex = (currentPage - 1) * LogsPerPage
    const selectedLogs = filteredLogs.slice(startIndex, startIndex + LogsPerPage)

    if (isLoading) return <SpinnerFrame />

    return (
        <Flex
            width="100%"
            justify="center"
            fontFamily="monospace"
            m={["138px 0 0 0", "148px 0 0 0", "80px 0 0 0"]}
        >
            <VStack spacing={4} width="100%" maxW={1440} p={5}>
                <Select
                    onChange={handleLevelChange}
                    value={currentLevel}
                    w="200px"
                    mb={3}
                    alignSelf="flex-end"
                >
                    {LogLevels.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </Select>
                {filteredLogs.length === 0 ? (
                    <Flex justifyContent="center" height="calc(100vh - 438px)" alignItems="center">
                        <Box overflowY="auto" p={3}>
                            <Flex w="100%" justify="center" mt={["144px", "144px", "0"]}>
                                <Text fontFamily="primary" color="grey.400">
                                    No logs available to display
                                </Text>
                            </Flex>
                        </Box>
                    </Flex>
                ) : (
                    <>
                        <Box overflowY="auto" w="100%" borderWidth="1px" borderRadius="lg" p={3}>
                            {selectedLogs.map((log, index) => (
                                <Flex
                                    key={index}
                                    direction="column"
                                    p={3}
                                    borderBottom="1px solid #ddd"
                                    onClick={() => toggleLog(startIndex + index)}
                                    cursor="pointer"
                                >
                                    <Flex alignItems="center">
                                        <Text
                                            transform={
                                                expandedLogIndex === startIndex + index
                                                    ? "rotate(90deg)"
                                                    : "rotate(0deg)"
                                            }
                                        >
                                            ▶
                                        </Text>
                                        <Box ml={2} overflowX="auto">
                                            {expandedLogIndex === startIndex + index
                                                ? formatJson(log, 0, true)
                                                : formatJson(log, 0, false)}
                                        </Box>
                                    </Flex>
                                </Flex>
                            ))}
                        </Box>
                        <Flex justifyContent="space-between" mt="10px" w="100%" alignItems="center">
                            <Button onClick={handlePrevPage} isDisabled={currentPage === 1}>
                                Previous
                            </Button>
                            <Text fontFamily="secondary">
                                Page {currentPage} of {Math.ceil(filteredLogs.length / LogsPerPage)}
                            </Text>
                            <Button
                                onClick={handleNextPage}
                                isDisabled={currentPage * LogsPerPage >= filteredLogs.length}
                            >
                                Next
                            </Button>
                        </Flex>
                    </>
                )}
            </VStack>
        </Flex>
    )
}
