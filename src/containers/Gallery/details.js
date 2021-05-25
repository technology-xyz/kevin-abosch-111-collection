import React from "react";
import { Details, TagGroup, Tag, ImageMenu, DetailLink } from "./style";
import { Logo } from "../../assets/images";
import { useHistory } from "react-router";

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
const ImageDetails = ({ item }) => {
    const history = useHistory()
    const handleClick = (e) =>{
        console.log(e.target.attributes.value)
        history.push(e.target.attributes.value)
    }
  return (
    <Details>
      <ImageMenu>
        <DetailLink value="details" onClick={handleClick}>Details</DetailLink>
        <DetailLink value="collect" onClick={handleClick}>Collect</DetailLink>
        <span>Bid Now</span>
      </ImageMenu>
      {DetailView()}
    </Details>
  );
};

export default ImageDetails;
