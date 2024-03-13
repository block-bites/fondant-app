import React from "react";
import { Modal } from "@chakra-ui/react";

interface INavbarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavbarModal({ isOpen, onClose }: INavbarModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      navbar-modall
    </Modal>
  );
}
