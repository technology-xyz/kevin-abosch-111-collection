import React from "react";
import { Details, TagGroup, Tag, } from "./style";
import {  matchPath, useLocation } from "react-router";

const DetailView = () => (
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

    <a href="google.com">Explore Block</a>

    <TagGroup>
      <Tag>tag #1</Tag>
      <Tag>tag #2</Tag>
      <Tag>tag #3</Tag>
    </TagGroup>
  </div>
);

const CollectView = () => (
  <div>
    <p>852 Profit Sharing Tokens available for purchase.</p>
    <a href="verto.exchange">Bid Now</a>
    <a>Share</a>
    <span>Current Owners</span>
    <p>1234567890123456789012345678901234567890</p>
    <p>6789012345678901234567890123456789012345</p>
    <p>1234567890123456789012345678901234567890</p>
    <p>1234567890123456789012345678901234567890</p>
    <p>6789012345678901234567890123456789012345</p>
    <p>1234567890123456789012345678901234567890</p>
  </div>
);
const ImageDetails = () => {

  const { pathname } = useLocation();
  
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

  return (
    <Details>
      {matchDetails && DetailView()}
      {matchCollect && CollectView()}
    </Details>
  );
};

export default ImageDetails;
