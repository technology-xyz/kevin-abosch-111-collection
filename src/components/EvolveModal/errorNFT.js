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

const ErrorNFT = () => {
    const getNFT = () => {
        let url = "https://opensea.io/collection/1111-by-kevin-abosch";
        window.open(url, "_blank");
    }

    return (
    <>
        <h3 className="m-t-15 f-bold">No 1111 NFTs were found in this wallet</h3>
        <div className="lbl-cap1 m-t-25">There aren’t any 1111 NFTs in your Ethereum Wallet.</div>
        <div className="lbl-cap1 m-t-15">You can get one from the 1111 Collection on Opensea.</div>
        <ActionButton onClick={getNFT} className="m-t-25 m-b-25">1111 Collection</ActionButton>
    </>
    )
}

export default ErrorNFT