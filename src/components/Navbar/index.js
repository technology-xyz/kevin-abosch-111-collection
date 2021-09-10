import React, { useState } from "react";
import {
  Bar,
  Title,
  Koi,
  MenuIconWrapper,
  Right,
  NavigationWrapper,
  Tooltip,
} from "./style";
import { MenuIcon, NewLogo } from "../../assets/images";
import Menu from "./menu";
import { matchPath, useLocation } from "react-router";
import BackArrow from "../BackArrow"

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const showMenu = () => {
    setActiveMenu(!activeMenu);
  };
  const { pathname } = useLocation();
  const matchMain = matchPath(pathname, { path: "/gallery/:id/", exact: true });
  const matchAbout = matchPath(pathname, { path: "/about", exact: true });
  const matchDetail = matchPath(pathname, "/gallery/:id/details");
  const matchCollect = matchPath(pathname, "/gallery/:id/collect");
  
  return (
    <NavigationWrapper>
      <Bar>
        <Title href="https://www.kevinabosch.com/">Studio Kevin Abosch</Title>
        <Right>
          <Koi>
            <img src={NewLogo} alt="koi-logo" />
            <Tooltip>
              <p>Powered by Koi.</p>
              <p>
                Koi is the first framework for building easy, customizable dApps
                where content earns attention rewards by default.
              </p>

              <a
                href="https://openkoi.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </Tooltip>
          </Koi>
          <MenuIconWrapper onClick={showMenu}>
            {!activeMenu ? (
              <img src={MenuIcon} alt="menu icon" />
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L15 15" stroke="white" stroke-width="2" />
                <path d="M15 1L1 15" stroke="white" stroke-width="2" />
              </svg>
            )}
          </MenuIconWrapper>
        </Right>
        {!matchMain && (matchCollect || matchDetail || matchAbout) && (
        <BackArrow />
      )}
      </Bar>
      
      {activeMenu && <Menu hide={() => setActiveMenu(false)}/>}
    </NavigationWrapper>
  );
};

export default Navbar;
