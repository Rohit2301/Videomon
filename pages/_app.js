import "@/styles/globals.css";
import Layout from "@/components/Layouts/layout/layout";
import { AuthProvider } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
//Rainbow Kit Imports
import { publicProvider } from "wagmi/providers/public";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  polygonMumbai,
  filecoinHyperspace,
} from "wagmi/chains";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
//Rainbow Kit Imports

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});

const authProvider = new AuthProvider(
  "42d7faabefb92836f3116ec0960e5b5da56b1f84",
  {
    position: "left", // defaults to right
    theme: "light", // defaults to dark
    alwaysVisible: false, // defaults to true which is Full UI mode
    network: "testnet",
  }
);

//Rainbow Kit for Wallet Connection
const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, polygonMumbai, filecoinHyperspace],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
//Rainbow Kit for Wallet Connection

export default function App({ Component, pageProps }) {
  return (
    <LivepeerConfig client={livepeerClient}>
      <ProvideAuth provider={authProvider}>
        <Layout>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
              <Component {...pageProps} />
            </RainbowKitProvider>
          </WagmiConfig>
        </Layout>
      </ProvideAuth>
    </LivepeerConfig>
  );
}
