import React, { useContext, useState, useEffect } from "react";
import { CollectionWrapper, Grid } from "./style";
import { DataContext } from "contexts/DataContextContainer";
import "react-lazy-load-image-component/src/effects/opacity.css";
// import { Logo } from "../../assets/images";
import Pagination from "./pagination"
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { useHistory } from "react-router";
import MetaWrapper from "components/Wrappers/MetaWrapper";
import LoadingKoi from '../../components/LoadingKoi'
const itemsPerPage = 24

const Collection = ({ scrollPosition }) => {
  
  const { contents } = useContext(DataContext);
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1)
  const [imgsLoaded, setImgsLoaded] = useState(true);
  // const [loaded, setLoaded] = useState([Array(itemsPerPage).fill(false)])
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = contents.slice(indexOfFirstPost, indexOfLastPost);




  const createPage = (pageNum) => {
    const pageEnd = (currentPage + pageNum * itemsPerPage)
    const pageStart = (pageEnd - itemsPerPage)
    const page = contents.slice(pageStart, pageEnd);
    return page
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const nextPage = createPage(1)

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
    Promise.all(nextPage.map((image) => loadImage(image)))
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPosts]);

  return (
    <MetaWrapper>
      <CollectionWrapper>
        {imgsLoaded ? (
          <Grid>
            <h2>
              1111
            </h2>
            {currentPosts.map((pic,i) => {
              return (
                <>
                <LazyLoadImage
                  onClick={() =>
                    history.push(`/gallery/${parseInt(pic.id) + 1}/details`)
                  }
                  visibleByDefault={i < 9}
                  effect="opacity"
                  src={pic.source}
                  alt={pic.name}
                  threshold="400"
                  width="120"
                  height="120"
                  key={pic.name}
                /> 
              
            
                </>
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
            selected={currentPage}
          />
       

      </CollectionWrapper>
    </MetaWrapper>
  );
};
export default trackWindowScroll(Collection);
