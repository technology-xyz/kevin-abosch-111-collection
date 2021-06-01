import React from "react";
import {Button} from './style'
const Arrow = ({direction}) => {
  return (
    <Button right={direction === 'right'}>
      <svg
        
        viewBox="0 0 389 774"
        fill="none"
      >
        <path
          d="M322.577 772C306.517 772 290.567 765.015 279.677 751.484L14.1363 421.472C-2.25371 401.067 -2.03371 371.916 14.7413 351.785L289.742 21.773C309.157 -1.54788 343.862 -4.68299 367.237 14.7327C390.557 34.1484 393.692 68.8547 374.222 92.1755L128.097 387.591L365.422 682.512C384.452 706.163 380.712 740.814 357.007 759.845C346.887 768.04 334.677 772 322.577 772Z"
          stroke="#F5B900"
          stroke-width="3"
        />
      </svg>
    </Button>
  );
};

export default Arrow;