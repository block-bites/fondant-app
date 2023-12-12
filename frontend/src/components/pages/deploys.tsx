import React, { useEffect, useState } from 'react';
import { Flex, Text, Box, Grid, GridItem, Select } from "@chakra-ui/react";
import axios from 'axios';

type Event = any; // Replace with your event type

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedNode, setSelectedNode] = useState<string>('1');
  const eventCapacity = 100; // Maximum number of events to store

  // Fetch historical events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/get-demo-deploys`);
        const historicalEvents = response.data.events.map((event: string) => JSON.parse(event));
        setEvents(historicalEvents);
      } catch (error) {
        console.error('Error fetching historical events:', error);
      }
    };

    fetchEvents();
  }, [selectedNode]);

  // Setup real-time event streaming
  useEffect(() => {
    const streamUrl = `http://localhost:3000/net/${selectedNode}/sse/events/main`;
    const eventSource = new EventSource(streamUrl);

    eventSource.onmessage = (e: MessageEvent) => {
      try {
        const newEvent: Event = JSON.parse(e.data);
        setEvents(prevEvents => {
          const updatedEvents = [newEvent, ...prevEvents];
          return updatedEvents.slice(0, eventCapacity); // Keep only the latest events up to the capacity
        });
      } catch (error) {
        console.error('Error parsing event data:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error(`EventSource failed for ${streamUrl}:`, error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [selectedNode]);

  const formatEvent = (event: Event) => {
    // Format your event here
    return JSON.stringify(event, null, 2); // Example formatter
  };

  // Generate node options
  const nodeOptions = [];
  for (let i = 1; i <= 10; i++) {
    nodeOptions.push(<option key={i} value={i}>Node {i}</option>);
  }

  return (
    <Flex direction="column" width="100%">
      <Select onChange={(e) => setSelectedNode(e.target.value)} value={selectedNode}>
        {nodeOptions}
      </Select>
      <Box overflowY="auto" maxHeight="80vh" p={3}>
        {events.length === 0 ? (
          <Text color="grey.100">No events</Text>
        ) : (
          events.map((event, index) => (
            <Grid key={index} templateColumns="repeat(4, 1fr)" gap={6} p={3} borderBottom="1px solid #ddd">
              <GridItem><Text>{formatEvent(event)}</Text></GridItem>
            </Grid>
          ))
        )}
      </Box>
    </Flex>
  );
}
