import React from "react";
import {
  Details,
  TagGroup,
  Tag,
  CollectLinks,
  CurrentOwners,
  ShareView,
  Copy,
} from "./style";

import ShareBar from "../../components/ShareBar";
import { matchPath, useHistory, useLocation } from "react-router";

const DetailView = (txId) => (
  <div>
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

    <TagGroup>
      <Tag>tag #1</Tag>
      <Tag>tag #2</Tag>
      <Tag>tag #3</Tag>
    </TagGroup>
  </div>
);

const OwnersView = () => {
  return (
    <CurrentOwners>
      <span>Current Owners</span>
      <p>1234567890123456789012345678901234567890</p>
      <p>6789012345678901234567890123456789012345</p>
      <p>1234567890123456789012345678901234567890</p>
      <p>1234567890123456789012345678901234567890</p>
      <p>6789012345678901234567890123456789012345</p>
      <p>1234567890123456789012345678901234567890</p>
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
        <a href="https://verto.exchange">Bid Now</a>
        <span
          onClick={() => history.push(`/gallery/${props.id}/collect/share`)}
        >
          Share
        </span>
      </CollectLinks>

      {matchShare && Share(pathname)}

      {!matchShare && OwnersView()}
    </div>
  );

  return (
    <Details>
      {matchDetails && DetailView(props.txId)}
      {(matchCollect || matchShare) && CollectView()}
    </Details>
  );
};

export default ImageDetails;
