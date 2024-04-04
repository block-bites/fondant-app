import React, { useState, useEffect } from "react"
import { Flex, VStack, Text, Button, Spinner, Box } from "@chakra-ui/react"
import { Helmet } from "react-helmet-async"
import BlockRowElement from "../molecules/blocks-row-element"
import { CasperServiceByJsonRPC, GetBlockResult, JsonBlock } from "casper-js-sdk"

const Blocks = () => {
    const [blocks, setBlocks] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isLastPage, setIsLastPage] = useState<boolean>(false)

    const DISPLAY_PER_PAGE = 10

    useEffect(() => {
        const client = new CasperServiceByJsonRPC("http://localhost/node-1/rpc")

        const fetchBlocks = async () => {
            setLoading(true)
            setError(null)
            try {
                let latestBlockInfo
                try {
                    latestBlockInfo = await client.getLatestBlockInfo()
                } catch (error) {
                    console.error("Error fetching latest block info:", error)
                    setBlocks([])
                    setIsLastPage(true)
                    return
                }

                if (!latestBlockInfo || !latestBlockInfo.block) {
                    setBlocks([])
                    setIsLastPage(true)
                    return
                }

                const currentHeight = latestBlockInfo.block.header.height

                const blockHeights = []
                for (let i = 0; i < DISPLAY_PER_PAGE; i++) {
                    const height = currentHeight - i - (currentPage - 1) * DISPLAY_PER_PAGE
                    if (height >= 0) {
                        blockHeights.push(height)
                    }
                }

                if (blockHeights.length === 0) {
                    setBlocks([])
                    setIsLastPage(true)
                    return
                } else {
                    setIsLastPage(false)
                }

                const blockInfoPromises = blockHeights.map((height) =>
                    client.getBlockInfoByHeight(height)
                )
                const blockInfos: GetBlockResult[] = await Promise.all(blockInfoPromises)
                const newBlocks = blockInfos
                    .map((blockInfo) => blockInfo.block)
                    .filter((block): block is JsonBlock => block !== null)

                setBlocks(newBlocks)
                setIsLastPage(newBlocks.length < DISPLAY_PER_PAGE)
            } catch (err) {
                console.error("Error in fetchBlocks:", err)
                setError(err instanceof Error ? err.message : String(err))
            } finally {
                setLoading(false)
            }
        }

        fetchBlocks()
    }, [currentPage])

    const handlePrevious = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    }

    const handleNext = () => {
        if (!isLastPage) {
            setCurrentPage((prevPage) => prevPage + 1)
        }
    }

    if (loading) {
        return (
            <Flex
                justifyContent="center"
                height="100vh"
                alignItems="center"
                m={["68px 0 0 0", "-68px 0 0 0"]}
            >
                <Spinner size="xl" colorScheme="gray" />
            </Flex>
        )
    }

    if (error) {
        return (
            <Flex w="100%" justify="center" color="grey.400" pt="100px">
                <Text>Error fetching blocks: {error}</Text>
            </Flex>
        )
    }

    if (blocks.length === 0 && !loading) {
        return (
            <Flex justifyContent="center" height="100vh" alignItems="center">
                <Box overflowY="auto" p={3}>
                    <Flex w="100%" justify="center" mt={["144px", "144px", "0"]}>
                        <Text color="grey.400">No blocks available to display</Text>
                    </Flex>
                </Box>
            </Flex>
        )
    }

    return (
        <>
            <Helmet>
                <title>Fondant | Blocks</title>
            </Helmet>
            <Flex w="100%" justify="center" m={["140px 0 0 0", "140px 0 0 0", "80px 0 0 0"]}>
                <VStack w="100%" maxW="1440px" gap="0">
                    {blocks.map((block) => (
                        <BlockRowElement
                            key={block.hash}
                            height={block.header.height}
                            era={block.header.era_id}
                            deploys={block.body.deploy_hashes.length}
                            age={block.header.timestamp}
                            blockHash={block.hash}
                        />
                    ))}
                </VStack>
            </Flex>
            <Flex justify="center" mt="4" mb="5" gap="15px">
                <Button onClick={handlePrevious} isDisabled={currentPage === 1} w="90px">
                    Previous
                </Button>
                <Button onClick={handleNext} isDisabled={isLastPage} w="90px">
                    Next
                </Button>
            </Flex>
        </>
    )
}

export default Blocks
