import React, { useEffect } from "react";
import styled from "styled-components";

type VolumeProgressT = {
    width?: string;
    height?: string;
    isVolumeMuted: boolean;
};

export function VolumeProgress(props: VolumeProgressT) {
    // props
    const { isVolumeMuted } = props;

    // useEffect
    // volume up position setup
    useEffect(() => {
        let circle = document.getElementById("circle");
        if (circle) {
            if (isVolumeMuted) {
                circle.style.left = "0px";
            }
            else circle.style.left = "calc(100% - 7px)";
        }
    }, [isVolumeMuted]);

    // mousedown and swipe
    useEffect(() => {
        let video = (document.getElementById("video_player") as HTMLVideoElement);
        let volumeProgress = document.getElementById("volume_progress");
        let circle = document.getElementById("circle");
        let volumeFiller = document.getElementById("volume_filler");

        if (!volumeProgress) return;

        function volumeCalculation(e: any) {
            if (volumeProgress) {
                let left = e.clientX - volumeProgress.getBoundingClientRect().left;
                let volumeCount = left / (volumeProgress.clientWidth - 14);
                if (circle && volumeFiller && (left >= 0 && left <= volumeProgress.clientWidth - 14)) {
                    circle.style.left = left + "px";
                    volumeFiller.style.width = left + "px";
                    video.volume = volumeCount;
                }
            }
        }

        const mouseDownHandler = function (e: any) {
            volumeCalculation(e);

            volumeProgress?.addEventListener("mousemove", mouseMoveHandler);
            volumeProgress?.addEventListener("mouseup", mouseUpHandler);
        };

        const mouseMoveHandler = function (e: any) {
            volumeCalculation(e);
        };

        const mouseUpHandler = function () {
            volumeProgress?.removeEventListener("mousemove", mouseMoveHandler);
            volumeProgress?.removeEventListener("mouseup", mouseUpHandler);
        };

        if (volumeProgress) {
            // Attach the handler
            volumeProgress.addEventListener("mousedown", mouseDownHandler);
        }
    }, []);

    return (
        <VolumeProgressWrapper id={"volume_progress"}>
            <VolumeFiller isVolumeMuted={isVolumeMuted} id={"volume_filler"}></VolumeFiller>
            <Circle id={"circle"}></Circle>
        </VolumeProgressWrapper>
    );
};

// styles
const VolumeProgressWrapper = styled.div`
    position: relative;
    display: inline-block;
    width: 75%;
    height: 4px;
    border-radius: 8px;
    background-color: #6d6d6d;
    top: -4.5px;
    left: 18px;
    cursor: pointer;
    transition: .5s all;
`;
const VolumeFiller = styled.span<{ isVolumeMuted: boolean }>`
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    border-radius: 10px;
    width: ${p => p.isVolumeMuted ? "0 !important" : "100%"};
    background-color: white;
`;
const Circle = styled.span`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #ffffff;
    position: absolute;
    left: calc(100% - 14px);
    top: -5px;
`;