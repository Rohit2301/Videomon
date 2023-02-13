import Image from "next/image";
import FileIcon from "../../public/images/fileIcon.png";
import { CyanBtn } from "@/helpers/utils/buttons";
const DragDropModal = () => {
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
      <div className="">{<CyanBtn data={"Browse"} />}</div>
    </div>
  );
};
export default DragDropModal;
