import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import playButton from "../assets/play-button.svg";
import pauseButton from "../assets/pause.svg";
import nextButton from "../assets/next-button.svg";
import mute from "../assets/mute.svg";
import speaker from "../assets/speaker.svg";
import fullScreen from "../assets/full-screen.svg";
import { ProgressBar } from "./ProgressBar";
import { timeFormat } from "./time";
import { VolumeProgress } from "./VolumeProgress";

type VideoFooterT = {
    videoFullDuration: number;
    isPlay: boolean;
    setIsplay: Dispatch<SetStateAction<boolean>>;
    playOrPause: () => void;
    fullScreenHandler: () => void;
};

export function VideoFooter(props: VideoFooterT) {
    // props
    const {
        videoFullDuration,
        isPlay,
        setIsplay,
        playOrPause,
        fullScreenHandler
    } = props;

    // local state
    const [getCurrentTime, setGetCurrentTime] = useState(0);
    const [isVolumeMuted, setIsVolumeMuted] = useState(false);

    //  useEffect

    // get current time
    useEffect(() => {
        let video = (document.getElementById("video_player") as HTMLVideoElement);

        function setTimeHandler() {
            if (video.paused) return;
            if (video) {
                setGetCurrentTime(video.currentTime);
            }
        }

        video?.addEventListener("timeupdate", setTimeHandler);
        return () => video?.removeEventListener("timeupdate", setTimeHandler);
    }, []);

    // volume up and mute
    function volumeMute() {
        let video = (document.getElementById("video_player") as HTMLVideoElement);
        setIsVolumeMuted(!isVolumeMuted);

        if (video) {
            if (isVolumeMuted) {
                video.volume = 0;
            } else video.volume = 1;
        }
    };

    // onclick prevent 
    function onClickPreventHandler(e: any) {
        e.stopPropagation();
    };

    return (
        <VideoFooterWrapper onClick={onClickPreventHandler} id={"video_footer_wrapper"}>
            <VideoPlayingTime
                id={"video_current_time"}>
                {videoFullDuration > 0 && `${timeFormat(getCurrentTime)} / ${timeFormat(videoFullDuration)}`}
            </VideoPlayingTime>
            <ProgressBar setIsplay={setIsplay} />
            <ControllersWrapper>
                <PlayButton
                    onClick={playOrPause}
                    src={isPlay ? pauseButton : playButton}
                    alt={"play_pause_button"}
                    id={"play_pause_button"}
                />
                <NextButton src={nextButton} alt={"next_button"} />
                <VolumeWrapper>
                    <VolumeButton
                        onClick={volumeMute}
                        src={isVolumeMuted ? mute : speaker}
                        alt={"volume_button"}
                    />
                    <VolumeProgress isVolumeMuted={isVolumeMuted} />
                </VolumeWrapper>
                <FullView
                    id={"fullScreenView"}
                    src={fullScreen}
                    alt={"full_view"}
                    onClick={fullScreenHandler}
                />
            </ControllersWrapper>
        </VideoFooterWrapper>
    );
};

// styles

const VideoFooterWrapper = styled.div`
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 70px;
    padding: 0px 10px;
    box-sizing: border-box;
    user-select: none;
`;
const VideoPlayingTime = styled.span`
    color: white;
    font-size: 13px;
    display: inline-block;
    margin: 0px 0px 8px;
    font-weight: 600;
`;
const ControllersWrapper = styled.div`
    margin-top: 8px;
`;
const PlayButton = styled.img`
    width: 12px;
    cursor: pointer;
`;
const NextButton = styled(PlayButton)`
    margin-left: 18px;
`;
const VolumeWrapper = styled.div`
    width: 80px;
    height: 14px;
    position: absolute;
    left: 72px;
    padding: 6px;
    bottom: 10px;
`;
const VolumeButton = styled.img`
    position: absolute;
    width: 16px;
    left: 0px;
    cursor: pointer;
`;
const FullView = styled.img`
    position: absolute;
    right: 11px;
    width: 15px;
    bottom: 14px;
    cursor: pointer;
`;