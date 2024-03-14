import { Box, Flex, Text } from "@chakra-ui/react";
import formatJson from "../atoms/format-json";

interface IEventElementProps {
  toggleEvent: (index: number) => void;
  index: number;
  expandedEventIndex: number | null;
  event: any;
}

export default function EventElement({
  toggleEvent,
  index,
  expandedEventIndex,
  event,
}: IEventElementProps) {
  return (
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
            expandedEventIndex === index ? "rotate(90deg)" : "rotate(0deg)"
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
  );
}
