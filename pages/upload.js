import DragDropModal from "@/components/uploadPage/dragDropModal";
import { CyanBtn } from "@/helpers/utils/buttons";
import { useState } from "react";
import Context from "../context.js";
import { useContext } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import {
  VideoTitleInput,
  VideoDescriptionInput,
  VideoPriceInput,
} from "@/components/uploadPage/textField";
import { useCreateAsset } from "@livepeer/react";
import { useMemo } from "react";

const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_API_SECRET_KEY;
const authorization =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const Upload = () => {
  const [uploadedImages, setUploadedImages] = useState();
  const [fileName, setFileName] = useState("");
  const [video, setVideo] = useState();
  //
  const [videoFile, setVideoFile] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [thumbnailName, setThumbnailName] = useState("Select");
  const [videoDuration, setVideoDuration] = useState();
  const [videoTitle, setVideoTitle] = useState();
  const [videoDescription, setVideoDescription] = useState();
  const [videoPrice, setVideoPrice] = useState();
  //
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });
  const thumbnailUploader = async (file) => {
    // const form = event.target;
    // const files = context.thumbnail;

    // if (!files || files.length === 0) {
    //   return alert("No files selected");
    // }

    // const file = context.thumbnail;
    console.log(file);
    // upload files
    const result = await ipfs.add(file);
    setUploadedImages({
      cid: result.cid,
      path: result.path,
    });
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
    const result = await ipfs.add(thumbnail);
    setUploadedImages({
      cid: result.cid,
      path: result.path,
    });
    createAsset?.();
    console.log(videoDuration, videoTitle, videoDescription, videoPrice);
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleUpload(e);
        }}
      >
        <div className="flex flex-col items-center justify-center py-16 px-20 gap-y-10 ">
          <div className="self-start text-2xl font-sansationR text-white">
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
                {ipfs ? (
                  <div className="w-30">
                    <CyanBtn data={thumbnailName}>
                      <input
                        id="thumbnail"
                        name="thumbnail"
                        type="file"
                        className="absolute inset-0 opacity-0 w-full h-full"
                        onChange={(e) => {
                          setThumbnailName(e.target.files[0].name);
                          setThumbnail(e.target.files[0]);
                        }}
                      ></input>
                    </CyanBtn>
                  </div>
                ) : (
                  "Please connect ipfs first"
                )}
              </div>
              {/*  */}
              <div>
                {
                  // uploadedImages?.map((image, index) => (
                  uploadedImages ? (
                    <>
                      <img
                        className="image"
                        alt={`Uploaded `}
                        src={
                          "https://skywalker.infura-ipfs.io/ipfs/" +
                          uploadedImages.path
                        }
                        style={{ maxWidth: "400px", margin: "15px" }}
                        // key={uploadedImages.cid.toString()}
                      />
                      <h4>Link to IPFS:</h4>
                      <a
                        href={
                          "https://skywalker.infura-ipfs.io/ipfs/" +
                          uploadedImages.path
                        }
                      >
                        <h3>
                          {"https://skywalker.infura-ipfs.io/ipfs/" +
                            uploadedImages.path}
                        </h3>
                      </a>
                    </>
                  ) : (
                    <></>
                  )
                  // ))
                }
              </div>
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
