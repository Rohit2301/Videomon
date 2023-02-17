import React, { useState, useEffect, useContext } from "react";
import Context from "../context";
import { useProvider } from "wagmi";
import { useSigner, useContract, useAccount } from "wagmi";
import contractConfig from "../contractConfig.json";
import { ethers } from "ethers";

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
    context.setSigner(signer);
    console.log(signer);
    const getUploadVideoEvents = async () => {
      const contractEthers = new ethers.Contract(
        contractConfig.address,
        contractConfig.abi,
        signer
      );
      context.setContractEthers(contractEthers);
      console.log(contractEthers)

      // const filter = contractEthers.filters.VideoUploaded();
      // console.log(filter)
      // const logs = await provider.getLogs({ address: contractConfig.contractAddress, topics: filter.topics });
      // console.log(logs)
      // const decodedEvents = logs.map((log) => {
      //   const parsedLog = contractEthers.interface.parseLog(log);
      //   return parsedLog.args;
      // });
      // console.log(decodedEvents)
      // context.setAllVideos(decodedEvents)

      const allVideos = await contractEthers.showAllVideos(address);
      context.setAllVideos(allVideos);
      console.log(allVideos)
    };

    if(provider && signer){
      getUploadVideoEvents();
    }
  }, [provider, signer]);


  return (
    <div className="pt-14 pb-10">
      <div className="w-full">
        <div>Videos</div>
        <div
          onClick={() => {
            console.log(signer, context.signer, context.contractEthers);
          }}
        >
          Stream
        </div>
      </div>
      <div>{context.superTokenBalance}</div>
      {/* <span>{context.allVideos[0].videoId.toString()}</span> */}
      <div className="text-4xl font-sansationR pb-8">Explore</div>
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
                <div>{(video.duration/10**18).toString()}</div>
              </div>
              <div className="text-grey text-sm">{video.uploadDate.toString()}</div>
            </div>
          );
        })}
        {/* mapping into divs */}
      </div>
    </div>
  );
};

export default Explore;
