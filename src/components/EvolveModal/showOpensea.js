import { 
    ItemTemp
} from "assets/images";
import React from "react";
import {
    ActionButton,
    SliderArea
} from "./style";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ShowOpensea = ({
    back = () => {},
    kevinNft = []
}) => {
    const showShortString = (content, str_length) => {
        let new_content_name = content;
        if (content.length > str_length)
          new_content_name = new_content_name.substr(0, str_length) + "...";
        return new_content_name;
    };

    return (
    <>
        <h3 className="m-t-15 f-bold">The Real Deal</h3>
        <SliderArea className="m-t-5">
            <div className="flex1 card-slider">
                <Carousel
                    showArrows={true}
                    showThumbs={false}
                    showStatus={false}
                >
                    {kevinNft.map((item, _i) => {
                        console.log({item})
                        return (
                            <div className="card-content" key={_i}>
                                <div className="w114 d-flex align-items-center">
                                    <img src={item.image_thumbnail_url || ItemTemp} className="w120 br-4" alt="kevin1111 nft img"/>
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
            </div>
            <div className="slider-caption">
                <div className="lbl-cap1">We found</div>
                <div className="lbl-cap1 f-bold">
                    {
                        kevinNft.map((item, _i) => { if( _i < 3 ) return '#' + item.id; else return null;} ).join(' ,')
                    }
                </div>
                <div className="lbl-cap1">In your wallet!</div>
            </div>
        </SliderArea>

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