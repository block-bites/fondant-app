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
          fontSize="lg"
          lineHeight="tall"
          fontWeight="normal"
          color="grey.border"
        >
          BLOCK
        </Text>
        <Text
          fontSize="lg"
          lineHeight="tall"
          fontWeight="normal"
          color="grey.border"
        >
          0
        </Text>
      </VStack>
      <VStack align="left">
        <Text fontSize="lg" fontWeight="normal">
          MINED ON
        </Text>
        <Text fontSize="lg" fontWeight="semibold">
          2023-09-20 12:37:25
        </Text>
      </VStack>
      <VStack align="left">
        <Text fontSize="lg" fontWeight="normal">
          GAS USED
        </Text>
        <Text fontSize="lg" fontWeight="semibold">
          0
        </Text>
      </VStack>
      <VStack align="left">
        <Text fontSize="lg" fontWeight="normal" color="grey.400">
          NO TRANSACTION
        </Text>
      </VStack>
    </Flex>
  );
}
