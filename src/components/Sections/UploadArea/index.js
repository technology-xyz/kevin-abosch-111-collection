/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
import { Image } from "react-bootstrap";
import { IconUpload, IconOpenSea, IconArweave } from "assets/images";
import { UploadAreaContainer, 
    LinkNftUpload, 
    RegisterContentArea 
} from "./style";
import SubUploadManual from "../SubUploadManual";
import SubUploadArweave from "../SubUploadArweave";
import SubUploadOpensea from "../SubUploadOpensea";
import { DataContext } from "contexts/DataContextContainer";
import { abi } from "assets/abi";
import Web3 from "web3";
import { show_notification } from "service/utils";

function StickyUploadArea({
    isScrollMode = false,
    defaultAction = 'landing',
    show_alert = () => {}
}) {
    // const history = useHistory();
    const { 
        setAddressEth,
     } = useContext(DataContext);
    const [pageType, setPageType] = useState(defaultAction || 'landing') 
    const [subStep, setSubStep] = useState(0) 
    // landing | select-upload-type | type-opensea | type-arweave | type-manual
    // 

    const openMetaMask = () => {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        if (window.ethereum) {
            window.ethereum.enable().then( async (accounts) => {
                setAddressEth(accounts[0]);
                let contractInstance = new web3.eth.Contract(
                    abi,
                    "0x60F80121C31A0d46B5279700f9DF786054aa5eE5",
                    { from: accounts[0] }
                );
                console.log(contractInstance);
                setPageType('type-opensea', 0)
            });
        } else {
            // metamask extension didn't install
            show_notification("Please install metamask extension first.", "KOI");
            setTimeout(() => {
                let url = "https://metamask.io/download.html";
                window.open(url, "_blank");
            }, 2000);
        }
    };
    const handleBack = (selPageType = 'landing', step = 0) => {
        setPageType(selPageType)
        setSubStep(step)
    };
    const showOpenSea = () => {
        openMetaMask()
    }
    const landingArea = () => {
        return (
            <div className="sub-import-area">
                <LinkNftUpload className={`${!isScrollMode && 'full-scroll-height'}`} onClick={() => setPageType('select-upload-type')}>
                    <div className="cursor d-flex flex-row align-items-center pl-10">
                        <div className="w80">
                            <span>
                                <Image src={IconUpload} width={32} className="overlay-opensea" />
                                <Image src={IconOpenSea} width={32} />
                            </span>
                        </div>
                        <div className="d-flex flex-column flex1">
                            <div className='font-s-1 text-bold'>Drag, Drop, Earn.</div>
                            <div className="font-d-1">Or click for more archive options</div>
                        </div>
                    </div>
                </LinkNftUpload>
            </div>
        )
    }
    const selectUploadTypeArea = () => {
        return (
            <div className="sub-import-area">
                <RegisterContentArea>
                    <div className="font-s-1 mt-15 ml-15 mr-15 text-bold">Register your content,  start earning</div>
                    <div className="choose-types">
                        <div className="card1 cursor" onClick={showOpenSea}>
                            <Image src={IconOpenSea} width={32} />
                            <div className="font-d-2">Import from an OpenSea portfolio</div>
                        </div>
                        <div className="card1 cursor" onClick={() => setPageType('type-arweave', 0)}>
                            <Image src={IconArweave} width={32} />
                            <div className="font-d-2">Enter an existing Arweave ID</div>
                        </div>
                        <div className="card1 cursor" onClick={() => setPageType('type-manual', 0)}>
                            <Image src={IconUpload} width={32} />
                            <div className="font-d-2">Drag & drop or browse computer</div>
                        </div>
                    </div>
                </RegisterContentArea>
            </div>
        )
    }
    return (
        <UploadAreaContainer>
            <div className={`import-area ${pageType}`}>
                {pageType === 'landing' && landingArea()}
                {pageType === 'select-upload-type' && selectUploadTypeArea()}
                {pageType === 'type-opensea' && <SubUploadOpensea step={subStep} handleBack={handleBack} show_alert={show_alert} isScrollMode={isScrollMode} />}
                {pageType === 'type-arweave' && <SubUploadArweave step={subStep} handleBack={handleBack} show_alert={show_alert} isScrollMode={isScrollMode} />}
                {pageType === 'type-manual' && <SubUploadManual step={subStep} handleBack={handleBack} show_alert={show_alert} isScrollMode={isScrollMode} />}
            </div>
        </UploadAreaContainer>
    );
}

export default StickyUploadArea;
