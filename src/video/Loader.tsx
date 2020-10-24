import React from "react";
import styled, { keyframes } from "styled-components";

type GoogleLoaderT = {
    width: string;
    height: string;
    strokeWidth?: string;
    color?: string;
    theme?: string;
};

export function GoogleLoader(props: GoogleLoaderT) {
    const { width, height, strokeWidth, color, theme } = props;

    return (
        <GoogleLoaderWrapper width={width} height={height} theme={theme} className={"googleLoader"}>
            <Svg className="circular" viewBox="25 25 50 50">
                <Circle
                    className="path"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    stroke={color || "black"}
                    strokeWidth={strokeWidth}
                    stroke-miterlimit="10"
                />
            </Svg>
        </GoogleLoaderWrapper>
    );
}

// google loader
const rotate = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const dash = keyframes`
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
    }
`;

const GoogleLoaderWrapper = styled.span<{ width: string; height: string; theme?: string }>`
    height: ${(props) => props.height || "45px"};
    width: ${(props) => props.width || "45px"};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${(p) => p.theme};
`;

const Svg = styled.svg`
    animation: ${rotate} 2s linear infinite;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
`;

const Circle = styled.circle<{ strokeWidth: string | undefined }>`
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: ${dash} 1.5s ease-in-out infinite;
    stroke-linecap: round;
    stroke-width: ${(props) => props.strokeWidth || "4"};
`;