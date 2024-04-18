import { useEffect, useState } from "react"
import { useSearchContext } from "../../context/SearchContext"
import { Helmet } from "react-helmet-async"
import { Flex, VStack, Text, Spinner, Box } from "@chakra-ui/react"
import AccountRowElement from "../molecules/account-row-element"
import axios from "axios"
import { NODE_URL_PORT, NUM_OF_NODES_CONSIDERED_RUNNING } from "../../constant"
import { Keys } from "casper-js-sdk"

type AccountData = {
    publicKey: string
    privateKey: string
}

interface AccountsProps {
    isNetworkLaunched: boolean
}

const Accounts: React.FC<AccountsProps> = ({ isNetworkLaunched }) => {
    const { searchValue } = useSearchContext()
    const [accountsData, setAccountsData] = useState<AccountData[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true) // Initialize as true

    useEffect(() => {
        const fetchAccountsData = async () => {
            let fetchedAccounts: AccountData[] = []
            for (let i = 1; i <= NUM_OF_NODES_CONSIDERED_RUNNING; i++) {
                try {
                    const getPrivateKey = axios.get(`${NODE_URL_PORT}/users/${i}/private_key`)
                    const getPublicKey = axios.get(`${NODE_URL_PORT}/users/${i}/public_key`)

                    const results = await Promise.all([getPrivateKey, getPublicKey]).then(
                        (values) => {
                            return values.map((v) => v.data.message.split("\r\n")[1])
                        }
                    )

                    const keyPair = Keys.getKeysFromHexPrivKey(
                        results[1],
                        Keys.SignatureAlgorithm.Ed25519
                    )

                    fetchedAccounts.push({
                        publicKey: keyPair.publicKey.toHex(),
                        privateKey: results[0],
                    })
                } catch (error) {
                    console.error(`Error fetching data for user ${i}:`, error)
                }
            }
            setAccountsData(fetchedAccounts)
            setIsLoading(false)
        }
        if (isNetworkLaunched) {
            fetchAccountsData()
        }
    }, [isNetworkLaunched])

    const filteredAccounts = accountsData.filter(
        (account) =>
            account.publicKey.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
            account.privateKey.toLowerCase().includes(searchValue.toLowerCase().trim())
    )

    if (isLoading && isNetworkLaunched)
        return (
            <Flex
                justifyContent="center"
                height="100vh"
                alignItems="center"
                m={["68px 0 0 0", "68px 0 0 0", "0"]}
            >
                <Spinner size="xl" colorScheme="gray" />
            </Flex>
        )

    return (
        <>
            <Helmet>
                <title>Fondant | Accounts</title>
            </Helmet>
            <Flex w="100%" justify="center" m="0">
                <VStack w="100%" maxW="1440px" gap="0" mt={["0px", "8px"]}>
                    {filteredAccounts.length > 0 ? (
                        <Flex w="100%" mt={["146px", "146px", "76px"]} display="column">
                            {filteredAccounts.map((account, index) => (
                                <AccountRowElement
                                    key={index}
                                    publicKey={account.publicKey}
                                    privateKey={account.privateKey}
                                />
                            ))}
                        </Flex>
                    ) : (
                        <Flex justifyContent="center" height="100vh" alignItems="center">
                            <Box overflowY="auto" p={3}>
                                <Flex w="100%" justify="center" mt={["144px", "144px", "0"]}>
                                    <Text color="grey.400">No accounts available to display</Text>
                                </Flex>
                            </Box>
                        </Flex>
                    )}
                </VStack>
            </Flex>
        </>
    )
}

export default Accounts
