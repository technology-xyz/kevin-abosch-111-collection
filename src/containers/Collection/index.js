import React, { useContext, useState, useEffect } from "react";
import { CollectionWrapper, Grid, Loading } from "./style";
import { DataContext } from "contexts/DataContextContainer";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { Logo } from "../../assets/images";
import Pagination from "./pagination"
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { useHistory } from "react-router";
import MetaWrapper from "components/Wrappers/MetaWrapper";
import LoadingKoi from '../../components/LoadingKoi'
const itemsPerPage = 50
const Collection = ({ scrollPosition }) => {
  const { contents } = useContext(DataContext);
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(23)
  const [imgsLoaded, setImgsLoaded] = useState(false);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = contents.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image.source;

        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image.source);
          }, 3000);
          
        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(currentPosts.map((image) => loadImage(image)))
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
  }, [currentPosts]);

  

  return (
    <MetaWrapper>
      <CollectionWrapper>
        {imgsLoaded ? (
          <Grid>
            <h2>
              1111
            </h2>
            {currentPosts.map((pic) => {
              return (
                <LazyLoadImage
                  onClick={() =>
                    history.push(`/gallery/${parseInt(pic.id) + 1}/details`)
                  }
                  placeholder={<LoadingKoi/>}
                  scrollPosition={scrollPosition}
                  visibleByDefault={true}
                  effect="opacity"
                  src={pic.source}
                  alt={pic.name}
                  threshold="400"
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
        <Pagination
            currentPage={currentPage}
            totalCount={contents.length}
            pageSize={itemsPerPage}
            onPageChange={page => setCurrentPage(page)}
          />
       

      </CollectionWrapper>
    </MetaWrapper>
  );
};
export default trackWindowScroll(Collection);
