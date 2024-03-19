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
  const fontSize = {
    base: "1.15vw",
    sm: "1.25vw",
    lg: "1.25vw",
    xl: "1.25vw",
    "2xl": "1.13vw",
  };

  return (
    <Flex
      w="100%"
      h="94px"
      borderBottom="1px solid"
      borderBottomColor="grey.100"
      justify="left"
      align="center"
      p="0 32px 0 0"
    >
      <VStack
        background="#00800033"
        p="8px 32px"
        h="100%"
        justify="center"
        align="center"
      >
        <Text
          fontSize={fontSize}
          lineHeight="tall"
          fontWeight="normal"
          color="grey.border"
        >
          HEIGHT
        </Text>
        <Text
          fontSize={fontSize}
          lineHeight="tall"
          fontWeight="normal"
          color="grey.border"
        >
          {height.toString()}
        </Text>
      </VStack>
      <VStack align="center" minWidth={"6vw"}>
        <Text fontSize={fontSize} fontWeight="normal">
          ERA
        </Text>
        <Text fontSize={fontSize} fontWeight="semibold">
          {era.toString()}
        </Text>
      </VStack>
      <VStack align="center" minWidth={"9.5vw"}>
        <Text fontSize={fontSize} fontWeight="normal">
          DEPLOYS
        </Text>
        <Text fontSize={fontSize} fontWeight="semibold">
          {deploys.toString()}
        </Text>
      </VStack>
      <VStack align="left" minWidth={"20vw"}>
        <Text fontSize={fontSize} fontWeight="normal">
          AGE
        </Text>
        <Text fontSize={fontSize} fontWeight="semibold">
          {age}
        </Text>
      </VStack>
      <VStack align="right" width={"100%"}>
        <Text fontSize={fontSize} fontWeight="normal" align="left">
          BLOCK HASH
        </Text>
        <Text fontSize={fontSize} fontWeight="semibold" align="left">
          {blockHash}
        </Text>
      </VStack>
    </Flex>
  );
}
