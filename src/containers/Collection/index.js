import React, { useState, useEffect } from "react";
import { CollectionWrapper } from "./style";
import { DataContext } from "contexts/DataContextContainer";
import { preUrl } from "config";

import useAxios from "axios-hooks";
import { propTypes } from "react-bootstrap/esm/Image";
const Collection = (props) => {
    const [pics, setPics] = useState([])
    useEffect(()=>{
        console.log(props)
            setPics(props.items)
    },[props.items])
    
  
  return (
 
      
        <CollectionWrapper>
          {pics.map((pic) => {
            return <img width="200" height="200" src={pic.source} />;
          })}
        </CollectionWrapper>
     

  );
};
export default Collection;
