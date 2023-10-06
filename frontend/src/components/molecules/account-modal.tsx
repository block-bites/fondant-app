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
} from "@chakra-ui/react";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AccountModal({ isOpen, onClose }: AccountModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <Center>
        <ModalContent>
          <ModalHeader>Account Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="16px">
              <Stack spacing="8px">
                <h2>ACCOUNT ADDRESS</h2>
                <p>0×93D512eFd915Da033D6109451beb@ef24bab2ea1</p>
              </Stack>
              <Stack spacing="8px">
                <h2>PRIVATE KEY</h2>
                <p>
                  0×832077664976484ebb562a1(8248e64072449c75482941977df3ef7f2606)
                </p>
              </Stack>
              <Box style={{ color: "red" }}>
                <p>
                  Do not use this private key on a public blockchain; use it for
                  development purposes only!
                </p>
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
