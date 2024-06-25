import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { defaultClient } from "../../casper-client"
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import JsonView from "@uiw/react-json-view"
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react"
import { truncateToXSymbols } from "../utils"

interface DeployDetailsProps {
    deploys: any[]
    screenWidth: number
}

const DeployDetails: React.FC<DeployDetailsProps> = ({ deploys, screenWidth }) => {
    const { deployHash } = useParams()
    const [deployInfo, setDeployInfo] = useState<any>()

    const selectedEvent = deploys.filter((e) => e.DeployProcessed.deploy_hash === deployHash)[0]

    const setTruncateLength = () => {
        if (screenWidth <= 480) {
            return 10
        }
        if (screenWidth <= 768) {
            return 15
        }
        return 0
    }

    useEffect(() => {
        const fetchInfo = async () => {
            console.log(deployHash)
            try {
                let info
                if (deployHash) {
                    info = await defaultClient.casperService.getDeployInfo(deployHash)
                    setDeployInfo(info)
                }
            } catch (error) {
                console.error("Error fetching latest block info:", error)
            }
        }
        fetchInfo()
        // eslint-disable-next-line
    }, [])

    if (!deployInfo) {
        return (
            <Flex justifyContent="center" height="calc(100vh - 148px)" alignItems="center">
                <Box overflowY="auto" p={3}>
                    <Flex w="100%" justify="center" mt={["144px", "144px", "0"]}>
                        <Text color="grey.400">No details info available to display</Text>
                    </Flex>
                </Box>
            </Flex>
        )
    }

    return (
        <Flex width="100%" justifyContent="center" mt={["138px", "148px", "80px"]}>
            <VStack w="100%" maxW={1440} p={["8px 16px", "8px 16px", "16px 32px"]}>
                {deployInfo ? (
                    <Box w="full">
                        <VStack gap="8px" align={"left"}>
                            <HStack
                                w="100%"
                                gap="15px"
                                borderBottom="1px solid"
                                borderBottomColor="grey.100"
                                p="8px 0"
                            >
                                <Text fontSize="md" color="grey.300" fontWeight={500} minW="120px">
                                    Timestamp:
                                </Text>
                                <Text fontSize="sm" fontWeight="semibold" color="grey.800">
                                    {deployInfo.deploy.header.timestamp}
                                </Text>
                            </HStack>
                            <HStack
                                w="100%"
                                gap="15px"
                                bgColor={"#ffffff"}
                                borderBottom="1px solid"
                                borderBottomColor="grey.100"
                                p="8px 0"
                            >
                                <Text fontSize="md" color="grey.300" fontWeight={500} minW="120px">
                                    Deploy hash:
                                </Text>
                                <Text fontSize="sm" fontWeight="semibold" color="grey.800">
                                    {deployHash
                                        ? truncateToXSymbols(deployHash, setTruncateLength())
                                        : null}
                                </Text>
                            </HStack>
                            <HStack
                                w="100%"
                                gap="15px"
                                borderBottom="1px solid"
                                borderBottomColor="grey.100"
                                p="8px 0"
                            >
                                <Text fontSize="md" color="grey.300" fontWeight={500} minW="120px">
                                    Account hash:
                                </Text>
                                <Text fontSize="sm" fontWeight="semibold" color="grey.800">
                                    {truncateToXSymbols(
                                        deployInfo.deploy.header.account,
                                        setTruncateLength()
                                    )}
                                </Text>
                            </HStack>
                            <JsonView value={deployInfo} displayDataTypes={false} collapsed={3} />
                        </VStack>
                    </Box>
                ) : null}
                <Accordion allowToggle w="full">
                    <AccordionItem>
                        <AccordionButton w="full" bgColor={"grey.50"}>
                            <Text as="span" flex="1" textAlign="left" fontWeight="semibold">
                                Raw Event
                            </Text>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel p={0}>
                            <Box w="full" p={4} bgColor="#f5f5f5">
                                <JsonView
                                    value={selectedEvent}
                                    displayDataTypes={false}
                                    collapsed={false}
                                />
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </VStack>
        </Flex>
    )
}

export default DeployDetails
