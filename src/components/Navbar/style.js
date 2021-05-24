import styled from "styled-components";
export const Bar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 10px;
`;
export const Title = styled.p`
  font-size: 15px;
  color: #f5b900;
`;
export const Koi = styled.div`
  position: relative;
  display: inline-block;

  &:hover {
    span {
      visibility: visible;
    }
  }
`;
export const MenuIconWrapper = styled.div`
  margin: 0 20px;
`;
export const Left = styled.div`
  display: flex;

  margin: 0 25px;
`;
export const NavigationWrapper = styled.div``;

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
  height:100vh;
  width: 100vw;
  
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  display: flex;
  justify-content: flex-end;
`;
export const SideContent = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    &:hover{
        color:#f5b900;
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
  }
`;
