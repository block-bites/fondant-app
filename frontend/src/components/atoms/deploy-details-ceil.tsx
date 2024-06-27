import { HStack, Text } from "@chakra-ui/react"
import React from "react"

interface DeployDetailsCeilProps {
    title: string
    value: string
}

const DeployDetailsCeil: React.FC<DeployDetailsCeilProps> = ({ title, value }) => {
    return (
        <HStack w="100%" gap="15px" borderBottom="1px solid" borderBottomColor="grey.100" p="8px">
            <Text fontSize="md" color="grey.300" fontWeight={500} minW="120px">
                {title}
            </Text>
            <Text fontSize="sm" fontWeight="semibold" color="grey.800">
                {value}
            </Text>
        </HStack>
    )
}

export default DeployDetailsCeil
