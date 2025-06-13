import useMapSelector from "@/app/hooks/selectors/useMapSelector";
import {
  Box,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FunctionComponent, useRef } from "react";
import StoreListTile from "./StoreListTile";
import { ReactLenis } from "@studio-freight/react-lenis";
import { COLORS } from "@/config/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";

interface StoresListProps {}

const StoresList: FunctionComponent<StoresListProps> = () => {
  const { stores, loading } = useMapSelector();
  const paginationRef = useRef(null);

  const slidesPerViewR = useBreakpointValue({ base: 1, sm: 2, lg: 3, xl: 5 });

  if (loading) return null;

  return (
    <Stack w="full" h="full" gap="30px">
      <Heading as="h2">Stores</Heading>
      <Box
        pos="relative"
        // _after={{
        //   content: '""',
        //   pos: "absolute",
        //   inset: "-20px 0 0 0 ",
        //   zIndex: "1",
        //   bg: `linear-gradient(0deg, ${COLORS.grayDark} 0%, transparent 50%)`,
        //   pointerEvents: "none",
        // }}
      >
        <Box>
          <Swiper
            direction="horizontal"
            slidesPerView={slidesPerViewR}
            spaceBetween="30px"
            modules={[Pagination]}
            pagination={{
              clickable: true,
            }}
          >
            {stores?.map((store, index) => (
              <SwiperSlide key={`store-list-tile-${index}`}>
                <StoreListTile store={store} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Stack>
  );
};

export default StoresList;
