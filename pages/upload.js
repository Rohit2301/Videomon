import DragDropModal from "@/components/uploadPage/dragDropModal";
import { CyanBtn } from "@/helpers/utils/buttons";
import { useState, useEffect } from "react";
import Context from "../context";
import { useContext } from "react";
import { useSigner } from "wagmi";
import { BigNumber, ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { NFTStorage, File, Blob } from "nft.storage";
import IPFS from "ipfs-http-client";
import {
  VideoTitleInput,
  VideoDescriptionInput,
  VideoPriceInput,
} from "@/components/uploadPage/textField";
import { useCreateAsset } from "@livepeer/react";
import { useMemo } from "react";
import { useRouter } from "next/router.js";

const Upload = () => {
  const router = useRouter();
  const { data: signer } = useSigner();
  const [fileName, setFileName] = useState("");
  const [video, setVideo] = useState();
  const [imageSrc, setImageSrc] = useState(null);
  //
  const [videoPicCid, setVideoPicCid] = useState();
  const [thumbnailName, setThumbnailName] = useState("Select");
  const [videoDuration, setVideoDuration] = useState();
  const [videoTitle, setVideoTitle] = useState();
  const [videoDescription, setVideoDescription] = useState();
  const [videoPrice, setVideoPrice] = useState();
  //

  const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  const context = useContext(Context);

  useEffect(() => {
    context.setSigner(signer);
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
    const thumbnailName = e.target.files[0].name;
    setThumbnailName(thumbnailName);
    const thumbnail = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(thumbnail);
    console.log(thumbnail);
    const imageFile = new File([thumbnail], thumbnailName, {
      type: thumbnail.type,
    });
    const blobFile = await fileToBlob(imageFile);
    const cid = await client.storeBlob(blobFile);
    console.log(cid);
    setVideoPicCid(cid);
  };

  const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: fileName, file: video }],
        }
      : null
  );
  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === "failed"
        ? "Failed to process video."
        : progress?.[0].phase === "waiting"
        ? "Waiting"
        : progress?.[0].phase === "uploading"
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === "processing"
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress]
  );
  const handleUpload = async (e) => {
    e.preventDefault();
    const videoDurationBig = ethers.utils.parseUnits(
      videoDuration.toString(),
      18
    );
    const videoPriceBig = ethers.utils.parseUnits(videoPrice.toString(), 18);
    const flowRateBig = ethers.utils.parseUnits(
      (videoPrice / videoDuration).toString(),
      18
    );

    // createAsset?.();
    console.log(
      "cid",
      videoTitle,
      videoDescription,
      videoPicCid,
      videoPriceBig,
      videoDurationBig,
      flowRateBig
    );

    const txn = await context.contractEthers.uploadVideo(
      "cid",
      videoTitle,
      videoDescription,
      videoPicCid,
      videoPriceBig,
      videoDurationBig,
      flowRateBig
    );
    await txn.wait();
    router.push("explore");
    // console.log(videoDuration, videoTitle, videoDescription, videoPrice);
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleUpload(e);
        }}
      >
        <div className="flex flex-col items-center justify-center py-16 px-20 gap-y-10 ">
          <div
            className="self-start text-2xl font-sansationR text-white"
            onClick={() => {
              console.log(context.signer);
            }}
          >
            Enter the details of your video
          </div>
          {/* drop modla and form  */}
          <div className="flex items-center justify-center gap-x-40">
            {/* text field form */}
            <div className="flex flex-col gap-y-10 self-start">
              <div>
                <VideoTitleInput
                  label={"Title"}
                  setVideoTitle={setVideoTitle}
                />
              </div>
              <div>
                {
                  <VideoDescriptionInput
                    label={"Description"}
                    setVideoDescription={setVideoDescription}
                  />
                }
              </div>
              <div>
                {
                  <VideoPriceInput
                    label={"Price"}
                    setVideoPrice={setVideoPrice}
                  />
                }
              </div>
              <div className="flex items-center justify-between pr-5">
                <div className="relative font-sansationR text-xl">
                  Thumbnail
                </div>
                {client ? (
                  <div className="w-30">
                    <CyanBtn
                      data={thumbnailName}
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
              {/*  */}

              {/* thumbnail */}
            </div>
            {/* text field form */}
            <div>
              {
                <DragDropModal
                  setVideo={setVideo}
                  setFileName={setFileName}
                  setVideoDuration={setVideoDuration}
                />
              }
            </div>
            {progressFormatted && <p>{progressFormatted}</p>}
            {/* <div>{context.videoDuration}</div> */}
          </div>
          {/* drop modla and form  */}
          <div className="relative w-32 right-20">
            <CyanBtn>
              <input type="submit" value="Upload" className="cursor-pointer" />
            </CyanBtn>
          </div>
        </div>
      </form>
      {assets?.map((asset) => (
        <div key={asset.id}>
          <div>
            <div>Asset Name: {asset?.name} </div>
            <div>Playback URL: {asset?.playbackUrl}</div>
            <div>Player Back ID: {asset?.playbackId}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Upload;
