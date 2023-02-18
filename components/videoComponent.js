import React, { useState, useEffect, useContext } from "react";
import Context from "../context";
import { useRouter } from "next/router";
import { useSigner, useContract, useAccount } from "wagmi";

const VideoComponent = ({ video }) => {
  const context = useContext(Context);
  const router = useRouter();
  const { address } = useAccount();
  const [startTime, setStartTime] = useState();

  const videoStart = async (_uploader, _flowRate, _videoId) => {
    console.log(video);
    const txn1 = await context.contractEthers.viewVideo(_videoId);
    await txn1.wait();
    let flowOp = context.superToken.createFlow({
      sender: address,
      receiver: _uploader,
      flowRate: _flowRate,
    });
    const txn2 = await flowOp.exec(context.signer);
    await txn2.wait();
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
            className="w-full h-full object-contain sidebarGradient"
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
      <div className="text-grey">{video.videoDesp}</div>
      <div className="flex justify-between text-white text-lg font-sansationB">
        <div>{video.videoTitle}</div>
        <div>{(video.duration / 10 ** 18).toString()}</div>
      </div>
      <div className="text-grey text-sm">{video.uploadDate.toString()}</div>
      <div className="text-grey text-sm">
        {/* {parseFloat((video.flowRate / 10 ** 18).toFixed(7))} */}
        {startTime}
      </div>
    </div>
  );
};

export default VideoComponent;
