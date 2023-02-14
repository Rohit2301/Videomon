import Image from "next/image";
import FileIcon from "../../public/images/fileIcon.png";
import { CyanBtn } from "@/helpers/utils/buttons";
import Context from "../../context";
import Link from "next/link.js";
import { useContext } from "react";

const DragDropModal = () => {
  const context = useContext(Context);

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
        <CyanBtn data={"Browse"}>
          <input
            id="videoFile"
            name="videoFile"
            type="file"
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            onChange={(e) => {
              context.setVideoFile(e.target.files[0]);
              context.setVideoDuration(e.target.files[0].duration);
              setTimeout(() => {
                console.log(context.videoDuration);
              }, 2000);
            }}
          ></input>
        </CyanBtn>
      </div>
    </div>
  );
};
export default DragDropModal;
