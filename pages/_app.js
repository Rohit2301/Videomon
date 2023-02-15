import "@/styles/globals.css";
import Layout from "@/components/Layouts/layout/layout";
import { Framework } from "@superfluid-finance/sdk-core";
import { useSigner, useContract, useProvider, useAccount } from "wagmi";
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
import React, { useState, useEffect } from "react";
import Context from "../context";

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
  const [activeClass, setActiveClass] = useState({
    explore: true,
    create: false,
    collection: false,
    myProfile: false,
  });
  const [sf, setSf] = useState();
  const [superToken, setSuperToken] = useState();
  const [superTokenBalance, setSuperTokenBalance] = useState();
  const { address } = useAccount();

  const [videoFile, setVideoFile] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [videoDuration, setVideoDuration] = useState();
  const [videoTitle, setVideoTitle] = useState();
  const [videoDescription, setVideoDescription] = useState();

  const initSf = async (provider) => {
    const sf = await Framework.create({
      chainId: provider.network.chainId, //your chainId here
      provider,
    });
    setSf(sf);
    console.log(sf);
    console.log(provider.network.chainId);
    if (provider.network.chainId == "80001") {
      const maticX = await sf.loadSuperToken(
        "0x96B82B65ACF7072eFEb00502F45757F254c2a0D4"
      );
      console.log(maticX);
      setSuperToken(maticX);
      const maticXBalance = await maticX.balanceOf({
        account: address,
        providerOrSigner: provider,
      });
      setSuperTokenBalance(maticXBalance);
    }
  };

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <LivepeerConfig client={livepeerClient}>
          <Context.Provider
            value={{
              activeClass,
              setActiveClass,
              sf,
              setSf,
              superToken,
              setSuperToken,
              superTokenBalance,
              setSuperTokenBalance,
              initSf,
              videoFile,
              setVideoFile,
              thumbnail,
              setThumbnail,
              videoDuration,
              setVideoDuration,
              videoTitle,
              setVideoTitle,
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Context.Provider>
        </LivepeerConfig>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
