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
import { useRouter } from "next/router.js";
import PropagateLoader from "react-spinners/PropagateLoader";
import Head from "next/head";

const Upload = () => {
  const router = useRouter();
  const { data: signer } = useSigner();
  const [fileName, setFileName] = useState("");
  const [video, setVideo] = useState();
  const [imageSrc, setImageSrc] = useState(null);
  const [videoPicCid, setVideoPicCid] = useState();
  const [thumbnailName, setThumbnailName] = useState("Select");
  const [videoDuration, setVideoDuration] = useState();
  const [videoTitle, setVideoTitle] = useState();
  const [videoDescription, setVideoDescription] = useState();
  const [videoPrice, setVideoPrice] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadedSuccessful, setUploadedSuccessful] = useState(false);
  const [videoCid, setVideoCid] = useState();

  const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  const context = useContext(Context);
  const allRight =
    videoTitle != "" &&
    videoDescription != "" &&
    videoPrice != "" &&
    thumbnailName != "Select" &&
    uploadedSuccessful;

  useEffect(() => {
    context.setSigner(signer);
    context.setActiveClass({
      explore: false,
      upload: true,
      create: false,
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
    setLoading(false);
  };

  const handleUpload = async (e) => {
    setLoading(true);
    e.preventDefault();
    const videoDurationBig = ethers.utils.parseUnits(
      videoDuration.toString(),
      18
    );
    const videoDurationInt = parseFloat(videoDuration.toFixed(2));
    const videoPriceBig = ethers.utils.parseUnits(videoPrice.toString(), 18);
    const flowRateBig = ethers.utils.parseUnits(
      (videoPrice / videoDurationInt).toFixed(18),
      18
    );

    console.log(
      videoCid,
      videoTitle,
      videoDescription,
      videoPicCid,
      videoPriceBig,
      videoDurationBig,
      flowRateBig
    );

    const txn = await context.contractEthers.uploadVideo(
      videoCid,
      videoTitle,
      videoDescription,
      videoPicCid,
      videoPriceBig,
      videoDurationBig,
      flowRateBig
    );
    await txn.wait();
    setLoading(false);
    router.push("profile");
  };
  return (
    <>
      <Head>
        <title>Videmon</title>
      </Head>
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
                        videoDuration={videoDuration}
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
                          overflow={thumbnailName.length > 8}
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
                <div className="flex flex-col justify-center items-center relative top-[-3rem]">
                  <DragDropModal
                    setLoading={setLoading}
                    video={video}
                    setVideo={setVideo}
                    fileName={fileName}
                    setFileName={setFileName}
                    setVideoDuration={setVideoDuration}
                    uploadedSuccessful={uploadedSuccessful}
                    setUploadedSuccessful={setUploadedSuccessful}
                    videoCid={videoCid}
                    setVideoCid={setVideoCid}
                  />
                </div>

                {/* <div>{context.videoDuration}</div> */}
              </div>
              {/* drop modla and form  */}
              <div className="relative w-32 right-20 top-[-2rem]">
                <CyanBtn invalid={!allRight}>
                  <input
                    type={allRight ? "submit" : "button"}
                    value="Upload"
                    className="cursor-pointer"
                    onClick={() => {}}
                  />
                </CyanBtn>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Upload;
