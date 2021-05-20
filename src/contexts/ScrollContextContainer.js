import React, { useState } from "react";
import PropTypes from "prop-types";

const ScrollContext = React.createContext({
  scrollTop: 0,
  scrollUp: false,
  scrollFrame: {},
  setScrollTop: () => {},
  setScrollUp: () => {},
  setScrollFrame: () => {},
});

export { ScrollContext };

const ScrollContextContainer = (props) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollUp, setScrollUp] = useState(false);
  const [scrollFrame, setScrollFrame] = useState({});

  return (
    <ScrollContext.Provider
      value={{
        scrollTop,
        scrollUp,
        scrollFrame,
        setScrollTop,
        setScrollUp,
        setScrollFrame,
      }}
    >
      {props.children}
    </ScrollContext.Provider>
  );
};

ScrollContextContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollContextContainer;
