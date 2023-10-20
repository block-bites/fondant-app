import { useState } from "react";

import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { BiKey } from "react-icons/bi";

import AccountModal from "./account-modal";

interface IAccountRowElemProps {
  hash: string;
  txCount: number;
  balance: number;
}

const AccountRowElement = ({
  hash,
  txCount,
  balance,
}: IAccountRowElemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Flex
        w="100%"
        p="16px 32px"
        justify="space-between"
        borderBottom="1px solid"
        borderBottomColor="grey.100"
      >
        <VStack align="left" w="100%" maxW="500px">
          <Text fontSize="md">Address</Text>
          <Text fontSize="lg">{hash}</Text>
        </VStack>
        <VStack align="left">
          <Text fontSize="md">Balance</Text>
          <Text fontSize="lg">{balance}</Text>
        </VStack>
        <HStack>
          <VStack align="left">
            <Text fontSize="md">TX Count</Text>
            <Text fontSize="lg">{txCount}</Text>
          </VStack>
          <VStack align="left">
            <Text fontSize="md">Index</Text>
            <Text fontSize="lg">{txCount}</Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack
            onClick={handleOpenModal}
            align="center"
            justify="center"
            style={{
              background: "#DEDEDE",
              borderRadius: "5px",
              height: "60px",
              width: "60px",
              transform: "scaleX(-1)",
            }}
          >
            <BiKey style={{ width: "19px", height: "19px" }} />
          </VStack>
        </HStack>
      </Flex>
      <AccountModal isOpen={isOpen} onClose={handleCloseModal} hash={hash} />
    </>
  );
};

export default AccountRowElement;
