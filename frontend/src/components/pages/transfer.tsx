import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Flex, VStack, Box, Text, Input, Button } from '@chakra-ui/react';
import { CasperClient, CLPublicKey, DeployUtil, Keys } from 'casper-js-sdk';
import axios from 'axios';

const Transfer = () => {
  const RPC_API = "http://localhost:3001/net/1/rpc";
  const STATUS_API = "http://159.65.203.12:8888";

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');

  const sendTransfer = async () => {
    // Placeholder for networkName and keys (simulation)
    const networkName = "casper-test"; // This should be fetched from STATUS_API
    const senderPublicKey = from; // Simulate public key
    const recieverPublicKey = to; // Simulate public key

    const casperClient = new CasperClient(RPC_API);

    // Placeholder for key pair
    const signKeyPair = {
      publicKey: senderPublicKey,
      privateKey: 'simulated-private-key', 
    };

    const paymentAmount = 100000000;
    const gasPrice = 1;
    const ttl = 1800000;

    let deployParams = new DeployUtil.DeployParams(senderPublicKey, networkName, gasPrice, ttl);
    const toPublicKey = CLPublicKey.fromHex(recieverPublicKey);
    const session = DeployUtil.ExecutableDeployItem.newTransfer(amount, toPublicKey, null);
    const payment = DeployUtil.standardPayment(paymentAmount);
    const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
    const signedDeploy = DeployUtil.signDeploy(deploy, signKeyPair);

    try {
      const deployHash = await casperClient.putDeploy(signedDeploy);
      console.log("Deploy Hash:", deployHash);
    } catch (error) {
      console.error("Error sending transfer:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Fondant | Transfer</title>
      </Helmet>
      <Flex w="100%" justify="center">
        <VStack w="100%" maxW="1440px" gap="0" mt="16px">
          <Box borderRight="1px solid" borderColor="#2a3050" p="8px 20

px 8px 0px">
<Text fontSize="10px" color="grey.400" fontWeight="semibold">
Transfer Details
</Text>
<Input
placeholder="Sender Public Key"
value={from}
onChange={(e) => setFrom(e.target.value)}
/>
<Input
placeholder="Recipient Public Key"
value={to}
onChange={(e) => setTo(e.target.value)}
/>
<Input
placeholder="Amount"
type="number"
value={amount}
onChange={(e) => setAmount(e.target.value)}
/>
<Button
           mt="20px"
           colorScheme="blue"
           onClick={sendTransfer}
         >
Send Transfer
</Button>
</Box>
</VStack>
</Flex>
</>
);
};