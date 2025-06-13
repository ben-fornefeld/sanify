import { NAVBAR_WIDTH } from "@/config/constants";
import { ChakraTheme, extendTheme } from "@chakra-ui/react";
import { COLORS, PADDING } from "../constants";
import cardTheme from "./card";
import modalTheme from "./modal";
import inputTheme from "./input";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "grayDark !important",
        color: "textOffWhite !important",
        fontWeight: "300 !important",
      },
      h6: {
        fontSize: { base: "sm !important", md: "md !important" },
      },
      h4: {
        fontSize: { base: "lg !important", md: "xl !important" },
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: "textWhite !important",
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "400 !important",
      },
      variants: {
        primary: {
          bg: "primary",
        },
      },
    },
    Card: cardTheme,
    Modal: modalTheme,
    Input: inputTheme,
    Spinner: {
      baseStyle: {
        color: "primary",
      },
    },
  },
  colors: {
    ...COLORS,
  },
  sizes: {},
  fonts: {
    heading: "'Outfit Variable', sans-serif",
    body: "'Outfit Variable', sans-serif",
    mono: "'Outfit Variable', sans-serif",
  },
  shadows: {
    outline: `0px 0px 0px 3px ${COLORS.primary} !important`,
  },
} as Partial<ChakraTheme>);

export default theme;
