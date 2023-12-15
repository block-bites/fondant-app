import React from "react";
import { Flex, VStack, Text } from "@chakra-ui/react";

interface BlockRowElementProps {
  height: number;
  era: number;
  deploys: number;
  age: string;
  blockHash: string;
}

export default function BlockRowElement({
  height,
  era,
  deploys,
  age,
  blockHash,
}: BlockRowElementProps) {
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
          fontSize="lg"
          lineHeight="tall"
          fontWeight="normal"
          color="grey.border"
        >
          HEIGHT
        </Text>
        <Text
          fontSize="lg"
          lineHeight="tall"
          fontWeight="normal"
          color="grey.border"
        >
          {height.toString()}
        </Text>
      </VStack>
      <VStack align="left">
        <Text fontSize="lg" fontWeight="normal">
          ERA
        </Text>
        <Text fontSize="lg" fontWeight="semibold">
          {era.toString()}
        </Text>
      </VStack>
      <VStack align="left">
        <Text fontSize="lg" fontWeight="normal">
          DEPLOYS
        </Text>
        <Text fontSize="lg" fontWeight="semibold">
          {deploys.toString()}
        </Text>
      </VStack>
      <VStack align="left">
        <Text fontSize="lg" fontWeight="normal">
          AGE
        </Text>
        <Text fontSize="lg" fontWeight="semibold">
          {age}
        </Text>
      </VStack>
      <VStack align="left">
        <Text fontSize="lg" fontWeight="normal">
          BLOCK HASH
        </Text>
        <Text fontSize="lg" fontWeight="semibold">
          {blockHash}
        </Text>
      </VStack>
    </Flex>
  );
}
