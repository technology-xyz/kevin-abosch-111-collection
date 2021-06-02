import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  BottomBar,
  LeftImg,
  RightImg,
  PlaceHolder,
  LeftArrow,
  RightArrow,
} from "./style";
import React from "react";
import Arrow from "../../components/Arrows";
import { useHistory } from "react-router";
const Bottom = ({ left, right, index }) => {
  const history = useHistory();
  const mobile = window.matchMedia("(max-width: 768px)").matches;
  return (
    <BottomBar>
      <LeftImg>
        {index === 0 ? (
          <PlaceHolder />
        ) : (
          <LazyLoadImage
            onClick={() => history.push(`/gallery/${index}`)}
            width="170"
            height="170"
            alt={left.name}
            src={left.source}
            effect="blur"
          />
        )}
      </LeftImg>

      <RightImg>
        <LazyLoadImage
          onClick={() => history.push(`/gallery/${index + 2}`)}
          width="170"
          height="170"
          alt={right.name}
          src={right.source}
          effect="blur"
        />
      </RightImg>
    </BottomBar>
  );
};

export default Bottom;
