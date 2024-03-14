import { useState, useEffect, ChangeEvent } from "react";
import { Box, Text, Flex, Button, Select, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useNodeContext } from "../../context/NodeContext";
import LogElement from "../molecules/log-element";
//import formatJson from "../atoms/format-json";

interface LogEntry {
  [key: string]: any;
}

const LogsPerPage = 10;
const LogLevels = ["All", "DEBUG", "INFO", "WARN", "ERROR"];

export default function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [currentLevel, setCurrentLevel] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedLogIndex, setExpandedLogIndex] = useState<number | null>(null);
  const { nodeNumber } = useNodeContext();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get<LogEntry[]>(
          `http://localhost:3001/logs/${nodeNumber}`
        );
        setLogs(response.data);
        filterLogs(response.data, currentLevel);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, [nodeNumber, currentLevel]);

  const filterLogs = (logs: LogEntry[], level: string) => {
    const filtered =
      level === "All" ? logs : logs.filter((log) => log.level === level);
    setFilteredLogs(filtered);
  };

  const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentLevel(event.target.value);
    filterLogs(logs, event.target.value);
  };

  const handlePrevPage = () => {
    setCurrentPage((current) => Math.max(current - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((current) =>
      Math.min(current + 1, Math.ceil(logs.length / LogsPerPage))
    );
  };

  const toggleLog = (index: number) => {
    setExpandedLogIndex(expandedLogIndex === index ? null : index);
  };

  const startIndex = (currentPage - 1) * LogsPerPage;
  const selectedLogs = filteredLogs.slice(startIndex, startIndex + LogsPerPage);

  return (
    <Flex width="100%" justify="center" fontFamily="monospace">
      <VStack spacing={4} width="100%" maxW={1440} p={5}>
        <Select
          onChange={handleLevelChange}
          value={currentLevel}
          w="200px"
          mb={3}
        >
          {LogLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </Select>

        <Box
          overflowY="auto"
          w="100%"
          borderWidth="1px"
          borderRadius="lg"
          p={3}
        >
          {selectedLogs.map((log, index) => (
            <LogElement
              log={log}
              key={index}
              index={index}
              toggleLog={toggleLog}
              startIndex={startIndex}
              expandedLogIndex={expandedLogIndex}
              isLastElement={selectedLogs.length === index + 1}
            />
          ))}
        </Box>

        <Flex justifyContent="space-between" mt="10px" w="100%">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Text>Page {currentPage}</Text>
          <Button
            onClick={handleNextPage}
            disabled={currentPage * LogsPerPage >= logs.length}
          >
            Next
          </Button>
        </Flex>
      </VStack>
    </Flex>
  );
}
