import { Player, useCreateAsset } from "@livepeer/react";
import { useState } from "react";

const LivepeerUploader = () => {
  const [fileName, setFileName] = useState("");
  const [video, setVideo] = useState();

  const {
    mutate: createAsset,
    data: asset,
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

  const handleUpload = async () => {
    createAsset();
    console.log(status);
  };

  return (
    <div>
      <input
        type={"text"}
        placeholder={"Enter filename"}
        onChange={(e) => {
          const name = e.target.value;
          setFileName(name);
        }}
      />
      <input
        type={"file"}
        accept={"video/*"}
        onChange={(e) => {
          const file = e.target.files[0];
          setVideo(file);
        }}
      />
      <div onClick={handleUpload}>Upload</div>
      <div>{/* <Player /> */}</div>
    </div>
  );
};
// import { useCreateAsset } from "@livepeer/react";

// import { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";

// const LivepeerUploader = () => {
//   const [video, setVideo] = useState();
//   const {
//     mutate: createAsset,
//     data: asset,
//     status,
//     progress,
//     error,
//   } = useCreateAsset(
//     video
//       ? {
//           sources: [{ name: video.name, file: video }],
//         }
//       : null
//   );

//   const onDrop = useCallback(async (acceptedFiles) => {
//     if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
//       setVideo(acceptedFiles[0]);
//     }
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: {
//       "video/*": ["*.mp4"],
//     },
//     maxFiles: 1,
//     onDrop,
//   });

//   const progressFormatted = useMemo(
//     () =>
//       progress?.[0].phase === "failed"
//         ? "Failed to process video."
//         : progress?.[0].phase === "waiting"
//         ? "Waiting"
//         : progress?.[0].phase === "uploading"
//         ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
//         : progress?.[0].phase === "processing"
//         ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
//         : null,
//     [progress]
//   );

//   return (
//     <>
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         <p>Drag and drop or browse files</p>
//       </div>

//       {createError?.message && <p>{createError.message}</p>}

//       {video ? <p>{video.name}</p> : <p>Select a video file to upload.</p>}
//       {progressFormatted && <p>{progressFormatted}</p>}

//       <button
//         onClick={() => {
//           createAsset?.();
//         }}
//         disabled={!createAsset || createStatus === "loading"}
//       >
//         Upload
//       </button>
//     </>
//   );
// };
export default LivepeerUploader;
