import { Button, Flex, Input, Text, Textarea } from "@chakra-ui/react";

export default function WorkspaceTab() {
  return (
    <Flex direction="column" maxW="654px">
      <Text
        fontFamily="secondary"
        fontSize="5xl"
        lineHeight="shorter"
        fontWeight="normal"
      >
        Workspace
      </Text>
      <Input
        size="sm"
        placeholder="Workspace name"
        mt="56px"
        variant="filled"
        h="32px"
        p="0 12px"
        _placeholder={{ color: "gray.400", fontSize: "14px" }}
        borderRadius="4px"
      />
      <Text fontSize="xs" color="grey.400" mt="16px" lineHeight="shorter">
        A friendly name for this workspace.
      </Text>
      <Textarea
        borderRadius="4px"
        variant="filled"
        h="154px"
        placeholder="Fondant Project"
        p="8px 12px"
        mt="32px"
        _placeholder={{ color: "gray.400", fontSize: "sm" }}
      />
      <Text fontSize="xs" color="grey.400" mt="16px" lineHeight="shorter">
        Link Truffle projects to this workspace by adding their
        truffle-config.js or truffle.js file to this workspace. This will show
        useful contract and event data to better understand what's going on
        under the hood.
      </Text>
      <Flex mt="56px" gap="24px">
        <Button colorScheme="red">Add Project</Button>
        <Button color="grey.400">Remove Project</Button>
      </Flex>
    </Flex>
  );
}
