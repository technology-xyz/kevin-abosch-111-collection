import React, { useContext, useEffect, useState, } from "react";

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
import { getNftReward } from "koi_tools/common";
import * as kweb from "koi_tools/web"

const getKoi = async (txId) => {
  const ktools = new kweb.Web();
  console.log(kweb)
  try {
     let nftRewards = await kweb.getNftReward(txId)
      return {
          nftRewards
      }
  } catch (err) {
      throw err.message
  }
}

const Gallery = () => {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();
  const [items, setItems] = useState([]);
  const [scrollLimit, setScrollLimit] = useState(50);
  const indexId = parseInt(id);
  const { contents } = useContext(DataContext);
  useEffect(() => {
      
      setItems(contents);
      if (items.length > 0) {
        console.log(getKoi(items[56].source), )
        
      }
  }, [contents, items]);

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

  const handleScroll = (e) => {
    let newScrollLimit = scrollLimit - e.deltaY * 0.3;
    if (!matchDetail) {
      if (newScrollLimit < 0) {
        setScrollLimit(50);
        history.push(`${indexId + 1}`);
      } else if (newScrollLimit > 100) {
        setScrollLimit(50);
        history.push(`${indexId - 1}`);
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
      <MenuContainer onWheel={handleScroll} showDetails={false}>
        {items[id] && (
          <>
            <ImageWrapper>
              <LazyLoadImage
                width="512"
                height="512"
                alt={items[parseInt(id)].name}
                src={items[parseInt(id)].source}
                onClick={onShowDetails}
                effect="blur"
              />
              <ImageMenu>
                <span>#{items[parseInt(id)].name}</span>
                <span>
                  2.16
                  <img src={Logo} />
                </span>
                <span>Bid Now</span>
              </ImageMenu>
              <ImageMenu>
                <DetailLink
                  value="details"
                  active={matchDetail}
                  onClick={() => history.push("details")}
                >
                  Details
                </DetailLink>
                <DetailLink
                  value="collect"
                  active={matchCollect}
                  onClick={() => history.push("collect")}
                >
                  Collect
                </DetailLink>
                <span>Bid Now</span>
              </ImageMenu>
              {matchDetail && <Details item={items[indexId]} />}
            </ImageWrapper>

            {!matchDetail && !matchCollect && (
              <BottomBar>
                <LeftImg>
                  {id === "0" ? (
                    <PlaceHolder />
                  ) : (
                    <LazyLoadImage
                      width="170"
                      height="170"
                      alt={items[parseInt(id)].name}
                      src={items[parseInt(id) - 1].source}
                      effect="blur"
                    />
                  )}
                </LeftImg>
                <RightImg>
                  <LazyLoadImage
                    width="170"
                    height="170"
                    alt={items[parseInt(id)].name}
                    src={items[parseInt(id) + 1].source}
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
