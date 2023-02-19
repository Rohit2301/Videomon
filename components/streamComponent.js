import React, {useContext} from "react";
import { useSigner, useContract, useAccount } from "wagmi";
import Context from "../context";
import { useRouter } from "next/router";
import SuperMatic from "./superMatic";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

const StreamComponent = ({ stream, setLoading }) => {
  const { address } = useAccount();
  const context = useContext(Context);
  const router = useRouter();
  TimeAgo.addDefaultLocale(en)
  const timeAgo = new TimeAgo('en-US')

  const streamViewStart = async (_streamId, _uploader, _flowRate) => {
    setLoading(true);
    const txn1 = await context.contractEthers.viewStream(_streamId);
    await txn1.wait();
    let flowOp = context.superToken.createFlow({
      sender: address,
      receiver: _uploader,
      flowRate: _flowRate,
    });
    const txn2 = await flowOp.exec(context.signer);
    await txn2.wait();
    setLoading(false);
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
            className="w-full h-full object-contain sidebarGradient hover:border hover:border-cyan hover:border-2 hover:animate-pulse"
            style={{
              borderRadius: "2rem 2rem 1rem 1rem ",
            }}
            onClick={() => {
                streamViewStart(stream.streamId, stream.uploader, stream.flowRate.toString())
            }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center text-white text-lg font-sansationB">
        <div>{stream.streamTitle}</div>
        <div className="text-sm">
          LIVE
        </div>
      </div>
      <div className="text-grey">{stream.streamDesp}</div>
      <div className="flex justify-between items-center text-white text-lg font-sansationB">
        <div className="text-grey text-sm">{stream.streamDesp}</div>
        <div className="flex flex-row justify-center items-center gap-2">
          <span>{parseFloat(stream.flowRate / 10 ** 18).toPrecision(2)}</span>
          <SuperMatic></SuperMatic>
          <span className="text-grey text-xs">/s</span>
        </div>
      </div>
      <div className="text-grey text-sm"> {timeAgo.format(stream.uploadDate * 1000)}</div>
    </div>
  );
};

export default StreamComponent;
