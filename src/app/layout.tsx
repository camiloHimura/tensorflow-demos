"use client";

import {
  defaultTheme,
  Flex,
  Provider,
  ToastContainer,
  View,
} from "@adobe/react-spectrum";
import "./globals.scss";
import { Sidebar } from "./sidebar/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider theme={defaultTheme}>
          <ToastContainer placement="top end" />
          <Flex direction="row" height="100%">
            <View width="size-3000" height="100vh" padding="size-200">
              <Sidebar />
            </View>
            <View flex={1} backgroundColor={"gray-50"}>
              {children}
            </View>
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
