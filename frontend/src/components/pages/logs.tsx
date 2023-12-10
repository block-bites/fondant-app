import { useEffect, useState } from "react";
import { Flex, VStack, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

// Define a type for the log entry
type LogEntry = {
  timestamp: string;
  level: string;
  fields: {
    message: string;
    error?: string;
    path?: string;
  };
  target: string;
};

export default function Logs() {
  const [logData, setLogData] = useState<any[]>([]);

  const parseMalformedJson = (text: string) => {
    // Correct the boundaries between JSON objects by inserting commas
    const correctedText = text.replace(/}\s*{/g, "},{");

    // Add square brackets to make it a valid JSON array
    const jsonArrayString = `[${correctedText}]`;

    // Parse the JSON array string
    return JSON.parse(jsonArrayString);
  };

  useEffect(() => {
    fetch("http://localhost:3000/logs/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        try {
          const data = parseMalformedJson(text);
          setLogData(data);
        } catch (error) {
          console.error("Error parsing malformed JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Fondant | Logs</title>
      </Helmet>
      <Flex w="100%" justify="center" bg="pri.dark">
        <VStack
          w="100%"
          maxW="1440px"
          gap="0"
          mt="16px"
          mb="16px"
          align="left"
          p="0 32px"
          color="#F9F9F9"
          fontSize="md"
          lineHeight="tall"
          fontFamily="secondary"
        >
          {logData.slice(0, 100).map((log, index) => (
            <Text key={index}>
              {log.timestamp} [{log.level}] {log.fields.message}
            </Text>
          ))}
        </VStack>
      </Flex>
    </>
  );
}
