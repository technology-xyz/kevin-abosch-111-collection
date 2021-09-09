import { 
    NFTStage1,
    NFTStage2,
    NFTStage3,
    NFTStage4,
    NFTStage5,
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
        {error && <h3 className="m-t-15 f-bold">{title}</h3>}
        <div className="lbl-cap1 m-t-25">There aren’t any 1111 NFTs in your Ethereum Wallet.</div>
        <div className="lbl-cap1 m-t-15">You can get one from the 1111 Collection on Opensea.</div>
        <ActionButton onClick={back} className="m-t-25 m-b-25">1111 Collection</ActionButton>
    </>
    )
}

export default LoadingArea