import React, { useEffect, useState } from 'react';
import { Flex, Text, Box } from "@chakra-ui/react";
import axios from 'axios';
import { useNodeContext } from '../../context/NodeContext';
import formatJson from '../atoms/format-json';

type Event = any;

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [expandedEventIndex, setExpandedEventIndex] = useState<number | null>(null);
  const { nodeNumber } = useNodeContext(); // Use nodeNumber from context

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cache/deploys/${nodeNumber}`);
        const historicalEvents = response.data.events.map((event: string) => JSON.parse(event));
        setEvents(historicalEvents);
      } catch (error) {
        console.error('Error fetching historical deploys:', error);
      }
    };

    fetchEvents();
  }, [nodeNumber]); 

  const toggleEvent = (index: number) => {
    setExpandedEventIndex(expandedEventIndex === index ? null : index);
  };

  return (
    <Flex direction="column" width="100%">
      {/* Removed the dropdown for node selection */}
      <Box overflowY="auto" maxHeight="80vh" p={3}>
        {events.length === 0 ? (
          <Text color="grey">No deploys</Text>
        ) : (
          events.map((event, index) => (
            <Box key={index} p={3} borderBottom="1px solid grey" cursor="pointer" onClick={() => toggleEvent(index)}>
              <Flex alignItems="center">
                <Text transform={expandedEventIndex === index ? 'rotate(90deg)' : 'rotate(0deg)'}>▶</Text>
                <Box ml={2} overflowX="auto">
                  {expandedEventIndex === index ? formatJson(event, 0, true) : formatJson(event, 0, false)}
                </Box>
              </Flex>
            </Box>
          ))
        )}
      </Box>
    </Flex>
  );
  
}