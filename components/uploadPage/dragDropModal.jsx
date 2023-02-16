import Image from "next/image";
import FileIcon from "../../public/images/fileIcon.png";
import { CyanBtn } from "@/helpers/utils/buttons";
import Context from "../../context";
import { useContext, useState, useEffect } from "react";
import { useCreateAsset } from "@livepeer/react";
import { useMemo } from "react";

const DragDropModal = ({
  video,
  setVideo,
  fileName,
  setFileName,
  setVideoDuration,
  uploadedSuccessful,
  setUploadedSuccessful,
  videoCid,
  setVideoCid,
}) => {
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

  useEffect(() => {
    if (
      progress?.[0].phase === "ready" &&
      Math.round(progress?.[0].progress * 100) == 100
    ) {
      console.log(assets[0].playbackId);
      setUploadedSuccessful(true);
      setVideoCid(assets[0].playbackId);
    }
  }, [progress]);

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

  const [videoName, setVideoName] = useState("Browse");

  const getVideoDuration = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const media = new Audio(reader.result);
        media.onloadedmetadata = () => resolve(media.duration);
      };
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });

  const handleVideoDuration = async (e) => {
    const duration = await getVideoDuration(e.target.files[0]);
    setVideoDuration(duration);
  };

  return (
    <div
      className="relative sidebarGradient flex flex-col justify-center items-center px-20 py-12 rounded-xl gap-y-6"
      style={{ boxShadow: " 2px 4px 4px #FFFFFF" }}
    >
      <div>
        <Image
          src={FileIcon}
          alt="FileIcon"
          className="w-20"
          draggable={false}
        />
      </div>
      <div className="relative text-3xl font-sansationR">Drag, Drop Video</div>
      <div className="relative flex font-sansationR justify-center items-center">
        <div className="w-20 h-[2px] bg-[#909090]" />
        <div className="px-1 text-[#909090]">OR</div>
        <div className="w-20 h-[2px] bg-[#909090]" />
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <CyanBtn
          data={videoName}
          overflow={videoName.length > 8}
          size="text-xs"
        >
          <input
            id="videoFile"
            name="videoFile"
            type="file"
            accept={"video/*"}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            onChange={(e) => {
              setVideoName(e.target.files[0].name);
              handleVideoDuration(e);
              setVideo(e.target.files[0]);
              setFileName(e.target.files[0].name);
            }}
          ></input>
        </CyanBtn>
        {progressFormatted && <p className="text-xs">{progressFormatted}</p>}
      </div>
      <CyanBtn data="Upload" size="text-xl">
        <input
          type="button"
          className="absolute inset-0 opacity-0 w-full h-full"
          onClick={() => {
            createAsset?.();
          }}
        ></input>
      </CyanBtn>
      {videoCid ? <p>{videoCid}</p> : <></>}
    </div>
  );
};
export default DragDropModal;
