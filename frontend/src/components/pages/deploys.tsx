import { useEffect, useState } from "react"
import { Flex, Text, Box, VStack, Button } from "@chakra-ui/react"
import axios from "axios"
import { useNodeContext } from "../../context/NodeContext"
import SpinnerFrame from "../atoms/spinner-frame"
import DeployRowElement from "../molecules/deploy-row-element"

const DeploysPerPage = 10

interface DeploysProps {
    deploys: any[]
    setDeploys: React.Dispatch<React.SetStateAction<any[]>>
}

const Deploys: React.FC<DeploysProps> = ({ setDeploys, deploys }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { nodeNumber } = useNodeContext() // Use nodeNumber from context
    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`http://localhost:3001/cache/events/${nodeNumber}`)
                const historicalDeploys = response.data
                    .filter((e: any) => e.includes("DeployProcessed")) // TODO support for "Failure" deploys
                    .map((event: string) => {
                        try {
                            const json = JSON.parse(event)
                            return json
                        } catch {
                            return null
                        }
                    })
                    .filter((e: any) => !!e)
                    .reverse()
                setDeploys(historicalDeploys)
            } catch (error) {
                console.error("Error fetching historical deploys:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchEvents()
        // eslint-disable-next-line
    }, [nodeNumber])

    const startIndex = (currentPage - 1) * DeploysPerPage
    const selectedDeploys = deploys.slice(startIndex, startIndex + DeploysPerPage)

    const handlePrevPage = () => {
        setCurrentPage((current) => Math.max(current - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((current) =>
            Math.min(current + 1, Math.ceil(deploys.length / DeploysPerPage))
        )
    }

    if (isLoading) return <SpinnerFrame />

    if (deploys?.length === 0) {
        return (
            <Flex justifyContent="center" height="calc(100vh - 148px)" alignItems="center">
                <Box overflowY="auto" p={3}>
                    <Flex w="100%" justify="center" mt={["144px", "144px", "0"]}>
                        <Text color="grey.400">No deploys available to display</Text>
                    </Flex>
                </Box>
            </Flex>
        )
    }

    return (
        <Flex
            direction="column"
            width="100%"
            alignItems="center"
            m={["138px 0 0 0", "148px 0 0 0", "80px 0 0 0"]}
        >
            <VStack spacing={4} width="100%" maxW={1440}>
                <Box overflowY="auto" w="100%">
                    {selectedDeploys.map((deploy, index) => (
                        <DeployRowElement deploy={deploy} key={index} />
                    ))}
                </Box>

                {deploys.length > DeploysPerPage ? (
                    <Flex
                        justifyContent="space-between"
                        mt="10px"
                        w="100%"
                        alignItems="center"
                        p={5}
                    >
                        <Button onClick={handlePrevPage} isDisabled={currentPage === 1}>
                            Previous
                        </Button>
                        <Text fontFamily="secondary">
                            Page {currentPage} of{" "}
                            {Math.ceil(selectedDeploys.length / DeploysPerPage)}
                        </Text>
                        <Button
                            onClick={handleNextPage}
                            isDisabled={currentPage * DeploysPerPage >= selectedDeploys.length}
                        >
                            Next
                        </Button>
                    </Flex>
                ) : null}
            </VStack>
        </Flex>
    )
}

export default Deploys
