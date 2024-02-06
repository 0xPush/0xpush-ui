import { RepeatClockIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Heading,
  Slide,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorMode,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { HistoryItem, PushHistory } from "../../lib/history";
import { shortString } from "../../lib/string";
import { useEffect, useRef, useState } from "react";

const Trigger = styled.div<{ bg: string }>`
  position: fixed;
  right: 0;
  top: 30%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background: ${(p) => p.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;

  @media (max-width: 600px) {
    display: none;
  }

  &:hover {
    filter: brightness(0.97);
  }
`;

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 40%;
  transform: translateY(-50%);
  width: min(600px, 90%);
  height: 40vh;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  background-color: #1f1f1f;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-flow: column nowrap;
  z-index: 2;
  backdrop-filter: blur(2px);
  box-shadow: 0 0 20px 20px rgba(0, 0, 0, 0.5);
`;

const $TableContainer = styled(TableContainer)`
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 10px;

  th,
  td {
    border-color: #5d5d5d;
  }

  th {
    color: #a0aec0;
  }

  /* width */

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */

  ::-webkit-scrollbar-track {
    background: #9f9f9f;
  }

  /* Handle */

  ::-webkit-scrollbar-thumb {
    background: #5d5d5d;
  }

  /* Handle on hover */

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const PushHistoryPopup = (): JSX.Element => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const ref = useRef<HTMLDivElement>();

  const [history, setHistory] = useState<HistoryItem[]>([]);

  const { colorMode } = useColorMode();
  const bgColor = { light: "#ffffff", dark: "#3f3f3f" };

  const openLink = (privateKey: string) => {
    const hostname = window?.location.origin;
    window.open(`${hostname}/w/${privateKey}`, "_blank");
  };

  useEffect(() => {
    if (isOpen) {
      const history = PushHistory.getHistory();
      setHistory(history);
    }
  }, [isOpen]);

  useOutsideClick({
    // @ts-ignore
    ref,
    handler: () => onClose(),
  });

  return (
    <>
      <Trigger bg={bgColor[colorMode]} onClick={onToggle}>
        <Tooltip label="History">
          <RepeatClockIcon width={22} height={22} />
        </Tooltip>
      </Trigger>
      <Slide direction="right" in={isOpen} style={{ zIndex: 2 }}>
        {/* @ts-ignore */}
        <Container ref={ref}>
          <Stack
            px={2}
            mb={5}
            direction="row"
            justify="space-between"
            align="baseline"
          >
            <Heading color="gray.300" size="md">
              History
            </Heading>
            <div style={{ width: "1px" }} />
            <Button
              ml={2}
              colorScheme="blackAlpha"
              variant="outline"
              height="23px"
              onClick={() => {
                PushHistory.clear();
                onClose();
              }}
              color="gray.300"
              size="sm"
            >
              Clear
            </Button>
          </Stack>
          <$TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Address</Th>
                  <Th>Recipient</Th>
                  <Th>Type</Th>
                  <Th isNumeric>Link</Th>
                </Tr>
              </Thead>
              <Tbody>
                {history.map(({ secret, to, type }, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{shortString(secret)}</Td>
                      <Td maxW="100px" overflow="hidden">
                        {to || "—"}
                      </Td>
                      <Td>
                        <Badge
                          bg={type === "viewed" ? "pink.700" : "gray.600"}
                          px={2}
                          py={0.5}
                          color="whiteAlpha.800"
                          size="sm"
                        >
                          {type === "created" ? "Created" : "Received"}
                        </Badge>
                      </Td>
                      <Td isNumeric>
                        <Button
                          colorScheme="blackAlpha"
                          height="28px"
                          onClick={() => openLink(secret)}
                          color="gray.300"
                          size="sm"
                        >
                          Open
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </$TableContainer>
        </Container>
      </Slide>
    </>
  );
};
