import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {
  Box, HStack, Tab, Tabs, TabList, Flex,
  InputGroup, Input, Icon, InputLeftElement,
  Text, Button
} from "@chakra-ui/react";
import { FaBell, FaRegFileCode } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BiGridAlt } from "react-icons/bi";
import { MdCloudUpload, MdSupervisorAccount } from "react-icons/md";
import { BsFillGearFill } from "react-icons/bs";
import { GoSync } from "react-icons/go";
import { useSearchContext } from "../../context/SearchContext";
import { useNodeContext } from '../../context/NodeContext';
import { CasperServiceByJsonRPC } from "casper-js-sdk";

const Navbar = () => {
  const { searchValue, setSearchValue } = useSearchContext();
  const { nodeNumber, setNodeNumber } = useNodeContext();
  const [currentBlock, setCurrentBlock] = useState<number>(0);
  const client = new CasperServiceByJsonRPC(`http://localhost:3001/net/${nodeNumber}/rpc`);

  const fetchBlocks = async () => {
    try {
      const latestBlockInfo = await client.getLatestBlockInfo();
      if (latestBlockInfo && latestBlockInfo.block) {
        setCurrentBlock(latestBlockInfo.block.header.height);
      }
    } catch (error) {
      console.error("Error fetching latest block info:", error);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, [nodeNumber]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleNodeChange = () => {
    const newNodeNumber = (nodeNumber % 10) + 1;
    setNodeNumber(newNodeNumber);
  };

return (
  <Flex w="100%" direction="column">
    <HStack w="100%" bg="#181D40" minH="108px" justify="center">
      <HStack maxW="1440px" w="100%" p="32px" justify="center">
        <Tabs variant="line" color="#ff0012" size="lg">
          <TabList border="none" gap={{ "2xl": "32px", xl: "20px", lg: "16px", md: "12px" }}>
            <Link to="/accounts">
              <Tab><Icon as={MdSupervisorAccount} size="24px" color="white" />Accounts</Tab>
            </Link>
            <Link to="/blocks">
              <Tab><Icon as={BiGridAlt} size="24px" color="white" />Blocks</Tab>
            </Link>
            <Link to="/deploys">
              <Tab><Icon as={MdCloudUpload} size="24px" color="white" />Deploys</Tab>
            </Link>
            <Link to="/events">
              <Tab><Icon as={FaBell} size="24px" color="white" />Events</Tab>
            </Link>
            <Link to="/logs">
              <Tab><Icon as={FaRegFileCode} size="24px" color="white" />Logs</Tab>
            </Link>
          </TabList>
        </Tabs>
      </HStack>
    </HStack>
    <HStack minH="64px" w="100%" bg="#5C6D70" justify="center" color="#ff0012">
      <HStack maxW="1440px" w="100%" p="16px 32px" justify="space-between">
        <HStack gap="16px">
          <Box borderRight="1px solid" borderColor="#2a3050" p={{ "2xl": "8px 24px", xl: "8px 20px", lg: "8px 16px", md: "8px 12px" }}>
            <Text fontSize="10px" color="white">CURRENT BLOCK</Text>
            <Text fontSize="14px" color="white">{currentBlock}</Text>
          </Box>
          <Box borderRight="1px solid" borderColor="#2a3050" p={{ "2xl": "8px 24px", xl: "8px 20px", lg: "8px 16px", md: "8px 12px" }}>
            <Text fontSize="10px" color="white">CURRENT NODE</Text>
            <Text fontSize="14px" color="white">{nodeNumber}</Text>
          </Box>
        </HStack>
        <HStack gap="16px">
          <Button size="sm" colorScheme="red" leftIcon={<Icon as={GoSync} size="24px" color="white" />} onClick={() => handleNodeChange()}>
            Switch
          </Button>
          <Link to="/settings">
            <Button size="sm" variant="outline" colorScheme="white"><Icon as={BsFillGearFill} size="24px" color="white" /></Button>
          </Link>
        </HStack>
      </HStack>
    </HStack>
  </Flex>
);

};

export default Navbar;
