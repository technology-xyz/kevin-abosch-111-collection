import { 
    NFTStage1,
    NFTStage2,
    NFTStage3,
    NFTStage4,
    NFTStage5,
} from "assets/images";
import React from "react";
import {
    NFTStageArea,
    ActionButton
} from "./style";

const LoadingArea = ({
    error = '',
    title = '',
    back = () => {}
}) => {
    return (
    <>
        <h3 className="m-t-5 f-bold">Retrieving your NFT</h3>
        <div className="lbl-cap2 m-t-25 f-bold">loading gif</div>
        <ActionButton onClick={back} className="m-b-35">OK</ActionButton>
    </>
    )
}

export default LoadingArea