import { Button, Flex, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FunctionComponent, ReactNode } from "react";
import { MdCheck } from "react-icons/md";

interface ChangeDataFieldProps {
  children: ReactNode;
  canSubmit: boolean;
  isSubmitting?: boolean;
  onSubmit: () => void;
}

const ChangeDataField: FunctionComponent<ChangeDataFieldProps> = ({
  children,
  onSubmit,
  isSubmitting,
  canSubmit,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Flex pos="relative" align="flex-end">
        <motion.div
          style={{ width: "100%" }}
          animate={{ marginRight: canSubmit ? "50px" : "0px" }}
        >
          {children}
        </motion.div>
        <motion.div
          style={{ position: "absolute", right: "0", opacity: 0 }}
          animate={{ opacity: canSubmit ? 1 : 0 }}
        >
          <IconButton
            variant="primary"
            type="submit"
            icon={<MdCheck />}
            aria-label="Done"
            isLoading={isSubmitting}
          />
        </motion.div>
      </Flex>
    </form>
  );
};

export default ChangeDataField;
