import React from "react";
import styled from "@emotion/styled";
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { HeaderWalletConnect } from "./header-wallet-connect";
import { FaRegStar, FaTelegram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  className?: string;
}

export const HeaderDrawer = ({ className }: Props): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  return (
    <>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label={"Toggle theme"}
        size="md"
        icon={<HamburgerIcon />}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">BlastPush</DrawerHeader>

          <DrawerBody>
            <Stack my={3}>
              <HeaderWalletConnect onClick={() => onClose()} />
            </Stack>
            <Stack mt={7} spacing="12px">
              <Button
                onClick={() => {
                  navigate({ to: "/" });
                  onClose();
                }}
              >
                Create Push
              </Button>
              <Button
                onClick={() => {
                  navigate({ to: "/points" });
                  onClose();
                }}
                rightIcon={<FaRegStar />}
              >
                Points
              </Button>
              <Button
                onClick={() => {
                  navigate({ to: "/faq" });
                  onClose();
                }}
              >
                FAQ
              </Button>
            </Stack>
            <Stack mt={6} spacing="12px">
              <Button
                onClick={() => {
                  window.open("https://twitter.com/blast_push", "_blank");
                  onClose();
                }}
                leftIcon={<FaTwitter />}
              >
                Twitter
              </Button>
              <Button
                onClick={() => {
                  window.open("https://t.me/blastpush", "_blank");
                  onClose();
                }}
                leftIcon={<FaTelegram />}
              >
                Telegram
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
