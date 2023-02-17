import DragDropModal from "@/components/uploadPage/dragDropModal";
import { CyanBtn } from "@/helpers/utils/buttons";
import {
  StreamDespInput,
  StreamTitleInput,
  StreamPriceInput,
} from "@/components/uploadPage/textField";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useState, useEffect } from "react";
import Context from "../context";
import { useContext } from "react";
import { useSigner } from "wagmi";
import { BigNumber, ethers } from "ethers";
import { NFTStorage, File, Blob } from "nft.storage";
import IPFS from "ipfs-http-client";
import { useCreateAsset } from "@livepeer/react";
import { useMemo } from "react";
import { useRouter } from "next/router.js";
import Logo from "../public/Logo.png";
import dynamic from "next/dynamic";
import React from "react";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { Player, useCreateStream } from "@livepeer/react";
import ReactModal from "react-modal";
import StreamPlayer from "./StreamPlayer";
import Image from "next/image";
import PropagateLoader from "react-spinners/PropagateLoader";

const CreateStream = () => {
  const [streamTitle, setStreamTitle] = useState();
  const [streamDesp, setStreamDesp] = useState();
  const [streamPic, setStreamPic] = useState();
  const [streamPicName, setStreamPicName] = useState("Select");
  const [streamPicCid, setStreamPicCid] = useState();
  const [streamPrice, setStreamPrice] = useState();
  const router = useRouter();
  const { data: signer } = useSigner();
  const [imageSrc, setImageSrc] = useState(null);
  const [streamCreated, setStreamCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  const context = useContext(Context);

  useEffect(() => {
    context.setSigner(signer);
    context.setActiveClass({
      explore: false,
      upload: false,
      create: true,
      collection: false,
      myProfile: false,
    });
  }, [signer]);

  function fileToBlob(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = () => {
        const blob = new Blob([reader.result], { type: file.type });
        resolve(blob);
      };
      reader.onerror = () => {
        reject(new Error("Error converting file to blob"));
      };
    });
  }

  const thumbnailUploader = async (e) => {
    setLoading(true);
    const thumbnailName = e.target.files[0].name;
    setStreamPicName(thumbnailName);
    const thumbnail = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(thumbnail);
    // console.log(thumbnail);
    const imageFile = new File([thumbnail], thumbnailName, {
      type: thumbnail.type,
    });
    const blobFile = await fileToBlob(imageFile);
    const cid = await client.storeBlob(blobFile);
    console.log(cid);
    setStreamPicCid(cid);
    setLoading(false);
  };
  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(
    streamTitle
      ? {
          name: streamTitle,
          playbackPolicy: {
            type: "public",
          },
        }
      : null
  );
  const isLoading = useMemo(() => status === "loading", [status]);
  const handleUpload = async (e) => {
    e.preventDefault();
    createStream?.();
    // console.log(stream);
    setStreamCreated(true);
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
        {!streamCreated ? (
          <form
            onSubmit={(e) => {
              handleUpload(e);
            }}
          >
            <div className="flex flex-col items-center justify-center py-16 px-20 gap-y-10 ">
              <div className="self-start text-2xl font-sansationR text-white">
                Enter the details of your Stream
              </div>
              <div className="flex items-center justify-center gap-x-40">
                {/* -----------------------------inputs----------------------------- */}
                <div className="flex flex-col gap-y-10 self-start">
                  <div>
                    <StreamTitleInput
                      label={"Title"}
                      setStreamTitle={setStreamTitle}
                    />
                  </div>
                  <div>
                    {
                      <StreamDespInput
                        label={"Description"}
                        setStreamDesp={setStreamDesp}
                      />
                    }
                  </div>
                  <div>
                    {
                      <StreamPriceInput
                        label={"Price"}
                        setStreamPrice={setStreamPrice}
                      />
                    }
                  </div>
                  {/* -----------------------------inputs----------------------------- */}
                  {/* -----------------------------thumbnail----------------------- */}
                  <div className="flex items-center justify-between pr-5">
                    <div className="relative font-sansationR text-xl">
                      Thumbnail
                    </div>
                    {client ? (
                      <div className="w-30 relative">
                        <CyanBtn
                          data={streamPicName}
                          size="text-lg"
                          // overflow={thumbnailName.length > 8}
                        >
                          <input
                            id="thumbnail"
                            name="thumbnail"
                            type="file"
                            className="absolute inset-0 opacity-0 w-full h-full"
                            onChange={(e) => {
                              thumbnailUploader(e);
                            }}
                          ></input>
                        </CyanBtn>
                      </div>
                    ) : (
                      "Please connect ipfs first"
                    )}
                    <div>
                      {
                        imageSrc ? (
                          <>
                            <img
                              className="image"
                              alt={`Uploaded `}
                              src={imageSrc}
                              style={{ maxWidth: "80px", margin: "0px" }}
                              // key={uploadedImages.cid.toString()}
                            />
                          </>
                        ) : (
                          <></>
                        )
                        // ))
                      }
                    </div>
                  </div>
                  {/* -----------------------------thumbnail----------------------- */}
                </div>
                {/* -------------------------------Utube video player------------------------ */}
                <div>
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=5Eqb_-j3FDA"
                    width="480px"
                    height="320px"
                    controls
                  />
                </div>
              </div>
              {/* -------------------------------Utube video player------------------------ */}
              {/* ------------------------------upload from btn------------------------ */}
              <div className="relative w-52 right-20">
                <CyanBtn>
                  <input
                    type="submit"
                    value="Create Stream"
                    className="cursor-pointer"
                    disabled={isLoading || !createStream}
                  />
                </CyanBtn>
              </div>
              {/* ------------------------------upload from btn------------------------ */}
            </div>
          </form>
        ) : (
          <div className="relative mt-28 ml-10">
            {stream?.playbackId && (
              <Player
                title={stream?.name}
                playbackId={stream?.playbackId}
                autoPlay
                muted
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default CreateStream;
{
  /* <sc */
}
