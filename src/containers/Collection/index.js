import React, { useState, useEffect } from "react";
import { CollectionWrapper } from "./style";
import { DataContext } from "contexts/DataContextContainer";
import { preUrl } from "config";

import useAxios from "axios-hooks";
const Collection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [preLoaded, setPreloaded] = useState([]);
  const [{ data, loading, error }, refetch] = useAxios(
    "https://5vgwb6smju7uduepxbruar4paai3xfutjksugh67nsaxy5gejq6q.arweave.net/7U1g-kxNP0HQj7hjQEePABG7lpNKpUMf32yBfHTETD0/"
  );
  const cachedImages = async (arr) => {
    const promises = await arr.map((src) => {
      console.log(src);
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve();
        img.onerror = reject();
      });
    });
  
    setIsLoading(false);
    return await Promise.all(promises);
  };
  useEffect(() => {
    if (!loading && !error) {
      const nftArray = [];
      let source = "";
      for (const [key, value] of Object.entries(data)) {
        const [name, extension] = key.split(".");

        if (extension !== "json") {
          nftArray.push(`${preUrl}${value}?t=${Math.random() * 999999}`);
        }
      }
      setPreloaded(cachedImages(nftArray));
      console.log(preLoaded)
      setIsLoading(false);
    }
  }, [loading, data]);
  return (
    <>
      {isLoading ? (
        <h1>wait</h1>
      ) : (
        <CollectionWrapper>
          {preLoaded.map((pic) => {
            return <img width="200" height="200" src={pic} />;
          })}
        </CollectionWrapper>
      )}
    </>
  );
};
export default Collection;
