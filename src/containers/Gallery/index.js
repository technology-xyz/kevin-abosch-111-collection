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
    const Ktools = new Kcommon.Common();
    try {
      let nftRewards = await Kcommon.getNftReward(txId);

      setNftInfo(nftRewards);
    } catch (err) {
      console.log(err);
      throw err.message;
    }
  };

  useEffect(() => {
    setItems(contents);
    if (contents.length) {
      getKoi(contents[indexId].source)
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

              {(matchDetail || matchCollect) && (
                <>
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
                      onClick={(e) => {
                        matchCollect
                          ? history.push(`/gallery/${id}`)
                          : history.push(`/gallery/${id}/collect`);
                      }}
                    >
                      Collect
                    </DetailLink>
                    <span>Bid Now</span>
                  </ImageMenu>
                  <Details item={items[indexId]} id={id} />
                </>
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
