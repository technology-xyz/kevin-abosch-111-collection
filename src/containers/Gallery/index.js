import React, { useContext, useEffect, useState } from "react";

import { Logo } from "../../assets/images";

import Details from "./details";
import MetaWrapper from "components/Wrappers/MetaWrapper";
import { DataContext } from "contexts/DataContextContainer";
import {
  ImageWrapper,
  MenuContainer,
  BottomBar,
  LeftImg,
  RightImg,
  PlaceHolder,
  ImageMenu,
  DetailLink,
} from "./style";
import { useHistory, useParams, useLocation, matchPath } from "react-router";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

import * as Ktools from "@_koi/sdk/common";

const Gallery = () => {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();
  const [items, setItems] = useState([]);
  const [scrollLimit, setScrollLimit] = useState(50);
  const indexId = parseInt(id) - 1;
  const { contents } = useContext(DataContext);
  const [nftInfo, setNftInfo] = useState("");
  const [lockScroll, setLockScroll] = useState(true)

  const matchDetail = matchPath(pathname, {
    path: "/gallery/:id/details",
    exact: true,
    strict: false,
  });
  const matchCollect = matchPath(pathname, {
    path: "/gallery/:id/collect",
    exact: true,
    strict: false,
  });

  const getKoi = async (txId) => {
    try {
      let nftRewards = await Ktools.getNftReward(txId);

      return {
        nftRewards,
      };
    } catch (err) {
      throw err.message;
    }
  };

  useEffect(() => {
    setItems(contents);
    if(matchDetail || matchCollect){
        setLockScroll(false)
    } else {
      setLockScroll(true)
    }
  }, [contents, matchDetail,matchCollect]);

 

  const handleScroll = (e) => {
    let newScrollLimit = scrollLimit - e.deltaY * 0.3;
  
    if (!matchDetail && !matchCollect) {
      if (newScrollLimit < 0) {
        setScrollLimit(50);
        history.push(`/gallery/${indexId + 2}`);
      } else if (newScrollLimit > 100) {
        setScrollLimit(50);
        history.push(`/gallery/${indexId - 1}`);
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
        {items[id] && (
          <>
            <ImageWrapper>
              <LazyLoadImage
                width="512"
                height="512"
                alt={items[indexId].name}
                src={items[indexId].source}
                onClick={onShowDetails}
                effect="blur"
              />
              <ImageMenu>
                <span>#{items[indexId].name}</span>
                <span>
                  {nftInfo}
                  <img src={Logo} />
                </span>
                <span>Bid Now</span>
              </ImageMenu>
              <ImageMenu>
                <DetailLink
                  value="details"
                  active={matchDetail}
                  onClick={() =>
                    matchDetail
                      ? history.push(`/gallery/${id}`)
                      : history.push(`/gallery/${id}/details`)
                  }
                >
                  Details
                </DetailLink>
                <DetailLink
                  value="collect"
                  active={matchCollect}
                  onClick={() =>
                    matchCollect
                      ? history.push(`/gallery/${id}`)
                      : history.push(`/gallery/${id}/collect`)
                  }
                >
                  Collect
                </DetailLink>
                <span>Bid Now</span>
              </ImageMenu>
              {(matchDetail || matchCollect) && (
                <Details item={items[indexId]} />
              )}
            </ImageWrapper>

            {!matchDetail && !matchCollect && (
              <BottomBar>
                <LeftImg>
                  {indexId === 0 ? (
                    <PlaceHolder />
                  ) : (
                    <LazyLoadImage
                      width="170"
                      height="170"
                      alt={items[indexId].name}
                      src={items[indexId - 1].source}
                      effect="blur"
                    />
                  )}
                </LeftImg>
                <RightImg>
                  <LazyLoadImage
                    width="170"
                    height="170"
                    alt={items[indexId].name}
                    src={items[indexId + 1].source}
                    effect="blur"
                  />
                </RightImg>
              </BottomBar>
            )}
          </>
        )}
      </MenuContainer>
    </MetaWrapper>
  );
};

export default Gallery;
