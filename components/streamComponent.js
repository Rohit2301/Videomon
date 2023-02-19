import React, {useContext} from "react";
import { useSigner, useContract, useAccount } from "wagmi";
import Context from "../context";
import { useRouter } from "next/router";

const StreamComponent = ({ stream }) => {
  const { address } = useAccount();
  const context = useContext(Context);
  const router = useRouter();

  const streamViewStart = async (_streamId, _uploader, _flowRate) => {
    const txn1 = await context.contractEthers.viewStream(_streamId);
    await txn1.wait();
    let flowOp = context.superToken.createFlow({
      sender: address,
      receiver: _uploader,
      flowRate: _flowRate,
    });
    const txn2 = await flowOp.exec(context.signer);
    await txn2.wait();
    router.push(
        {
          pathname: "/StreamPlayer",
          query: {
            streamId: stream.streamId.toString(),
            cId: stream.cId,
            streamTitle: stream.streamTitle,
            streamDesp: stream.streamDesp,
            streamPic: stream.streamPic,
            isLive: stream.isLive,
            uploader: stream.uploader,
            uploadDate: stream.uploadDate.toString(),
            flowRate: stream.flowRate.toString(),
            viewerCount: stream.viewerCount,
            sender: address,
          },
        },
        "/StreamPlayer"
      );
  };

  return (
    <div className={`font-sansationR ${!stream.isLive && "hidden"}`}>
      <div className="w-80 cursor-pointer">
        <div className="w-full h-[11.25rem]">
          <img
            src={`https://ipfs.io/ipfs/${stream.streamPic}`}
            alt={"rrr image"}
            className="w-full h-full object-contain sidebarGradient"
            style={{
              borderRadius: "2rem 2rem 1rem 1rem ",
            }}
            onClick={() => {
                streamViewStart(stream.streamId, stream.uploader, stream.flowRate.toString())
            }}
          />
        </div>
      </div>
      <div className="text-grey">{stream.streamDesp}</div>
      <div className="flex justify-between text-white text-lg font-sansationB">
        <div>{stream.streamTitle}</div>
      </div>
      <div className="text-grey text-sm">{stream.uploadDate.toString()}</div>
    </div>
  );
};

export default StreamComponent;
