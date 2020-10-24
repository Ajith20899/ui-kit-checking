import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VideoFooter } from "./VideoFooter";
import { GoogleLoader } from "./Loader";
import { VideoHeader } from "./VideoHeader";
import { VideoPlayTiming } from "./VideoPlayTiming";

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

    // local state
    const [isPlay, setIsplay] = useState(false);
    const [videoFullDuration, setVideoFullDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // function
    function getInnermostHovered() {
        var n = document.querySelector(":hover");
        var nn;
        while (n) {
            nn = n;
            n = nn.querySelector(":hover");
        }
        return nn;
    }


    // useEffect
    // get full duration
    useEffect(() => {
        let video = (document.getElementById("video_player") as HTMLVideoElement);
        if (video) {
            video.onloadeddata = function () {
                if (video) {
                    setVideoFullDuration(video.duration);
                }
            };
        }
    }, []);

    // mouse move for display tool bar
    useEffect(() => {
        let video = (document.getElementById("video_player") as HTMLVideoElement);
        let videoFooter = document.getElementById("video_footer_wrapper");
        let videoHeader = document.getElementById("video_header_wrapper");
        let videoPlayTimingWrapper = document.getElementById("videoPlayTimingWrapper");
        var idleTimedelay = 1;
        var delay: number | undefined;

        function delayCheck(_e: any) {
            if (idleTimedelay > 3) {
                clearInterval(delay);
            }
            if (idleTimedelay === 3
                && videoFooter
                && videoHeader
                && videoPlayTimingWrapper
                && getInnermostHovered()?.id === "video_player"
            ) {
                videoFooter.style.display = "none";
                videoHeader.style.display = "none";
                videoPlayTimingWrapper.style.display = "none";
                idleTimedelay = 1;
                clearInterval(delay);
            }
            idleTimedelay = idleTimedelay + 1;
        }

        function mouseMovehandler(e: any) {
            if (videoFooter && videoHeader && videoPlayTimingWrapper) {
                videoFooter.style.display = "block";
                videoHeader.style.display = "block";
                videoPlayTimingWrapper.style.display = "block";
                idleTimedelay = 1;
            }
            clearInterval(delay);
            delay = setInterval(function () { delayCheck(e) }, 1000);
        }

        video?.addEventListener("mousemove", mouseMovehandler);
        video?.addEventListener("mousedown", mouseMovehandler);
        return () => {
            video?.removeEventListener("mousemove", mouseMovehandler);
            video?.removeEventListener("mousedown", mouseMovehandler);
        }
    }, [isPlay]);

    useEffect(() => {
        let video = (document.getElementById("video_player") as HTMLVideoElement);
        let loader = document.getElementById("loader");

        video.oncanplay = function () {
            if (loader) {
                loader.style.display = "none";
            }
        };
    }, []);

    // play pause calling
    useEffect(() => {
        let video = (document.getElementById("video_player") as HTMLVideoElement);
        let loader = document.getElementById("loader");

        video.onplaying = function () {
            loader?.classList.remove("videoLoader");
            if (video.paused) {
                console.log("pause");
                setIsplay(false);
            } else {
                console.log("play");
                setIsplay(true);
            }
        }
    }, [isPlay]);

    // full screen open on double click
    function fullScreenOpen() {
        if (getInnermostHovered()?.id === "video_player"
            || getInnermostHovered()?.id === "fullScreenView") {

            setIsFullscreen(true);
            let video_player = (document.getElementById("video_player_wrapper") as HTMLElement & {
                mozRequestFullScreen(): Promise<void>;
                webkitRequestFullscreen(): Promise<void>;
                msRequestFullscreen(): Promise<void>;
            });
            let videoWrapper = document.getElementById("video_player_wrapper");
            let videoPlayTimingWrapper = document.getElementById("videoPlayTimingWrapper");

            if (videoWrapper && videoPlayTimingWrapper) {
                videoPlayTimingWrapper.classList.add("videoPlayTimingClass");
                videoWrapper.classList.add("videoWrapper");
            }
            if (video_player && !isFullscreen) {
                if (video_player.requestFullscreen) {
                    video_player.requestFullscreen();
                } else if (video_player.mozRequestFullScreen) { /* Firefox */
                    video_player.mozRequestFullScreen();
                } else if (video_player.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                    video_player.webkitRequestFullscreen();
                } else if (video_player.msRequestFullscreen) { /* IE/Edge */
                    video_player.msRequestFullscreen();
                }
            }
        } else return;
    };

    // full screen close
    function fullScreenClose() {
        if (getInnermostHovered()?.id === "video_player"
            || getInnermostHovered()?.id === "fullScreenView") {
                
            setIsFullscreen(false);
            const docWithBrowsersExitFunctions = document as Document & {
                mozCancelFullScreen(): Promise<void>;
                webkitExitFullscreen(): Promise<void>;
                msExitFullscreen(): Promise<void>;
            };
            let videoWrapper = document.getElementById("video_player_wrapper");
            let videoPlayTimingWrapper = document.getElementById("videoPlayTimingWrapper");

            if (videoWrapper && videoPlayTimingWrapper) {
                videoPlayTimingWrapper.classList.remove("videoPlayTimingClass");
                videoWrapper.classList.remove("videoWrapper");
            }

            if (docWithBrowsersExitFunctions && isFullscreen) {
                if (docWithBrowsersExitFunctions.exitFullscreen) {
                    docWithBrowsersExitFunctions.exitFullscreen();
                } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
                    docWithBrowsersExitFunctions.mozCancelFullScreen();
                } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                    docWithBrowsersExitFunctions.webkitExitFullscreen();
                } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
                    docWithBrowsersExitFunctions.msExitFullscreen();
                }
            }
        } else return;
    }

    // play / pause video
    function playOrPause() {
        if (getInnermostHovered()?.id === "video_player"
            || getInnermostHovered()?.id === "videoPlayIcon"
            || getInnermostHovered()?.id === "play_pause_button") {
            console.log("enter", getInnermostHovered()?.id);

            let video = (document.getElementById("video_player") as HTMLVideoElement);
            setIsplay(!isPlay);

            if (video) {
                if (isPlay) {
                    video.pause();
                } else {
                    video.play();
                }
            }
        } else return;
    };

    return (
        <>
            <VideoPlayerWrapper
                onDoubleClick={!isFullscreen ? fullScreenOpen : fullScreenClose}
                onClick={playOrPause}
                width={width}
                height={height}
                id={"video_player_wrapper"}
            >
                <Loader id={"loader"}>
                    <GoogleLoader
                        width={"50px"}
                        height={"50px"}
                        strokeWidth={"4"}
                        color={"#f7f7f7"}
                    />
                </Loader>
                <VideoPlayTiming isPlay={isPlay} playOrPause={playOrPause} />
                <VideoHeader />
                <Video id={"video_player"}>
                    <Source src={videoSrc} type={videoType} />
                </Video>
                <VideoFooter
                    videoFullDuration={videoFullDuration}
                    isPlay={isPlay}
                    setIsplay={setIsplay}
                    playOrPause={playOrPause}
                    fullScreenHandler={!isFullscreen ? fullScreenOpen : fullScreenClose}
                />
            </VideoPlayerWrapper>
        </>
    );
};

// styles

const VideoPlayerWrapper = styled.div<Pick<VideoPlayerT, "width" | "height">>`
    width: ${p => p.width || "500px"};
    height: ${p => p.height || "auto"};
    min-height: 282px;
    margin: 30px auto;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    border: none;
    outline: none;
    filter: drop-shadow(0px 10px 14px lightgrey);

    &.videoWrapper {
        border-radius: 0;
        filter: unset;
    }
    &.videoWrapper video {
        height: inherit;
    }
`;
const Loader = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 2;

    &.videoLoader {
        background-color: transparent;
        display: block !important;   
        pointer-events: none;
    }
`;
const Video = styled.video`
    display: block;
    width: 100%;
    min-height: 282px;
`;
const Source = styled.source``;
