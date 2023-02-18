import React, { useState, useEffect, useContext } from "react";
import Context from "../context";
import { useProvider } from "wagmi";
import { useSigner, useContract, useAccount } from "wagmi";
import contractConfig from "../contractConfig.json";
import { ethers } from "ethers";
import { useRouter } from "next/router";

import { assestResDum } from "@/helpers/assetRespDum";
import Image from "next/image";
import tanjiro from "../public/images/tanjiro.webp";
import UploadModal from "@/components/uploadModal";
import LivepeerUploader from "@/helpers/uploadFile/uploader";
import { CyanBtn } from "@/helpers/utils/buttons";
import VideoComponent from "@/components/videoComponent";

const Explore = () => {
  const context = useContext(Context);
  const router = useRouter();
  const provider = useProvider();
  const [videoExplore, setVideoExplore] = useState(true);
  const [streamExplore, setStreamExplore] = useState(false);
  const { data: signer, isError, isLoading } = useSigner();
  const { address } = useAccount();
  const [flowRate, setFlowRate] = useState();
  const lastTimestamp = [];

  useEffect(() => {
    context.setActiveClass({
      explore: true,
      upload: false,
      create: false,
      collection: false,
      myProfile: false,
    });
  }, []);

  useEffect(() => {
    if (provider && signer) {
      context.initSf(provider);
    }
  }, [provider, signer, context.superToken]);

  useEffect(() => {
    context.setSigner(signer);
    const getUploadVideoEvents = async () => {
      const contractEthers = new ethers.Contract(
        contractConfig.address,
        contractConfig.abi,
        signer
      );
      context.setContractEthers(contractEthers);
      console.log(contractEthers);

      const allVideos = await contractEthers.showAllVideos(address);
      context.setAllVideos(allVideos);
      console.log(allVideos);
    };

    if (provider && signer) {
      getUploadVideoEvents();
    }
  }, [provider, signer]);

  const convFlowRate = (_flowRate) => {
    const flowRate = (_flowRate / 10 ** 18).toString();
    setFlowRate(flowRate);
    return flowRate;
  };

  return (
    <div className="pt-10 pb-10">
      <div className="w-full flex gap-x-20 mb-8">
        <CyanBtn
          data={"Videos"}
          className="text-2xl"
          onClick={() => {
            setVideoExplore(true);
            setStreamExplore(false);
          }}
        />
        <CyanBtn
          data={"Stream"}
          className="text-2xl"
          onClick={() => {
            setVideoExplore(false);
            setStreamExplore(true);
            console.log(signer, context.signer, context.contractEthers);
          }}
        />
      </div>
      {/* <div>{context.superTokenBalance}</div> */}
      {/* <span>{context.allVideos[0].videoId.toString()}</span> */}
      <div className="text-4xl font-sansationR pb-8">Explore</div>
      {videoExplore ? (
        <div className="grid gap-x-14 gap-y-10 grid-flow-row grid-cols-3">
          {/* mapping into divs */}
          {context.allVideos?.map((video, index) => {
            return <VideoComponent key={video.videoId} video={video} />;
          })}
          {context.allVideos.length == 0 && <span className="text-4xl font-sansationR pb-8">There are no videos</span>}
          {/* mapping into divs */}
        </div>
      ) : (
        <div className="grid gap-x-14 gap-y-10 grid-flow-row grid-cols-3">
          {/* mapping into divs */}
          {context.allVideos?.map((video, index) => {
            return (
              <div key={index} className="font-sansationR">
                <div className="w-80 cursor-pointer">
                  <Image
                    src={tanjiro}
                    alt={"rrr image"}
                    style={{
                      borderRadius: "2rem 2rem 1rem 1rem ",
                    }}
                    onClick={() => {}}
                  />
                </div>
                <div className="text-grey">{video.videoDesp}</div>
                <div className="flex justify-between text-white text-lg font-sansationB">
                  <div>{video.videoTitle}</div>
                  <div>{(video.duration / 10 ** 18).toString()}</div>
                </div>
                <div className="text-grey text-sm">
                  {video.uploadDate.toString()}
                </div>
              </div>
            );
          })}
          {/* mapping into divs */}
        </div>
      )}
    </div>
  );
};

export default Explore;
