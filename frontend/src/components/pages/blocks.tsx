import React from "react";
import { Flex, VStack } from "@chakra-ui/react";

import BlockRowElement from "../molecules/blocks-row-element";

export default function Blocks() {
  return (
    <Flex w="100%" justify="center">
      <VStack w="100%" maxW="1440px" gap="0">
        <BlockRowElement />
        <BlockRowElement />
        <BlockRowElement />
        <BlockRowElement />
        <BlockRowElement />
        <BlockRowElement />
        <BlockRowElement />
        <BlockRowElement />
        <BlockRowElement />
        <BlockRowElement />
        <BlockRowElement />
        <BlockRowElement />
        <BlockRowElement />
        <BlockRowElement />
        <BlockRowElement />
      </VStack>
    </Flex>
  );
}
