import { FunctionComponent } from "react";
import {
  Popover,
  PopoverTrigger,
  IconButton,
  Portal,
  PopoverContent,
  PopoverArrow,
} from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { MdQrCode } from "react-icons/md";
import { COLORS } from "@/config/constants";
import { Booking } from "@/models/validators/Booking";

interface QRCodeButtonProps {
  booking: Booking;
}

const QRCodeButton: FunctionComponent<QRCodeButtonProps> = ({ booking }) => {
  return (
    <Popover placement="top">
      <PopoverTrigger>
        <IconButton
          aria-label="QR"
          icon={<MdQrCode color={COLORS.primary} size="25px" />}
          variant="ghost"
          _hover={{
            bg: "transparent",
          }}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent w="200px">
          <PopoverArrow />

          <QRCode value={booking.id} size={120} viewBox="120 120 0 0" />
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default QRCodeButton;
