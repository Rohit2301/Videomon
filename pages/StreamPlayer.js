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
  } = useCreateStream(
    streamName
      ? {
          name: streamName,
          playbackPolicy: {
            type: "public",
          },
        }
      : null
  );
  const isLoading = useMemo(() => status === "loading", [status]);

  return (
    <div>
      <input
        type="text"
        placeholder="Stream name"
        onChange={(e) => setStreamName(e.target.value)}
      />
      <div>
        {!stream && (
          <button
            className="bg-cyan text-black"
            onClick={async () => {
              createStream?.();
              console.log(stream);
            }}
            disabled={isLoading || !createStream}
          >
            Create Stream
          </button>
        )}
      </div>
      {stream?.playbackId && (
        <Player
          title={stream?.name}
          playbackId={stream?.playbackId}
          autoPlay
          muted
        />
      )}
      <div>{stream?.playbackId}</div>
      <div>{stream?.streamKey}</div>
      <div>{stream?.playbackUrl}</div>
    </div>
    // <LivepeerUploader/>
  );
};

export default StreamPlayer;
