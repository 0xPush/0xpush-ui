import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const colors = {
  pink: {
    50: "#FEE6F1",
    100: "#FCBAD8",
    200: "#FB8EC0",
    300: "#F962A7",
    400: "#F8358E",
    500: "#F60975",
    600: "#C5075E",
    700: "#940546",
    800: "#62042F",
    900: "#310217",
  },
  purple: {
    50: "#F1E5FF",
    100: "#D8B8FF",
    200: "#BF8AFF",
    300: "#A65CFF",
    400: "#8C2EFF",
    500: "#7300FF",
    600: "#5C00CC",
    700: "#450099",
    800: "#2E0066",
    900: "#170033",
  },
};

const dark = "#11140C";
const light = "#f0f0f0";

const config: ThemeConfig = {
  useSystemColorMode: true,
};

export const theme = extendTheme({
  colors,
  config,
  fonts: {
    heading: `Sora, sans-serif`,
    body: `Roboto, sans-serif`,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode(light, dark)(props),
      },
    }),
  },
  components: {},
});
