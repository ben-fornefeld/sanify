import { cardAnatomy, modalAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const cardBaseStyle = definePartsStyle({
  container: {
    backgroundColor: "grayCharcoal",
    borderRadius: "xl",
    p: "20px",
  },
  header: {
    paddingBottom: "2px",
  },
  body: {
    paddingTop: "2px",
  },
  footer: {
    paddingTop: "2px",
  },
});

const cardSizes = {
  md: definePartsStyle({
    container: {},
  }),
};

const cardTheme = defineMultiStyleConfig({
  baseStyle: cardBaseStyle,
  sizes: cardSizes,
});

export default cardTheme;
