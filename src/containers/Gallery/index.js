import React, { useContext, useEffect, useState, useRef } from "react";
import useAxios from "axios-hooks";
import { Logo } from "../../assets/images";
import { preUrl } from "config";
import Details from "./details";
import MetaWrapper from "components/Wrappers/MetaWrapper";
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
const Gallery = () => {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();
  const [items, setItems] = useState([]);
  const [mainImg, setMainImg] = useState(parseInt(id));

  const [scrollLimit, setScrollLimit] = useState(50);
  const indexId = parseInt(id);
  const [{ data, loading, error }, refetch] = useAxios(
    "https://5vgwb6smju7uduepxbruar4paai3xfutjksugh67nsaxy5gejq6q.arweave.net/7U1g-kxNP0HQj7hjQEePABG7lpNKpUMf32yBfHTETD0/"
  );
  useEffect(() => {
    if (!loading) {
      const nftArray = [""];

      let source = "";
      for (const [key, value] of Object.entries(data)) {
        const [name, extension] = key.split(".");

        if (extension === "json") {
          nftArray.push({
            name: name.slice(5),
            source: source,
            json: `${preUrl}${value}?t=${Math.random() * 999999}`,
          });
        } else {
          source = `${preUrl}${value}?t=${Math.random() * 999999}`;
        }
      }
      setItems(nftArray);
    }
  }, [loading, data]);

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
              <img
                width="512"
                height="512"
                alt={items[parseInt(id)].name}
                src={items[parseInt(id)].source}
                onClick={onShowDetails}
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
                    <img
                      width="170"
                      height="170"
                      alt={items[parseInt(id)].name}
                      src={items[parseInt(id) - 1].source}
                    />
                  )}
                </LeftImg>
                <RightImg>
                  <img
                    width="170"
                    height="170"
                    alt={items[parseInt(id)].name}
                    src={items[parseInt(id) + 1].source}
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
