import { AuthState } from "@/app/features/auth/authSlice";
import useAuthSelector from "@/app/hooks/selectors/useAuthSelector";
import useAppDispatch from "@/app/hooks/useAppDispatch";
import { RootState } from "@/app/store";
import { Avatar, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";

interface AccountInfoProps {}

const AccountInfo: FunctionComponent<AccountInfoProps> = () => {
  const { user } = useAuthSelector();

  return (
    <Flex
      w="full"
      gap="15px"
      align="center"
      visibility={user ? "visible" : "hidden"}
    >
      <Avatar w="40px" h="40px" src={user?.profile_image_url ?? undefined} />
      <Stack h="full" justify="center" gap="-5px">
        <Heading as="h6" fontWeight="500">
          {user?.name}
        </Heading>
      </Stack>
    </Flex>
  );
};

export default AccountInfo;
