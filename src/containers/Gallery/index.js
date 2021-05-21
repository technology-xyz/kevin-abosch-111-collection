import React, { useContext, useEffect, useState, useRef } from "react";
import useAxios from "axios-hooks";
import { Image } from "react-bootstrap";
import { preUrl } from "config";
import {
  ImageWrapper,
  MenuContainer,
  BottomBar,
  LeftImg,
  RightImg,
  PlaceHolder,
} from "./style";
const Gallery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [mainImg, setMainImg] = useState(3);
  const [scrollLimit , setScrollLimit] = useState(100)

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
  console.log(items);

  // useEffect(() => {
  //   const onScroll = (e) => {
      
  //     let newScrollLimit = scrollLimit - e.deltaY
  //     console.log(newScrollLimit);
  //     if (newScrollLimit < 0){
  //         setMainImg(mainImg + 1)
  //         setScrollLimit(100)
  //     } else {
  //       setScrollLimit(newScrollLimit)
  //     }
      
  //   };
  //   window.addEventListener("wheel", onScroll);

  //   return () => window.removeEventListener("scroll", onScroll);
  // }, );

  const handleScroll = (e) => {
    console.log(e.deltaY);
    let newScrollLimit = scrollLimit - e.deltaY
      console.log(newScrollLimit);
      if (newScrollLimit < 0){
          setMainImg(mainImg + 1)
          setScrollLimit(100)
      } else {
        setScrollLimit(newScrollLimit)
      }
  };

  return (
    <MenuContainer  onWheel={handleScroll}>
      {items[mainImg] && (
        <>
          <ImageWrapper>
            <img
              width="600"
              height="600"
              loading="lazy"
              alt={items[mainImg].name}
              src={items[mainImg].source}
            />
          </ImageWrapper>
          <BottomBar>
            <LeftImg>
              {mainImg === 0 ? (
                <PlaceHolder />
              ) : (
                <img 
                width="100"
                height="100"
                alt={items[mainImg].name} src={items[mainImg -1].source} />
              )}
            </LeftImg>
            <RightImg>
              <img 
               width="100"
               height="100"
               alt={items[mainImg].name} src={items[mainImg + 1].source} />
            </RightImg>
          </BottomBar>
        </>
      )}
    </MenuContainer>
  );
};

export default Gallery;
