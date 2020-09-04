import React from "react";
import styled from "styled-components";
import playButton from "../assets/play-button.svg";
import pauseButton from "../assets/pause.svg";
import nextButton from "../assets/next-button.svg";
import mute from "../assets/mute.svg";
import speaker from "../assets/speaker.svg";
import { ProgressBar } from "./ProgressBar";
import { timeFormat, hoursTimeFormat } from "./time";
import { VolumeProgress } from "./VolumeProgress";

type VideoFooterT = {
    getCurrentTime: number;
    videoFullDuration: number;
    isPlay: boolean;
    playOrPause: () => void;
    isVolumeMuted: boolean;
    volumeMute: () => void;
};

export function VideoFooter(props: VideoFooterT) {
    // props
    const {
        getCurrentTime,
        videoFullDuration,
        isPlay,
        playOrPause,
        isVolumeMuted,
        volumeMute
    } = props;

    return (
        <VideoFooterWrapper>
            <VideoPlayingTime
                id={"video_current_time"}>
                {videoFullDuration > 0 && `${timeFormat(getCurrentTime)} / ${hoursTimeFormat(videoFullDuration)}`}
            </VideoPlayingTime>
            <ProgressBar />
            <ControllersWrapper>
                <PlayButton
                    onClick={playOrPause}
                    src={isPlay ? pauseButton : playButton}
                    alt={"play_pause_button"}
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
            </ControllersWrapper>
        </VideoFooterWrapper>
    );
};

// styles

const VideoFooterWrapper = styled.div`
    background-color: black;
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
    bottom: 8px;
    `;
    const VolumeButton = styled.img`
    position: absolute;
    width: 16px;
    left: 0px;
    cursor: pointer;
`;