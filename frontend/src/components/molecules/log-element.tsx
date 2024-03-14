import React, { useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import formatJson from "../atoms/format-json";

interface ILogElementProps {
  toggleLog: (index: number) => void;
  log: { [key: string]: any };
  startIndex: number;
  index: number;
  expandedLogIndex: number | null;
  isLastElement: boolean;
}

export default function LogElement({
  toggleLog,
  log,
  startIndex,
  index,
  expandedLogIndex,
  isLastElement,
}: ILogElementProps) {
  return (
    <Flex
      key={index}
      direction="column"
      p={3}
      borderBottom={isLastElement ? "none" : "1px solid #ddd"}
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
  );
}
