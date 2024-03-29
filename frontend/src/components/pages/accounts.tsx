import { useEffect, useState } from "react";
import { useSearchContext } from "../../context/SearchContext";
import { Helmet } from "react-helmet-async";
import { Flex, VStack, Text } from "@chakra-ui/react";
import AccountRowElement from "../molecules/account-row-element";
import axios from "axios";

type AccountData = {
  publicKey: string;
  privateKey: string;
};

const Accounts = () => {
  const { searchValue } = useSearchContext();
  const [accountsData, setAccountsData] = useState<AccountData[]>([]);

  useEffect(() => {
    const fetchAccountsData = async () => {
      let fetchedAccounts: AccountData[] = [];
      for (let i = 1; i <= 10; i++) {
        try {
          const response = await axios.get(
            `http://localhost:3001/user-keys/${i}`
          );
          fetchedAccounts.push({
            publicKey: response.data.public_key,
            privateKey: response.data.private_key,
          });
        } catch (error) {
          console.error(`Error fetching data for user ${i}:`, error);
        }
      }
      setAccountsData(fetchedAccounts);
    };

    fetchAccountsData();
  }, []);

  const filteredAccounts = accountsData.filter(
    (account) =>
      account.publicKey
        .toLowerCase()
        .includes(searchValue.toLowerCase().trim()) ||
      account.privateKey
        .toLowerCase()
        .includes(searchValue.toLowerCase().trim())
  );

  return (
    <>
      <Helmet>
        <title>Fondant | Accounts</title>
      </Helmet>
      <Flex w="100%" justify="center">
        <VStack w="100%" maxW="1440px" gap="0" mt="16px">
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account, index) => (
              <AccountRowElement
                key={index}
                publicKey={account.publicKey}
                privateKey={account.privateKey}
              />
            ))
          ) : (
            <Flex w="100%" justify="center" pt="100px">
              <Text color="grey.400">No results</Text>
            </Flex>
          )}
        </VStack>
      </Flex>
    </>
  );
};

export default Accounts;
