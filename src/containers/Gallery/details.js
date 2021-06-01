import React from "react";
import {
  Details,
  DetailWrapper,
  CollectLinks,
  CurrentOwners,
  ShareView,
  Copy,
} from "./style";

import ShareBar from "../../components/ShareBar";
import { matchPath, useHistory, useLocation,} from "react-router";

const DetailView = (txId) => (
  <DetailWrapper>
    <p>
      1111 NFT digital works comprised of cryptographic alphanumerics presented
      in various compositions and colors. Individually and collectively, the
      works are embedded with and within a decentralized autonomous organization
      (DAO). Over time, it will be revealed how communities from around the
      world can interact with the work, with an emphasis on redefining the
      attention economy. Collectors are advised to “pay attention” themselves as
      this work is full of surprises!
    </p>

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

const Share = (url) => {
  return (
    <ShareView>
      <Copy>
        <p>{url}</p>
        <button>Copy</button>
      </Copy>
      <ShareBar />
    </ShareView>
  );
};
const ImageDetails = (props) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const currentURL = window.location.href
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

  const CollectView = () => (
    <div>
      <p>852 Profit Sharing Tokens available for purchase.</p>
      <CollectLinks>
        <a href={`https://verto.exchange/asset/${props.txId}`}>Bid Now</a>
        <button
          onClick={() => history.push(`/gallery/${props.id}/collect/share`)}
        >
          Share
        </button>
      </CollectLinks>

      {matchShare && Share(currentURL)}

      {!matchShare && OwnersView(props.owners)}
    </div>
  );
    console.log(props.owners)
  return (
    <Details>
      {matchDetails && DetailView(props.txId)}
      {(matchCollect || matchShare) && CollectView()}
    </Details>
  );
};

export default ImageDetails;
