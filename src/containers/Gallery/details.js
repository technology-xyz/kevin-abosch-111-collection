import React, { useState } from "react";
import {
  Details,
  TagGroup,
  Tag,
  CollectLinks,
  CurrentOwners,
  ShareView,
  Copy,
  SocialBar,
} from "./style";
import { matchPath, useHistory, useLocation } from "react-router";
import {
  Twitter,
  discord,
  email,
  facebook,
  linkein,
  sms,
  telegram,
} from "../../assets/images";
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
      <SocialBar>
        <a href={`https://twitter.com/intent/tweet?url${""}`}>
          <img src={Twitter} />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=%{}`}
        >
          <img src={linkein} />
        </a>

        <a href={`https://www.facebook.com/sharer.php?u=${""}`}>
          <img src={facebook} />
        </a>

        <img src={sms} />
        <img src={email} />
        <a href={`https://telegram.me/share/url?url=`}>
         <img src={telegram} /> 
        </a>
        
        <img src={discord} />
      </SocialBar>
    </ShareView>
  );
};
const ImageDetails = (props) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [share, setShare] = useState(false);

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
      {matchDetails && DetailView()}
      {(matchCollect || matchShare) && CollectView()}
    </Details>
  );
};

export default ImageDetails;
