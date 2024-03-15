import { useEffect, useState, useContext } from "react";
import { Flex, Text, Box, Progress } from "@chakra-ui/react";
import axios from "axios";
import { useNodeContext } from "../../context/NodeContext";
import formatJson from "../atoms/format-json";

type Event = any;

export default function Events() {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [expandedEventIndex, setExpandedEventIndex] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const eventCapacity = 100;
  const { nodeNumber } = useNodeContext();

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/cache/events/${nodeNumber}`
        );
        const historicalEvents = response.data.events.map((event: string) =>
          JSON.parse(event)
        );
        setEvents(historicalEvents);
      } catch (error) {
        console.error("Error fetching historical events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [nodeNumber]);

  useEffect(() => {
    const streamUrl = `http://localhost:3000/net/${nodeNumber}/sse/events/main`;
    const eventSource = new EventSource(streamUrl);

    eventSource.onmessage = (e: MessageEvent) => {
      try {
        const newEvent: Event = JSON.parse(e.data);
        setEvents((prevEvents) => {
          // Убедитесь, что prevEvents является массивом
          const updatedEvents = prevEvents
            ? [newEvent, ...prevEvents]
            : [newEvent];
          return updatedEvents.slice(0, eventCapacity);
        });
      } catch (error) {
        console.error("Error parsing event data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error(`EventSource failed for ${streamUrl}:`, error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [nodeNumber]);

  const toggleEvent = (index: number) => {
    setExpandedEventIndex(expandedEventIndex === index ? null : index);
  };

  if (isLoading) {
    return (
      <Flex
        justifyContent="center"
        height="calc(100vh - 148px)"
        alignItems="center"
      >
        <Progress
          size="lg"
          rounded={50}
          isIndeterminate
          width="100%"
          maxWidth="1440px"
          colorScheme="gray"
        />
      </Flex>
    );
  }

  if (events?.length === 0) {
    return (
      <Flex direction="column" width="100%">
        <Box overflowY="auto" maxHeight="80vh" p={3}>
          <Flex w="100%" justify="center" pt="100px">
            <Text color="grey.400">No events</Text>
          </Flex>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex direction="column" width="100%">
      <Box overflowY="auto" maxHeight="80vh" p={3}>
        {events?.map((event, index) => (
          <Box
            key={index}
            p={3}
            borderBottom="1px solid grey"
            cursor="pointer"
            onClick={() => toggleEvent(index)}
          >
            <Flex alignItems="center">
              <Text
                transform={
                  expandedEventIndex === index
                    ? "rotate(90deg)"
                    : "rotate(0deg)"
                }
              >
                ▶
              </Text>
              <Box ml={2} overflowX="auto">
                {expandedEventIndex === index
                  ? formatJson(event, 0, true)
                  : formatJson(event, 0, false)}
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
    </Flex>
  );
}
