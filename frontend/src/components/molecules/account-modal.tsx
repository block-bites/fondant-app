import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Box,
    Stack,
    Center,
    Text,
} from "@chakra-ui/react"

// Updated interface to include publicKey and privateKey
interface IAccountModalProps {
    isOpen: boolean
    onClose: () => void
    publicKey: string
    privateKey: string
}

function AccountModal({ isOpen, onClose, publicKey, privateKey }: IAccountModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
            <ModalOverlay />
            <Center>
                <ModalContent>
                    <ModalHeader fontSize="lg" fontWeight="bold" fontFamily="primary">
                        Account Information
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing="16px">
                            <Stack spacing="8px">
                                <Text
                                    fontSize="lg"
                                    lineHeight="tall"
                                    fontWeight="normal"
                                    color="grey.border"
                                >
                                    PUBLIC KEY
                                </Text>
                                <Text
                                    fontSize="sm"
                                    lineHeight="tall"
                                    fontWeight="light"
                                    color="grey.border"
                                >
                                    {publicKey}
                                </Text>
                            </Stack>
                            <Stack spacing="8px">
                                <Text
                                    fontSize="lg"
                                    lineHeight="tall"
                                    fontWeight="normal"
                                    color="grey.border"
                                >
                                    PRIVATE KEY
                                </Text>
                                <Text
                                    fontSize="sm"
                                    lineHeight="tall"
                                    fontWeight="light"
                                    color="grey.border"
                                >
                                    {privateKey}
                                </Text>
                            </Stack>
                            <Box>
                                <Text
                                    fontSize="md"
                                    lineHeight="tall"
                                    fontWeight="normal"
                                    color="#F00"
                                >
                                    Do not use this private key on a public blockchain; use it for
                                    development purposes only!
                                </Text>
                            </Box>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" onClick={onClose}>
                            Done
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Center>
        </Modal>
    )
}

export default AccountModal
