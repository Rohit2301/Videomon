import { assestResDum } from "@/helpers/assetRespDum";
import rrr from "../public/images/rrr.png";
import React, { useState, useEffect, useContext } from "react";
import contractConfig from "../contractConfig.json";
import { useProvider } from "wagmi";
import { ethers } from "ethers";
import tanjiro from "../public/images/tanjiro.webp";
import Image from "next/image";
import Context from "../context";
import { useSigner, useContract, useAccount } from "wagmi";
import { getEllipsisTxt } from "@/helpers/formatters";
import { useRouter } from "next/router";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { data: signer, isError, isLoading } = useSigner();
  const provider = useProvider();

  useEffect(() => {
    const getUploadedVideos = async () => {
      const contractEthers = new ethers.Contract(
        contractConfig.address,
        contractConfig.abi,
        signer
      );
      context.setContractEthers(contractEthers);
      console.log(context.contractEthers);
      const uploadedVideos = await contractEthers.showMyVideos(address);
      context.setUploadedVideos(uploadedVideos);
    };
    if (provider && signer) {
      getUploadedVideos();
    }
  }, [provider, signer]);

  const context = useContext(Context);

  useEffect(() => {
    context.setActiveClass({
      explore: false,
      upload: false,
      create: false,
      collection: false,
      myProfile: true,
    });
  }, []);
  return (
    <div className="">
      <div className="font-sansationR text-4xl pt-12 pb-8">
        {getEllipsisTxt(address, 6)}
      </div>
      <div className="grid gap-x-14 gap-y-10 grid-flow-row grid-cols-3">
        {/* {context.uploadedVideos?.map((video, index) => {
          return (
            <div key={index} className="font-sansationR">
              <div className="w-80 cursor-pointer">
                <Image
                  src={tanjiro}
                  alt={"rrr image"}
                  style={{
                    borderRadius: "2rem 2rem 1rem 1rem ",
                  }}
                  onClick={() => {
                    router.push("/VideoPlayer");
                  }}
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
        })} */}
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
                  onClick={() => {
                    router.push(
                      {
                        pathname: "/profilePlayer",
                        query: { playbackId: "53932ruib4qgqauz" },
                      },
                      "/profilePlayer"
                    );
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
      </div>
    </div>
  );
};
export default Profile;
