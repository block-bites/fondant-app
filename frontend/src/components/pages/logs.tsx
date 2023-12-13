import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Select, Text, Flex, Grid, GridItem, Button } from "@chakra-ui/react";
import axios from 'axios';

interface LogEntry {
  timestamp: string;
  level: string;
  fields: {
    message: string;
    error?: string;
    [key: string]: any;
  };
  target: string;
}

const LogsPerPage = 10; // Number of logs to display per page

export default function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedNode, setSelectedNode] = useState<string>('1');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get<LogEntry[]>(`http://localhost:3001/logs/${selectedNode}`);
        const sortedLogs = response.data
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setLogs(sortedLogs);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, [selectedNode]);

  const handleNodeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedNode(event.target.value);
    setCurrentPage(1); // Reset to first page when changing node
  };

  const handlePrevPage = () => {
    setCurrentPage(current => Math.max(current - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(current => Math.min(current + 1, Math.ceil(logs.length / LogsPerPage)));
  };

  // Calculate the logs to be shown on the current page
  const startIndex = (currentPage - 1) * LogsPerPage;
  const selectedLogs = logs.slice(startIndex, startIndex + LogsPerPage);

  return (
    <Flex direction="column" width="100%">
      <Select 
        onChange={handleNodeChange} 
        value={selectedNode} 
        mb="10px"
        bg="black" // Background color
        color="white" // Text color
        borderColor="white" // Border color
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
          <option key={i} value={i}>Node {i}</option>
        ))}
      </Select>
      <Box overflowY="auto" maxHeight="80vh">
        {selectedLogs.map((log, index) => (
          <Grid key={index} templateColumns="repeat(4, 1fr)" gap={6} p={3} borderBottom="1px solid #ddd">
            <GridItem><Text><strong>Timestamp:</strong> {log.timestamp}</Text></GridItem>
            <GridItem><Text><strong>Level:</strong> {log.level}</Text></GridItem>
            <GridItem><Text><strong>Message:</strong> {log.fields.message}</Text></GridItem>
            {log.fields.error && <GridItem><Text><strong>Error:</strong> {log.fields.error}</Text></GridItem>}
            <GridItem colSpan={log.fields.error ? 1 : 2}><Text><strong>Target:</strong> {log.target}</Text></GridItem>
          </Grid>
        ))}
      </Box>
      <Flex justifyContent="space-between" mt="10px">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
        <Text>Page {currentPage}</Text>
        <Button onClick={handleNextPage} disabled={currentPage * LogsPerPage >= logs.length}>Next</Button>
      </Flex>
    </Flex>
  );
}
