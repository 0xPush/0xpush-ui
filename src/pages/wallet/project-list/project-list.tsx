import styled from "@emotion/styled";
import { ProjectItem } from "./types";
import {
  Button,
  Heading,
  Stack,
  Tag,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { Column, Item, LogoContainer, Row } from "./list-components";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

const Container = styled.div``;

const Image = styled.img`
  width: 42px;
  height: 42px;
  object-fit: contain;
  -webkit-user-drag: none;
`;

interface Props {
  className?: string;
  label?: string;
  projects: ProjectItem[];
}

export const ProjectList = ({
  className,
  projects,
  label,
}: Props): JSX.Element => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  return (
    <Container className={className}>
      {label && (
        <Stack mt={2} mb={6} align="center">
          <Tag px={3} py={1.5} colorScheme="purple" borderRadius="xl">
            {label}
          </Tag>
        </Stack>
      )}
      {projects.map(({ name, desc, logo, tags, url }) => (
        <Item
          key={name}
          bg={bgColor[colorMode]}
          borderRadius="lg"
          boxShadow="md"
        >
          <Row>
            <LogoContainer>
              <Image src={logo} />
            </LogoContainer>
            <Stack gap="4px">
              <Stack direction="row" gap="2px">
                <Heading fontSize="md">{name}</Heading>
                {desc && (
                  <Tooltip label={desc}>
                    <QuestionOutlineIcon ml="6px" />
                  </Tooltip>
                )}
              </Stack>
              <Stack direction="row">
                {tags.map((tag) => (
                  <Tag key={tag} colorScheme="purple" mt={1} size="sm">
                    {tag}
                  </Tag>
                ))}
              </Stack>
            </Stack>
          </Row>
          <Row>
            <a href={url} target="_blank" rel="noreferrer noopener">
              <Button size="sm" variant="solid">
                Visit
              </Button>
            </a>
          </Row>
        </Item>
      ))}
    </Container>
  );
};
