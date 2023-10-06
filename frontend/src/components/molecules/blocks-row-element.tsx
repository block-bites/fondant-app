import React from "react";
import { Flex, VStack, Text } from "@chakra-ui/react";

export default function BlockRowElement() {
  return (
    <Flex
      w="100%"
      h="94px"
      borderBottom="1px solid"
      borderBottomColor="grey.100"
      justify="space-between"
      align="center"
      p="0 32px 0 0"
    >
      <VStack background="#00800033" p="8px 32px" h="100%" justify="center">
        <Text
          fontSize="18px"
          lineHeight="170%"
          fontWeight="400"
          color="grey.border"
        >
          BLOCK
        </Text>
        <Text
          fontSize="18px"
          lineHeight="170%"
          fontWeight="400"
          color="grey.border"
        >
          0
        </Text>
      </VStack>
      <VStack align="left">
        <Text fontSize="18px" fontWeight="400">
          MINED ON
        </Text>
        <Text fontSize="18px" fontWeight="600">
          2023-09-20 12:37:25
        </Text>
      </VStack>
      <VStack align="left">
        <Text fontSize="18px" fontWeight="400">
          GAS USED
        </Text>
        <Text fontSize="18px" fontWeight="600">
          0
        </Text>
      </VStack>
      <VStack align="left">
        <Text fontSize="18px" fontWeight="400" color="grey.400">
          NO TRANSACTION
        </Text>
      </VStack>
    </Flex>
  );
}
