import { bookStore } from "@/app/features/booking/bookingActions";
import useBookingSelector from "@/app/hooks/selectors/useBookingSelector";
import useAppDispatch from "@/app/hooks/useAppDispatch";
import PaymentSlider, {
  PaymentSliderAnimationState,
} from "@/components/global/widgets/PaymentSlider";
import QRCodeButton from "@/components/global/widgets/QRCodeButton";
import { COLORS, DEFAULT_TIMEOUT } from "@/config/constants";
import { Store } from "@/models/validators/Store";
import {
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FunctionComponent } from "react";
import toast from "react-hot-toast";
import { MdQrCode } from "react-icons/md";
import QRCode from "react-qr-code";

const variants = {
  initial: { x: -200 },
  animate: { x: 0 },
  exit: { x: -200 },
};

interface StoreCardProps {
  store: Store;
}

const StoreCard: FunctionComponent<StoreCardProps> = ({ store }) => {
  const { bookings } = useBookingSelector();

  const dispatch = useAppDispatch();

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      style={{ height: "100%" }}
    >
      <Card
        p="0"
        w="300px"
        h="inherit"
        borderRadius="20px"
        overflow="hidden"
        boxShadow="xl"
        pos="relative"
        bg="transparent"
        backdropFilter="blur(10px)"
      >
        <Stack w="full" h="full">
          <Stack
            flex="3"
            bgImage={`url('${store.profile_image_uri}')`}
            bgPos="center"
            bgSize="cover"
            w="full"
            pos="relative"
            _before={{
              pos: "absolute",
              content: "''",
              inset: "0",
              zIndex: "0",
              bg: "#00000099",
            }}
            justify="flex-end"
            p="10px"
            gap="-10px"
          >
            <Heading zIndex="1" as="h4">
              {store.name}
            </Heading>
            {store.description && (
              <Text zIndex="1" fontSize="lg">
                {store.description}
              </Text>
            )}
          </Stack>
          <Box flex="6"></Box>
        </Stack>
        <Box pos="absolute" bottom="15px" left="15px" right="15px">
          <PaymentSlider
            // initialAnimationState={PaymentSliderAnimationState.completed}
            onDragComplete={async () => {
              // await new Promise<void>((r) => setTimeout(r, 1500));
              await dispatch(bookStore(store));
              toast.success("Store booked");
            }}
            qrButton={
              <QRCodeButton
                booking={
                  bookings?.find((booking) => booking.store_id === store.id)!
                }
              />
            }
          />
        </Box>
      </Card>
    </motion.div>
  );
};

export default StoreCard;
