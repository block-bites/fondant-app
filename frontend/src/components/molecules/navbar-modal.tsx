import {
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
  Button,
} from "@chakra-ui/react";

interface INavbarModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleReset: () => void;
}

export default function NavbarModal({
  isOpen,
  onClose,
  handleReset,
}: INavbarModalProps) {
  const handleAgreeClick = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <Center>
        <ModalContent>
          <ModalHeader fontSize="lg" fontWeight="bold" fontFamily="primary">
            Warning
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
                  Are you sure you want to reset the network?
                </Text>
              </Stack>
              <Box>
                <Text
                  fontSize="md"
                  lineHeight="tall"
                  fontWeight="normal"
                  color="#F00"
                >
                  This will remove all your deploys!
                </Text>
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent={"space-between"}>
            <Button colorScheme="red" onClick={handleAgreeClick}>
              Yes, reset it
            </Button>
            <Button colorScheme="green" onClick={onClose}>
              No, don't reset
            </Button>
          </ModalFooter>
        </ModalContent>
      </Center>
    </Modal>
  );
}
