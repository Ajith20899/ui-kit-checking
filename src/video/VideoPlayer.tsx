import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { VideoFooter } from "./VideoFooter";

type VideoPlayerT = {
    videoSrc: string;
    videoType: string;
    width?: string;
    height?: string;
};

export function VideoPlayer(props: VideoPlayerT) {
    // props
    const {
        videoSrc,
        videoType,
        width,
        height,
    } = props;

    // ref
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // local state
    const [getCurrentTime, setGetCurrentTime] = useState(0);
    const [isPlay, setIsplay] = useState(false);
    const [isVolumeMuted, setIsVolumeMuted] = useState(false);
    const [videoFullDuration, setVideoFullDuration] = useState(0);

    // useEffect

    // get full duration
    useEffect(() => {
        var video = videoRef?.current;
        if (video) {
            video.onloadeddata = function () {
                if (video) {
                    setVideoFullDuration(video.duration);
                }
            };
        }
    }, []);

    // get current time
    useEffect(() => {
        var video = videoRef?.current;
        if(!isPlay) return;

        let timer = setInterval(() => {
            if (video) {
                setGetCurrentTime(video.currentTime);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [isPlay]);

    // set current time
    // function setCurrentTime(time: number) {
    // if(video) {
    //     video.currentTime = time
    // }
    // };

    // play / pause video
    function playOrPause() {
        var video = videoRef?.current;
        setIsplay(!isPlay);

        if (video) {
            if (isPlay) {
                video.pause();
            } else video.play();
        }
    };

    // volume up and mute
    function volumeMute() {
        var video = videoRef?.current;
        setIsVolumeMuted(!isVolumeMuted);

        if (video) {
            if (isVolumeMuted) {
                video.volume = 0;
            } else video.volume = 1;
        }
    };

    return (
        <VideoPlayerWrapper width={width} height={height} id={"video_player_wrapper"}>
            <Video ref={videoRef}>
                <Source src={videoSrc} type={videoType} />
            </Video>
            <VideoFooter
                getCurrentTime={getCurrentTime}
                videoFullDuration={videoFullDuration}
                isPlay={isPlay}
                playOrPause={playOrPause}
                isVolumeMuted={isVolumeMuted}
                volumeMute={volumeMute}
            />
        </VideoPlayerWrapper>
    );
};

// styles

const VideoPlayerWrapper = styled.div<Pick<VideoPlayerT, "width" | "height">>`
    width: ${p => p.width || "500px"};
    height: ${p => p.height || "auto"};
    margin: 30px auto;
    position: relative;
`;
const Video = styled.video`
    display: block;
    width: 100%;
`;
const Source = styled.source``;