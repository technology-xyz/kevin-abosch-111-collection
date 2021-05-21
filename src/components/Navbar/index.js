import React, { useState } from "react";
import { Bar, Title, Koi, MenuIconWrapper, Left,NavigationWrapper } from "./style";
import { MenuIcon, Logo } from "../../assets/images";
import Menu from './menu'
const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const showMenu = () => {
    setActiveMenu(!activeMenu);
  };
  return (
    <NavigationWrapper>
      <Bar>
        <Title>Studio Kevin Abosch</Title>
        <Left>
          <Koi>
            <img src={Logo} />
          </Koi>
          <MenuIconWrapper onClick={showMenu}>
            {!activeMenu ? <img src={MenuIcon} /> : <h4 style={{color:"#fff"}}>X</h4>}
          </MenuIconWrapper>
        </Left>
      </Bar>
        {activeMenu && <Menu/>}
    </NavigationWrapper>
  );
};

export default Navbar;
