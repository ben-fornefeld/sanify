import useBookingSelector from "@/app/hooks/selectors/useBookingSelector";
import { Booking, BookingStatus } from "@/models/validators/Booking";
import {
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent, useMemo } from "react";
import { MdHistory } from "react-icons/md";
import QRCodeButton from "../../QRCodeButton";
import useAppDispatch from "@/app/hooks/useAppDispatch";
import {
  closeBookingsModal,
  openBookingsModal,
} from "@/app/features/booking/bookingActions";

interface BookingListTileProps {
  booking: Booking;
}

const BookingListTile: FunctionComponent<BookingListTileProps> = ({
  booking,
}) => {
  return (
    <Flex w="full" justify="space-between">
      <Stack gap="-5px">
        <Text>Store</Text>
        <Text>Date</Text>
      </Stack>
      <QRCodeButton booking={booking} />
    </Flex>
  );
};

interface BookingsModalProps {}

const BookingsModal: FunctionComponent<BookingsModalProps> = () => {
  const { bookings, bookingsLoading, bookingsModalOpen } = useBookingSelector();

  const dispatch = useAppDispatch();

  const pendingBookings = useMemo(
    () =>
      bookings?.filter((booking) => booking.status === BookingStatus.pending),
    [bookings]
  );

  const doneBookings = useMemo(
    () => bookings?.filter((booking) => booking.status === BookingStatus.done),
    [bookings]
  );

  return (
    <Modal
      isOpen={bookingsModalOpen}
      onClose={() => dispatch(closeBookingsModal())}
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            <Heading as="h4">Booking History</Heading>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Stack w="full">
              {pendingBookings?.map((booking, index) => (
                <BookingListTile
                  key={`pending-booking-list-tile-${index}`}
                  booking={booking}
                />
              ))}
            </Stack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default BookingsModal;
