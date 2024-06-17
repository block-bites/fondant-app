import { Flex, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"

interface DeployRowElementProps {
    deploy: any
}

const DeployRowElement: React.FC<DeployRowElementProps> = ({ deploy }) => {
    return (
        <Link to={`${deploy.DeployProcessed.deploy_hash}`}>
            <Flex
                w="100%"
                // h={["120px", "160px", "94px"]}
                borderBottom="1px solid"
                borderBottomColor="grey.100"
                justify="left"
                gap="30px"
                transition={"0.3s"}
                _hover={{ bg: "grey.50" }}
                p={[" 16px 0 0", "0 16px 0 0", "0 16px 0 0", "0 32px 0 0", "16px 32px"]}
            >
                <VStack align="left" w="100%" gap="5px">
                    <Text fontSize="md" color="grey.300" fontWeight={500}>
                        Deploy Hash
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" color="grey.800">
                        {deploy.DeployProcessed.deploy_hash}
                    </Text>
                </VStack>
                <VStack align="left" w="100%" gap="5px">
                    <Text fontSize="md" color="grey.300" fontWeight={500}>
                        Account hash
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" color="grey.800">
                        {deploy.DeployProcessed.account}
                    </Text>
                </VStack>
                <VStack align="left" w="100%" gap="5px">
                    <Text fontSize="md" color="grey.300" fontWeight={500}>
                        Timestamp
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" color="grey.800">
                        {deploy.DeployProcessed.timestamp}
                    </Text>
                </VStack>

                {/* <Flex direction="column">
                    <Text fontSize="md" color="grey.300" fontWeight={500}>
                        Timestamp
                    </Text>
                    <Text fontSize="xl" fontWeight="normal" color="grey.border">
                    </Text>
                </Flex> */}
            </Flex>
        </Link>
    )
}

export default DeployRowElement
