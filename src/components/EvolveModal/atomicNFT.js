import React from "react";
import {
    ActionButton,
    ShowArtArea,
    KoiiAddress
} from "./style";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const AtomicNFT = ({
    back = () => {},
    kevinNft = []
}) => {
    const uploadNFT = () => {
        
    }

    return (
    <>
        <h3 className="m-t-15 f-bold">Make the Most of your Art</h3>
        <ShowArtArea className="m-t-15">
        {
            kevinNft.map((item, _i) => { 
                if( _i < 3 ){ 
                    return (
                        <div className="art-row">
                            <img src={item.image_thumbnail_url}  className="w120" alt="kevin1111 nft img" />
                        </div>
                    )
                }else return null;} )
        }
        </ShowArtArea>
        <div className="lbl-cap1 m-t-25">Your NFTs are now Atomic, and they will earn attention rewards when they are viewed.</div>
        <div className="lbl-cap1 m-t-10">You will soon see your evolved NFTs in the <span className="c-pointer f-bold f-yellow f-underline">Finnie Gallery</span>.</div>
        <div className="lbl-cap1 m-t-20 f-bold">Share now to start earning!</div>
        <div className="atomic-btn-area m-t-30 m-b-25 w-100">
            <ActionButton onClick={back} className="">Share NFT</ActionButton>
            <ActionButton onClick={back} className="black-btn">Learn More</ActionButton>
        </div>
    </>
    )
}

export default AtomicNFT