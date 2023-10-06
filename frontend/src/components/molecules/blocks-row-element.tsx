import { Flex, VStack, Text } from "@chakra-ui/react";
import React from "react";

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
      <VStack background="#00800033" p="8px 32px" h="100%">
        <Text>BLOCK</Text>
        <p>0</p>
      </VStack>
      <VStack align="left">
        <p>MINED ON</p>
        <p>2023-09-20 12:37:25</p>
      </VStack>
      <VStack align="left">
        <p>GAS USED</p>
        <p>0</p>
      </VStack>
      <VStack align="left">
        <p>NO TRANSACTION</p>
      </VStack>
    </Flex>
  );
}
