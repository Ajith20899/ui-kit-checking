import React from "react";
import styled from "styled-components";

export function VideoHeader() {

    return(
        <VideoHeaderWrapper id={"video_header_wrapper"}>
            <Title>{"You are watching buch "}</Title>
        </VideoHeaderWrapper>
    );
};

// styles
const VideoHeaderWrapper = styled.div`
    position: absolute;
    width: 100%;
    padding: 10px 15px 0px 10px;
    box-sizing: border-box;
`;
const Title = styled.span`
    font-size: 17px;
    font-weight: 500;
    color: white;
    display: inline-block;
    white-space: nowrap;
    width: 340px;
    overflow: hidden;
    text-overflow: ellipsis;
`;