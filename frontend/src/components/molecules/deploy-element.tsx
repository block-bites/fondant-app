import { Box, Flex, Text } from "@chakra-ui/react"
import formatJson from "../atoms/format-json"

interface IDeployElementProps {
    onClick: () => void
    sameIndexes: boolean
    event: any
}

export default function DeployElement({ onClick, sameIndexes, event }: IDeployElementProps) {
    return (
        <Box p={3} borderBottom="1px solid grey" cursor="pointer" onClick={onClick}>
            <Flex alignItems="center">
                <Text transform={sameIndexes ? "rotate(90deg)" : "rotate(0deg)"}>▶</Text>
                <Box ml={2} overflowX="auto">
                    {sameIndexes ? formatJson(event, 0, true) : formatJson(event, 0, false)}
                </Box>
            </Flex>
        </Box>
    )
}
