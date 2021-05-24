import React, { useContext, useEffect, useState, useRef } from "react";
import useAxios from "axios-hooks";
import { Logo } from "../../assets/images";
import { preUrl } from "config";
import Details from "./details"
import {
  ImageWrapper,
  MenuContainer,
  BottomBar,
  LeftImg,
  RightImg,
  PlaceHolder,
  ImageMenu
} from "./style";
import { useHistory, useParams } from "react-router";
const Gallery = () => {
  const params = useParams();
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [mainImg, setMainImg] = useState(4);
  const [showDetails, setShowDetails] = useState(false);
  const [scrollLimit, setScrollLimit] = useState(50);
  console.log(params);
  const [{ data, loading, error }, refetch] = useAxios(
    "https://5vgwb6smju7uduepxbruar4paai3xfutjksugh67nsaxy5gejq6q.arweave.net/7U1g-kxNP0HQj7hjQEePABG7lpNKpUMf32yBfHTETD0/"
  );
  useEffect(() => {
    if (!loading) {
      const nftArray = [];
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

  const handleScroll = (e) => {
    console.log(e.deltaY);
    let newScrollLimit = scrollLimit - e.deltaY * 0.3;

    if (newScrollLimit < 0) {
      setMainImg(mainImg + 1);
      setScrollLimit(50);
      
    } else if (newScrollLimit > 100) {
      setMainImg(mainImg - 1);
      setScrollLimit(50);
    } else {
      setScrollLimit(newScrollLimit);
    }
  };

  const onShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <MenuContainer onWheel={handleScroll}>
      {items[mainImg] && (
        <>
          <ImageWrapper>
            <img
              width="512"
              height="512"
              alt={items[mainImg].name}
              src={items[mainImg].source}
              onClick={onShowDetails}
            />
            <ImageMenu>
              <span>{items[mainImg].name}</span>
              <span>
                2.16
                <img src={Logo} />
              </span>
              <span>Bid Now</span>
            </ImageMenu>
            {showDetails ? (
            <Details item={items[mainImg]}/>
          ) : (
            <BottomBar>
              <LeftImg>
                {mainImg === 0 ? (
                  <PlaceHolder />
                ) : (
                  <img
                    width="100"
                    height="100"
                    alt={items[mainImg].name}
                    src={items[mainImg - 1].source}
                  />
                )}
              </LeftImg>
              <RightImg>
                <img
                  width="100"
                  height="100"
                  alt={items[mainImg].name}
                  src={items[mainImg + 1].source}
                />
              </RightImg>
            </BottomBar>
          )}
          </ImageWrapper>

          
        </>
      )}
    </MenuContainer>
  );
};

export default Gallery;
