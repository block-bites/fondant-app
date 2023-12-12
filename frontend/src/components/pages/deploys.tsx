import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/layout";
import axios from "axios";

// Replace this with the actual type structure if known
type Deploy = any;

export default function Deploys() {
  const [deploys, setDeploys] = useState<Deploy[]>([]);
  const nodeNumber = 0; // Replace with the appropriate node number

  useEffect(() => {
    const fetchDeploys = async () => {
      try {
        const response = await axios.get(`/cache/deploys/${nodeNumber}`);
        setDeploys(response.data);
      } catch (error) {
        console.error("Error fetching deploys:", error);
      }
    };

    fetchDeploys();
  }, [nodeNumber]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="calc(100vh - 180px)"
      fontSize="4xl"
      fontWeight="normal"
    >
      {deploys && deploys.length > 0 ? (
        deploys.map((deploy: Deploy, index: number) => (
          <Text key={index} color="grey.100">{JSON.stringify(deploy)}</Text>
        ))
      ) : (
        <Text color="grey.100">No deploys yet</Text>
      )}
    </Flex>
  );
}
