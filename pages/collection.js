import { assestResDum } from "@/helpers/assetRespDum";
import rrr from "../public/images/rrr.png";
import tanjiro from "../public/images/tanjiro.webp";
import Image from "next/image";
import { useEffect } from "react";
import Context from "../context";
import { useContext } from "react";
import { useRouter } from "next/router";
import VideoComponent from "@/components/videoComponent";
import { useSigner, useContract, useAccount } from "wagmi";
import contractConfig from "../contractConfig.json";
import { useProvider } from "wagmi";
import Head from "next/head";
import { ethers } from "ethers";

const Collection = () => {
  const router = useRouter();
  const context = useContext(Context);
  const { data: signer, isError, isLoading } = useSigner();
  const provider = useProvider();
  const { address } = useAccount();

  useEffect(() => {
    context.setActiveClass({
      explore: false,
      upload: false,
      create: false,
      collection: true,
      myProfile: false,
    });
  }, []);

  useEffect(() => {
    context.setSigner(signer);
    const getWatchingVideos = async () => {
      const contractEthers = new ethers.Contract(
        contractConfig.address,
        contractConfig.abi,
        signer
      );
      context.setContractEthers(contractEthers);
      console.log(contractEthers);

      const watchingVideos = await contractEthers.showWatchingVideos(address);
      context.setWatchingVideos(watchingVideos);
      console.log(watchingVideos);
    };

    if (provider && signer) {
      getWatchingVideos();
    }
  }, [provider, signer, context.watchingVideos]);

  return (
    <>
      <Head>
        <title>Videomon</title>
      </Head>
      <div className="pt-14 pb-10">
        <div className="text-4xl font-sansationR pb-8">My Collection</div>
        <div className="grid gap-x-14 gap-y-10 grid-flow-row grid-cols-3">
          {context.watchingVideos?.map((video, index) => {
            return <VideoComponent key={video.cId} video={video} />;
          })}
        </div>
      </div>
    </>
  );
};
export default Collection;
