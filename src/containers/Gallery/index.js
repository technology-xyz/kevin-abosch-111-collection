import React, { useContext, useEffect, useState } from "react";
import useAxios from 'axios-hooks'
const Gallery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [{ data, loading, error }, refetch] = useAxios("https://5vgwb6smju7uduepxbruar4paai3xfutjksugh67nsaxy5gejq6q.arweave.net/7U1g-kxNP0HQj7hjQEePABG7lpNKpUMf32yBfHTETD0/"
  )
    console.log(data)
    
    return <section><pre>{JSON.stringify(data, null, 2)}</pre></section>;
  
};

export default Gallery;
