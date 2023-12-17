import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Select, Text, Flex, Button } from "@chakra-ui/react";
import axios from 'axios';

interface LogEntry {
  [key: string]: any;
}

const LogsPerPage = 10;

export default function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedNode, setSelectedNode] = useState<string>('1');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedLogIndex, setExpandedLogIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get<LogEntry[]>(`http://localhost:3001/logs/${selectedNode}`);
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, [selectedNode]);

  const handleNodeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedNode(event.target.value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage(current => Math.max(current - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(current => Math.min(current + 1, Math.ceil(logs.length / LogsPerPage)));
  };

  const toggleLog = (index: number) => {
    setExpandedLogIndex(expandedLogIndex === index ? null : index);
  };

  const formatLogEntry = (log: LogEntry, isFullDisplay: boolean, indent = 0) => {
    return Object.entries(log).map(([key, value], index) => {
      if (!isFullDisplay && index >= 3) return null; // Display only first 3 fields initially

      let displayValue: React.ReactNode;

      if (typeof value === 'object' && value !== null) {
        displayValue = <div style={{ marginLeft: '20px' }}>{formatLogEntry(value, isFullDisplay, indent + 1)}</div>;
      } else {
        displayValue = typeof value === 'string' ? `"${value}"` : JSON.stringify(value);
      }

      return (
        <div key={key} style={{ marginLeft: `${indent * 20}px`, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
          <span style={{ color: '#D23403' }}><strong>{key}</strong></span>: <span style={{ color: 'black' }}>{displayValue}</span>
        </div>
      );
    });
  };

  const startIndex = (currentPage - 1) * LogsPerPage;
  const selectedLogs = logs.slice(startIndex, startIndex + LogsPerPage);

  return (
    <Flex direction="column" width="100%">
      <Select onChange={handleNodeChange} value={selectedNode} mb="10px" bg="white" color="black" borderColor="lightgrey">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
          <option key={i} value={i}>Node {i}</option>
        ))}
      </Select>
      <Box overflowY="auto" maxHeight="80vh">
        {selectedLogs.map((log, index) => (
          <Flex key={index} direction="column" p={3} borderBottom="1px solid #ddd" onClick={() => toggleLog(startIndex + index)} cursor="pointer">
            <Flex alignItems="center">
              <Text transform={expandedLogIndex === startIndex + index ? 'rotate(90deg)' : 'rotate(0deg)'}>▶</Text>
              <Box ml={2} overflowX="auto">
                {expandedLogIndex === startIndex + index ? formatLogEntry(log, true) : formatLogEntry(log, false)}
              </Box>
            </Flex>
          </Flex>
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
