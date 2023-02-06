import "@/styles/globals.css";
import Layout from "@/components/Layouts/layout/layout";
import { AuthProvider } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";

const provider = new AuthProvider("42d7faabefb92836f3116ec0960e5b5da56b1f84", {
  position: "left", // defaults to right
  theme: "light", // defaults to dark
  alwaysVisible: false, // defaults to true which is Full UI mode
  network: "testnet",
});

export default function App({ Component, pageProps }) {
  return (
    <ProvideAuth provider={provider}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProvideAuth>
  );
}
