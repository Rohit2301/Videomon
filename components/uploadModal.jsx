import { CyanBtn } from "@/helpers/utils/buttons";
import Link from "next/link";
import { useContext } from "react";
import Context from "../context";

const UploadModal = () => {
  const context = useContext(Context);
  return (
    <div
      className="sidebarGradient flex flex-col justify-center items-center rounded-2xl gap-y-10 mx-20 mb-14 py-8 px-5 font-sansationR"
      style={{ boxShadow: " 2px 4px 4px #FFFFFF" }}
    >
      <div className="text-3xl">
        Have some ideas to share,{" "}
        <span className="text-cyan font-sansationB">JUST UPLOAD!!</span>
      </div>
      <div className="w-32">
        <Link
          href={"/upload"}
          onClick={() => {
            context.setActiveClass({
              explore: false,
              create: true,
              collection: false,
              myProfile: false,
            });
          }}
        >
          <CyanBtn data={"Create"} />
        </Link>
      </div>
    </div>
  );
};
export default UploadModal;
