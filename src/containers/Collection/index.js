import React, {  useContext } from "react";
import { CollectionWrapper } from "./style";
import { DataContext } from "contexts/DataContextContainer";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router";
import MetaWrapper from "components/Wrappers/MetaWrapper";
const Collection = () => {
  const { contents } = useContext(DataContext);
  const history = useHistory();
  return (
    <MetaWrapper>
      <CollectionWrapper>
        {contents.map((pic, id) => {
          return (
            <LazyLoadImage
              onClick={() =>
                history.push(`/gallery/${parseInt(id) + 1}/details`)
              }
              width="200"
              height="200"
              effect="blur"
              src={pic.source}
              alt={pic.name}
            />
          );
        })}
      </CollectionWrapper>
    </MetaWrapper>
  );
};
export default Collection;
