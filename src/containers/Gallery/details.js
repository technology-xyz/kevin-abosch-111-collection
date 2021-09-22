import React, { useState, useRef, useEffect } from "react";
import { Details, DetailWrapper, CollectLinks, CurrentOwners } from "./style";

import Share from "./share";
import { matchPath, useLocation } from "react-router";

const DetailView = (txId) => (
  <DetailWrapper>
    <a
      href={`https://viewblock.io/arweave/tx/${txId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Explore Block
    </a>
  </DetailWrapper>
);

const OwnersView = (owners) => {
  return (
    <CurrentOwners>
      <span>Current Owners</span>

      {owners.map((wallet) => {
        return <p>{`${wallet[0]} - ${wallet[1]}`}</p>;
      })}
    </CurrentOwners>
  );
};

const ImageDetails = (props) => {
  const [share, setShare] = useState(false);
  const { pathname } = useLocation();
  const ref = useRef(null);
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const matchDetails = matchPath(pathname, {
    path: "/gallery/:id/details",
    exact: true,
    strict: false,
  });
  const matchCollect = matchPath(pathname, {
    path: "/gallery/:id/collect",
    exact: true,
    strict: false,
  });

  const matchShare = matchPath(pathname, {
    path: "/gallery/:id/collect/share",
    exact: true,
    strict: false,
  });
  const onShare = () => {
    setShare(!share);
  };
  const CollectView = () => (
    <div>
      <p>852 Profit Sharing Tokens</p>
      <CollectLinks>
        <a
          href="https://opensea.io/collection/1111-by-kevin-abosch"
          target="_blank"
          rel="noopener noreferrer"
          // href={`https://opensea.io/collection/1111-by-kevin-abosch/${props.txId}`}
        >
          Bid Now
        </a>
        <button onClick={onShare}>{share ? "Owners" : "Share"}</button>
      </CollectLinks>
      {share && <Share />}
      {!share && OwnersView(props.owners)}
    </div>
  );

  return (
    <Details ref={ref}>
      {matchDetails && DetailView(props.txId)}
      {(matchCollect || matchShare) && CollectView()}
    </Details>
  );
};

export default ImageDetails;
