import Image from "next/image";
import FileIcon from "../public/images/fileIcon.png";
import { CyanBtn, HomeGetStartedBtn } from "@/helpers/utils/btn";
const DragDropModal = () => {
  return (
    <div
      className="relative sidebarGradient flex flex-col justify-center items-center px-10 py-6 rounded-xl gap-y-4"
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
      <div className="relative">{<HomeGetStartedBtn data={"new"} />} </div>
    </div>
  );
};
export default DragDropModal;
