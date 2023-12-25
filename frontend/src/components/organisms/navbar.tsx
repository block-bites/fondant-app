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
import {
  CasperServiceByJsonRPC,
  GetBlockResult,
  JsonBlock,
} from "casper-js-sdk";

const Navbar = () => {
  const { searchValue, setSearchValue } = useSearchContext();
  const [currentBlock, setCurrentBlock] = useState<number>(0);
  const [currentNode, setCurrentNode] = useState<number>(1);
  const totalNodes = 10;
  const client = new CasperServiceByJsonRPC(`http://localhost:3001/net/${currentNode}/rpc`);

  const fetchBlocks = async () => {
    try {
      const latestBlockInfo = await client.getLatestBlockInfo(); // Replace with actual method
      if (latestBlockInfo && latestBlockInfo.block) {
        setCurrentBlock(latestBlockInfo.block.header.height);
      }
    } catch (error) {
      console.error("Error fetching latest block info:", error);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, [currentNode]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleNodeChange = (nodeNumber: number) => {
    setCurrentNode(nodeNumber);
  };

  return (
    <Flex w="100%" direction="column">
      <HStack w="100%" bg="pri.dark" minH="108px" justify="center">
        <HStack maxW="1440px" w="100%" p="32px" justify="space-between">
          <Tabs variant="line" color="grey.100" size="lg">
            <TabList border="none" gap={{ "2xl": "32px", xl: "20px", lg: "10px" }}>
              <Link to="/accounts">
                <Tab><Icon as={MdSupervisorAccount} size="24px" />Accounts</Tab>
              </Link>
              <Link to="/blocks">
                <Tab><Icon as={BiGridAlt} size="24px" />Blocks</Tab>
              </Link>
              <Link to="/deploys">
                <Tab><Icon as={MdCloudUpload} size="24px" />Deploys</Tab>
              </Link>
              <Link to="/events">
                <Tab><Icon as={FaBell} size="24px" />Events</Tab>
              </Link>
              <Link to="/logs">
                <Tab><Icon as={FaRegFileCode} size="24px" />Logs</Tab>
              </Link>
            </TabList>
          </Tabs>
          <InputGroup w="100%" maxW="340px">
            <InputLeftElement pointerEvents="none"><Icon as={FiSearch} size="24px" /></InputLeftElement>
            <Input variant="outline" placeholder="Search by block-hash or block-height" size="md" value={searchValue} onChange={handleSearchChange} />
          </InputGroup>
        </HStack>
      </HStack>
      <HStack minH="64px" w="100%" bg="grey.border" justify="center" color="grey.50">
        <HStack maxW="1440px" w="100%" p="6px 32px" justify="space-between">
          <HStack gap="0">
            <Box borderRight="1px solid" borderRightColor="pri.dark" p={{ "2xl": "8px 24px", xl: "8px 20px", lg: "8px 12px", md: "8px 5px" }}>
              <Text fontSize="10px" color="grey.400">CURRENT BLOCK</Text>
              <Text fontSize="14px">{currentBlock}</Text>
            </Box>
            <Box borderRight="1px solid" borderRightColor="pri.dark" p={{ "2xl": "8px 24px", xl: "8px 20px", lg: "8px 12px", md: "8px 5px" }}>
              <Text fontSize="10px" color="grey.400">CURRENT NODE</Text>
              <Text fontSize="14px">{currentNode}</Text>
            </Box>
          </HStack>
          <HStack gap="0">
            <Button size="sm" leftIcon={<Icon as={GoSync} size="24px" />} onClick={() => handleNodeChange((currentNode % totalNodes) + 1)}>
              Switch
            </Button>
            <Link to="/settings">
              <Button size="sm" variant="outline" color="white"><Icon as={BsFillGearFill} size="24px" /></Button>
            </Link>
          </HStack>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Navbar;
