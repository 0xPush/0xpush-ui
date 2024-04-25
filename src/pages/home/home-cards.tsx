import {
  Card,
  Heading,
  Icon,
  Stack,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaCheck, FaCoins, FaShareAlt } from "react-icons/fa";

interface Props {
  className?: string;
}

export const HomeCards = ({ className }: Props): JSX.Element => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  const [isMobile] = useMediaQuery("(max-width: 600px)");

  return (
    <Stack
      className={className}
      flexFlow={isMobile ? "column nowrap" : "row wrap"}
      padding={isMobile ? "0 30px" : "0"}
      gap={6}
      justify="center"
    >
      <Card flex="1 1" p={4} bg={bgColor[colorMode]}>
        <Stack justify="center" align="center">
          <Icon mt={2} mb={5} width="30px" height="30px" as={FaCoins} />
          <Heading size="sm" textAlign="center">
            1. Create a Push
          </Heading>
          <Text mt={3} textAlign="center">
            Deposit assets the amount you want to send and setup customizations
            (optional).
          </Text>
        </Stack>
      </Card>
      <Card flex="1 1" p={4} bg={bgColor[colorMode]}>
        <Stack justify="center" align="center">
          <Icon mt={2} mb={5} width="30px" height="30px" as={FaShareAlt} />
          <Heading size="sm" textAlign="center">
            2. Share
          </Heading>
          <Text mt={3} textAlign="center">
            Copy URL or QR of Push and send it to receiver. Keep this link a
            secret!
          </Text>
        </Stack>
      </Card>
      <Card flex="1 1" p={4} bg={bgColor[colorMode]}>
        <Stack justify="center" align="center">
          <Icon mt={2} mb={5} width="30px" height="30px" as={FaCheck} />
          <Heading size="sm" textAlign="center">
            3. Done
          </Heading>
          <Text mt={3} textAlign="center">
          You have just sent crypto and recipient can use it even if they don't have a crypto wallet.
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
};
