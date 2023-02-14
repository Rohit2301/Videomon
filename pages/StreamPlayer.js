import React from "react";
import { Player, useCreateStream } from "@livepeer/react";
import { useMemo, useState } from "react";
import LivepeerUploader from "@/helpers/uploadFile/uploader";

const StreamPlayer = () => {
  const [streamName, setStreamName] = useState();
  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(streamName ? { name: streamName } : null);
  const isLoading = useMemo(() => status === "loading", [status]);

  return (
    // <div>
    //   <input
    //     type="text"
    //     placeholder="Stream name"
    //     onChange={(e) => setStreamName(e.target.value)}
    //   />
    //   {stream?.playbackId && (
    //     <Player
    //       title={stream?.name}
    //       playbackId={stream?.playbackId}
    //       autoPlay
    //       muted
    //     />
    //   )}
    //   <div>
    //     {!stream && (
    //       <button
    //       className="bg-cyan text-black"
    //         onClick={async () => {
    //           createStream?.();
    //           console.log(stream)
    //         }}
    //         disabled={isLoading || !createStream}
    //       >
    //         Create Stream
    //       </button>
    //     )}
    //   </div>
    // </div>
    <LivepeerUploader/>
  );
};

export default StreamPlayer;
