import { cardAnatomy, modalAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  overlay: {},
  dialog: {
    borderRadius: "2xl",
    bg: `grayDark`,
    alignSelf: "center",
  },
});

const modalTheme = defineMultiStyleConfig({
  baseStyle,
});

export default modalTheme;
