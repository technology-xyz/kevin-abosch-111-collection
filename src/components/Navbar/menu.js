import React from "react";
import { Logo } from "../../assets/images";
import { MenuWrapper, SideContent, Nav, Nlink, KoiLink } from "./style";
const Menu = () => {
  const genRand = () => Math.floor(Math.random() * 1001);
  return (
    <MenuWrapper>
      <SideContent>
        <Nav>
          <Nlink to="/collection">
            The Collection
          </Nlink>
          <Nlink to="/about">
            About 1111
          </Nlink>
          <Nlink to={`/gallery/${genRand()}`}>
            Random
          </Nlink>
        </Nav>
        <KoiLink href="openkoi.com" target="_blank" rel="noopener noreferrer">
          <img src={Logo} alt="logo" />
          Powered By Koi
        </KoiLink>
      </SideContent>
    </MenuWrapper>
  );
};
export default Menu;
