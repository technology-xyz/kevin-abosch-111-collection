/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { LeaderboardContainer, LeaderboardHeader, StyledThumb } from "./style";
import ReactSlider from "react-slider";
import { useHistory } from "react-router-dom";
import LeaderboardItem from "./LeaderboardItem";
import { DataContext } from "contexts/DataContextContainer";
import { ScrollContext } from "contexts/ScrollContextContainer";
import { AnnounceContext } from "contexts/AnnounceContextContainer";
import ModalContent from "components/Elements/ModalContent";
import axios from "axios";
import AlertArea from "components/Sections/AlertArea";
import { alertTimeout } from "config";
import MetaWrapper from "components/Wrappers/MetaWrapper";
import StickyUploadArea from "components/Sections/UploadArea";
import TickersArea from "components/Sections/TickersArea";
import { show_digit_number } from "service/utils";
import { IconEyes, IconFish } from "assets/images";
import { Button, Image } from "react-bootstrap";

const options = ["24h", "1w", "1m", "1y", "all"];
const initailLength = 10;
const maxLength = 20;

function MyContent() {
  const history = useHistory();
  const { contents, setContents, addressAr } = useContext(DataContext);
  const { showKOIInfo, setShowKOIInfo } = useContext(AnnounceContext);
  const { scrollTop, scrollUp, scrollFrame } = useContext(ScrollContext);
  const [showContents, setShowContents] = useState([]);
  const [virtualShowContents, setVirtualShowContents] = useState([]);
  const [sliderValue, setSliderValue] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("share");
  const [selectedContent, setSelectedContent] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("danger");
  const [errEmessage, setErrMessage] = useState("");
  const [mobileScroll, setMobileScroll] = useState(false);
  const [lastIndex, setLastIndex] = useState(initailLength - 1);

  const show_alert = (message = "", type = "danger") => {
    setShowAlert(true);
    setAlertVariant(type);
    setErrMessage(message);
    console.log("here2");
    setTimeout(() => {
      setShowAlert(false);
      setErrMessage("");
    }, alertTimeout);
  };

  const onClickKOIInfo = () => {
    setShowKOIInfo(!showKOIInfo);
  };

  const showMobileInfoArea = () => {
    return (
      <div className="mobile-sticky-area">
        <div className="viewer-ct">
          <div className="text-bold">{show_digit_number(148623)}</div>
          <div>
            <Image src={IconEyes} width="25" />
          </div>
        </div>
        <div className="viewer-ct">
          <div className="text-bold">{show_digit_number(14000)}</div>
          <div>
            <Image src={IconFish} width="25" />
          </div>
        </div>
        <div className="viewer-ct">
          <Button className="btn-outline cursor" onClick={onClickKOIInfo}>
            KOI Info
          </Button>
        </div>
      </div>
    );
  };

  const onClickItem = (item, type) => {
    if (type === "view") {
      history.push(`/content-detail/${item.txIdContent}?type=view`);
    } else {
      setSelectedContent(item);
      setModalType(type);
      setShowModal(true);
    }
  };

  const onSwitchModal = () => {
    setModalType(modalType === "share" ? "embed" : "share");
  };

  const onClickUsername = (item) => {
    return true;
    // setShowContents(contents.filter((_item) => _item.name === item.name));
  };

  const onSliderChange = (newVal) => {
    // const options = ["24h", "1w", "1m", "1y", "all"];
    setSliderValue(newVal);
    console.log({ newVal });
    let offset = 0;
    switch (options[newVal]) {
      case "24h":
        offset = 3600 * 24;
        break;
      case "1w":
        offset = 3600 * 24 * 7;
        break;
      case "1m":
        offset = 3600 * 24 * 30;
        break;
      case "1y":
        offset = 3600 * 24 * 365;
        break;
      case "all":
        offset = 0;
        break;
      default:
        offset = 0;
        break;
    }
    if (offset === 0) {
      setShowContents(contents);
    } else {
      const cur = new Date();
      const timestamp = Number(cur.getTime() - offset * 1000);
      let new_contents = contents.filter((_item) => _item.created_at > timestamp)
      new_contents = new_contents.map( (el, _i) => {
        el.order = _i + 1
        return el
      })
      console.log({new_contents})
      setShowContents(new_contents);
      setVirtualShowContents(new_contents.filter((_item, _i) => _i < initailLength));
    }
  };

  const getContents = async () => {
    if(!addressAr){
      history.push('/wallet-key')
    }
    setIsLoading(true);
    axios
      .get("https://bundler.openkoi.com:8888/state/getTopContent/")
      .then((res) => {
        const data = res.data;
        // console.log({ data });
        if (data === 0) {
          show_alert("There are no contents.");
        } else {
          let res_data = [];
          let my_data = data.filter((_item) => _item.owner === addressAr)
          my_data.forEach((element, _i) => {
            let str_created_at = element.createdAt || "1609500000";
            let created_at = Number(str_created_at) * 1000;
            element.created_at = created_at;
            element.order = _i + 1;
            res_data.push(element);
          });
          console.log(res_data);
          setContents(res_data);
          // let d = new Date()
          // let ts = d.getTime() - 3600*24*30*1000
          let ts = 0;
          setShowContents(res_data.filter((_item) => _item.created_at > ts));
          setVirtualShowContents(res_data.filter((_item, _i) => _i < initailLength));
        }
      })
      .catch((err) => {
        console.log(err);
        show_alert("There is an error");
      })
      .finally(() => setIsLoading(false));
  };

  const onClickShowMore = () => {
    let tmp = [...virtualShowContents];
    let arrToAdd = showContents.filter((_item, _i) => _i > lastIndex && _i <= lastIndex + 5);
    if (maxLength - virtualShowContents.length > 4) {
      setVirtualShowContents(tmp.concat(arrToAdd))
      // console.log("here", tmp, arrToAdd)
    } else {
      setVirtualShowContents(tmp.concat(arrToAdd).filter((_item, _i) => _i > arrToAdd.length - 1))
      // console.log("here2", tmp, tmp.concat(arrToAdd).filter((_item, _i) => _i > arrToAdd.length - 1))
    }
    setLastIndex(lastIndex + arrToAdd.length)
  };
  const onClickShowLess = () => {
    let tmp = [...virtualShowContents];
    if(tmp.length === 0) return;
    // console.log({tmp})
    let firstOrder = tmp[0].order
    if(firstOrder < 2) {
      // console.log("first order :" + firstOrder + " lastIndex" + lastIndex)
      return;
    }else{
      firstOrder = firstOrder - 5 - 2
      if(firstOrder < -1) firstOrder = -1
      let arrToAdd = showContents.filter((_item, _i) => _i > firstOrder && _i <= firstOrder + maxLength);
      // console.log("temp", arrToAdd)
      setVirtualShowContents(arrToAdd)
      setLastIndex(arrToAdd[arrToAdd.length-1].order-1)
    }
    
  };

  useEffect(() => {
    getContents();
  }, [history.location.pathname]);

  useEffect(() => {
    // console.log(scrollFrame)
    // console.log(scrollUp)
    // console.log(scrollTop)
    if (scrollUp && scrollTop > 50) {
      setMobileScroll(true);
    }
    if (!scrollUp && scrollTop < 100) {
      setMobileScroll(false);
      onClickShowLess()
    }
    const {scrollHeight, clientHeight} = scrollFrame
    const footerHeight = document.getElementById('footer').clientHeight;
    const offset_end_point = scrollHeight - clientHeight - scrollTop - footerHeight
    if(scrollUp && offset_end_point < 100) {
      // detectedEndPoint
      // console.log({offset_end_point})
      // show_notification("here is end point")
      onClickShowMore()
    }
  }, [scrollTop]);

  return (
    <MetaWrapper>
      <LeaderboardHeader>
        <h2 className="text-blue mb-0">My Content</h2>
        <ReactSlider
          className="filter-options-desktop mr-auto d-none d-md-flex"
          marks
          markClassName="example-mark"
          min={0}
          max={4}
          value={sliderValue}
          onChange={(v) => onSliderChange(v)}
          trackClassName="example-track"
          renderMark={(props) => (
            <span key={props.key} className="example-mark">
              {options[props.key]}
            </span>
          )}
          renderThumb={(props, state) => (
            <StyledThumb {...props} value={state.valueNow}>
              {options[state.valueNow]}
            </StyledThumb>
          )}
        />
        <ReactSlider
          className="filter-options-mobile d-md-none"
          marks
          markCla8ssName="example-mark"
          min={0}
          max={4}
          value={sliderValue}
          onChange={(v) => onSliderChange(v)}
          thumbClassName="example-thumb"
          trackClassName="example-track"
          renderThumb={(props, state) => (
            <div {...props}>{options[state.valueNow]}</div>
          )}
        />
        {mobileScroll && (
          <div className="viewer-ct">
            <Button className="btn-outline cursor" onClick={onClickKOIInfo}>
              KOI Info
            </Button>
          </div>
        )}
      </LeaderboardHeader>
      <LeaderboardContainer>
        <div className="leaderboard">
          <StickyUploadArea show_alert={show_alert} isScrollMode={mobileScroll} defaultAction={''}/>
          <div className="leaderboard-items pt-10">
            <AlertArea
              showMessage={showAlert}
              variant={alertVariant}
              message={errEmessage}
            ></AlertArea>
            {!mobileScroll && showMobileInfoArea()}
            {isLoading ? (
              <div className="loading-container">
                <ScaleLoader size={15} color={"#2a58ad"} />
              </div>
            ) : (
              virtualShowContents
                .map((_item, _i) => (
                  <LeaderboardItem
                    key={_item.txIdContent}
                    item={_item}
                    order={_item.order}
                    onClickItem={() => onClickItem(_item, "view")}
                    onClickUsername={() => onClickUsername(_item)}
                    onClickShare={() => onClickItem(_item, "share")}
                    onClickEmbed={() => onClickItem(_item, "embed")}
                  />
                ))
            )}
          </div>
        </div>
        <div className="tickers-area">
          <TickersArea />
        </div>
        <ModalContent
          type={modalType}
          show={showModal}
          detail={selectedContent}
          onHide={() => setShowModal(false)}
          onSwitchModal={onSwitchModal}
        />
      </LeaderboardContainer>
    </MetaWrapper>
  );
}

export default MyContent;
