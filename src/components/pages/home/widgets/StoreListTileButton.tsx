import { COLORS } from "@/config/constants";
import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FunctionComponent, useEffect, useRef } from "react";
import { MdChevronRight, MdSearch } from "react-icons/md";
import { useHover } from "usehooks-ts";

interface StoreListTileButtonProps {}

const StoreListTileButton: FunctionComponent<
  StoreListTileButtonProps
> = ({}) => {
  return (
    <Flex
      backdropFilter="blur(8px)"
      w="full"
      h="full"
      justify="center"
      align="center"
      pos="relative"
    >
      <MdSearch size="30px" />
    </Flex>
  );
};

export default StoreListTileButton;
