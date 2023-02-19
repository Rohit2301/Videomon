import { Player, useAssetMetrics, useCreateAsset } from "@livepeer/react";
import { useRouter } from "next/router";

const ProfilePlayer = ({ query }) => {
  const router = useRouter();
  return (
    <div className="relative flex items-center justify-center h-screen w-screen">
      <div className="relative w-[60rem]">
        <Player playbackId={router.query.playbackId} autoplay />
      </div>
    </div>
  );
};
export default ProfilePlayer;
