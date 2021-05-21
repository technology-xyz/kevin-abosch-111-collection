import React, {useContext, useEffect} from 'react';
import { CollectionWrapper} from './style'
import { DataContext } from "contexts/DataContextContainer";
const Collection = () =>{
    const {contents, 
         } = useContext(DataContext)

    useEffect(()=>{
        console.log(contents)
    })
    return (
        <CollectionWrapper>
            {contents.map(pic => pic)
    
            }
        </CollectionWrapper>
    )
}
export default Collection