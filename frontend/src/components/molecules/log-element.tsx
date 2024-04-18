import { Flex, Text, Box } from "@chakra-ui/react"
import formatJson from "../atoms/format-json"

interface ILogElementProps {
    onClick: () => void
    log: { [key: string]: any }
    isLastElement: boolean
    sameIndexes: boolean
}

export default function LogElement({ onClick, log, isLastElement, sameIndexes }: ILogElementProps) {
    return (
        <Flex
            direction="column"
            p={3}
            borderBottom={isLastElement ? "none" : "1px solid #ddd"}
            onClick={onClick}
            cursor="pointer"
        >
            <Flex alignItems="center">
                <Text transform={sameIndexes ? "rotate(90deg)" : "rotate(0deg)"}>▶</Text>
                <Box ml={2} overflowX="auto">
                    {sameIndexes ? formatJson(log, 0, true) : formatJson(log, 0, false)}
                </Box>
            </Flex>
        </Flex>
    )
}
