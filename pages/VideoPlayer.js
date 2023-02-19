import React, { useState, useEffect, useContext } from "react";
import ReactHlsPlayer from "react-hls-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { useSigner, useContract, useProvider, useAccount } from "wagmi";
import { Framework } from "@superfluid-finance/sdk-core";
import Context from "../context";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import PropagateLoader from "react-spinners/PropagateLoader";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [loading, setLoading] = useState(false);

  const playerRef = React.useRef(null);
  const [volume, setVolume] = useState(1);
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState("0:00");
  const [totalDurationDisplay, setTotalDurationDisplay] = useState("0:00");

  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  const [sf, setSf] = useState();
  const [superTokenMatic, setSuperTokenMatic] = useState();
  const [flowInfo, setFlowInfo] = useState();
  const router = useRouter();
  const [video, setVideo] = useState({});
  const {
    videoId,
    cId,
    videoTitle,
    videoDesp,
    videoPic,
    uploader,
    uploadDate,
    price,
    duration,
    flowRate,
    viewers,
    sender,
    startTime,
  } = router.query;
  const [currentTime, setCurrentTime] = useState(startTime);
  const context = useContext(Context);

  useEffect(() => {
    playerRef.current.currentTime = startTime;
    setVideo({
      videoId,
      cId,
      videoTitle,
      videoDesp,
      videoPic,
      uploader,
      uploadDate,
      price,
      duration,
      flowRate,
      viewers,
    });
  }, [startTime]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (playerRef.current) setCurrentTime(playerRef.current.currentTime);
    };
    playerRef.current.addEventListener("timeupdate", handleTimeUpdate);
    if (playerRef.current.currentTime === playerRef.current.duration) {
      handleStop();
    }

    // return () => {
    //   playerRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    // };
  }, []);

  // useEffect(() => {
  //   if (provider && signer) {
  //     context.initSf(provider);
  //   }
  // }, [provider, signer]);

  const handleTimeUpdate = () => {
    const { currentTime, duration } = playerRef.current;
    setCurrentTimeDisplay(formatTime(currentTime));
    console.log(formatTime(currentTime), formatTime(duration));
    setTotalDurationDisplay(formatTime(duration));
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      playerRef.current.pause();
      setLoading(true);
      setIsPlaying(!isPlaying);
      let flowOp = context.superToken.deleteFlow({
        sender: sender,
        receiver: video.uploader,
      });
      await flowOp.exec(signer);
      setLoading(false);
    } else {
      setLoading(true);
      let flowOp = context.superToken.createFlow({
        sender: sender,
        receiver: video.uploader,
        flowRate: parseInt(video.flowRate).toString(),
      });
      const txn = await flowOp.exec(signer);
      await txn.wait();
      setLoading(false);
      playerRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = async () => {
    setLoading(true);
    await playerRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    playerRef.current.pause();
    setIsPlaying(false);
    const endTime = ethers.utils.parseUnits(
      playerRef.current.currentTime.toString(),
      18
    );
    const txn1 = await context.contractEthers.stopViewingVideo(
      video.videoId,
      endTime
    );
    await txn1.wait();
    let flowOp = context.superToken.deleteFlow({
      sender: sender,
      receiver: video.uploader,
    });
    const txn2 = await flowOp.exec(signer);
    await txn2.wait();
    setLoading(false);
    router.push("/explore");
  };

  const handleSeek = (e) => {
    setCurrentTime(e.target.value);
    playerRef.current.currentTime = e.target.value;
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    if (e.target.value == 0) {
      setIsMute(true);
    } else {
      setIsMute(false);
    }
    playerRef.current.volume = e.target.value;
  };

  const handleVolumeMute = () => {
    if (isMute) {
      playerRef.current.volume = 1;
      setVolume(1);
    } else {
      playerRef.current.volume = 0;
      setVolume(0);
    }
    setIsMute(!isMute);
  };

  return (
    <div>
      <div
        className={`${
          loading
            ? "z-10 absolute  w-[70rem] h-[34rem] flex justify-center items-center"
            : "w-0 h-0"
        }`}
      >
        {loading ? (
          <PropagateLoader color={"#76DDDD"} loading={loading} size={16} />
        ) : (
          <></>
        )}
      </div>
      <div className={`z-0 ${loading ? "opacity-30" : ""}`}>
        <div className="reltaive flex flex-row justify-center items-center p-10">
          <div>
            <div className="relative flex flex-col justify-center items-center w-[62rem] right-40">
              <ReactHlsPlayer
                playerRef={playerRef}
                src={`https://lp-playback.com/hls/${video.cId}/index.m3u8`}
                width="100%"
                onTimeUpdate={handleTimeUpdate}
                autoPlay
              />
              <div className="w-full flex flex-col justify-center items-center mt-4">
                <input
                  type="range"
                  min="0"
                  max={playerRef.current ? playerRef.current.duration : 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-[100%]"
                />

                <div className="flex flex-row w-[100%] justify-between items-center">
                  <span>{currentTimeDisplay}</span>
                  <span>{totalDurationDisplay}</span>
                </div>
                <div className="flex flex-row w-[100%] justify-between items-center">
                  <div>
                    {isPlaying ? (
                      <PauseIcon onClick={handlePlayPause}></PauseIcon>
                    ) : (
                      <PlayArrowIcon onClick={handlePlayPause}></PlayArrowIcon>
                    )}
                    <StopIcon onClick={handleStop}></StopIcon>
                  </div>
                  <div>
                    {isMute ? (
                      <VolumeOffIcon onClick={handleVolumeMute}></VolumeOffIcon>
                    ) : (
                      <VolumeUpIcon onClick={handleVolumeMute}></VolumeUpIcon>
                    )}

                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolume}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
