import DragDropModal from "@/components/uploadPage/dragDropModal";
import { CyanBtn } from "@/helpers/utils/buttons";
import {
  StreamDespInput,
  StreamTitleInput,
  StreamPriceInput,
} from "@/components/uploadPage/textField";
import { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";

const CreateStream = () => {
  const [streamTitle, setStreamTitle] = useState();
  const [streamDesp, setStreamDesp] = useState();
  const [streamPic, setStreamPic] = useState();
  const [streamPrice, setStreamPrice] = useState();
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
                {/* {ipfs ? (
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
                )} */}
              </div>
              {/* -----------------------------thumbnail----------------------- */}
              {/* -------------------------thumbnail render------------------------- */}
              {/* <div>
                {
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
              </div> */}
              {/* -------------------------thumbnail render------------------------- */}
            </div>
            {/* -------------------------------drag drop modal------------------------ */}
            {/* <div>
              {
                <DragDropModal
                  setVideo={setVideo}
                  setFileName={setFileName}
                  setVideoDuration={setVideoDuration}
                />
              }
            </div> */}
            {/* {progressFormatted && <p>{progressFormatted}</p>} */}
            {/* {assets?.map((asset) => (
              <div key={asset.id}>
                <div>
                  <div>Asset Name: {asset?.name} </div>
                  <div>Playback URL: {asset?.playbackUrl}</div>
                  <div>Player Back ID: {asset?.playbackId}</div>
                </div>
              </div>
            ))} */}
          </div>
          {/* -------------------------------drag drop modal------------------------ */}
          {/* ------------------------------upload from btn------------------------ */}
          <div className="relative w-52 right-20">
            <CyanBtn>
              <input
                type="submit"
                value="Create Stream"
                className="cursor-pointer"
              />
            </CyanBtn>
          </div>
          {/* ------------------------------upload from btn------------------------ */}
        </div>
      </form>
    </div>
  );
};
export default CreateStream;
