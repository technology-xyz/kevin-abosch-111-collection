import React, { useContext } from "react";
import { CollectionWrapper, Grid } from "./style";
import { DataContext } from "contexts/DataContextContainer";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage, trackWindowScroll } from "react-lazy-load-image-component";
import { useHistory } from "react-router";
import MetaWrapper from "components/Wrappers/MetaWrapper";
const Collection = ({ scrollPosition }) => {
  const { contents } = useContext(DataContext);
  const history = useHistory();
  return (
    <MetaWrapper>
      <CollectionWrapper>
        <Grid>
          {contents.map((pic, id) => {
            
            return (
              <LazyLoadImage
                onClick={() =>
                  history.push(`/gallery/${parseInt(id) + 1}/details`)
                }
               
                scrollPosition={scrollPosition}
              
                
                effect="blur"
                src={pic.source}
                alt={pic.name}
              />
            );
          })}
        </Grid>
      </CollectionWrapper>
    </MetaWrapper>
  );
};
export default trackWindowScroll(Collection) 
