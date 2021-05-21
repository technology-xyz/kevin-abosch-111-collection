import React, {useContext} from 'react';
import { CollectionWrapper} from './style'
import { DataContext } from "contexts/DataContextContainer";
const Collection = () =>{
    const {contents, 
         } = useContext(DataContext)
    return (
        <CollectionWrapper>
            {contents.map(pic =>{
                return (
                    <img 
                        width="200"
                        height="200"
                        src={pic.source}
                    />
                )
            })}
        </CollectionWrapper>
    )
}
export default Collection