import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    _focus: {
      _active: {
        boxShadow: "none !important",
        borderColor: "primary !important",
      },
      boxShadow: "none !important",
      borderColor: "primary !important",
    },
    caretColor: "primary !important",
  },
});

const inputTheme = defineMultiStyleConfig({ baseStyle });

export default inputTheme;
