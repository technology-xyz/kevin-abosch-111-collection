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

const ConnectOpensea = ({
    getNFTwallet = () => {}
}) => {
    return (
    <>
        <h3 className="m-t-15 f-bold">Connect your Ethereum wallet & Verify your NFT</h3>
        <div className="lbl-cap1 m-t-5">Make sure your 1111 piece is the real thing by connecting your Ethereum wallet.</div>
        <div className="lbl-cap1 m-t-15">Then evolve yours to an <span className="f-underline f-bold f-yellow">Atomic NFT</span>, stored permanently and forever earning attention rewards.</div>
        <div className="lbl-cap2 m-t-25 f-bold">Just a few reasons to evolve your 1111 NFT</div>
        <NFTStageArea className="m-t-10 nft-stage-area">
            <div className="a-stage">
                <div className="img-part">
                    <div className="img-area">
                        <img src={NFTStage1} alt="nft stage img1" />
                    </div>
                </div>
                <div className="content-part m-t-10">
                    <div className="lbl-cap1">Each NFT is split into 1,111 PSTs. Each one holds <span className="f-yellow">voting power in a DAO.</span></div>
                </div>
            </div>
            <div className="a-stage">
                <div className="img-part">
                    <div className="img-area">
                        <img src={NFTStage2} alt="nft stage img2" />
                    </div>
                </div>
                <div className="content-part m-t-10">
                    <div className="lbl-cap1">The DAO might control a satellite soon.</div>
                </div>
            </div>
            <div className="a-stage">
                <div className="img-part">
                    <div className="img-area">
                        <img src={NFTStage3} alt="nft stage img3" />
                    </div>
                </div>
                <div className="content-part m-t-10">
                    <div className="lbl-cap1">Atomic NFTs earn attention rewards.</div>
                </div>
            </div>
            <div className="a-stage">
                <div className="img-part">
                    <div className="img-area">
                        <img src={NFTStage4} alt="nft stage img4" />
                    </div>
                </div>
                <div className="content-part m-t-10">
                    <div className="lbl-cap1">No more crazy gas fees. Storage costs &lt;$0.01 per MB.</div>
                </div>
            </div>
            <div className="a-stage">
                <div className="img-part">
                    <div className="img-area">
                        <img src={NFTStage5} alt="nft stage img5" />
                    </div>
                </div>
                <div className="content-part m-t-10">
                    <div className="lbl-cap1">Atomic NFTs are stored <span className="f-yellow">forever</span> with Koii on Arweave’s permaweb.</div>
                </div>
            </div>
        </NFTStageArea>
        <ActionButton onClick={getNFTwallet} className="m-b-35">Scan Wallet for 1111 NFTs</ActionButton>
    </>
    )
}

export default ConnectOpensea