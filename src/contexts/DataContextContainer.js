import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useLocalStorage } from "hooks";

const DataContext = React.createContext(null);

export { DataContext };

function DataContextContainer(props) {
  const [addressEth, setAddressEth] = useLocalStorage("koi-addressEth", null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addressAr, setAddressAr] = useLocalStorage("koi-addressAr", null);
  const [keyAr, setKeyAr] = useLocalStorage("koi-keyAr", null);
  const [balanceKoi, setBalanceKoi] = useLocalStorage("koi-balanceKoi", null);
  const [balanceAr, setBalanceAr] = useLocalStorage("koi-balanceAr", null);
  const [contents, setContents] = useState([]);
  const [kevinNft, setKevinNft] = useState([]);
  const [totalViewCt, setTotalViewCt] = useLocalStorage("koi-totalViewCt", 0);
  const [totalKoiCt, setTotalKoiCt] = useLocalStorage("koi-totalKoiCt", 0);
  const [selectedTokenId, setSelectedTokenId] = useState();

  useEffect(() => {
    setContents(props.images);
  }, [props.images]);

  return (
    <DataContext.Provider
      value={{
        addressEth,
        setAddressEth,
        addressAr,
        setAddressAr,
        modalOpen,
        setModalOpen,
        keyAr,
        setKeyAr,
        balanceKoi,
        setBalanceKoi,
        balanceAr,
        setBalanceAr,
        contents,
        setContents,
        totalViewCt,
        setTotalViewCt,
        totalKoiCt,
        setTotalKoiCt,
        kevinNft,
        setKevinNft,
        selectedTokenId,
        setSelectedTokenId,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

DataContextContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataContextContainer;
