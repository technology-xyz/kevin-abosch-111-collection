import styled from "styled-components";
import { NavLink } from "react-router-dom";
export const Bar = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 1% 2%;
  
  position:fixed;
  height:64px;
  top: 0;
  z-index: 3;
  background-color:black;
`;
export const Title = styled.a`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #f5b900;

  &:hover {
    text-decoration: none;
    color: var(--yellow);
  }
`;
export const Koi = styled.div`
  position: relative;
  display: inline-block;
  margin: 0px 16px;

  &:hover {
    span {
      visibility: visible;
    }
  }
`;
export const MenuIconWrapper = styled.button`
  outline: 0;
  background-color: transparent;
  border: 0;
  height: 34px;
  width: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const NavigationWrapper = styled.div`
  position: static;
`;

export const Tooltip = styled.span`
  visibility: hidden;
  width: 210px;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: #fff;

  text-align: left;
  align-items: center;
  padding: 8px;
  border: 2px solid #f5b900;
  position: absolute;
  z-index: 1;
  top: 135%;
  left: -220%;
  margin-left: -60px;
  p {
    font-size: 15px;
    width: 100%;
    text-align: left;
    padding: 0px 4px;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5b900;
    color: #000;
    width: 170px;
    height: 32px;
    font-size: 17px;
    font-weight: 700;
    text-align: center;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 70%;
    margin-left: -2px;
    border-width: 12px;
    border-style: solid;
    border-color: transparent transparent #000;
  }

  &:before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 70%;
    margin-left: -5px;
    border-width: 15px;
    border-style: solid;
    border-color: transparent transparent #f5b900;
  }
`;

export const EvolveTooltip = styled.span`
  visibility: hidden;
  width: 245px;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: #fff;

  text-align: left;
  align-items: center;
  padding: 8px;
  border: 2px solid #f5b900;
  position: absolute;
  z-index: 7;
  top:-55%;
  right: 120%;
  
  }
  p {
    font-size: 15px;
    width: 100%;
    text-align: left;
    padding: 0px 4px;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5b900;
    color: #000;
    width: 170px;
    height: 32px;
    font-size: 17px;
    font-weight: 700;
    text-align: center;
  }
  &:after {
    content: "";
    position: absolute;
    top:5%;
    left: 100%;
    margin-top: 3px;
    border-width: 12px;
    border-style: solid;
    border-color: transparent  transparent transparent #000;
  }

  &:before {
    content: "";
    position: absolute;
    top:5%;
    left: 100%;
    
    border-width: 15px;
    border-style: solid;
    border-color: transparent transparent transparent  #f5b900 ;
  }
`;

export const MenuWrapper = styled.div`
  height: 100%;
  width: 100vw;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: flex-end;
  padding: 8px;
  outline:0;
`;
export const SideContent = styled.div`
  height: 70%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: 475px) {
    width: 80%;
  }
`;
export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 64px 0px;
`;

export const Nlink = styled(NavLink)`
  margin: 20px 20px;
  color: white;
  text-align: right;
  display: inline-block;
  font-size: 18px;
  color: white;
  position: relative;
  &:hover {
    color: #f5b900;
    font-weight: bold;
  }
`;

export const Elink = styled.button`
  margin: 20px 20px;
  color: white;
  text-align: right;
  display: inline-block;
  font-size: 18px;
  color: white;
  position: relative;
  background-color: transparent;
  border:0;
  &:hover {
    color: #f5b900;
    font-weight: bold;
    span {
      visibility: visible;
      color:white;
      font-weight: 400;
    }
  }
 
`;
export const KoiLink = styled.a`
  margin: 0 20px;
  color: white;
display: flex;
align-items:center;
  font-size: 18px;
  color: white;
  text-align: right;
  fill: white;
  svg {
    margin-right:4px;
  }
  &:hover {
    color: #f5b900;
    font-weight: bold;
    svg {
      fill: var(--yellow);
    }
    
  
  }
`;
