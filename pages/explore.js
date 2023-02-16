import React, { useState, useEffect, useContext } from "react";
import Context from "../context";
import { useProvider } from "wagmi";
import { useSigner, useContract, useAccount } from "wagmi";
import contractConfig from "../contractConfig.json"

import { assestResDum } from "@/helpers/assetRespDum";
import Image from "next/image";
import tanjiro from "../public/images/tanjiro.webp";
import UploadModal from "@/components/uploadModal";

import LivepeerUploader from "@/helpers/uploadFile/uploader";

const Explore = () => {
  const context = useContext(Context);
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  const { address } = useAccount();
  useEffect(() => {
    const getUploadVideoEvents = async () => {
      const showAllVideos = await context.contractEthers.showAllVideos(address);
      context.setAllVideos(showAllVideos);
    };
    if (provider && signer) {
      context.initSf(provider);
      getUploadVideoEvents();
    }
  }, [provider, signer]);

  return (
    <div className="pt-14 pb-10">
      <div className="w-full">
        <div>Videos</div>
        <div>Stream</div>
      </div>
      <div>{context.superTokenBalance}</div>
      <span>{context.allVideos[0].videoId.toString()}</span>
      <div className="text-4xl font-sansationR pb-8">Explore</div>
      <div className="grid gap-x-14 gap-y-10 grid-flow-row grid-cols-3">
        {/* mapping into divs */}
        {assestResDum.map((asset, index) => {
          const {
            videoId,
            cId,
            videoTitle,
            videoDesp,
            uploadDate,
            price,
            duration,
            flowRate,
          } = asset;
          return (
            <div key={index} className="font-sansationR">
              <div className="w-80 cursor-pointer">
                <Image
                  src={tanjiro}
                  alt={"rrr image"}
                  style={{
                    borderRadius: "2rem 2rem 1rem 1rem ",
                  }}
                />
              </div>
              <div className="text-grey">{videoDesp}</div>
              <div className="flex justify-between text-white text-lg font-sansationB">
                <div>{videoTitle}</div>
                <div>{duration}</div>
              </div>
              <div className="text-grey text-sm">{uploadDate}</div>
            </div>
          );
        })}
        {/* mapping into divs */}
      </div>
    </div>
  );
};

export default Explore;
