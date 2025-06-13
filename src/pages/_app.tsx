import store from "@/app/store";
import MainLayout from "@/components/global/layouts/MainLayout";
import AuthWrapper from "@/components/global/wrappers/AuthWrapper";
import theme from "@/config/theme/theme";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import "@fontsource-variable/outfit";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <AuthWrapper>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </AuthWrapper>
      </Provider>
    </ChakraProvider>
  );
}
