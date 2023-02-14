import { Player, useCreateAsset } from "@livepeer/react";
import { useState } from "react";

const LivepeerUploader = () => {
  const [fileName, setFileName] = useState("");
  const [video, setVideo] = useState();

  const {
    mutate: createAsset,
    data: assets,
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
    console.log("uploaded")
    createAsset?.();
    console.log(assets);
    
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
      {assets?.map((asset) => (
        <div key={asset.id}>
          <div>
            <div>Asset Name: {asset?.name} </div>
            <div>Playback URL: {asset?.playbackUrl}</div>
            <div>Player Back ID: {asset?.playbackId}</div>
          </div>
        </div>
      ))}
      {/* <iframe src="https://lvpr.tv?v=193brz5km4uw974f" /> */}
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default LivepeerUploader;
