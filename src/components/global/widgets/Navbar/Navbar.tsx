import { NAVBAR_HEIGHT, NAVBAR_WIDTH, PADDING } from "@/config/constants";
import { Box, Button, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import { FunctionComponent, useEffect } from "react";
import AccountInfo from "./widgets/AccountInfo";
import useAppDispatch from "@/app/hooks/useAppDispatch";
import useAuthSelector from "@/app/hooks/selectors/useAuthSelector";
import { signInWithGoogle, signOut } from "@/app/features/auth/authActions";
import { MdHistory, MdHome, MdSettings } from "react-icons/md";
import Link from "next/link";
import { openSettingsModal } from "@/app/features/account/accountActions";
import SettingsModal from "../SettingsModal/SettingsModal";
import BookingsModal from "./widgets/BookingsModal";
import useBookingSelector from "@/app/hooks/selectors/useBookingSelector";
import { openBookingsModal } from "@/app/features/booking/bookingActions";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const { user, authStateLoading } = useAuthSelector();
  const { bookingsLoading, bookingsModalOpen } = useBookingSelector();

  const dispatch = useAppDispatch();

  return (
    <>
      <Flex
        px={`calc(${PADDING} * 2)`}
        justify="space-between"
        align="center"
        minH={NAVBAR_HEIGHT}
        w="full"
      >
        <AccountInfo />

        <Flex gap="20px">
          {user && (
            <>
              <IconButton
                aria-label="bookings"
                icon={<MdHistory />}
                isLoading={bookingsLoading}
                onClick={() => dispatch(openBookingsModal())}
              />
              <IconButton
                aria-label="settings"
                icon={<MdSettings />}
                onClick={() => dispatch(openSettingsModal())}
              />
            </>
          )}
          <Button
            variant="primary"
            onClick={(e) => {
              if (!user) {
                dispatch(signInWithGoogle());
                return;
              }

              dispatch(signOut());
            }}
            isLoading={authStateLoading}
          >
            {user ? "Sign out" : "Sign In"}
          </Button>
        </Flex>
      </Flex>
      <SettingsModal />
      <BookingsModal />
    </>
  );
};

export default Navbar;
