import { useState, useEffect, ChangeEvent } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import axios from "axios";
import { useNodeContext } from "../../context/NodeContext";
import formatJson from "../atoms/format-json";

interface LogEntry {
  [key: string]: any;
}

const LogsPerPage = 10;

export default function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
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
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, [nodeNumber]);

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
  const selectedLogs = logs.slice(startIndex, startIndex + LogsPerPage);

  return (
    <Flex width="100%" justify={"center"}>
      <Flex direction="column" width="100%" maxW={1440}>
        <Box overflowY="auto">
          {selectedLogs.map((log, index) => (
            <Flex
              key={index}
              direction="column"
              p={3}
              borderBottom="1px solid #ddd"
              onClick={() => toggleLog(startIndex + index)}
              cursor="pointer"
            >
              <Flex alignItems="center">
                <Text
                  transform={
                    expandedLogIndex === startIndex + index
                      ? "rotate(90deg)"
                      : "rotate(0deg)"
                  }
                >
                  ▶
                </Text>
                <Box ml={2} overflowX="auto">
                  {expandedLogIndex === startIndex + index
                    ? formatJson(log, 0, true)
                    : formatJson(log, 0, false)}
                </Box>
              </Flex>
            </Flex>
          ))}
        </Box>
        <Flex justifyContent="space-between" mt="10px">
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
      </Flex>
    </Flex>
  );
}
