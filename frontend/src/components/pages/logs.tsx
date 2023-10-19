import { Flex, VStack, Text } from "@chakra-ui/react";

export default function Logs() {
  return (
    <Flex w="100%" justify="center" bg="pri.dark">
      <VStack
        w="100%"
        maxW="1440px"
        gap="0"
        mt="16px"
        mb="16px"
        align="left"
        p="0 32px"
        color="#F9F9F9"
        fontSize="16px"
        lineHeight="170%"
        fontFamily="secondary"
      >
        <Text>[12:37:25] Starting server with initial configuration:</Text>
        <Text>"gasLimit": 6721975,</Text>
        <Text>"gasPrice" :20000000000,</Text>
        <Text>"hardfork": "muirGlacier",</Text>
        <Text>"hostname": "127.0.0.1",</Text>
        <Text>"port": 7545,</Text>
        <Text>"network_id": 5777,</Text>
        <Text>"default_balance_ether": 100,</Text>
        <Text>"total accounts": 10,</Text>
        <Text>"unlocked accounts"</Text>
        <Text>[ì, "locked" : false,</Text>
        <Text>"vmErrorsOnPCResponse":true,</Text>
        <Text>"verbose": false,</Text>
        <Text>
          "db_path":"/Users/janhoffmann/Library/Application
          Support/Fondant/workspaces/Quickstart/chaindata
        </Text>
        <Text>[12:37:25] Fondant started successfully!</Text>
        <Text>[12:37:26] Waiting for requests ...</Text>
        <Text>[12:37:26] eth_subscribe</Text>
        <Text>[12:37:26] eth_getLogs</Text>
        <Text>[12:37:26] eth_subscribe</Text>
        <Text>[12:37:26] eth_subscribe</Text>
        <Text>[12:37:26] eth_getLogs</Text>
        <Text>[12:37:26] eth_subscribe</Text>
        <Text>[12:37: 26 ]</Text>
      </VStack>
    </Flex>
  );
}
