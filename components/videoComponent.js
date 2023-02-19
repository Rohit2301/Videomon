import React, { useState, useEffect, useContext } from "react";
import Context from "../context";
import { useRouter } from "next/router";
import { SecondsToHms } from "@/helpers/formatters";
import SuperMatic from "./superMatic";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useSigner, useContract, useAccount } from "wagmi";
import PropagateLoader from "react-spinners/PropagateLoader";

const VideoComponent = ({ video, setLoading }) => {
  const context = useContext(Context);
  const router = useRouter();
  const { address } = useAccount();
  const [startTime, setStartTime] = useState();
  TimeAgo.addDefaultLocale(en)
  const timeAgo = new TimeAgo('en-US')

  const videoStart = async (_uploader, _flowRate, _videoId) => {
    setLoading(true);
    console.log(video);
    const txn1 = await context.contractEthers.viewVideo(_videoId);
    await txn1.wait();
    console.log(_flowRate.toString());
    let flowOp = context.superToken.createFlow({
      sender: address,
      receiver: _uploader,
      flowRate: _flowRate,
    });
    const txn2 = await flowOp.exec(context.signer);
    await txn2.wait();
    setLoading(false);
    router.push(
      {
        pathname: "/VideoPlayer",
        query: {
          videoId: video.videoId.toString(),
          cId: video.cId,
          videoTitle: video.videoTitle,
          videoDesp: video.videoDesp,
          videoPic: video.videoPic,
          uploader: video.uploader,
          uploadDate: video.uploadDate.toString(),
          price: video.price.toString(),
          duration: video.duration.toString(),
          flowRate: video.flowRate.toString(),
          viewers: video.viewers,
          sender: address,
          startTime: startTime,
        },
      },
      "/VideoPlayer"
    );
  };

  useEffect(() => {
    const getStartTime = async () => {
      const startTime = await context.contractEthers.videoIdToLastTimestamp(
        address,
        video.videoId
      );
      const startTimeConv = parseFloat((startTime / 10 ** 18).toString());
      setStartTime(startTimeConv);
    };
    if (video) {
      getStartTime();
    }
  }, []);

  return (
    <div className="font-sansationR">
      <div className="w-80 cursor-pointer">
        <div className="w-full h-[11.25rem]">
          <img
            src={`https://ipfs.io/ipfs/${video.videoPic}`}
            alt={"rrr image"}
            className="w-full h-full object-contain sidebarGradient hover:border hover:border-cyan hover:border-2 hover:animate-pulse"
            style={{
              borderRadius: "2rem 2rem 1rem 1rem ",
            }}
            onClick={() => {
              videoStart(
                video.uploader,
                video.flowRate.toString(),
                video.videoId
              );
            }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center text-white text-lg font-sansationB">
        <div>{video.videoTitle}</div>
        <div className="text-sm">
          {SecondsToHms(parseFloat(video.duration / 10 ** 18))}
        </div>
      </div>
      <div className="flex justify-between items-center text-white text-lg font-sansationB">
        <div className="text-grey text-sm">{video.videoDesp}</div>
        <div className="flex flex-row justify-center items-center gap-2">
          <span>{parseFloat(video.flowRate / 10 ** 18).toPrecision(2)}</span>
          <SuperMatic></SuperMatic>
          <span className="text-grey text-xs">/s</span>
        </div>
      </div>
      <div className="text-grey text-xs">
        {timeAgo.format(video.uploadDate * 1000)}
      </div>
    </div>
  );
};

export default VideoComponent;
