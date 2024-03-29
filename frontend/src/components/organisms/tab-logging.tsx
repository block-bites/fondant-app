import { Flex, Text, Switch } from "@chakra-ui/react"

export default function LoggingTab() {
    return (
        <Flex maxW="910px" gap="56px" direction="column">
            <Text fontFamily="secondary" fontSize="5xl" lineHeight="shorter" fontWeight="normal">
                Logging
            </Text>
            <Flex direction="column" gap="32px">
                <Flex alignItems="flex-start">
                    <Flex w="450px" direction="column" gap="8px">
                        <Text color="grey.400" fontWeight={"semibold"} size="4">
                            Output Logs to file
                        </Text>
                        <Switch colorScheme="blue" size="lg" />
                    </Flex>
                    <Text fontSize="sm" color="grey.400">
                        Save Logs to file
                    </Text>
                </Flex>
                <Flex alignItems="flex-start">
                    <Flex w="450px" direction="column" gap="8px">
                        <Text color="grey.400" fontWeight={"semibold"} size="4">
                            Verbose Logs
                        </Text>
                        <Switch colorScheme="blue" size="lg" />
                    </Flex>
                    <Text fontSize="sm" color="grey.400">
                        Increase the log output
                    </Text>
                </Flex>
            </Flex>
            <Flex direction="column" gap="24px">
                <Text fontSize="xl" fontWeight="normal">
                    Analytics
                </Text>
                <Flex alignItems="flex-start">
                    <Flex w="450px" direction="column" gap="8px">
                        <Text color="grey.400" fontWeight="semibold" size="4">
                            Google Analytics
                        </Text>
                        <Switch colorScheme="blue" size="lg" />
                    </Flex>
                    <Text fontSize="sm" w="450px" color="grey.400">
                        We use Google Analytics to track Fondant usage. This information tracking 15
                        anymous. get o not track chsons ty da ntifiable information, account data or
                        private keys. Note: This setting is global and will persist between
                        workspaces.
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}
