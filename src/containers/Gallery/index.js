import React, { useContext, useEffect, useState } from "react";
import { Logo } from "../../assets/images";
import Details from "./details";
import BottomBar from "./bottom";

import MetaWrapper from "components/Wrappers/MetaWrapper";
import { DataContext } from "contexts/DataContextContainer";
import {
  ImageWrapper,
  MenuContainer,
  ImageMenu,
  DetailLink,
  MainImage,
  BidNow,
  LeftImg,
  RightImg,
  PlaceHolder
} from "./style";
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
  const mobile = window.matchMedia("(max-width: 768px)").matches;

  const matchMain = matchPath(pathname, { path: "/gallery/:id/", exact: true });
  const matchDetail = matchPath(pathname, "/gallery/:id/details");
  const matchCollect = matchPath(pathname, "/gallery/:id/collect");

  const getKoi = async (txId) => {
    const Ktools = new Kcommon.Common();
    try {
      let nftRewards = await Ktools.getNftReward(txId);
      let nftContract = await Ktools.readNftState(txId);
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
      getKoi(contents[indexId].txId)
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
        history.push(`/gallery/${indexId}`);
      } else {
        setScrollLimit(newScrollLimit);
      }
    }
  };

  const onShowDetails = () => {
    if (matchDetail) {
      history.replace(`/gallery/${id}/`);
    } else {
      history.push(`/gallery/${id}/details`);
    }
  };

  return (
    <MetaWrapper>
      <MenuContainer onWheel={handleScroll} lockScroll={false}>
        
        {items[id] && (
          <>
            <ImageWrapper key={items[indexId].name}>
              <MainImage>
                <LazyLoadImage
                  width="580"
                  height="580"
                  alt={items[indexId].name}
                  src={items[indexId].source}
                  onClick={onShowDetails}
                  effect="blur"
                />
              </MainImage>

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
                    <BidNow href={`https://space.verto.exchange/asset/${items[indexId].txId}`}>Bid Now</BidNow>
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

            <LeftImg>
        {indexId === 0 ? (
          <PlaceHolder />
        ) : (
          <LazyLoadImage
            onClick={() => history.push(`/gallery/${indexId}`)}
            width="170"
            height="170"
            alt={items[indexId -1].name}
            src={items[indexId -1].source}
            effect="blur"
          />
        )}
      </LeftImg>
              
                <RightImg>
        <LazyLoadImage
          onClick={() => history.push(`/gallery/${indexId + 2}`)}
          width="170"
          height="170"
          alt={items[indexId + 1].name}
          src={items[indexId + 1].source}
          effect="blur"
        />
      </RightImg>
            
          </>
        )}
      
      </MenuContainer>
    </MetaWrapper>
  );
};

export default Gallery;
