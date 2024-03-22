import { useEffect, useState } from "react"
import { Flex, Text, Box, Spinner, VStack, Button } from "@chakra-ui/react"
import axios from "axios"
import { useNodeContext } from "../../context/NodeContext"
import formatJson from "../atoms/format-json"

type Event = any

const EventsPerPage = 10

export default function Events() {
    const [events, setEvents] = useState<Event[]>([])
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
    const [expandedEventIndex, setExpandedEventIndex] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const eventCapacity = 100
    const { nodeNumber } = useNodeContext()

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`http://localhost:3001/cache/events/${nodeNumber}`)
                const historicalEvents = response.data.events.map((event: string) =>
                    JSON.parse(event)
                )
                setEvents(historicalEvents)
                setFilteredEvents(historicalEvents)
            } catch (error) {
                setFilteredEvents([])
                console.error("Error fetching historical events:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchEvents()
    }, [nodeNumber])

    useEffect(() => {
        const streamUrl = `http://localhost:3000/net/${nodeNumber}/sse/events/main`
        const eventSource = new EventSource(streamUrl)

        eventSource.onmessage = (e: MessageEvent) => {
            try {
                const newEvent: Event = JSON.parse(e.data)
                setEvents((prevEvents) => {
                    const updatedEvents = prevEvents ? [newEvent, ...prevEvents] : [newEvent]
                    return updatedEvents.slice(0, eventCapacity)
                })
            } catch (error) {
                console.error("Error parsing event data:", error)
            }
        }

        eventSource.onerror = (error) => {
            console.error(`EventSource failed for ${streamUrl}:`, error)
            eventSource.close()
        }

        return () => {
            eventSource.close()
        }
    }, [nodeNumber])

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

    if (isLoading) {
        return (
            <Flex justifyContent="center" height="calc(100vh - 148px)" alignItems="center">
                <Spinner size="xl" colorScheme="gray" />
            </Flex>
        )
    }

    if (events?.length === 0) {
        return (
            <Flex direction="column" width="100%">
                <Box overflowY="auto" maxHeight="80vh" p={3}>
                    <Flex w="100%" justify="center" pt="100px">
                        <Text color="grey.400">No events available to display</Text>
                    </Flex>
                </Box>
            </Flex>
        )
    }

    return (
        <Flex direction="column" width="100%" alignItems="center">
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
                <Flex justifyContent="space-between" mt="10px" w="100%">
                    <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <Text>
                        Page {currentPage} of {Math.ceil(filteredEvents.length / EventsPerPage)}
                    </Text>
                    <Button
                        onClick={handleNextPage}
                        disabled={currentPage * EventsPerPage >= filteredEvents.length}
                    >
                        Next
                    </Button>
                </Flex>
            </VStack>
        </Flex>
    )
}
