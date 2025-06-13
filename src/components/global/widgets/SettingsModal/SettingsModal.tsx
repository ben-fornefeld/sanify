import { closeSettingsModal } from "@/app/features/account/accountActions";
import useAccountSelector from "@/app/hooks/selectors/useAccountSelector";
import useAppDispatch from "@/app/hooks/useAppDispatch";
import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import ChangeDataField from "./widgets/ChangeDataField";
import useAuthSelector from "@/app/hooks/selectors/useAuthSelector";
import { updateUser } from "@/app/features/auth/authActions";
import { produce } from "immer";

interface SettingsModalProps {}

const SettingsModal: FunctionComponent<SettingsModalProps> = () => {
  const { isSettingsModalOpen } = useAccountSelector();
  const { user, updateUserLoading } = useAuthSelector();

  const dispatch = useAppDispatch();

  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();

  useEffect(() => {
    if (!user) return;

    setName(user.name ?? "");
    setEmail(user.email);
  }, [user]);

  return (
    <Modal
      isOpen={isSettingsModalOpen}
      onClose={() => dispatch(closeSettingsModal())}
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader title="Account Settings">
            <Heading as="h4">Account Settings</Heading>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Stack gap="20px">
              <ChangeDataField
                canSubmit={user?.name !== name}
                onSubmit={() =>
                  dispatch(
                    updateUser(
                      produce(user!, (draft) => {
                        draft.name = name;
                      })
                    )
                  )
                }
                isSubmitting={updateUserLoading}
              >
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              </ChangeDataField>
              <ChangeDataField
                canSubmit={user?.email !== email}
                onSubmit={() =>
                  dispatch(
                    updateUser(
                      produce(user!, (draft) => {
                        draft.email = email!;
                      })
                    )
                  )
                }
                isSubmitting={updateUserLoading}
              >
                <FormControl>
                  <FormLabel>E-Mail</FormLabel>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
              </ChangeDataField>
            </Stack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default SettingsModal;
