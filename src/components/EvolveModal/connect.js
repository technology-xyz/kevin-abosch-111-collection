import { NFTStage1 } from "assets/images";
import React from "react";
import {
    NFTStageArea
} from "./style";

const ConnectOpensea = () => {
    return (
    <>
        <h3 className="m-t-5 f-bold">Connect your Ethereum wallet & Verify your NFT</h3>
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
                <div className="content-part">
                    <div className="lbl-cap1">Each NFT is split into 1,111 PSTs. Each one holds <span className="f-yellow">voting power in a DAO.</span></div>
                </div>
            </div>
            <div className="a-stage">
                <div className="img-part">
                    <div className="img-area">
                        <img src={NFTStage1} alt="nft stage img1" />
                    </div>
                </div>
                <div className="content-part">
                    <div className="lbl-cap1">Each NFT is split into 1,111 PSTs. Each one holds <span className="f-yellow">voting power in a DAO.</span></div>
                </div>
            </div>
            <div className="a-stage">
                <div className="img-part">
                    <div className="img-area">
                        <img src={NFTStage1} alt="nft stage img1" />
                    </div>
                </div>
                <div className="content-part">
                    <div className="lbl-cap1">Each NFT is split into 1,111 PSTs. Each one holds <span className="f-yellow">voting power in a DAO.</span></div>
                </div>
            </div>
            <div className="a-stage">
                <div className="img-part">
                    <div className="img-area">
                        <img src={NFTStage1} alt="nft stage img1" />
                    </div>
                </div>
                <div className="content-part">
                    <div className="lbl-cap1">Each NFT is split into 1,111 PSTs. Each one holds <span className="f-yellow">voting power in a DAO.</span></div>
                </div>
            </div>
            <div className="a-stage">
                <div className="img-part">
                    <div className="img-area">
                        <img src={NFTStage1} alt="nft stage img1" />
                    </div>
                </div>
                <div className="content-part">
                    <div className="lbl-cap1">Each NFT is split into 1,111 PSTs. Each one holds <span className="f-yellow">voting power in a DAO.</span></div>
                </div>
            </div>
        </NFTStageArea>
    </>
    )
}

export default ConnectOpensea