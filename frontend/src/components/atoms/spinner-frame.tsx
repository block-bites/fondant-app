import { Flex, Spinner } from "@chakra-ui/react"

const SpinnerFrame = () => {
    return (
        <Flex
            justifyContent="center"
            height="calc(100vh - 148px)"
            alignItems="center"
            m={["68px 0 0 0", "68px 0 0 0", "0"]}
        >
            <Spinner size="xl" colorScheme="gray" />
        </Flex>
    )
}

export default SpinnerFrame
