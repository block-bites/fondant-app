import { useEffect, useState } from "react"
import { Flex, Text, Box, VStack, Button } from "@chakra-ui/react"
import axios from "axios"
import { useNodeContext } from "../../context/NodeContext"
import formatJson from "../atoms/format-json"
import SpinnerFrame from "../atoms/spinner-frame"

type Deploy = any
const DeploysPerPage = 10

export default function Deploys() {
    const [deploys, setDeploys] = useState<Deploy[]>([])
    const [expandedEventIndex, setExpandedEventIndex] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { nodeNumber } = useNodeContext() // Use nodeNumber from context
    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`http://localhost:3001/cache/events/${nodeNumber}`)
                const historicalDeploys = response.data
                    .filter((e: any) => e.includes("DeployProcessed"))
                    .map((event: string) => {
                        try {
                            const json = JSON.parse(event)
                            return json
                        } catch {
                            return null
                        }
                    })
                    .filter((e: any) => !!e)
                    .reverse()
                setDeploys(historicalDeploys)
            } catch (error) {
                console.error("Error fetching historical deploys:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchEvents()
    }, [nodeNumber])

    const startIndex = (currentPage - 1) * DeploysPerPage
    const selectedDeploys = deploys.slice(startIndex, startIndex + DeploysPerPage)

    const toggleEvent = (index: number) => {
        setExpandedEventIndex(expandedEventIndex === index ? null : index)
    }

    const handlePrevPage = () => {
        setCurrentPage((current) => Math.max(current - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((current) =>
            Math.min(current + 1, Math.ceil(deploys.length / DeploysPerPage))
        )
    }

    if (isLoading) return <SpinnerFrame />

    if (deploys?.length === 0) {
        return (
            <Flex justifyContent="center" height="calc(100vh - 148px)" alignItems="center">
                <Box overflowY="auto" p={3}>
                    <Flex w="100%" justify="center" mt={["144px", "144px", "0"]}>
                        <Text color="grey.400">No deploys available to display</Text>
                    </Flex>
                </Box>
            </Flex>
        )
    }

    return (
        <Flex
            direction="column"
            width="100%"
            alignItems="center"
            m={["138px 0 0 0", "148px 0 0 0", "80px 0 0 0"]}
        >
            <VStack spacing={4} width="100%" maxW={1440} p={5}>
                <Box overflowY="auto" w="100%" borderWidth="1px" borderRadius="lg" p={3}>
                    {selectedDeploys.map((deploy, index) => (
                        <Box
                            key={index}
                            p={3}
                            borderBottom="1px solid grey"
                            cursor="pointer"
                            onClick={() => toggleEvent(startIndex + index)}
                        >
                            <Flex alignItems="center">
                                <Text
                                    transform={
                                        expandedEventIndex === startIndex + index
                                            ? "rotate(90deg)"
                                            : "rotate(0deg)"
                                    }
                                >
                                    ▶
                                </Text>
                                <Box ml={2} overflowX="auto">
                                    {expandedEventIndex === startIndex + index
                                        ? formatJson(deploy, 0, true)
                                        : formatJson(deploy, 0, false)}
                                </Box>
                            </Flex>
                        </Box>
                    ))}
                </Box>
                <Flex justifyContent="space-between" mt="10px" w="100%" alignItems="center">
                    <Button onClick={handlePrevPage} isDisabled={currentPage === 1}>
                        Previous
                    </Button>
                    <Text fontFamily="secondary">
                        Page {currentPage} of {Math.ceil(selectedDeploys.length / DeploysPerPage)}
                    </Text>
                    <Button
                        onClick={handleNextPage}
                        isDisabled={currentPage * DeploysPerPage >= selectedDeploys.length}
                    >
                        Next
                    </Button>
                </Flex>
            </VStack>
        </Flex>
    )
}
