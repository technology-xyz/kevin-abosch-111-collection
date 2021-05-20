/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { Image, Button } from "react-bootstrap";
import { IconLeft, IconUpload, ItemTemp } from "assets/images";
import { CountsWapper, OpenseaCards, OpenseaUploadArea, KevinContainer } from "./style";
import { Input, Upload, Spin } from "antd";
import cloneDeep from "clone-deep";
import { convertArBalance, show_notification, showShortString, show_fixed_number } from "service/utils";
import Arweave from "arweave";
import { getArWalletAddressFromJson, exportNFT } from "service/NFT";
import { DataContext } from "contexts/DataContextContainer";
import { getKoi } from "service/KOI";
import { ScaleLoader } from "react-spinners";
import { FaCheck, FaPlus } from "react-icons/fa";
import MyProgress from "components/Elements/MyProgress";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Web3 from "web3";
import customAxios from "service/customAxios";

const arweave = Arweave.init({
  host: 'arweave.net',// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 20000,     // Network request timeouts in milliseconds
  logging: false,     // Enable network request logging
});
const { TextArea } = Input;
const { Dragger } = Upload;
const modes = {
  change: "change",
  confirm: "confirm",
  complete: "complete",
};

function SubUploadOpeansea({
    step = 0,
    isScrollMode = false,
    handleBack = () => {},
    show_alert = () => {},
}) {
  const {
    addressAr,
    setAddressAr,
    addressEth,
    keyAr,
    setKeyAr,
    openSeas,
    setOpenSeas,
    balanceKoi,
    setBalanceKoi,
    balanceAr,
    setBalanceAr,
  } = useContext(DataContext);
  const [stageStep, setStageStep] = useState(step); // step
  const [iskevinNft, setIskevinNft] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [uploadContents, setUploadContents] = useState([]);
  const [activeOpenSea, setActiveOpenSea] = useState({
    id: 0,
    token_id: "",
    isUpload: false,
    thumb: "",
    title: "",
    owner: "",
    description: "",
  });
  const [updatingProcess, setUploadingProcess] = useState(0);
  const [mode, setMode] = useState("change"); // change | confirm | uploadKey | uploading | complete
  const [isKevinSuccess, setIsKevinSuccess] = useState(false);

  const onClickCard = (cardId) => {
    let tempSelectedCards = [...selectedIds];
    if (tempSelectedCards.includes(cardId)) {
      setSelectedIds(tempSelectedCards.filter((_cardId) => _cardId !== cardId));
    } else {
      setSelectedIds([...tempSelectedCards, cardId]);
    }
  };
  const onSelectAll = () => {
    setIsAllSelected(!isAllSelected);
  };
  const updateContent = (key, value) => {
    let tpContent = cloneDeep(activeOpenSea);
    tpContent[key] = value;
    setActiveOpenSea(tpContent);
    let tpUploadContents = cloneDeep(uploadContents);
    tpUploadContents[activeStep-1] = tpContent
    setUploadContents(tpUploadContents)
  };
  const formValidation = () => {
    if(!activeOpenSea.title || !activeOpenSea.owner || !activeOpenSea.description) {
      show_alert("We couldn't find any details about this NFT on the blockchain. <br> Please enter the information in order to collect KOI.")
      return false
    }
    return true
  }
  const onClickConfirm = () => {
    switch (
      mode // change | confirm | uploadKey | uploading | complete
    ) {
      case modes.change:
        if(!formValidation()){
          break;
        }
        if (activeStep === uploadContents.length) {
          console.log("here2")
          setMode("confirm");
          setStageStep(2)
        } else {
          console.log("here1.2")
          setActiveStep(activeStep + 1);
          setActiveOpenSea(uploadContents[activeStep]);
        }
        break;
      default:
        setMode(modes.change);
        break;
    }
  };
  const onClickBack = () => {
    switch (
      mode // change | confirm | uploadKey | uploading | complete
    ) {
      case modes.change:
        let newStep = activeStep - 1;
        if(newStep < 1) {
          setStageStep(0)
        }else{
          setActiveOpenSea(uploadContents[newStep - 1]);
          setActiveStep(newStep);
        }
        break;
      case "confirm":
        // setActiveStep(activeStep)
        setMode(modes.change);
        break;
      default:
        setMode(modes.change);
        break;
    }
  };
  const registerContent = async (token_id, contentType = 'opensea', ownerArAddress = '', signature = '') => {
    let param = {
      token_id,
      address: addressEth,
      contentType,
      ownerArAddress,
      signature
    }

    let url = 'registerOpenseaNFT'
    if(contentType === 'kevin1111')
      url = 'registerKevinNFT'
    let { ok, data: {data} } = await customAxios.post(`/${url}`, param);
    if (ok) {
      // show_notification(data.message)
      console.log(data)
      return true
    } else {
      show_notification(data.message);
      return false
    }
  };
  const uploadNFTContents = async () => {
    setLoading(true);
    // uploading process
    let tpUpdatingProcess = updatingProcess;
    let tempUploadContents = uploadContents
    for (let content of uploadContents) {
      try {
        let res = await exportNFT(
          arweave,
          addressAr,
          content,
          content.thumb,
          null,
          keyAr
        );
        console.log(res);
        tpUpdatingProcess++;

        if (res) {
          setUploadingProcess(tpUpdatingProcess);
          let t_i_CT = tempUploadContents.findIndex((_tc) => _tc.id === content.id);
          if (tempUploadContents[t_i_CT]) {
            tempUploadContents[t_i_CT].txId = res
            // register openseaNFT
            await registerContent(content.token_id, 'opensea')
          }
        } else {
          setUploadingProcess(tpUpdatingProcess);
          show_alert(
            "There is an error uploading '" +
              content.title +
              "' "
          );
        }
      } catch (err) {
        console.log("error - exportNFT", err);
        show_alert("Something went wrong uploading your NFT.", "KOI", "error");
      }
    }
    // close modal
    setLoading(false);
    show_alert("Upload finished.", "success");
    // show complete section
    setTimeout(() => {
      setStageStep(4);
    }, 2000);
    tempUploadContents = tempUploadContents.filter( uc => uc.txId !== '')
    setUploadContents(tempUploadContents)
  }
  const enoughBalance = async (bcKoi, bcAr) => {
    // console.log("koi balance : ", Number(bcKoi))
    // console.log("ar balance : ", Number(bcAr))
    if(Number(bcKoi) < uploadContents.length ) {
      show_alert("You don't have enough KOI to upload these NFTs. Visit the KOI Faucet to get some KOI.")
      return false
    }else if(Number(bcAr) < Number(uploadContents.length * 0.0002) ) {
      show_alert('You need more AR to upload.')
      return false
    }else{
      await uploadNFTContents()
    }
  }
  const checkUpload = async () => {
    if(!keyAr) {
      // show_notification('Please upload your json keyfile.')
      setStageStep(3)
    }else {
      if(balanceKoi !== null && balanceAr !== null) {
        enoughBalance(balanceKoi, balanceAr)
      }else {
        setLoading(true)
        let balance = await getKoi(keyAr)
        setLoading(false)
        setBalanceKoi(Number(balance.koiBalance))
        setBalanceAr(convertArBalance(balance.arBalance))
        enoughBalance(Number(balance.koiBalance), convertArBalance(balance.arBalance))
        // setTimeout( () => enoughBalance(), 100)
      }
    }
  }
  const onCompleteStep2 = async () => {
    checkUpload()
  };
  const beforeArweaveKeyfileUpload = (file) => {
    const isJson = file.type === "application/json";
    if (!isJson) {
      show_notification("You can only upload a JSON file!");
    }
    const isLt1M = file.size / 1024 < 512;
    if (!isLt1M) {
      show_notification("JSON must smaller than 512KB!");
    }
    if (isJson && isLt1M) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        var arJson = JSON.parse(e.target.result);
        let addressResult = await getArWalletAddressFromJson(arweave, arJson);
        setAddressAr(addressResult)
        setKeyAr(arJson);
        setStageStep(2)
        // show_alert("Success! Your keyfile has been uploaded.", 'success');
      };
      reader.readAsText(file);
      // Prevent upload
      return false;
    }
    return isJson && isLt1M;
  };
  const onClickVerify = () => {
    if(selectedIds.length > 0){
      let contentsOS = [];
      selectedIds.forEach((tId) => {
        let tempOpenSea = openSeas.find((_openSea) => tId === _openSea.id);
        if (tempOpenSea) {
          let tpOwner = tempOpenSea?.owner?.user?.username || ""
          if(tpOwner === 'NullAddress'){
            tpOwner = ''
          }
          contentsOS.push({
            id: tempOpenSea?.id || 0,
            token_id: tempOpenSea?.token_id || '',
            thumb: tempOpenSea?.image_url || "",
            title: tempOpenSea?.name || "",
            owner: tpOwner,
            description: tempOpenSea?.description || "",
            txId: ''
          });
        }
      });
      if (contentsOS.length > 0) {
        let firstOpenSea = contentsOS[0];
        setActiveOpenSea(firstOpenSea);
        setActiveStep(1);
      }
      setUploadContents(contentsOS);
      setStageStep(1)
    }
    else{
      show_alert('Please select an item')
    }
  };
  const onUploadKevin1111 = async (payload) => {
    console.log("here");
    setLoading(true)
    await registerContent(iskevinNft.token_id, 'kevin1111', payload.ownerArAddress, payload.signature)
    setLoading(false)
    setIsKevinSuccess(true)
  };
  const onClickShareKevin = () => {
    console.log("here")
  }
  const onClickViewKevin = () => {
    console.log("here")
  }
  const  sign  = () => {
    // setIsAllSelected(!isAllSelected);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    if(addressAr){
      // var arAddress = "FeSD9TV8aB0GK0yby8A40KEX1N-3wrJQTDbRW4uUiEA"
      var payload = {
        // ownerArAddress: arAddress,
        ownerArAddress: addressAr,
      };
    }
    // else{
    //   history.push("/wallet-key");
    // }

    //var hash = web3.utils.sha3(message)
    //var accounts = await web3.eth.getAccounts()
    window.ethereum.enable().then( async (accounts)=> 
      web3.eth.personal.sign(addressAr, accounts[0]).then( async (res)=>{
        payload.signature = res;
        console.log('signature', res);
        console.log('signature', payload);
        await onUploadKevin1111(payload)
      })
    );
  };
  const showKevinNFTArea = () => {
    console.log(iskevinNft)
    return (
      <KevinContainer>
        {/* <h1 className="text-blue">Your NFTs are stored <span className="underline">forever</span></h1> */}
        <div className="orange-area">
          {/* <div className="cap1"><b>Congratulations!</b> Your 1111 NFT is now in your Metamask wallet.</div>
          <div className="cap1">You'll start earning KOI as soon as someone views your NFT.</div> */}
          <div className="kevin-area">
            <div className="img-area">
              <div className="border-white"><Image src={iskevinNft.image_url} /></div></div>
            <div className="info-area">
              <div className="cap2"> Look what we found!</div>
              <div className="cap3 mt-3 mb-3"><b>1111 #{iskevinNft.id}</b> by Kevin Abosch</div>
              <div className="cap3">Since you purchased a piece from Abosch’s 1111 collection, you can store it on Arweave and receive KOI rewards whenever someone views it.</div>
              <div className="cap4">Register your piece now, for free! </div>
              <div className="success-btn-area mt-30">
                <Button className="btn-back btn-blueDark" onClick={sign}>Register</Button>
              </div>
            </div>
          </div>
        </div>
      </KevinContainer>)
  }
  const showSuccessKevinNFTArea = () => {
    console.log(iskevinNft)
    return (
      <KevinContainer>
        {/* <h1 className="text-blue">Your NFTs are stored <span className="underline">forever</span></h1> */}
        <div className="orange-area">
          {/* <div className="cap1"><b>Congratulations!</b> Your 1111 NFT is now in your Metamask wallet.</div>
          <div className="cap1">You'll start earning KOI as soon as someone views your NFT.</div> */}
          <div className="kevin-area">
            <div className="img-area">
              <div className="border-white"><Image src={iskevinNft.image_original_url} /></div></div>
            <div className="info-area">
              <div className="cap2">Success!</div>
              <div className="cap3 mt-3 mb-3"><b>1111 #{iskevinNft.id}</b> by Kevin Abosch</div>
              <div className="cap3">You’ll earn KOI whenever somebody looks at your NFT on Koi. Share it now to get started.</div>
              <div className="success-btn-area mt-30">
                <Button className="btn-back btn-blueDark" onClick={onClickShareKevin}>Share</Button>
                <Button className="btn-back btn-outline" onClick={onClickViewKevin}>View Details</Button>
              </div>
            </div>
          </div>
        </div>
      </KevinContainer>)
  }
  const show_NFT_contents = () =>{
    return (
      <OpenseaCards>
        {openSeas.length > 0 &&
          openSeas.map((_card, _i) => {
            let selected = !_card.isUpload && selectedIds.includes(_card.id);
            let cssIsUpload = _card.isUpload ? 'disabled' : ''
            return (
              <div key={_i} className={`gutter-row`}>
                <div 
                  className={`opensea-card ${cssIsUpload} ${
                    selected ? "selected" : ""
                  }`}
                  onClick={() => !_card.isUpload && onClickCard(_card.id)}
                >
                  <div className="card-img">
                    <Image src={_card.image_url} />
                  </div>
                  <div className="card-content">
                    <h6>{_card.name}</h6>
                  </div>
                  {selected ? (
                    <div className="icon-checked">
                      <FaCheck />
                    </div>
                  ) : (
                    <div className="icon-plus">
                      <FaPlus />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </OpenseaCards>
    )
  }
  const renderStep0 = () => {
    return (
        <div className="sub-import-area">
            <div className="icon-back cursor" onClick={() => handleBack('select-upload-type', 0)}>
                <Image src={IconLeft} width={20} />
            </div>
            <OpenseaUploadArea className="cursor">
              <div className="card1-head">
                <div className="font-d-1 blueFont">Register your OpenSea NFTs</div>
                <div className="font-d-2 blueFont">You’ll earn rewards every time someone views them.</div>
              </div>
              {loading ? (
                <div className="loading-container">
                  <ScaleLoader size={15} color={"#2a58ad"} />
                </div> ) : 
                <>
                  <div className="card1-body">
                    <CountsWapper>
                      <div className={`selected-counts ${selectedIds.length > 0 && "isSet"}`}>
                        {selectedIds.length}
                      </div>
                      <Button
                        className={`btn-all ${isAllSelected && "selected-all"}`}
                        onClick={onSelectAll}
                      >
                        Select all NFTs
                      </Button>
                      <Button
                        type="submit"
                        className={`btn-all ${selectedIds.length !== 0 && "selected-all"}`}
                        // disabled={selectedIds.length === 0}
                        onClick={onClickVerify}
                      >
                        Verify Details
                      </Button>
                    </CountsWapper>
                    {iskevinNft && !isKevinSuccess && showKevinNFTArea()}
                    {iskevinNft && isKevinSuccess && showSuccessKevinNFTArea()}
                    {show_NFT_contents()}
                  </div>
                  <div className="card1-footer">
                  <div className="flex1 d-flex justify-content-center mb-20">
                    <Button
                      type="submit"
                      className="btn-blueDark btn-confirm shadow-radius"
                      disabled={selectedIds.length === 0}
                      onClick={onClickVerify}
                    >
                      Verify Details
                    </Button>
                  </div>
                  </div>
                </>
              }
            </OpenseaUploadArea>
        </div>
    )
  }
  const renderStep1 = () => {
    return (
      <div className="sub-import-area blueBk">
        <div className="icon-back cursor" onClick={onClickBack}>
            <Image src={IconLeft} width={20} />
        </div>
        <OpenseaUploadArea>
          <div className="card2-head mt-10">
            <div className="font-d-1 text-bold text-center">Confirm details for your NFTs</div>
            <div className="upload-step">
              <MyProgress value={activeStep} maxValue={uploadContents.length} />
            </div>
          </div>
          <div className="card2-body">
            <div className="upload-content-form">
              <div className="content-img-wrapper">
                <div className="card-image">
                  <Image src={activeOpenSea.thumb || ItemTemp} className="w160 br-4" />
                </div>
              </div>
              <div className="upload-content-row">
                <div className="control-row">
                  <div className="left">
                    <div className="font-c-l">Title</div>
                  </div>
                  <Input
                    value={activeOpenSea?.title}
                    onChange={(e) =>
                      updateContent("title", e.target.value)
                    }
                    placeholder=""
                    className="value-input"
                  />
                </div>
                <div className="control-row">
                  <div className="left">
                    <div className="font-c-l">Owner</div>
                  </div>
                  <Input
                    placeholder=""
                    className="value-input"
                    value={activeOpenSea?.owner}
                    onChange={(e) =>
                      updateContent("owner", e.target.value)
                    }
                  />
                </div>
                <div className="control-row">
                  <div className="left">
                    <div className="font-c-l">Description</div>
                  </div>
                  <TextArea
                    placeholder=""
                    value={activeOpenSea?.description}
                    onChange={(e) =>
                      updateContent("description", e.target.value)
                    }
                    className="value-input"
                    rows={5}
                  />
                </div>
                <div className="control-row">
                  <div className="left"></div>
                  <div className="button-input">
                    <Button
                      type="submit"
                      className="btn-blueDark btn-confirm shadow-radius"
                      onClick={onClickConfirm}
                    >
                      Add Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>              
        </OpenseaUploadArea>
      </div>
    )
  }
  const renderStep2 = () => {
    return (
      <div className="sub-import-area blueBk">
        <div className="icon-back cursor" onClick={() => setStageStep(1)}>
          <Image src={IconLeft} width={20} />
        </div>
        <OpenseaUploadArea>
          <div className="card2-head mt-10">
            <div className="font-d-1 text-bold text-center">Confirm Transaction</div>
          </div>
          <div className="card3-body">
            <div className="upload-content-result">
              <div className="flex1 card-slider">
              {/* <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}> */}
              <Carousel showArrows={false} showThumbs={false} showStatus={false}>
                {uploadContents.map( (item, _i) => {
                  return (
                    <div className="card-content" key={_i}>
                      <div className="w114 d-flex align-items-center">
                        <Image src={item.thumb || ItemTemp} className="w110 br-4" />
                      </div>
                      <div className="flex1 content-info">
                        <div className="font1 blueFont">{item.title}</div>
                        <div className="font2 blueFont"><span>{item.owner}</span></div>
                        <div className="font3 blueFont truncate-overflow">{showShortString(item.description, 1000)}</div>
                      </div>
                    </div>
                  )
                })}
              </Carousel>
                
              </div>
              <div className="flex1">
                <div className="estimate-result">
                  <div className="font-d-1 flex1 blueFont">Estimated Total</div>
                  <div className="flex1 sub-detail-info">
                    <div className="font-d-2 blueFont">{show_fixed_number(uploadContents.length * 0.0002, 4)} AR</div>
                    <div className="font-d-2 blueFont font-weight-400">0.0002 AR &#10005; {uploadContents.length} NFTs</div>
                  </div>
                  <div className="flex1 sub-detail-info">
                    <div className="font-d-2 blueFont">{show_fixed_number(uploadContents.length * 1, 1)} KOI</div>
                    <div className="font-d-2 blueFont font-weight-400">1.00 KOI     &#10005; {uploadContents.length} NFTs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card3-footer">
            <div className="flex1 d-flex justify-content-center">
              <Button
                type="submit"
                className="btn-blueDark btn-confirm shadow-radius"
                onClick={onCompleteStep2}
              >
                {keyAr ? 'Confirm & Upload' : 'Upload Your Arweave Keyfile'}
              </Button>
            </div>
            {loading && <div className="text-center mt-10">
              <Spin size="default" />
            </div>}
          </div>
        </OpenseaUploadArea>
      </div>
    )
  }
  const renderStep3 = () => {
    return (
      <div className="sub-import-area">
        <div className="icon-back cursor" onClick={() => setStageStep(2)}>
            <Image src={IconLeft} width={20} />
        </div>
        <OpenseaUploadArea className="cursor bk-white">
          <Dragger
              name="file"
              accept="application/*"
              multiple={false}
              listType="picture"
              className={`${!isScrollMode && 'full-scroll-height'}`}
              beforeUpload={beforeArweaveKeyfileUpload}
              // fileList={false}
              showUploadList={false}
          >
            <div className="card1-body">
                <Image src={IconUpload} width={32} />
                <div className="font-d-1">Drag & drop your Arweave keyfile here.</div>
                <div className="text-center">
                  {loading && <Spin size="default" />}
                </div>
            </div>
          </Dragger>
        </OpenseaUploadArea>
      </div>
    )
  }
  const renderResult = () => {
    return (
      <div className="sub-import-area">
        <div className="icon-back cursor" onClick={() => setStageStep(1)}>
          <Image src={IconLeft} width={20} />
        </div>
        <OpenseaUploadArea>
          <div className="card2-head mt-10">
            <div className="font-d-1 text-bold text-center">Congratulations!</div>
          </div>
          <div className="card3-body">
            <div className="upload-success">
              <div className="font1 blueFont">Your NFT is ready to hit the leaderboard</div>
              <div className="font2 blueFont">Share your Koi-powered NFT with everyone to start earning attention rewards.</div>
            </div>
          </div>
          <div className="card3-footer">
            <div className="flex1 d-flex justify-content-center">
              <Button
                type="submit"
                className="btn-blueDark btn-confirm shadow-radius"
                onClick={() => setStageStep(0)}
              >
                Upload More
              </Button>
            </div>
          </div>
        </OpenseaUploadArea>
      </div>
    )
  }
  const checkKevinNFT = (nfts = []) => {
    let kevinNFTs = []
    for(var i = 0; i < nfts.length; i++){
     // if(!nfts[i].isUpload && nfts[i].asset_contract.address === "0x495f947276749ce646f68ac8c248420045cb7b5e") {
        if(!nfts[i].isUpload && nfts[i].asset_contract.address === "0x7f72528229f85c99d8843c0317ef91f4a2793edf") {
        console.log(nfts[i].asset_contract.address)
        kevinNFTs.push(nfts[i])
        setIskevinNft(nfts[i])
        break;
      }
    }
    // setIskevinNft(kevinNFTs[0])
  }
  const getRetrieveOpenseaNFT = async () => {
    let param = {
      address: addressEth,
    }

    let { ok, data: {data} } = await customAxios.post(`/getOpenseaNFT`, param);
    if (ok) {
      // show_notification(data.message)
      console.log(data)
      return data
    } else {
      return []
    }
  }
  useEffect(() => {
    if(!addressEth) handleBack('select-upload-type', 0)
    if (addressEth && step === 0) {
      setLoading(true);
      const options = {
        method: "GET",
      };

      fetch(
      //  `https://api.opensea.io/api/v1/assets?owner=0x8dea9139b0e84d5cc2933072f5ba43c2b043f6db&order_direction=desc&offset=0&limit=20`,
      //  `https://api.opensea.io/api/v1/assets?owner=0x9428E55418755b2F902D3B1f898A871AB5634182&order_direction=desc&offset=0&limit=100`,
        `https://api.opensea.io/api/v1/assets?owner=${addressEth}&order_direction=desc&offset=0&limit=100`,
        options
      )
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        console.log({ data });
        if(data.assets.length === 0) {
          show_alert(`Our school of koi couldn't find anything on OpenSea NFTs associated with that wallet[${addressEth}].`)
        }

        let newest_nfts = []
        let temp_opensea = data.assets
        if(temp_opensea.length > 0) {
          // get already registered opensea
          const registeredNFTs = await getRetrieveOpenseaNFT()
          temp_opensea.forEach(el => {
            if(registeredNFTs.find(k => k.token_id === el.token_id)) {
              el.isUpload = true
            }else{
              el.isUpload = false
              newest_nfts.push(el)
            }
          })

          console.log({newest_nfts});
          setOpenSeas(newest_nfts);
          checkKevinNFT(newest_nfts)
        }
      })
      .catch(err => {
        console.log(err)
        show_alert(`Our school of koi couldn't find anything on OpenSea NFTs associated with that wallet[${addressEth}].`)
      })
      .finally(() =>{
        setLoading(false);
      });
    }
  }, [step]);

  useEffect(() => {
    if (isAllSelected) {
      setSelectedIds(openSeas.map((_card) => _card.id));
    } else {
      setSelectedIds([]);
    }
  }, [isAllSelected]);

  useEffect(() => {
    let contentsOS = [];
    selectedIds.forEach((tId) => {
      let tempOpenSea = openSeas.find((_openSea) => tId === _openSea.id);
      if (tempOpenSea) {
        let tpOwner = tempOpenSea?.owner?.user?.username || ""
        if(tpOwner === 'NullAddress'){
          tpOwner = ''
        }
        contentsOS.push({
          id: tempOpenSea?.id || 0,
          token_id: tempOpenSea?.token_id,
          isUpload: tempOpenSea?.isUpload,
          thumb: tempOpenSea?.image_url || "",
          title: tempOpenSea?.name || "",
          owner: tpOwner,
          description: tempOpenSea?.description || "",
          txId: ''
        });
      }
    });
    if (contentsOS.length > 0) {
      let firstOpenSea = contentsOS[0];
      setActiveOpenSea(firstOpenSea);
      setActiveStep(1);
    }
    setUploadContents(contentsOS);
  }, [step, openSeas]);

  return (
      <>
        { stageStep === 0 && renderStep0() }
        { stageStep === 1 && renderStep1() }
        { stageStep === 2 && renderStep2() }
        { stageStep === 3 && renderStep3() }
        { stageStep === 4 && renderResult() }
      </>
  );
}

export default SubUploadOpeansea;
