import React from "react";
import { Logo } from "../../assets/images";
import { Link } from "react-router-dom";
import { MenuWrapper, SideContent, Nav, NavLink, KoiLink } from "./style";
const Menu = () => {
  return (
    <MenuWrapper>
      <SideContent>
        <Nav>
          <NavLink>
            <Link to="/collection">The Collection</Link>
          </NavLink>
          <NavLink>
            <Link to="/about">About 1111</Link>
          </NavLink>
          <NavLink>
            <Link>Random</Link>
          </NavLink>
        </Nav>
        <KoiLink>
            <Link>
            <img src={Logo} alt="logo"/>
          Powered By Koi
            </Link>
         
        </KoiLink>
      </SideContent>
    </MenuWrapper>
  );
};
export default Menu;
