import { Flex, Stack } from "@chakra-ui/react";
import { FunctionComponent, ReactNode } from "react";
import Navbar from "../widgets/Navbar/Navbar";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { COLORS } from "@/config/constants";
import { ReactLenis } from "@studio-freight/react-lenis";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Stack w="full" h="100vh">
        <Navbar />
        <AnimatePresence mode="wait" initial={false}>
          {children}
        </AnimatePresence>
      </Stack>

      <Toaster
        toastOptions={{
          style: {},
        }}
      />
    </>
  );
};

export default MainLayout;
