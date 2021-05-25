import React, { useContext, useEffect, useState, useRef } from "react";
import useAxios from "axios-hooks";
import { Logo } from "../../assets/images";
import { preUrl } from "config";
import Details from "./details";
import {
  ImageWrapper,
  MenuContainer,
  BottomBar,
  LeftImg,
  RightImg,
  PlaceHolder,
  ImageMenu,
} from "./style";
import { useHistory, useParams } from "react-router";
const Gallery = () => {
  const {id} = useParams();
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [mainImg, setMainImg] = useState(parseInt(id));
  const [showDetails, setShowDetails] = useState(false);
  const [scrollLimit, setScrollLimit] = useState(50);
  
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
   
    let newScrollLimit = scrollLimit - e.deltaY * 0.3;
    if (!showDetails) {
      if (newScrollLimit < 0) {
        setScrollLimit(50);
        history.replace(`${parseInt(id) + 1}`)
        
      } else if (newScrollLimit > 100) {
        setScrollLimit(50);
        history.replace(`${parseInt(id) - 1}`)
        
      } else {
        setScrollLimit(newScrollLimit);
      }
    }
  };

  const onShowDetails = () => {
    setShowDetails(!showDetails);
    if (showDetails) {
      history.goBack()
    } else {
      history.push(`/gallery/${id}/details`)
    }
    
  };
  console.log(id)

  return (
    <MenuContainer onWheel={handleScroll} showDetails>
      {items[mainImg] && (
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
              <span>{items[mainImg].name}</span>
              <span>
                2.16
                <img src={Logo} />
              </span>
              <span>Bid Now</span>
            </ImageMenu>
            {showDetails ? (
              <Details item={items[mainImg]} />
            ) : (
              <BottomBar>
                <LeftImg>
                  {id === '0' ? (
                    <PlaceHolder />
                  ) : (
                    <img
                      width="100"
                      height="100"
                      alt={items[parseInt(id)].name}
                      src={items[parseInt(id) - 1].source}
                    />
                  )}
                </LeftImg>
                <RightImg>
                  <img
                    width="100"
                    height="100"
                    alt={items[parseInt(id)].name}
                    src={items[parseInt(id) + 1].source}
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
