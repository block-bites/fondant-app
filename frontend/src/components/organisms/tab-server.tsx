import { Flex, Text, Select, Input, Switch } from "@chakra-ui/react";

export default function ServerTab() {
  return (
    <Flex direction="column" maxW="658px">
      <Text
        fontFamily="secondary"
        fontSize="48px"
        lineHeight="120%"
        fontWeight="400"
      >
        Server
      </Text>
      <Flex direction="column" gap="32px" mt="56px">
        <Flex direction="column" gap="32px" pb="24px">
          <Flex direction="column" gap="16px">
            <Select>
              <option value="option1">0.0.0.0</option>
              <option value="option2">192.168.1.1</option>
              <option value="option3">192.168.0.2</option>
            </Select>
            <Text fontSize="12px" color="grey.400" lineHeight="120%">
              The server will accept RPC connections on the following host and
              port.
            </Text>
          </Flex>
          <Input
            size="sm"
            placeholder="0.0.0.0"
            variant="filled"
            h="32px"
            p="0 12px"
            _placeholder={{ color: "gray.400", fontSize: "14px" }}
            borderRadius="4px"
          />
          <Input
            size="sm"
            placeholder="0.0.0.0"
            variant="filled"
            h="32px"
            p="0 12px"
            _placeholder={{ color: "gray.400", fontSize: "14px" }}
            borderRadius="4px"
          />
        </Flex>
        <Flex justifyContent="space-between" gap="32px">
          <Flex direction="column" gap="8px">
            <Text
              fontFamily="secondary"
              color="grey.400"
              lineHeight="170%"
              fontWeight="600"
            >
              Automine
            </Text>
            <Switch colorScheme="blue" size="lg" isChecked />
          </Flex>
          <Text fontSize="12px" color="grey.400" lineHeight="120%">
            Process transactions instantaneously.
          </Text>
        </Flex>
        <Flex pb="24px" justifyContent="space-between" gap="32px">
          <Flex direction="column" gap="8px">
            <Text
              fontFamily="secondary"
              color="grey.400"
              lineHeight="170%"
              fontWeight="600"
            >
              Error on transaction failure
            </Text>
            <Switch colorScheme="blue" size="lg" isChecked />
          </Flex>
          <Text fontSize="12px" color="grey.400" lineHeight="120%" maxW="210px">
            failures wact only all detectable era the statubled, a in action
            transaction receipt. Disabling this feature will make Ganache handle
            transaction failures like other Ethereum clients.{" "}
          </Text>
        </Flex>
        <Flex gap="24px" direction="column">
          <Text
            fontFamily="secondary"
            fontSize="24px"
            lineHeight="155%"
            fontWeight="400"
          >
            Chain Forking
          </Text>
          <Text
            fontFamily="secondary"
            color="grey.400"
            lineHeight="170%"
            fontWeight="600"
          >
            Error on transaction failure
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
