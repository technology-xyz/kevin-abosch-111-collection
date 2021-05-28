import styled from "styled-components";
export const Bar = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 1% 2%;
  position: fixed;
  top: 0;
  z-index: 3;
`;
export const Title = styled.p`
  font-size: 16px;
  color: #f5b900;
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
export const MenuIconWrapper = styled.div``;
export const Right = styled.div`
  display: flex;
  align-items: center;
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
  text-align: center;
  align-items: center;
  padding: 7px;
  border: 2px solid #f5b900;
  position: absolute;
  z-index: 1;
  top: 135%;
  left: -220%;
  margin-left: -60px;
  a {
    background-color: #f5b900;
    color: #000;
    width: 170px;
    height: 32px;
    font-size: 17px;
    font-weight: bold;
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

export const MenuWrapper = styled.div`
  height: 100%;
  width: 100vw;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: flex-end;
`;
export const SideContent = styled.div`
  height: 70%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;
export const Nav = styled.nav`
  margin: 40px 20px;
`;
export const NavLink = styled.nav`
  margin: 20px 20px;
  color: white;
  text-align: right;

  a {
    font-size: 18px;
    color: white;
    &:hover {
      color: #f5b900;
      font-weight: bold;
    }
  }
`;
export const KoiLink = styled.a`
  margin: 0 20px;
  color: white;
  a {
    font-size: 18px;
    color: white;
    text-align: right;
    &:hover {
      color: #f5b900;
      font-weight: bold;
    }
  }
`;
