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

const VideoPlayer = ({ videoLink, startTime = 0 }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [currentTime, setCurrentTime] = useState(startTime);
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
  const context = useContext(Context);

  useEffect(() => {
    playerRef.current.currentTime = startTime;
  }, [startTime]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(playerRef.current.currentTime);
    };
    playerRef.current.addEventListener("timeupdate", handleTimeUpdate);
    if (playerRef.current.currentTime === playerRef.current.duration) {
      handleStop();
    }
    return () => {
      playerRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (provider && signer) {
      context.initSf(provider);
    }
  }, [provider, signer, context.superToken]);

  const handleTimeUpdate = () => {
    const { currentTime, duration } = playerRef.current;
    setCurrentTimeDisplay(formatTime(currentTime));
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
      setIsPlaying(!isPlaying);
      let flowOp = context.superToken.deleteFlow({
        sender: "0x4562F39FAEEdB490B3Bf0D6024F46DBD5c40cF04",
        receiver: "0xF2B7CfDb834Bf075144ca9E309Ff0AE0B7860AC8",
      });
      await flowOp.exec(signer);
    } else {
      let flowOp = context.superToken.createFlow({
        sender: "0x4562F39FAEEdB490B3Bf0D6024F46DBD5c40cF04",
        receiver: "0xF2B7CfDb834Bf075144ca9E309Ff0AE0B7860AC8",
        flowRate: "1000000000000",
      });
      const txn = await flowOp.exec(signer);
      await txn.wait();
      playerRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = async () => {
    playerRef.current.pause();
    setIsPlaying(false);
    let flowOp = context.superToken.deleteFlow({
      sender: "0x4562F39FAEEdB490B3Bf0D6024F46DBD5c40cF04",
      receiver: "0xF2B7CfDb834Bf075144ca9E309Ff0AE0B7860AC8",
    });
    const txn = await flowOp.exec(signer);
    await txn.wait();
    console.log(playerRef.current.currentTime);
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
    <div className="absolute inset-0 h-screen w-screen flex flex-row justify-center items-center">
      <div>
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <ReactHlsPlayer
            playerRef={playerRef}
            src="https://lp-playback.com/hls/193brz5km4uw974f/index.m3u8"
            width="60%"
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
              className="w-[60%]"
            />

            <div className="flex flex-row w-[60%] justify-between items-center">
              <span>{currentTimeDisplay}</span>
              <span>{totalDurationDisplay}</span>
            </div>
            <div className="flex flex-row w-[60%] justify-between items-center">
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
  );
};

export default VideoPlayer;
