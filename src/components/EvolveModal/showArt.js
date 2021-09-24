import { 
    ItemTemp
} from "assets/images";
import React from "react";
import {
    ActionButton,
    ShowArtArea,
    KoiiAddress
} from "./style";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ShowArt = ({
    action = () => {},
    koiiAddress = '',
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
        <KoiiAddress className="koii-address m-t-15 w-100">
            <div className="lbl-cap1 w100">Koii Address</div>
            <div className="lbl-cap1 text-center word-break"><span className="f-yellow f-bold">{koiiAddress}</span></div>
        </KoiiAddress>
        <div className="lbl-cap3 m-t-5 w-100 text-left">
            *This address is auto-filled from the Finnie Wallet Extension
        </div>
        <div className="lbl-cap1 m-t-20">
            Evolving your NFT uses Koii’s Ethereum-Arweave bridge. To tranform this NFT into it’s 1,111 pieces, the bridge will burn the Ethereum NFT.
        </div>
        <div className="lbl-cap1 m-t-10">If you ever need it on Ethereum again, the bridge will be there for you.</div>
        <ActionButton onClick={uploadNFT} className="m-t-30 m-b-25">Evolve</ActionButton>
    </>
    )
}

export default ShowArt