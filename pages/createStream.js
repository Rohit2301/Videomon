import DragDropModal from "@/components/uploadPage/dragDropModal";
import { CyanBtn } from "@/helpers/utils/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  StreamDespInput,
  StreamTitleInput,
  StreamPriceInput,
} from "@/components/uploadPage/textField";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useState, useEffect, useRef } from "react";
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
import { useContract, useAccount } from "wagmi";


const CreateStream = () => {
  const textRef = useRef(null);
  const textRef2 = useRef(null);
  const [streamId, setStreamId] = useState()
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
  const allRight =
    streamTitle != "" &&
    streamDesp != "" &&
    streamPrice != "" &&
    streamPicName != "Select"

  const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  const context = useContext(Context);
  const { address } = useAccount();

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

  const handleCopyClick = () => {
    const range = document.createRange();
    range.selectNode(textRef.current);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };

  const handleCopyClick2 = () => {
    const range = document.createRange();
    range.selectNode(textRef.current);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };
  const streamStart = async (e) => {
    setLoading(true)
    e.preventDefault()
    const streamPriceBig = ethers.utils.parseUnits(streamPrice.toString(), 18);
    const txn = await context.contractEthers.streamStart(stream.playbackId, streamTitle, streamDesp, streamPicCid, streamPriceBig);
    await txn.wait();
    console.log("Clicked")
    const streamId = await context.contractEthers.currVideoId()
    console.log(parseInt(streamId))
    setStreamId(parseInt(streamId))
    setStreamCreated(true);
    setLoading(false)
  };

  const stopStream = async () => {
    setLoading(true)
    const txn = await context.contractEthers.stopStream(streamId, address);
    await txn.wait();
    setLoading(false)
    router.push("explore")
  }

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
              streamStart(e);
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
                        label={"Flow Rate"}
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
                          overflow={streamPicName.length > 8}
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
                  <div className="w-full flex flex-row justify-start items-center">
                    <div
                      className="w-[40%]"
                      onClick={() => {
                        console.log("clicked")
                        createStream?.();
                      }}
                    >
                      {" "}
                      <CyanBtn data={"Get Stream Key"} size="text-sm"></CyanBtn>
                    </div>
                    {stream?.streamKey ? (
                      <>
                        <span
                          className="ml-5 mr-5 text-xs font-bold"
                          ref={textRef}
                        >
                          {stream.streamKey}
                        </span>{" "}
                        <ContentCopyIcon
                          className="cursor-pointer"
                          onClick={() => {
                            handleCopyClick();
                          }}
                        >
                          Copy
                        </ContentCopyIcon>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <span>Server :</span>
                    <span className="mr-5 ml-2" ref={textRef2}>
                      rtmp://rtmp.livepeer.com/live
                    </span>
                    <ContentCopyIcon
                      className="cursor-pointer"
                      onClick={() => {
                        handleCopyClick2();
                      }}
                    >
                      Copy
                    </ContentCopyIcon>
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
                <CyanBtn 
                invalid={!allRight}
                >
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
          <div className="relative mt-16 ml-60 w-[65%] flex flex-col justify-center items-center">
            {stream?.playbackId ? (
              <>
                <Player
                  title={stream?.name}
                  playbackId={stream?.playbackId}
                  autoPlay
                  muted
                />
                <div className="mt-5" onClick={()=>{stopStream()}}>
                  <CyanBtn data={"Stop Stream"} size="text-sm"></CyanBtn>
                </div>
              </>
            ) : (
              <div className="text-4xl font-sansationR pb-8">The Stream has Stopped</div>
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
