import { 
    NewKoiiLogo,
} from "assets/images";
import React from "react";
import {
    ActionButton,
    NoFinnieArea
} from "./style";

const NoFinnie = () => {
    const getFinnie = () => {
        let url = "https://koii.network/getFinnie";
        window.open(url, "_self");
    }
    const getFinnieWallet = () => {
        let url = "https://chrome.google.com/webstore/detail/finnie/cjmkndjhnagcfbpiemnkdpomccnjblmj";
        window.open(url, "_self");
    }

    return (
    <NoFinnieArea>
        <h3 className="m-t-15 f-bold">Get a Koii Wallet</h3>
        <div className="koii-img-area m-t-15">
            <div className="koii-img">
                <img src={NewKoiiLogo} alt="koii finnie" />
            </div>
            <div className="description f-bold">
                <div className="lbl-cap1">It looks like you don’t have <span className="f-yellow c-pointer" onClick={getFinnie}>Finnie</span> yet. You need an Arweave wallet to Evolve your NFTs.</div>
            </div>
        </div>
        <div className="lbl-cap1 m-t-15 text-left">Creating a wallet with Finnie is quick and easy, and you’ll earn attention rewards from anyone you share your NFT with.</div>
        <div className="lbl-cap1 m-t-15 text-left">If you ever want this NFT on Ethereum again, don’t worry. Koii has an Ethereum bridge that can convert Arweave NFTs into ETH NFTs and back again.</div>
        <ActionButton onClick={getFinnieWallet} className="m-t-25 m-b-25 m-l-r-auto">Get Finnie</ActionButton>
    </NoFinnieArea>
    )
}

export default NoFinnie