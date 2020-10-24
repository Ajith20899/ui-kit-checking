import React, { useEffect, SetStateAction, Dispatch } from "react";
import styled from "styled-components";
import { timeFormat } from "./time";

type ProgressBarT = {
    setIsplay: Dispatch<SetStateAction<boolean>>;
};

export function ProgressBar(props: ProgressBarT) {
    const { setIsplay } = props;

    // progress
    useEffect(() => {
        let video = (document.getElementById("video_player") as HTMLVideoElement);
        let videoProgress = document.getElementById("progressVideoBar");
        let toolTip = document.getElementById("videoTooltip");
        let progressCurrent = document.getElementById("progressCurrentLoader");
        let timeText = document.getElementById("timeText");
        var hoverLocalTime = 0;

        if (!videoProgress) return;

        function hoveringCalculation(e: any) {
            if (video && videoProgress && progressCurrent) {
                var videoProgressLength = videoProgress.clientWidth / video?.duration;
                var leftPosition = e.clientX - videoProgress.getBoundingClientRect().left;

                hoverLocalTime = leftPosition / videoProgressLength;

                if (toolTip
                    && timeText
                    && (leftPosition >= 0 && leftPosition <= videoProgress.clientWidth)) {
                    leftPosition = leftPosition - (toolTip.clientWidth / 2);
                    toolTip.style.display = "block";
                    video.currentTime = hoverLocalTime;
                    progressCurrent.style.width = hoverLocalTime + "%";
                    timeText.innerHTML = timeFormat(hoverLocalTime);

                    if ((leftPosition > 0)
                        && leftPosition < (videoProgress.clientWidth - toolTip.clientWidth)) {
                        toolTip.style.left = leftPosition + "px";
                    }
                }
            }
        }

        function mouseDownHandler(e: any) {
            try {
                video?.pause();
                hoveringCalculation(e);

            } catch (e) {
                console.log("e", e);
            }

            videoProgress?.addEventListener("mouseup", mouseUphandler);
        };

        function mouseUphandler() {
            if (toolTip && video) {
                var playPromise = video.play();

                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        if (toolTip) {
                            toolTip.style.display = "none";
                        }
                        setIsplay(true);
                        console.log("mouseUp");
                    })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }

            videoProgress?.removeEventListener("mouseup", mouseUphandler);
        }

        if (videoProgress) {
            // Attach the handler
            videoProgress.addEventListener("mousedown", mouseDownHandler);
        }
    }, []);

    useEffect(() => {
        let video = (document.getElementById("video_player") as HTMLVideoElement);
        let videoProgress = document.getElementById("progressVideoBar");
        let toolTip = document.getElementById("videoTooltip");
        let progressCurrent = document.getElementById("progressCurrentLoader");
        let timeText = document.getElementById("timeText");
        var hoverLocalTime;

        if (!videoProgress) return;

        function hoveringCalculation(e: any) {
            if (video && videoProgress && progressCurrent) {
                var videoProgressLength = videoProgress.clientWidth / video?.duration;
                var leftPosition = e.clientX - videoProgress.getBoundingClientRect().left;

                hoverLocalTime = leftPosition / videoProgressLength;

                if (toolTip
                    && timeText
                    && (leftPosition >= 0 && leftPosition <= videoProgress.clientWidth)) {

                    toolTip.style.display = "block";
                    leftPosition = leftPosition - (toolTip.clientWidth / 2);
                    timeText.innerHTML = timeFormat(hoverLocalTime);

                    console.log("ooo", leftPosition, toolTip.clientWidth - videoProgress.clientWidth);
                    if ((leftPosition > 0)
                        && leftPosition < (videoProgress.clientWidth - toolTip.clientWidth)) {
                        toolTip.style.left = leftPosition + "px";
                    }
                }
            }
        }

        function mouseMoveHandler(e: any) {
            try {
                hoveringCalculation(e);
            } catch (e) {
                console.log("e", e);
            }
        };

        function mouseOutHandler() {
            if (toolTip) {
                toolTip.style.display = "none";
            }
        }

        if (videoProgress) {
            // Attach the handler
            videoProgress.addEventListener("mousemove", mouseMoveHandler);
            videoProgress.addEventListener("mouseout", mouseOutHandler);

            return () => {
                videoProgress?.removeEventListener("mousemove", mouseMoveHandler);
                videoProgress?.removeEventListener("mouseout", mouseOutHandler);
            }
        }
    }, []);

    useEffect(() => {
        let video = (document.getElementById("video_player") as HTMLVideoElement);
        let progressBuffred = document.getElementById("progressBuffredLoader");
        let loader = document.getElementById("loader");

        video.onwaiting = function () {
            if (progressBuffred)
                progressBuffred.style.left = 0 + "%";
            loader?.classList.add("videoLoader");
        };
    }, []);

    useEffect(() => {
        let video = (document.getElementById("video_player") as HTMLVideoElement);
        let progressCurrent = document.getElementById("progressCurrentLoader");
        let videoProgress = document.getElementById("progressVideoBar");
        let progressBuffred = document.getElementById("progressBuffredLoader");

        function timeBufferHandler() {
            var range = 0;
            var bf = video?.buffered;
            let time = video?.currentTime;

            try {
                while (!(bf.start(range) <= time && time <= bf.end(range))) {
                    range += 1;
                }

                var loadStartPercentage = bf.start(range) / video?.duration;
                var loadEndPercentage = bf.end(range) / video?.duration;
                var loadPercentage = loadEndPercentage - loadStartPercentage;

                if (progressBuffred) {
                    progressBuffred.style.width = loadPercentage * 100 + "%";
                    progressBuffred.style.left = loadStartPercentage * 100 + "%";
                }
            } catch (e) {
                console.log(e);
            }
        }

        function timeupdate() {
            let time = video && video.currentTime;
            let duration = video && video.duration;
            if (progressCurrent) {
                if (video.paused) return;
                progressCurrent.style.width = ((time / duration) * 100) + "%";
            }
        };

        video?.addEventListener("timeupdate", timeupdate);
        video?.addEventListener("timeupdate", timeBufferHandler);
        videoProgress?.addEventListener("mousedown", timeBufferHandler);
        return () => {
            video?.removeEventListener("timeupdate", timeupdate);
            video?.removeEventListener("timeupdate", timeBufferHandler);
            videoProgress?.removeEventListener("mousedown", timeBufferHandler);
        }
    }, []);

    return (
        <ProgressBarWrapper id={"progressVideoBar"}>
            <ProgressHiddenBar htmlFor={"progressVideoBar"}></ProgressHiddenBar>
            <ProgressBuffredLoader id={"progressBuffredLoader"}></ProgressBuffredLoader>
            <ProgressCurrentLoader id={"progressCurrentLoader"}></ProgressCurrentLoader>
            <ToolTip id={"videoTooltip"}>
                <TimeText id={"timeText"}></TimeText>
            </ToolTip>
        </ProgressBarWrapper>
    );
};

// styles

const ProgressBarWrapper = styled.div`
    width: 100%;
    height: 5px;
    position: relative;
    border-radius: 8px;
    background-color: #f7f7f7;
    cursor: pointer;
`;
const ProgressHiddenBar = styled.label`
    position: absolute;
    width: 100%;
    height: 22px;
    left: 0px;
    bottom: 0px;
    cursor: pointer;
    background-color: transparent;
`;
const ToolTip = styled.span`
    position: absolute;
    top: -33px;
    display: none;
`;
const TimeText = styled.span`
    background-color: #f7f7f7;
    padding: 4px 6px 5px;
    border-radius: 4px;
    font-size: 13px;
    color: #484848;
    font-weight: 500;
    
    &:after {
        content: "";
        position: absolute;
        bottom: -9px;
        left: 50%;
        width: 10px;
        height: 10px;
        background-color: #f7f7f7;
        transform: translateX(-50%) rotate(45deg);
    }
`;
const ProgressBuffredLoader = styled.span`
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    border-radius: 0px 10px 10px 0px;
    background-color: #3b94d487;
    `;
const ProgressCurrentLoader = styled(ProgressBuffredLoader)`
    border-radius: 10px;
    background-color: #3b94d4;
`;