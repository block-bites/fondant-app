import React, { useState, useEffect } from "react";
import { Flex, VStack, Text, Button } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import BlockRowElement from "../molecules/blocks-row-element";
import {
  CasperServiceByJsonRPC,
  GetBlockResult,
  JsonBlock,
} from "casper-js-sdk";

export default function Blocks() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const DISPLAY_PER_PAGE = 10;

  useEffect(() => {
    const client = new CasperServiceByJsonRPC(
      "http://localhost:3000/net/1/rpc"
    );

    const fetchBlocks = async () => {
      try {
        const latestBlockInfo = await client.getLatestBlockInfo();
        if (latestBlockInfo && latestBlockInfo.block) {
          const currentHeight = latestBlockInfo.block.header.height;
          const blockHeights = Array.from(
            { length: DISPLAY_PER_PAGE },
            (_, i) => currentHeight - i - currentPage * DISPLAY_PER_PAGE
          );

          const blockInfoPromises = blockHeights.map((height) =>
            client.getBlockInfoByHeight(height)
          );
          const blockInfos: GetBlockResult[] = await Promise.all(
            blockInfoPromises
          );
          const newBlocks = blockInfos
            .map((blockInfo) => blockInfo.block)
            .filter((block): block is JsonBlock => block !== null);
          setBlocks(newBlocks);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, [currentPage]);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (loading) {
    return <Text>Loading blocks...</Text>;
  }

  if (error) {
    return <Text>Error fetching blocks: {error}</Text>;
  }

  return (
    <>
      <Helmet>
        <title>Fondant | Blocks</title>
      </Helmet>
      <Flex w="100%" justify="center">
        <VStack w="100%" maxW="1440px" gap="0">
          {blocks.map((block) => (
            <BlockRowElement
              key={block.hash} // Add a key for React list rendering
              height={block.header.height}
              era={block.header.era_id}
              deploys={block.body.deploy_hashes.length}
              age={block.header.timestamp}
              blockHash={block.hash}
            />
          ))}
        </VStack>
      </Flex>
      <Flex justify="center" mt="4">
        <Button onClick={handlePrevious} isDisabled={currentPage === 0}>
          Previous
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </Flex>
    </>
  );
}
