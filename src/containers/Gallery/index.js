import React, { useContext, useEffect, useState } from "react";
import useAxios from "axios-hooks";
import { preUrl } from "config";
const Gallery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [{ data, loading, error }, refetch] = useAxios(
    "https://5vgwb6smju7uduepxbruar4paai3xfutjksugh67nsaxy5gejq6q.arweave.net/7U1g-kxNP0HQj7hjQEePABG7lpNKpUMf32yBfHTETD0/"
  );
  if (!loading) {
    const nftArray = [];
    let source = "";
    for (const [key, value] of Object.entries(data)) {
      
      const [name, extension] = key.split(".");
      
      if (extension === "json") {
        nftArray.push({name: name.slice(5),source:source,json:value} );
      } else {
          source = value
      }
    }
    console.log(nftArray)
  }
  

  return (
    <section>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
};

export default Gallery;
