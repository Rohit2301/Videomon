import Image from "next/image";
import FileIcon from "../../public/images/fileIcon.png";
import { CyanBtn } from "@/helpers/utils/buttons";
import Context from "../../context";
import { useContext, useState } from "react";
import { useCreateAsset } from "@livepeer/react";

const DragDropModal = ({ setVideo, setFileName, setVideoDuration }) => {
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
  const SecondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : "";
    var mDisplay = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : "";
    var sDisplay = s > 0 ? (s < 10 ? `0${s}:` : `${s}`) : "";
    return hDisplay + mDisplay + sDisplay;
  };
  const handleVideoDuration = async (e) => {
    const duration = await getVideoDuration(e.target.files[0]);
    const actualDurationString = SecondsToHms(duration);
    setVideoDuration(actualDurationString);
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
      <div className="">
        <CyanBtn data={videoName}>
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
      </div>
    </div>
  );
};
export default DragDropModal;
