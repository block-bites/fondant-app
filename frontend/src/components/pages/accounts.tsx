import { Flex, VStack } from "@chakra-ui/react";
import AccountRowElement from "../molecules/account-row-element";

const Accounts = () => {
  return (
    <Flex w="100%" justify="center">
      <VStack w="100%" maxW="1440px" gap="0" mt="16px">
        <AccountRowElement />
        <AccountRowElement />
        <AccountRowElement />
        <AccountRowElement />
        <AccountRowElement />
        <AccountRowElement />
        <AccountRowElement />
        <AccountRowElement />
        <AccountRowElement />
        <AccountRowElement />
        <AccountRowElement />
      </VStack>
    </Flex>
  );
};

export default Accounts;
