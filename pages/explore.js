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
import StreamComponent from "@/components/streamComponent";
import PropagateLoader from "react-spinners/PropagateLoader";

const Explore = () => {
  const context = useContext(Context);
  const router = useRouter();
  const provider = useProvider();
  const [videoExplore, setVideoExplore] = useState(true);
  const [streamExplore, setStreamExplore] = useState(false);
  const [loading, setLoading] = useState(false);
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
  }, [provider, signer]);

  useEffect(() => {
    context.setSigner(signer);
    const getUploadedVideosStreams = async () => {
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
      const allStreams = await contractEthers.showAllStreams();
      context.setUploadedStreams(allStreams);
      console.log(allStreams);
    };

    if (provider && signer) {
      getUploadedVideosStreams();
    }
  }, [provider, signer, context.uploadedStreams, context.allVideos]);

  const convFlowRate = (_flowRate) => {
    const flowRate = (_flowRate / 10 ** 18).toString();
    setFlowRate(flowRate);
    return flowRate;
  };

  return (
    <div>
      <div
        className={`${
          loading
            ? "z-10 absolute  w-[70rem] h-[34rem] flex justify-center items-center"
            : "w-0 h-0"
        }`}
      >
        {loading ? (
          <PropagateLoader color={"#76DDDD"} loading={loading} size={16} />
        ) : (
          <></>
        )}
      </div>
      <div className={`z-0 ${loading ? "opacity-30" : ""}`}>
        <div className="pt-10 pb-10">
          <div className="w-full flex gap-x-20 mb-8">
            <div
              onClick={() => {
                setVideoExplore(true);
                setStreamExplore(false);
              }}
            >
              <CyanBtn data={"Videos"} className="text-2xl" />
            </div>
            <div
              onClick={() => {
                setVideoExplore(false);
                setStreamExplore(true);
                console.log(signer, context.signer, context.contractEthers);
              }}
            >
              <CyanBtn data={"Streams"} className="text-2xl" />
            </div>
          </div>
          {/* <div>{context.superTokenBalance}</div> */}
          {/* <span>{context.allVideos[0].videoId.toString()}</span> */}
          <div className="text-4xl font-sansationR pb-8">Explore</div>
          {videoExplore ? (
            <div className="grid gap-x-14 gap-y-10 grid-flow-row grid-cols-3">
              {/* mapping into divs */}
              {context.allVideos?.map((video, index) => {
                return <VideoComponent key={video.cId} video={video} setLoading={setLoading}/>;
              })}
              {context.allVideos.length == 0 && (
                <span className="text-4xl font-sansationR pb-8">
                  There are no videos
                </span>
              )}
              {/* mapping into divs */}
            </div>
          ) : (
            <div className="grid gap-x-14 gap-y-10 grid-flow-row grid-cols-3">
              {/* mapping into divs */}
              {context.uploadedStreams?.map((stream, index) => {
                return (
                  <>
                    <StreamComponent key={stream.cId} stream={stream} setLoading={setLoading}/>
                  </>
                );
              })}
              {context.uploadedStreams.length == 0 && (
                <span className="text-4xl font-sansationR pb-8">
                  There are no Live streams
                </span>
              )}
              {/* mapping into divs */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
