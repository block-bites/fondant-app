import { useSearchContext } from "../../context/SearchContext";

import {
  Box,
  HStack,
  Tab,
  Tabs,
  TabList,
  Flex,
  InputGroup,
  Input,
  Icon,
  InputLeftElement,
  Text,
  Button,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { searchValue, setSearchValue } = useSearchContext();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.trim().toLowerCase());
  };

  return (
    <Flex w="100%" direction="column">
      <HStack w="100%" bg="pri.dark" minH="108px" justify="center">
        <HStack maxW="1440px" w="100%" p="32px" justify="space-between">
          <Tabs variant="line" color="grey.100" size="lg">
            <TabList border="none" gap="32px">
              <Link to="/">
                <Tab>
                  <Icon as={FaBell} size="24px" />
                  Accounts
                </Tab>
              </Link>
              <Link to="/blocks">
                <Tab>
                  <Icon as={FaBell} size="24px" />
                  Blocks
                </Tab>
              </Link>
              <Link to="/deplys">
                <Tab>
                  <Icon as={FaBell} size="24px" />
                  Deploys
                </Tab>
              </Link>
              <Link to="/events">
                <Tab>
                  <Icon as={FaBell} size="24px" />
                  Events
                </Tab>
              </Link>
              <Link to="/logs">
                <Tab>
                  <Icon as={FaBell} size="24px" />
                  Logs
                </Tab>
              </Link>
            </TabList>
          </Tabs>
          <InputGroup w="100%" maxW="340px">
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} size="24px" />
            </InputLeftElement>
            <Input
              variant="outline"
              placeholder="Search by block-hash or block-height"
              size="md"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </HStack>
      </HStack>
      <HStack
        minH="64px"
        w="100%"
        bg="grey.border"
        justify="center"
        color="grey.50"
      >
        <HStack maxW="1440px" w="100%" p="6px 32px" justify="space-between">
          <HStack>
            <Box
              borderRight="1px solid"
              borderRightColor="pri.dark"
              p="8px 24px 8px 0"
            >
              <Text fontSize="10px" color="grey.400">
                CURRENT BLOCK
              </Text>
              <Text fontSize="14px">0</Text>
            </Box>
            <Box
              borderRight="1px solid"
              borderRightColor="pri.dark"
              p="8px 24px"
            >
              <Text fontSize="10px" color="grey.400">
                GAS PRICE
              </Text>
              <Text fontSize="14px">20000000000</Text>
            </Box>
            <Box
              borderRight="1px solid"
              borderRightColor="pri.dark"
              p="8px 24px"
            >
              <Text fontSize="10px" color="grey.400">
                GAS LIMIT
              </Text>
              <Text fontSize="14px">6721975</Text>
            </Box>
            <Box
              borderRight="1px solid"
              borderRightColor="pri.dark"
              p="8px 24px"
            >
              <Text fontSize="10px" color="grey.400">
                HARDFORK MERGE
              </Text>
              <Text fontSize="14px">MERGE</Text>
            </Box>
            <Box
              borderRight="1px solid"
              borderRightColor="pri.dark"
              p="8px 24px"
            >
              <Text fontSize="10px" color="grey.400">
                NETWORK ID
              </Text>
              <Text fontSize="14px">5777</Text>
            </Box>
            <Box
              borderRight="1px solid"
              borderRightColor="pri.dark"
              p="8px 24px"
            >
              <Text fontSize="10px" color="grey.400">
                MINING STATUS
              </Text>
              <Text fontSize="14px">AUTOMINING</Text>
            </Box>
          </HStack>
          <HStack>
            <Box
              borderRight="1px solid"
              borderRightColor="pri.dark"
              p="8px 24px"
            >
              <Text fontSize="10px" color="grey.400">
                CONFIGURATION
              </Text>
              <Text fontSize="14px">QUICKSTART</Text>
            </Box>
            <HStack gap="16px" pl="24px">
              <Button size="sm" bg="pri.orange" color="white">
                Save
              </Button>
              <Button size="sm" leftIcon={<Icon as={FaBell} size="24px" />}>
                Switch
              </Button>
              <Button size="sm" variant="outline" color="white">
                <Icon as={FaBell} size="24px" />
              </Button>
            </HStack>
          </HStack>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Navbar;
