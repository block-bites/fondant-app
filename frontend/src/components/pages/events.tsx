import { useEffect, useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import axios from "axios";
import { useNodeContext } from "../../context/NodeContext";
import EventElement from "../molecules/event-element";

type Event = any;

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [expandedEventIndex, setExpandedEventIndex] = useState<number | null>(
    null
  );
  const eventCapacity = 100;
  const { nodeNumber } = useNodeContext();

  useEffect(() => {
    const fetchEvents = async () => {
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
          const updatedEvents = [newEvent, ...prevEvents];
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

  return (
    <Flex direction="column" width="100%">
      <Box overflowY="auto" maxHeight="80vh" p={3}>
        {events.length === 0 ? (
          <Flex w="100%" justify="center" pt="100px">
            <Text color="grey.400">No events</Text>
          </Flex>
        ) : (
          events.map((event, index) => (
            <EventElement
              onClick={() => toggleEvent(index)}
              event={event}
              key={index}
              sameIndexes={expandedEventIndex === index}
            />
          ))
        )}
      </Box>
    </Flex>
  );
}
