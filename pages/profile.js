import { assestResDum } from "@/helpers/assetRespDum";
import rrr from "../public/images/rrr.png";
import tanjiro from "../public/images/tanjiro.webp";
import Image from "next/image";
import { useEffect } from "react";
import Context from "../context";
import { useContext } from "react";
import { useRouter } from "next/router";

const Profile = () => {
  const context = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    context.setActiveClass({
      explore: false,
      upload: false,
      create: false,
      collection: false,
      myProfile: true,
    });
  }, []);
  return (
    <div className="">
      <div className="font-sansationR text-4xl pt-12 pb-8">Anonymus User</div>
      <div className="grid gap-x-14 gap-y-10 grid-flow-row grid-cols-3">
        {assestResDum.map((asset, index) => {
          const {
            videoId,
            cId,
            videoTitle,
            videoDesp,
            uploadDate,
            price,
            duration,
            flowRate,
          } = asset;
          return (
            <div key={index} className="font-sansationR">
              <div className="w-80 cursor-pointer">
                <Image
                  src={tanjiro}
                  alt={"rrr image"}
                  style={{
                    borderRadius: "2rem 2rem 1rem 1rem ",
                  }}
                  onClick={() => {
                    router.push("/VideoPlayer");
                  }}
                />
              </div>
              <div className="text-grey">{videoDesp}</div>
              <div className="flex justify-between text-white text-lg font-sansationB">
                <div>{videoTitle}</div>
                <div>{duration}</div>
              </div>
              <div className="text-grey text-sm">{uploadDate}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Profile;
