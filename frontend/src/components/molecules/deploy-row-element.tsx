import { Flex, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"
import { truncateToXSymbols } from "../utils"

interface DeployRowElementProps {
    deploy: any
    screenWidth: number
}

const DeployRowElement: React.FC<DeployRowElementProps> = ({ deploy, screenWidth }) => {
    const setTruncateLength = () => {
        if (screenWidth <= 680) {
            return 5
        }
        if (screenWidth <= 940) {
            return 10
        }
        if (screenWidth <= 1200) {
            return 15
        }
        return 20
    }

    return (
        <Link to={`${deploy.DeployProcessed.deploy_hash}`}>
            <Flex
                w="100%"
                // h={["120px", "160px", "94px"]}
                borderBottom="1px solid"
                borderBottomColor="grey.100"
                justify="left"
                gap="10px"
                transition={"0.3s"}
                _hover={{ bg: "grey.50" }}
                p={["12px 24px", "12px 24px", "12px 24px", "16px 32px", "16px 32px"]}
                // flexDirection={"column"}
            >
                <VStack align="left" w="100%" gap="5px">
                    <Text fontSize="md" color="grey.300" fontWeight={500}>
                        Deploy Hash
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" color="grey.800">
                        {truncateToXSymbols(
                            deploy.DeployProcessed.deploy_hash,
                            setTruncateLength()
                        )}
                    </Text>
                </VStack>
                <VStack align="left" w="100%" gap="5px">
                    <Text fontSize="md" color="grey.300" fontWeight={500}>
                        Account hash
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" color="grey.800">
                        {truncateToXSymbols(deploy.DeployProcessed.account, setTruncateLength())}
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
            </Flex>
        </Link>
    )
}

export default DeployRowElement
