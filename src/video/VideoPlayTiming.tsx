import React from "react";
import styled from "styled-components";
import playButton from "../assets/play-button.svg";
import pauseButton from "../assets/pause.svg";
import backward from "../assets/fast-backward.svg";
import forward from "../assets/fast-forward.svg";

type VideoPlayTimingT = {
    isPlay: boolean;
    playOrPause: () => void;
}

export function VideoPlayTiming(props: VideoPlayTimingT) {
    const { isPlay, playOrPause } = props;

    // set forward time
    function forwardHandler() {
        let video = (document.getElementById("video_player") as HTMLVideoElement);

        if (video) {
            var playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    video.currentTime += 10;
                    video.play();
                })
                    .catch(error => {
                        // Auto-play was prevented
                        // Show paused UI.
                        console.log(error);
                    });
            }
        }
    }

    // set backward time
    function backwardHandler() {
        let video = (document.getElementById("video_player") as HTMLVideoElement);

        if (video) {
            var playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    video.currentTime -= 10;
                    video.play();
                })
                    .catch(error => {
                        // Auto-play was prevented
                        // Show paused UI.
                        console.log(error);
                    });
            }
        }
    }

    return (
        <VideoPlayTimingWrapper id={"videoPlayTimingWrapper"}>
            <BackwardButton
                src={backward}
                alt={"backward_icon"}
                id={"videoBackwardIcon"}
                onClick={backwardHandler}
            />
            <VideoPlayIcon
                onClick={playOrPause}
                src={isPlay ? pauseButton : playButton}
                alt={"pause_icon"}
                id={"videoPlayIcon"}
            />
            <ForwardButton
                src={forward}
                alt={"forward_icon"}
                id={"videoForwardIcon"}
                onClick={forwardHandler}
            />
        </VideoPlayTimingWrapper>
    );
};

// styles
const VideoPlayIcon = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin: 0 30px;
`;

const VideoPlayTimingWrapper = styled.div`
    width: max-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    height: 30px;

    &.videoPlayTimingClass {
        height: 43px !important;
    }
    &.videoPlayTimingClass ${VideoPlayIcon} {
        width: 43px !important;
        height: 43px !important;
    }
`;
const ForwardButton = styled(VideoPlayIcon)`
    margin: 0;
`;
const BackwardButton = styled(ForwardButton)``;