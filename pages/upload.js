import DragDropModal from "@/components/uploadPage/dragDropModal";
import { CyanBtn } from "@/helpers/utils/buttons";
import TextF from "@/components/uploadPage/textField";
import { useState } from "react";
import Context from "../context.js";
import { useContext } from "react";

const Upload = () => {
  const context = useContext(Context);
  const [thumbnailName, setThumbnailName] = useState("Select");
  return (
    <div>
      <form>
        <div className="flex flex-col items-center justify-center py-16 px-20 gap-y-10 ">
          <div className="self-start text-2xl font-sansationR text-white">
            Enter the details of your video
          </div>
          {/* drop modla and form  */}
          <div className="flex items-center justify-center gap-x-40">
            {/* text field form */}
            <div className="flex flex-col gap-y-10 self-start">
              <div>{<TextF label={"Title"} />}</div>
              <div>{<TextF label={"Description"} />}</div>
              <div>{<TextF label={"Price"} />}</div>
              {/* thumbnail */}
              <div className="flex items-center justify-between pr-5">
                <div className="relative font-sansationR text-xl">
                  Thumbnail
                </div>
                <div className="w-30 cursor-pointer">
                  <CyanBtn data={thumbnailName}>
                    <input
                      id="thumbnail"
                      name="thumbnail"
                      type="file"
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      onChange={(e) => {
                        setThumbnailName(e.target.files[0].name);
                        context.setThumbnail(e.target.files[0]);
                      }}
                    ></input>
                  </CyanBtn>
                </div>
              </div>
              {/* thumbnail */}
            </div>
            {/* text field form */}
            <div>{<DragDropModal />}</div>
            {/* <div>{context.videoDuration}</div> */}
          </div>
          {/* drop modla and form  */}
          <div className="relative w-32 right-20">
            {<CyanBtn data={"Upload"} />}
          </div>
        </div>
      </form>
    </div>
  );
};
export default Upload;
