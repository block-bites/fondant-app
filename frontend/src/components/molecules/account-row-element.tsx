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
          <Text fontSize="16px">Address</Text>
          <Text fontSize="18px">{hash}</Text>
        </VStack>
        <VStack align="left">
          <Text fontSize="16px">Balance</Text>
          <Text fontSize="18px">{balance}</Text>
        </VStack>
        <HStack>
          <VStack align="left">
            <Text fontSize="16px">TX Count</Text>
            <Text fontSize="18px">{txCount}</Text>
          </VStack>
          <VStack align="left">
            <Text fontSize="16px">Index</Text>
            <Text fontSize="18px">{txCount}</Text>
          </VStack>
          {/* <VStack align="left">
            <Text fontSize="16px">Balance</Text>
            <Text fontSize="18px">{balance}</Text>
          </VStack> */}
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
              cursor: "pointer",
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
