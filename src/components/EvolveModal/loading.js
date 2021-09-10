import { 
    NFTStage1,
} from "assets/images";
import React from "react";
import {
    ActionButton
} from "./style";

const LoadingArea = ({
    error = '',
    title = '',
    back = () => {}
}) => {
    return (
    <>
        <h3 className="m-t-15 f-bold">Loading</h3>
        <div className="lbl-cap1 m-t-25">Loading gif</div>
        <ActionButton onClick={back} className="m-t-25 m-b-25">OK</ActionButton>
    </>
    )
}

export default LoadingArea