import React, { useContext, useEffect, useState } from "react";
import { Logo } from "../../assets/images";
import Details from "./details";
import BottomBar from "./bottom";
import Arrow from "../../components/Arrows"
import MetaWrapper from "components/Wrappers/MetaWrapper";
import { DataContext } from "contexts/DataContextContainer";
import { ImageWrapper, MenuContainer, ImageMenu, DetailLink, LeftArrow,RightArrow } from "./style";
import { useHistory, useParams, useLocation, matchPath } from "react-router";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as Kcommon from "@_koi/sdk/common";

const Gallery = () => {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();
  const [items, setItems] = useState([]);
  const [scrollLimit, setScrollLimit] = useState(50);
  const indexId = parseInt(id) - 1;
  const { contents } = useContext(DataContext);
  const [nftInfo, setNftInfo] = useState("");
  const [owners, setOwners] = useState([]);
  const mobile = window.matchMedia("(max-width: 768px)").matches

  const matchMain = matchPath(pathname, { path: "/gallery/:id/", exact: true });
  const matchDetail = matchPath(pathname, "/gallery/:id/details");
  const matchCollect = matchPath(pathname, "/gallery/:id/collect");

  const getKoi = async (txId) => {
    const Ktools = new Kcommon.Common();
    console.log(Ktools);
    try {
      let nftRewards = await Ktools.getNftReward(txId);
      let nftContract = await Ktools.readNftState(txId);
      console.log(nftRewards, nftContract);
      setNftInfo(nftRewards);
      setOwners(Object.entries(nftContract.balances));
    } catch (err) {
      console.log(err);
      throw err.message;
    }
  };

  useEffect(() => {
    setItems(contents);
    if (contents.length) {
      console.log(contents[indexId].txId);
      getKoi(contents[indexId].txId)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [contents]);

  const handleScroll = (e) => {
    let newScrollLimit = scrollLimit - e.deltaY * 0.3;

    if (matchMain && !mobile) {
      if (newScrollLimit < 0) {
        setScrollLimit(50);
        history.push(`/gallery/${indexId + 2}`);
      } else if (newScrollLimit > 100) {
        setScrollLimit(50);
        history.push(`/gallery/${indexId }`);
      } else {
        setScrollLimit(newScrollLimit);
      }
    }
  };

  const onShowDetails = () => {
    if (matchDetail) {
      history.goBack();
    } else {
      history.push(`/gallery/${id}/details`);
    }
  };

  return (
    <MetaWrapper>
      <MenuContainer onWheel={handleScroll} lockScroll={false}>
        
        {(!mobile && matchMain) && <Arrow indexId={indexId}/>}
        {items[id] && (
          <>
            <ImageWrapper key={items[indexId].name}>
              <LazyLoadImage
               
                alt={items[indexId].name}
                src={items[indexId].source}
                onClick={onShowDetails}
                effect="blur"
              />
              <ImageMenu>
                <span>#{items[indexId].name}</span>
                {/* <span>
                  {nftInfo}
                  <img src={Logo} alt="koi-logo" />
                </span>
                {matchMain ? <span>Bid Now</span> : <span>ETH: 2.751</span>} */}
              </ImageMenu>

              {!matchMain && (
                <>
                  <ImageMenu>
                    <DetailLink
                      value="details"
                      active={matchDetail}
                      to={`/gallery/${id}/details`}
                    >
                      Details
                    </DetailLink>
                    <DetailLink
                      value="collect"
                      active={matchCollect}
                      to={`/gallery/${id}/collect`}
                    >
                      Collect
                    </DetailLink>
                    <span>Bid Now</span>
                  </ImageMenu>
                  <Details
                    item={items[indexId]}
                    id={id}
                    txId={items[indexId].txId}
                    owners={owners}
                  />
                </>
              )}
            </ImageWrapper>

            {matchMain && (
              <BottomBar
                left={items[indexId - 1]}
                right={items[indexId + 1]}
                index={indexId}
              />
            )}
          </>
        )}
        {(!mobile && matchMain)&& <Arrow direction="right" indexId={indexId}/>}
         
      </MenuContainer>
     
    </MetaWrapper>
  );
};

export default Gallery;
