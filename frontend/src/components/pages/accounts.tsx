import { useSearchContext } from "../../context/SearchContext";
import { Helmet } from "react-helmet-async";

import { Flex, VStack, Text } from "@chakra-ui/react";
import AccountRowElement from "../molecules/account-row-element";

const accountsData = [
  {
    hash: "0x7B8D62E413A97F6dDbaC95thihCf2aA6C7D6F58A",
    txCount: 15,
    balance: 42,
  },
  {
    hash: "0x7B8D62E413A97F6dDbaC5319F8Cf2aA6C7D6F58A",
    txCount: 7,
    balance: 76,
  },
  {
    hash: "0xCeFA1f892e3E465Bf86d5eAbc8B7E2F3aE3dF78d",
    txCount: 10,
    balance: 28,
  },
  {
    hash: "0x8Df64C1e8A34B7B6b7E7Aa09F3c1fA3B5cDf8F62",
    txCount: 18,
    balance: 63,
  },
  {
    hash: "0x2F4f6C9d8Ee74aE5f7B4D7C8a1C9B2f3Ee5f6DcA",
    txCount: 3,
    balance: 91,
  },
  {
    hash: "0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7HRE8F9A0",
    txCount: 12,
    balance: 19,
  },
  {
    hash: "0x9D8E7F6A5B4C3D2E1F0A9B8C7D6E5F4A3B2C1D0",
    txCount: 14,
    balance: 54,
  },
  {
    hash: "0x3F5f6C9d8Ee74aE5f7B4D7C8a1C9B25OIHGRHERTHT",
    txCount: 6,
    balance: 37,
  },
  {
    hash: "0x5A4B3C2D1E0F9A8B7C6D5E4F3A2B1C0D9E8F7",
    txCount: 19,
    balance: 12,
  },
  {
    hash: "0x3B2C1D0E9F8A7B6C5D4E3F2A1B0C9D8E7F6",
    txCount: 5,
    balance: 68,
  },
  {
    hash: "0x1B5C8D3A2F7E6B9C0D1A2F3E4D5C6B7A8F9D0E1",
    txCount: 2,
    balance: 88,
  },
  {
    hash: "0x9E8F7C6B5A4F3E2D1C0B9A8F7E6D5C4B3A2F1D0",
    txCount: 16,
    balance: 72,
  },
];

const Accounts = () => {
  const { searchValue } = useSearchContext();

  const filteredAccounts = accountsData.filter((item) =>
    item.hash.toLowerCase().includes(searchValue.toLowerCase().trim())
  );
  return (
    <>
      <Helmet>
        <title>Fondant | Accounts</title>
      </Helmet>
      <Flex w="100%" justify="center">
        <VStack w="100%" maxW="1440px" gap="0" mt="16px">
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((item, index) => {
              return (
                <AccountRowElement
                  key={index}
                  hash={item.hash}
                  txCount={item.txCount}
                  balance={item.balance}
                />
              );
            })
          ) : (
            <Text>No results</Text>
          )}
        </VStack>
      </Flex>
    </>
  );
};

export default Accounts;
