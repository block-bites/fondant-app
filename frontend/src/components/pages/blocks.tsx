import React from "react";
import { Flex, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import BlockRowElement from "../molecules/blocks-row-element";

export default function Blocks() {
  return (
    <>
      <Helmet>
        <title>Fondant | Blocks</title>
      </Helmet>
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
    </>
  );
}
