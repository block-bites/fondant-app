import { useEffect, useState } from 'react';
import { Flex, VStack, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

export default function Logs() {
const [logData, setLogData] = useState(null);

    useEffect(() => {
    fetch('http://localhost:3001/logs/1')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setLogData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
    <>
      <Helmet>
        <title>Fondant | Logs</title>
      </Helmet>
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
          fontSize="md"
          lineHeight="tall"
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
    </>
  );
}
