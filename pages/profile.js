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
import { SecondsToHms } from "@/helpers/formatters";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Link from "next/link";
import SuperMatic from "@/components/superMatic";

const Profile = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { data: signer, isError, isLoading } = useSigner();
  const provider = useProvider();
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");

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
        {context.uploadedVideos?.map((video, index) => {
          return (
            <div key={index} className="font-sansationR">
              <div className="w-80 cursor-pointer">
                <div className="w-full h-[11.25rem]">
                  <img
                    src={`https://ipfs.io/ipfs/${video.videoPic}`}
                    // src={tanjiro}
                    alt={"rrr image"}
                    className="w-full h-full object-contain sidebarGradient hover:border hover:border-cyan hover:border-2 hover:animate-pulse"
                    style={{
                      borderRadius: "2rem 2rem 1rem 1rem ",
                    }}
                    onClick={() => {
                      router.push(
                        {
                          pathname: "/profilePlayer",
                          query: { playbackId: video.cId },
                        },
                        "/profilePlayer"
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
                {/* <div className="flex flex-row justify-center items-center gap-2">
                <span>{parseFloat(video.flowRate/10**18).toPrecision(2)}</span>
                <SuperMatic></SuperMatic>
                <span className="text-grey text-xs">/s</span>
              </div> */}
              </div>

              <div className="text-grey text-xs">
                {timeAgo.format(video.uploadDate * 1000)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Profile;
