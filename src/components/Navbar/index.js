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
import { MenuIcon, Logo } from "../../assets/images";
import Menu from "./menu";
const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const showMenu = () => {
    setActiveMenu(!activeMenu);
  };

  return (
    <NavigationWrapper>
      <Bar>
        <Title href="https://www.kevinabosch.com/">Studio Kevin Abosch</Title>
        <Right>
          <Koi >
            <img src={Logo} alt="koi-logo"/>
            <Tooltip>
                <p>
                    Powered by Koi. Koi is the first framework for building easy,
              customizable dApps where content earns attention rewards by
              default.
                </p>
              
              <a href="https://openkoi.com/framework/"
              target="_blank"
              rel="noopener noreferrer">
                  Learn More
              </a>

            
            </Tooltip>
          </Koi>
          <MenuIconWrapper onClick={showMenu}>
            {!activeMenu ? (
              <img src={MenuIcon} alt="menu icon" />
            ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L15 15" stroke="white" stroke-width="2"/>
                <path d="M15 1L1 15" stroke="white" stroke-width="2"/>
                </svg>
                
            )}
          </MenuIconWrapper>
        </Right>
      </Bar>
      {activeMenu && <Menu />}
    </NavigationWrapper>
  );
};

export default Navbar;
