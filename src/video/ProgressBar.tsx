import React from "react";
import styled from "styled-components";

export function ProgressBar() {

    return (
        <ProgressBarWrapper>
            <Toolbar>
                {""}
            </Toolbar>
        </ProgressBarWrapper>
    );
};

// styles

const ProgressBarWrapper = styled.div`
    width: 100%;
    height: 8px;
    border-radius: 8px;
    background-color: #5F5B5B;

    &:after,:before {
        content: "";
    }
`;
const Toolbar = styled.span``;