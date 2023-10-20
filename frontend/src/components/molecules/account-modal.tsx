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
} from "@chakra-ui/react";

interface IAccountModalProps {
  hash: string;
  isOpen: boolean;
  onClose: () => void;
}

function AccountModal({ isOpen, onClose, hash }: IAccountModalProps) {
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
                  ACCOUNT ADDRESS
                </Text>
                <Text
                  fontSize="sm"
                  lineHeight="tall"
                  fontWeight="light"
                  color="grey.border"
                >
                  {hash}
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
                  0×832077664976484ebb562a1(8248e64072449c75482941977df3ef7f2606)
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
  );
}

export default AccountModal;
