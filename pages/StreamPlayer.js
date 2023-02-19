import React, { useEffect, useContext } from "react";
import { Player, useCreateStream } from "@livepeer/react";
import { useMemo, useState } from "react";
import LivepeerUploader from "@/helpers/uploadFile/uploader";
import { useRouter } from "next/router";
import { CyanBtn } from "@/helpers/utils/buttons";
import Context from "../context";
import { useSigner, useContract, useAccount } from "wagmi";
import Head from "next/head";

const StreamPlayer = () => {
  const router = useRouter();
  const context = useContext(Context);
  const [stream, setStream] = useState({});
  const { data: signer, isError, isLoading } = useSigner();
  const {
    streamId,
    cId,
    streamTitle,
    streamDesp,
    streamPic,
    isLive,
    uploader,
    uploadDate,
    flowRate,
    viewerCount,
    sender,
  } = router.query;

  useEffect(() => {
    setStream({
      streamId,
      cId,
      streamTitle,
      streamDesp,
      streamPic,
      isLive,
      uploader,
      uploadDate,
      flowRate,
      viewerCount,
      sender,
    });
  }, []);

  const stopViewStream = async () => {
    let flowOp = context.superToken.deleteFlow({
      sender: stream.sender,
      receiver: stream.uploader,
    });
    const txn1 = await flowOp.exec(signer);
    await txn1.wait();
    const txn2 = await context.contractEthers.stopViewingStream(
      stream.streamId
    );
    await txn2.wait();
    router.push("explore");
  };

  return (
    <>
      <Head>
        <title>Videmon</title>
      </Head>
      <div className="relative mt-16 ml-60 w-[65%] flex flex-col justify-center items-center">
        <Player
          title={stream.streamTitle}
          playbackId={stream.cId}
          autoPlay
          muted
        />
        <div
          className="mt-5"
          onClick={() => {
            stopViewStream();
          }}
        >
          <CyanBtn data={"Stop Stream"} size="text-sm"></CyanBtn>
        </div>
      </div>
      {/* <LivepeerUploader /> */}
    </>
  );
};

export default StreamPlayer;
