import React, { useEffect, useState } from "react";
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
  const { nodeNumber } = useNodeContext(); // Use nodeNumber from context

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/cache/deploys/${nodeNumber}`
        );
        const historicalEvents = response.data.events.map((event: string) =>
          JSON.parse(event)
        );
        setEvents(historicalEvents);
      } catch (error) {
        console.error("Error fetching historical deploys:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [nodeNumber]);

  const toggleEvent = (index: number) => {
    setExpandedEventIndex(expandedEventIndex === index ? null : index);
  };

  if (isLoading)
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
  else
    return (
      <Flex direction="column" width="100%">
        <Box overflowY="auto" maxHeight="80vh">
          {events?.length === 0 ? (
            <Flex w="100%" justify="center" color="grey.400" pt="100px">
              <Text color="grey">No deploys</Text>
            </Flex>
          ) : (
            events?.map((event, index) => (
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
            ))
          )}
        </Box>
      </Flex>
    );
}
