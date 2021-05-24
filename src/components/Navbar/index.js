import React, { useState } from "react";
import {
  Bar,
  Title,
  Koi,
  MenuIconWrapper,
  Left,
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
  const handleHover = () => {};
  return (
    <NavigationWrapper>
      <Bar>
        <Title>Studio Kevin Abosch</Title>
        <Left>
          <Koi onHover={handleHover}>
            <img src={Logo} />
            <Tooltip>
              Powered by Koi. Koi is the first framework for building easy,
              customizable dApps where content earns attention rewards by
              default.
              <a href="https://openkoi.com/framework/">
                  Learn More
              </a>

            
            </Tooltip>
          </Koi>
          <MenuIconWrapper onClick={showMenu}>
            {!activeMenu ? (
              <img src={MenuIcon} />
            ) : (
              <h4 style={{ color: "#fff" }}>X</h4>
            )}
          </MenuIconWrapper>
        </Left>
      </Bar>
      {activeMenu && <Menu />}
    </NavigationWrapper>
  );
};

export default Navbar;
