import styled from "styled-components";
import { NavLink } from "react-router-dom";
export const MenuContainer = styled.div`
  display: flex;

  width: 100vw;
  height: 100%;
  overflow: ${(props) => (props.lockScroll ? "hidden" : "scroll")};
  justify-content: center;
  align-items: center;
  background-color: #000;
  img {
    &:hover {
      cursor: pointer;
    }
  }
 

`;

export const Details = styled.div`
  width: 100%;
  height: 100%;
  color: #fff;
  a {
    display: block;
    text-align: center;
    border: 1px solid #fff;
    width: 170px;
    height: 32px;
    color: #fff;
    text-decoration: none;
    font-size: 17px;
    line-height: 28px;
    margin: 16px 0;
    margin-right: 10%;
  }
`;
export const CollectLinks = styled.div`
  display: flex;
  align-items: center;
  a:first-of-type {
    width: 170px;
   
    background-color: #f5b900;
    color: #000;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    border: none;
  }
  button {
    color: white;
    background-color: transparent;
    text-align: center;
    width: 170px;
   
    height: 32px;
    border: 1px solid white;
  }
`;
export const CurrentOwners = styled.div`
  span {
    display: inline-block;
    border-bottom: 3px solid var(--yellow);
    margin-bottom: 5%;
  }
`;
export const DetailLink = styled(NavLink)`
  background-color: transparent;
  border: none;

  outline: 0;
  border-bottom: ${(props) =>
    props.active ? "3px solid var(--yellow)" : "none"};
  color: ${(props) => (props.active ? "var(--yellow)" : "white")};
  &:hover {
    color: var(--yellow);
    text-decoration: none;
  }
`;

export const TagGroup = styled.div`
  display: flex;
  width: 100%;
  margin: 16px 0;
`;

export const Tag = styled.div`
  width: 97px;
  height: 24px;
  margin-right: 8px;
  display: block;
  text-align: center;
  border: 1px solid #2ebaae;
  border-radius: 25px;
  color: #2ebaae;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4%;
  flex-direction: column;
  width: 40%;
  img {
    width: 100%;
  }
  @media (max-width: 475px) {
    width: 92%;
    margin-top: 10%;
  }
`;

export const ImageMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #ffffff;
  margin: 8px 0px;
  span {
    display: block;
    height: 24px;
    border: 1px solid #000;
    width: 84px;
  }

  img {
    width: 24px;
  }
`;
export const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100vw;
  
`;
export const PlaceHolder = styled.div``;
export const LeftImg = styled.div``;

export const RightImg = styled.div``;

export const ShareView = styled.div`
  width: 100%;
`;

export const Copy = styled.div`
  margin: 16px 0px;
  display: flex;
  height: 32px;

  min-width: 100%;
  p {
    flex: 1;
    height: 32px;
    border: 1px solid white;
  }
  button {
    width: 95px;
    background-color: #2ebaae;
    border: none;
  }
`;
