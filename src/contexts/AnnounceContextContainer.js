import React, { useState } from "react";
import PropTypes from "prop-types";

const AnnounceContext = React.createContext({
  message: '',
  setMessage: () => {},
  showKOIInfo: false,
  setShowKOIInfo: () => {},
});

export { AnnounceContext };

const AnnounceContextContainer = (props) => {
  const [message, setMessage] = useState("");
  const [showKOIInfo, setShowKOIInfo] = useState(false);

  return (
    <AnnounceContext.Provider
      value={{
        message,
        setMessage,
        showKOIInfo,
        setShowKOIInfo
      }}
    >
      {props.children}
    </AnnounceContext.Provider>
  );
};

AnnounceContextContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnnounceContextContainer;