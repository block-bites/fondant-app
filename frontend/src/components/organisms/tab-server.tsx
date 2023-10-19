import { Flex, Text, Select, Input, Switch, Divider } from "@chakra-ui/react";

export default function ServerTab() {
  return (
    <Flex direction="column" maxW="658px">
      <Text
        fontFamily="secondary"
        fontSize="48px"
        lineHeight="shorter"
        fontWeight="normal"
      >
        Server
      </Text>
      <Flex direction="column" gap="32px" mt="56px">
        <Flex direction="column" gap="32px">
          <Flex direction="column" gap="16px">
            <Select>
              <option value="option1">0.0.0.0</option>
              <option value="option2">192.168.1.1</option>
              <option value="option3">192.168.0.2</option>
            </Select>
            <Text fontSize="xs" color="grey.400" lineHeight="shorter">
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
        <Divider />
        <Flex justifyContent="space-between" gap="32px">
          <Flex direction="column" gap="8px">
            <Text
              fontFamily="secondary"
              color="grey.400"
              lineHeight="tall"
              fontWeight="semibold"
              fontSize="md"
            >
              Automine
            </Text>
            <Switch colorScheme="blue" size="lg" />
          </Flex>
          <Text fontSize="xs" color="grey.400" lineHeight="shorter">
            Process transactions instantaneously.
          </Text>
        </Flex>
        <Flex justifyContent="space-between" gap="32px">
          <Flex direction="column" gap="8px">
            <Text
              fontFamily="secondary"
              color="grey.400"
              lineHeight="tall"
              fontWeight="semibold"
              fontSize="md"
            >
              Error on transaction failure
            </Text>
            <Switch colorScheme="blue" size="lg" />
          </Flex>
          <Text
            fontSize="xs"
            color="grey.400"
            lineHeight="shorter"
            maxW="210px"
          >
            failures wact only all detectable era the statubled, a in action
            transaction receipt. Disabling this feature will make Ganache handle
            transaction failures like other Ethereum clients.
          </Text>
        </Flex>
        <Divider />
        <Flex gap="24px" direction="column">
          <Text
            fontFamily="secondary"
            fontSize="2xl"
            lineHeight="base"
            fontWeight="normal"
          >
            Chain Forking
          </Text>
          <Text
            fontFamily="secondary"
            color="grey.400"
            lineHeight="tall"
            fontWeight="semibold"
            fontSize="md"
          >
            Forking is Disabled
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
