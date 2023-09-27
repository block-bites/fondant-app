import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";

const AccountRowElement = () => {
  return (
    <Flex
      w="100%"
      p="16px 32px"
      justify="space-between"
      borderBottom="1px solid"
      borderBottomColor="red"
    >
      <VStack align="left">
        <Text fontSize="16px">Address</Text>
        <Text fontSize="18px">0xAf3A84BACF2B705ea05a1197Cf87EF679eB7Ed3F</Text>
      </VStack>
      <VStack align="left">
        <Text fontSize="16px">Balance</Text>
        <Text fontSize="18px">100.00</Text>
      </VStack>
      <HStack>
        <VStack align="left">
          <Text fontSize="16px">TX Count</Text>
          <Text fontSize="18px">0</Text>
        </VStack>
        <VStack align="left">
          <Text fontSize="16px">Index</Text>
          <Text fontSize="18px">5</Text>
        </VStack>
        <VStack align="left">
          <Text fontSize="16px">Balance</Text>
          <Text fontSize="18px">100.00</Text>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default AccountRowElement;
