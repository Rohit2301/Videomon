import "@/styles/globals.css";
import Layout from "@/components/Layouts/layout/layout";
// --------------------------------------------Livepeer--------------------------------------------------
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});
// --------------------------------------------Livepeer--------------------------------------------------

// =-------------------------------------------Connectors------------------------------------------------------
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { ArcanaConnector } from "@arcana/auth-wagmi";
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

export const ArcanaRainbowConnector = ({ chains }) => {
  return {
    id: "arcana-auth",
    name: "Arcana Wallet",
    iconUrl: "",
    iconBackground: "#101010",
    createConnector: () => {
      const connector = new ArcanaConnector({
        chains,
        options: {
          appId: "20B0B836C92D91Ba2059d6Fa76073Ac431A56B64",
        },
      });
      return {
        connector,
      };
    },
  };
};

const connectors = (chains) =>
  connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [ArcanaRainbowConnector({ chains }), metaMaskWallet({ chains })],
    },
  ]);

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, polygonMumbai, filecoinHyperspace],
  [publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors(chains),
  provider,
});

// =-----------------------------------------Connectors-----------------------------------------------------------

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <LivepeerConfig client={livepeerClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LivepeerConfig>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
