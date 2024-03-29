import { useState } from "react"
import { Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { BiKey } from "react-icons/bi"
import AccountModal from "./account-modal" // Assuming this is the modal component

interface IAccountRowElemProps {
    publicKey: string
    privateKey: string
}

const AccountRowElement = ({ publicKey, privateKey }: IAccountRowElemProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
   
    const fontSize = "xl" // maybe we can update it, but I like it how it now

    return (
        <>
            <Flex
                w="100%"
                p={["16px", "16px", "16px 32px"]}
                justify="space-between"
                borderBottom="1px solid"
                borderBottomColor="grey.100"
                gap="10px"
            >
                <VStack align="left" w="100%" gap="5px">
                    <Text fontSize="md" color="grey.300" fontWeight={500}>
                        Public Key
                    </Text>
                    <Text
                        fontSize={fontSize}
                        width={[
                            "calc(100vw - 100px)",
                            "calc(100vw - 100px)",
                            "calc(100vw - 130px)",
                            "unset",
                        ]}
                        color="grey.800"
                        textOverflow={["ellipsis"]}
                        overflow={["hidden", "hidden", "hidden", "hidden"]}
                        whiteSpace="nowrap"
                    >
                        {publicKey}
                    </Text>
                </VStack>
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
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <BiKey style={{ width: "25px", height: "25px" }} />
                    </VStack>
                </HStack>
            </Flex>
            {/* Modal will display the private key */}
            <AccountModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                publicKey={publicKey}
                privateKey={privateKey}
            />
        </>
    )
}

export default AccountRowElement
