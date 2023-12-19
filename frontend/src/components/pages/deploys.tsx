import React, { useEffect, useState } from 'react';
import { Flex, Text, Box, Select } from "@chakra-ui/react";
import axios from 'axios';

type Event = any;

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedNode, setSelectedNode] = useState<string>('1');
  const [expandedEventIndex, setExpandedEventIndex] = useState<number | null>(null);
  const eventCapacity = 100;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cache/deploys/${selectedNode}`);
        const historicalEvents = response.data.events.map((event: string) => JSON.parse(event));
        setEvents(historicalEvents);
      } catch (error) {
        console.error('Error fetching historical deploys:', error);
      }
    };

    fetchEvents();
  }, [selectedNode]);


  const toggleEvent = (index: number) => {
    setExpandedEventIndex(expandedEventIndex === index ? null : index);
  };

  const formatJson = (json: any, indent = 0, isFullDisplay = false) => {
    return Object.entries(json).map(([key, value], index) => {
      if (!isFullDisplay && index >= 3) return null; // Display only first 3 fields initially

      let displayValue: React.ReactNode;

      if (typeof value === 'object' && value !== null) {
        displayValue = <div style={{ marginLeft: '20px' }}>{formatJson(value, indent + 1, isFullDisplay)}</div>;
      } else {
        displayValue = typeof value === 'string' ? `"${value}"` : JSON.stringify(value);
      }

      return (
        <div key={key} style={{ marginLeft: `${indent * 20}px`, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
          <span style={{ color: '#D23403' }}><strong>{key}</strong></span>: 
          <span style={{ color: 'black' }}>{displayValue}</span>
        </div>
      );
    });
  };

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