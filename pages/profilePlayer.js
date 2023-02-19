import { Player, useAssetMetrics, useCreateAsset } from "@livepeer/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import OverlayPlayer from "../public/images/profilePlayerOverlay.png";

const ProfilePlayer = ({ query }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Videmon</title>
      </Head>
      <div className="relative flex items-center justify-center h-screen w-screen">
        <div className="absolute top-[4.1rem] w-[65rem]">
          <Image src={OverlayPlayer} alt={"Overlay Player"} />
        </div>
        <div className="relative w-[60rem]">
          <Player playbackId={router.query.playbackId} autoplay />
        </div>
      </div>
    </>
  );
};
export default ProfilePlayer;
