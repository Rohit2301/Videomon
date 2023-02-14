import DragDropModal from "@/components/uploadPage/dragDropModal";
import { CyanBtn } from "@/helpers/utils/buttons";
import TextF from "@/components/uploadPage/textField";
const Upload = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-20 gap-y-10 ">
      <div className="self-start text-2xl font-sansationR text-white">
        Enter the details of your video
      </div>
      {/* drop modla and form  */}
      <div className="flex items-center justify-center gap-x-40">
        {/* text field form */}
        <div className="flex flex-col gap-y-10 self-start">
          <div>{<TextF label={"Title"} />}</div>
          <div>{<TextF label={"Title"} />}</div>
          <div>{<TextF label={"Title"} />}</div>
          <div>{<TextF label={"Title"} />}</div>
        </div>
        {/* text field form */}
        <div>{<DragDropModal />}</div>
      </div>
      {/* drop modla and form  */}
      <div className="relative w-32 right-20">
        {<CyanBtn data={"Upload"} />}
      </div>
    </div>
  );
};
export default Upload;
