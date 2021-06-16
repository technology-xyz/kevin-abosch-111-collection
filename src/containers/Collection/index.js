import React, { useContext, useState, useEffect } from "react";
import { CollectionWrapper, Grid, Loading } from "./style";
import { DataContext } from "contexts/DataContextContainer";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { Logo } from "../../assets/images";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { useHistory } from "react-router";
import MetaWrapper from "components/Wrappers/MetaWrapper";
import LoadingKoi from '../../components/LoadingKoi'

const Collection = ({ scrollPosition }) => {
  const { contents } = useContext(DataContext);
  const history = useHistory();

  const [imgsLoaded, setImgsLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image.source;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image.source);
          }, 2000);

        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(contents.slice(0, 16).map((image) => loadImage(image)))
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
  }, [contents]);
  return (
    <MetaWrapper>
      <CollectionWrapper>
        {imgsLoaded ? (
          <Grid>
            <h2>
              1111
            </h2>
            {contents.map((pic, id) => {
              return (
                <LazyLoadImage
                  onClick={() =>
                    history.push(`/gallery/${parseInt(id) + 1}/details`)
                  }
                  visibleByDefault={id < 17}
                  scrollPosition={scrollPosition}
                  effect="opacity"
                  src={pic.source}
                  alt={pic.name}
                  threshold="300"
                  width="120"
                  height="120"
                  key={pic.name}
                />
              );
            })}
          </Grid>
        ) : (
          <LoadingKoi/>
        )}
      </CollectionWrapper>
    </MetaWrapper>
  );
};
export default trackWindowScroll(Collection);
