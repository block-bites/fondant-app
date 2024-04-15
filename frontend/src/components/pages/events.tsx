import { useEffect, useState } from "react"
import { Flex, Text, Box, VStack, Button } from "@chakra-ui/react"
import axios from "axios"
import { useNodeContext } from "../../context/NodeContext"
import formatJson from "../atoms/format-json"
import SpinnerFrame from "../atoms/spinner-frame"

type Event = any

interface EventsProps {
    isNetworkRunning: boolean
}

const EventsPerPage = 10

const Events: React.FC<EventsProps> = ({ isNetworkRunning }) => {
    const [events, setEvents] = useState<Event[]>([])
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
    const [expandedEventIndex, setExpandedEventIndex] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { nodeNumber } = useNodeContext()

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`http://localhost:3001/cache/events/${nodeNumber}`)
                const historicalEvents = response.data
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
                setEvents(historicalEvents)
                setFilteredEvents(historicalEvents)
            } catch (error) {
                setFilteredEvents([])
                console.error("Error fetching historical events:", error)
            } finally {
                setIsLoading(false)
            }
        }
        if (isNetworkRunning) {
            fetchEvents()
        }
    }, [nodeNumber, isNetworkRunning])

    const toggleEvent = (index: number) => {
        setExpandedEventIndex(expandedEventIndex === index ? null : index)
    }

    const handlePrevPage = () => {
        setCurrentPage((current) => Math.max(current - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((current) =>
            Math.min(current + 1, Math.ceil(filteredEvents.length / EventsPerPage))
        )
    }

    const startIndex = (currentPage - 1) * EventsPerPage
    const selectedEvents = filteredEvents.slice(startIndex, startIndex + EventsPerPage)

    if (isLoading) return <SpinnerFrame />

    if (events?.length === 0) {
        return (
            <Flex justifyContent="center" height="calc(100vh - 148px)" alignItems="center">
                <Box overflowY="auto" p={3}>
                    <Flex w="100%" justify="center" mt={["144px", "144px", "0"]}>
                        <Text color="grey.400">No events available to display</Text>
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
                    {selectedEvents?.map((event, index) => (
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
                                        ? formatJson(event, 0, true)
                                        : formatJson(event, 0, false)}
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
                        Page {currentPage} of {Math.ceil(filteredEvents.length / EventsPerPage)}
                    </Text>
                    <Button
                        onClick={handleNextPage}
                        isDisabled={currentPage * EventsPerPage >= filteredEvents.length}
                    >
                        Next
                    </Button>
                </Flex>
            </VStack>
        </Flex>
    )
}

export default Events
