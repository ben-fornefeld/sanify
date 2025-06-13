import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { FunctionComponent, Suspense, useEffect } from "react";

import { PADDING } from "@/config/constants";
import Map from "./widgets/Map";
import StoresList from "./widgets/StoresList";
import useMapSelector from "@/app/hooks/selectors/useMapSelector";
import useAppDispatch from "@/app/hooks/useAppDispatch";
import { useEffectOnce } from "usehooks-ts";
import { fetchStoresInRadius } from "@/app/features/map/mapActions";
import LoadingIndicator from "@/components/global/widgets/LoadingIndicator";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  const { loading } = useMapSelector();

  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(fetchStoresInRadius(30000));
  });

  if (loading) {
    return (
      // <Flex w="full" h="full " justify="center" align="center">
      //   <LoadingIndicator />
      // </Flex>
      null
    );
  }

  return (
    <Stack w="full" h="full" px={`calc(${PADDING} * 2)`} gap="60px">
      <Flex flex="2">
        <Suspense>
          <Map />
        </Suspense>
      </Flex>
      <Box flex="1">
        <Suspense>
          <StoresList />
        </Suspense>
      </Box>
    </Stack>
  );
};

export default HomePage;
