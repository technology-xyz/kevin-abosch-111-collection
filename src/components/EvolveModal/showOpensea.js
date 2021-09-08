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

const ShowOpensea = ({
    back = () => {},
    kevinNft = []
}) => {
    return (
    <>
        <h3 className="m-t-5 f-bold">The Real Deal</h3>
        <div className="lbl-cap1 m-t-25">
            {kevinNft.map( k => {
                return (<p>{k.asset_contract.address}</p>)
            })}
        </div>

        <div className="lbl-cap1 m-t-15 f-bold">Now it’s time to <span className="f-yellow">level up</span>.</div>
        <div className="lbl-cap1 m-t-15 f-bold">
            Atomic NFTs are stored on Arweave’s permaweb and can never be removed. They also earn attention rewards in KOII tokens whenever they are viewed, anywhere on the internet.
        </div>
        
        <ActionButton onClick={back} className="m-t-30">Evolve my NFT</ActionButton>
        <div className="lbl-cap3 m-t-15">*Kevin Abosch envisioned the 1111 collection as a collection of Atomic NFTs.</div>
    </>
    )
}

export default ShowOpensea