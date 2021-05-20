/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from "react";
import { Image, Button } from "react-bootstrap";
import { IconLeft, IconUpload, IconFish } from "assets/images";
import { ManualUploadArea } from "./style";
import { Input, Upload, Spin } from "antd";
import cloneDeep from "clone-deep";
import { convertArBalance, show_notification, getMediaType, showShortString } from "service/utils";
import Arweave from "arweave";
import { getArWalletAddressFromJson, exportNFT } from "service/NFT";
import { DataContext } from "contexts/DataContextContainer";
import { getKoi } from "service/KOI";
import PlayMedia from "components/Elements/PlayMedia";
import ModalContent from "components/Elements/ModalContent";

const arweave = Arweave.init({
  host: 'arweave.net',// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 20000,     // Network request timeouts in milliseconds
  logging: false,     // Enable network request logging
});
const { TextArea } = Input;
const { Dragger } = Upload;

function SubUploadManual({
    step = 0,
    isScrollMode = false,
    handleBack = () => {},
    show_alert = () => {},
}) {
  const {
    addressAr,
    setAddressAr,
    keyAr,
    setKeyAr,
    balanceKoi,
    setBalanceKoi,
    balanceAr,
    setBalanceAr,
  } = useContext(DataContext);
  const [stageStep, setStageStep] = useState(step); // step
  const [imagePath, setImagePath] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [contentType, setContentType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeContent, setActiveContent] = useState({
    txId: "",
    title: "",
    owner: "",
    description: "",
  });
  const [selectedContent, setSelectedContent] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [modalType, setModalType] = useState("share");

  const onCompleteStep1 = async () => {
    if (
      activeContent.title &&
      activeContent.owner &&
      activeContent.description
    ) {
      setStageStep(2) // preview uploading
    } else {
      console.log("here danger")
      show_alert("Please fill out all fields.", "danger");
    }
  };
  const onCompleteStep2 = async () => {
    if(keyAr){
      let isUploading = await checkUpload(keyAr)
      if(isUploading){
        await uploadNFTContents()
      }else{
        show_alert('You don\'t have enough koi or ar')
      }
    }else{
      show_alert('You don\'t have enough koi or ar')
      setTimeout( () => {
        setStageStep(3)
      })
    }
  };
  const enoughBalance = async (bcKoi, bcAr) => {
    if(Number(bcKoi) < 1 ) {
      console.log("here is error message")
      return false
    }else if(Number(bcAr) < Number(1 * 0.0002) ) {
      return false
    }else{
      return true
    }
  }
  const checkUpload = async (keyfile) => {
    let res;
    if(balanceKoi !== null && balanceAr !== null) {
      res = await enoughBalance(balanceKoi, balanceAr)
    }else {
      console.log("here")
      setLoading(true)
      let balance = await getKoi(keyfile)
      console.log({balance})
      setLoading(false)
      setBalanceKoi(Number(balance.koiBalance))
      setBalanceAr(convertArBalance(balance.arBalance))
      res = await enoughBalance(Number(balance.koiBalance), convertArBalance(balance.arBalance))
    }
    return res;
  }
  const updateContent = (key, value) => {
    let tpContent = cloneDeep(activeContent);
    tpContent[key] = value;
    setActiveContent(tpContent);
  };
  const uploadNFTContents = async () => {
    try {
      setLoading(true)
      let res = await exportNFT(
        arweave,
        addressAr,
        activeContent,
        imageUrl,
        null,
        keyAr
      );

      if (res) {
        setLoading(false)
        updateContent('txId', res)
        setStageStep(4)
      } else {
        show_alert("Something went wrong uploading your NFT.", "danger");
      }
    } catch (err) {
      console.log("here1");
      console.log(err);
      show_alert("Something went wrong uploading your NFT.");
    }
  }
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
        await checkUpload(arJson)
        if(stageStep === 3) {
          setStageStep(2)
        }
        // show_alert("Success! Your keyfile has been uploaded.", 'success');
      };
      reader.readAsText(file);
      // Prevent upload
      return false;
    }
    return isJson && isLt1M;
  };
  const beforeNftUpload = (file) => {
    console.log(file)
    const isLt2M = file.size / 1024 / 1024 < 15;
    if (!isLt2M) {
      show_notification("File must be smaller than 15MB!");
    }
    if (isLt2M) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let ex = file.name.split('.').pop();
        let filename = file.name.split('.').slice(0, -1).join('.')
        if(filename.length > 20) filename = filename.substr(0, 18) + '~.'
        setContentType(file.type)
        setImagePath(filename + ex)
        console.log(imagePath)
        if(getMediaType(file.type) === 'video' || getMediaType(file.type) === 'audio'){
          setImageUrl(URL.createObjectURL(file));
        }else{
          setImageUrl(e.target.result);
        }
        setStageStep(1)
      };
      reader.readAsDataURL(file);
      return false;
    }
    return isLt2M;
  };
  const onClickShare = (type = 'share') => {
    let item = {
      txIdContent: activeContent.txId,
      name: activeContent.title
    }
    setSelectedContent(item);
    setModalType(type);
    setShowShareModal(true);
  }
  const onSwitchModal = () => {
    setModalType(modalType === "share" ? "embed" : "share");
  };
  const renderStep0 = () => {
    return (
        <div className="sub-import-area">
            <div className="icon-back cursor" onClick={() => handleBack('select-upload-type', 0)}>
                <Image src={IconLeft} width={20} />
            </div>
            <ManualUploadArea className="cursor bk-white">
                <Dragger
                    name="file"
                    accept="video/*, image/*, audio/*"
                    multiple={false}
                    listType="picture"
                    className={`${!isScrollMode && 'full-scroll-height'}`}
                    beforeUpload={beforeNftUpload}
                    // fileList={false}
                    showUploadList={false}
                >
                    {loading ? (
                        <Spin size="large" />
                    ) : (
                    <>
                      <div className="card1-body">
                          <Image src={IconUpload} width={32} />
                          <div className="font-d-1">Drag & drop a file from your computer or click here to browse</div>
                      </div>
                    </>
                    )}
                </Dragger>
            </ManualUploadArea>
        </div>
    )
  }
  const renderStep1 = () => {
    return (
      <div className="sub-import-area">
        <div className="icon-back cursor" onClick={() => handleBack('select-upload-type', 0)}>
            <Image src={IconLeft} width={20} />
        </div>
        <ManualUploadArea>
            <div className="card2-head mt-10">
                <div className="font-d-1 text-bold text-center">Add details for your file</div>
            </div>
            <div className="card2-body">
              <div className="upload-content-form">
                <div className="content-img-wrapper">
                  <div className="card-image">
                    <PlayMedia imageUrl={imageUrl} addSubClass="w160 br-4" contentType={contentType} />
                  </div>
                </div>
                <div className="upload-content-row">
                  <div className="control-row">
                    <div className="left">
                      <div className="font-c-l">Title</div>
                    </div>
                    <Input
                      value={activeContent?.title}
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
                      value={activeContent?.owner}
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
                      value={activeContent?.description}
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
                        onClick={onCompleteStep1}
                      >
                        Add Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </ManualUploadArea>
      </div>
    )
  }
  const renderStep2 = () => {
    return (
      <div className="sub-import-area">
        <div className="icon-back cursor" onClick={() => setStageStep(1)}>
          <Image src={IconLeft} width={20} />
        </div>
        <ManualUploadArea>
          <div className="card2-head mt-10">
            <div className="font-d-1 text-bold text-center">Confirm Transaction</div>
          </div>
          <div className="card3-body">
            <div className="upload-content-result">
              <div className="flex1">
                <div className="card-content">
                  <div className="w114 d-flex align-items-center">
                    <PlayMedia imageUrl={imageUrl} addSubClass="w110 br-4" contentType={contentType} />    
                  </div>
                  <div className="flex1 content-info">
                    <div className="font1 blueFont">{activeContent.title}</div>
                    <div className="font2 blueFont"><span>{activeContent.owner}</span></div>
                    <div className="font3 blueFont">{showShortString(activeContent.description, 75)}</div>
                  </div>
                </div>
              </div>
              <div className="flex1">
                <div className="estimate-result">
                  <div className="font-d-1 flex1 blueFont">Estimated Total</div>
                  <div className="font-d-2 flex1 blueFont">0.0002 AR</div>
                  <div className="font-d-2 flex1 blueFont">1.00 KOI</div>
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
        </ManualUploadArea>
      </div>
    )
  }
  const renderStep3 = () => {
    return (
      <div className="sub-import-area">
        <div className="icon-back cursor" onClick={() => setStageStep(2)}>
            <Image src={IconLeft} width={20} />
        </div>
        <ManualUploadArea className="cursor bk-white">
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
        </ManualUploadArea>
      </div>
    )
  }
  const renderResult = () => {
    return (
      <div className="sub-import-area">
        <div className="icon-back cursor" onClick={() => setStageStep(1)}>
          <Image src={IconLeft} width={20} />
        </div>
        <ManualUploadArea>
          <div className="card2-head mt-10">
            <div className="font-d-1 text-bold text-center">
              <Image src={IconFish} width="32"/>&nbsp;&nbsp;&nbsp;&nbsp;
              Congratulations!
            </div>
          </div>
          <div className="card3-body">
            <div className="upload-success">
              <div className="font2 blueFont">
                <span className="font1 blueFont">On Koi, your media is safe-</span> that means it is stored forever and you have full control, earning attention rewards when it's viewed.
              </div>
            </div>
          </div>
          <div className="card3-footer">
            <div className="flex1 d-flex justify-content-center">
              <Button
                className="btn-blueDark btn-confirm shadow-radius w115"
                onClick={() => onClickShare()}
              >
                Share
              </Button>
              <Button
                className="btn-blueDark btn-confirm btn-outline w115 shadow-radius"
                onClick={() => setStageStep(0)}
              >
                Upload More
              </Button>
            </div>
          </div>
        </ManualUploadArea>
      </div>
    )
  }

  return (
      <>
        { stageStep === 0 && renderStep0() }
        { stageStep === 1 && renderStep1() }
        { stageStep === 2 && renderStep2() }
        { stageStep === 3 && renderStep3() }
        { stageStep === 4 && renderResult() }
        <ModalContent
          type={modalType}
          show={showShareModal}
          detail={selectedContent}
          onHide={() => setShowShareModal(false)}
          onSwitchModal={onSwitchModal}
        />
      </>
  );
}

export default SubUploadManual;
