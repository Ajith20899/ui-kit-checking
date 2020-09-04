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
            else circle.style.left = "calc(100% - 14px)";
        }
    }, [isVolumeMuted]);

    // mousedown and swipe
    useEffect(() => {
        let volumeProgress = document.getElementById("volume_progress");
        let circle = document.getElementById("circle");

        let pos = { top: 0, left: 0, x: 0, y: 0 };

        if (!volumeProgress) return;

        const mouseDownHandler = function (e: any) {
            console.log("e", e);
            if (circle) {
                if (isVolumeMuted) {
                    circle.style.left = "0px";
                }
                else circle.style.left = "calc(100% - 14px)";
            }
            if (volumeProgress) {
                volumeProgress.style.cursor = "grabbing";
                volumeProgress.style.userSelect = "none";

                pos = {
                    left: volumeProgress.scrollLeft,
                    top: volumeProgress.scrollTop,
                    // Get the current mouse position
                    x: e.clientX,
                    y: e.clientY,
                };
            }
            volumeProgress?.addEventListener("mousemove", mouseMoveHandler);
            volumeProgress?.addEventListener("mouseup", mouseUpHandler);
        };

        const mouseMoveHandler = function (e: {
            clientX: number;
            clientY: number;
        }) {
            // How far the mouse has been moved
            const dx = e.clientX - pos.x;
            const dy = e.clientY - pos.y;

            // Scroll the element
            if (volumeProgress) {
                volumeProgress.scrollTop = pos.top - dy;
                volumeProgress.scrollLeft = pos.left - dx;
            }
        };

        const mouseUpHandler = function () {
            if (volumeProgress) {
                volumeProgress.style.cursor = "grab";
                volumeProgress.style.removeProperty("user-select");
            }

            volumeProgress?.removeEventListener("mousemove", mouseMoveHandler);
            volumeProgress?.removeEventListener("mouseup", mouseUpHandler);
        };

        if (volumeProgress) {
            // Attach the handler
            volumeProgress.addEventListener("mousedown", mouseDownHandler);
        }
    }, []);

    return (
        <VolumeProgressWrapper isVolumeMuted={isVolumeMuted} id={"volume_progress"}>
            <Circle id={"circle"}></Circle>
        </VolumeProgressWrapper>
    );
};

// styles
const VolumeProgressWrapper = styled.div<{ isVolumeMuted: boolean }>`
    position: relative;
    display: inline-block;
    width: 75%;
    height: 4px;
    border-radius: 8px;
    background-color: ${p => p.isVolumeMuted ? "#6d6d6d" : "#fff"};
    top: -4.5px;
    left: 18px;
    transition: .5s all;

    &:before {
        content: "";
    }
`;
const Circle = styled.span`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #ffffff;
    position: absolute;
    left: calc(100% - 14px);
    top: -5px;
    transition: .5s all;
`;