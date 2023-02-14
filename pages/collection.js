import { assestResDum } from "@/helpers/assetRespDum";
import rrr from "../public/images/rrr.png";
import tanjiro from "../public/images/tanjiro.webp";
import Image from "next/image";

const Collection = () => {
  return (
    <div className="pt-14 pb-10">
      <div className="text-4xl font-sansationR pb-8">My Collection</div>
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
              <div className="w-80 ">
                <Image
                  src={tanjiro}
                  alt={"rrr image"}
                  style={{
                    borderRadius: "2rem 2rem 1rem 1rem ",
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
export default Collection;
