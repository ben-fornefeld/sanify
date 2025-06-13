import { Store } from "@/models/validators/Store";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useRef } from "react";
import { MdChevronRight } from "react-icons/md";
import StoreListTileButton from "./StoreListTileButton";
import useAppDispatch from "@/app/hooks/useAppDispatch";
import { hoverStore, selectStore } from "@/app/features/map/mapActions";
import { motion } from "framer-motion";
import { useHover } from "usehooks-ts";
import { COLORS } from "@/config/constants";

const borderVariants = {
  initial: { opacity: 0, inset: "0px" },
  hover: { opacity: 1, inset: "6px" },
};

interface StoreListTileProps {
  store: Store;
}

const StoreListTile: FunctionComponent<StoreListTileProps> = ({ store }) => {
  const hoverRef = useRef(null);
  const isHovering = useHover(hoverRef);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!dispatch || !store) return;

    dispatch(hoverStore(isHovering ? store : undefined));
  }, [isHovering, dispatch, store]);

  return (
    <Card
      minH="150px"
      minW="250px"
      pos="relative"
      overflow="hidden"
      ref={hoverRef}
      onClick={(e) => {
        e.preventDefault();
        dispatch(selectStore(store));
      }}
    >
      <Flex h="full" w="full" alignItems="flex-end" zIndex="1">
        <Box>
          <Text fontSize="xl">{store.name}</Text>
        </Box>
      </Flex>
      <Box zIndex="1" right="0" bottom="0" top="0" pos="absolute" w="30%">
        <StoreListTileButton />
      </Box>
      <Box
        top="0"
        left="0"
        bottom="0"
        w="100%"
        objectFit="cover"
        pos="absolute"
        _before={{
          pos: "absolute",
          content: "''",
          inset: "0",
          zIndex: "0",
          bg: "#000000cc",
        }}
      >
        <Image zIndex="-1" alt="store image" src={store.profile_image_uri} />
      </Box>
      <motion.div
        variants={borderVariants}
        transition={{ duration: 0.2 }}
        initial="initial"
        animate={isHovering ? "hover" : "initial"}
        style={{
          position: "absolute",
          border: `1px solid ${COLORS.textWhite}`,
          borderRadius: "10px",
          zIndex: "1",
        }}
      />
    </Card>
  );
};

export default StoreListTile;
