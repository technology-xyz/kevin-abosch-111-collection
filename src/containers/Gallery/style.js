import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const MenuContainer = styled.div`
  display: flex;
  flex : 1;  
  width: 100vw;
  min-height: 100vh;




  
  /* overflow: ${(props) => (props.lockScroll ? "hidden" : "scroll")}; */
  justify-content: center;
  align-items: center;
  background-color: #000;
  overflow-x: hidden;
  /* position: absolute; */

  @media (max-width: 769px) {
    min-height: 100%;
    flex-direction: column;
    justify-content: space-between;
  }
`;
export const EvolveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 17px;
  background-color: var(--yellow);
  border: 0;
  width: 170px;
  height: 32px;
`;
export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4%;
  flex-direction: column;
  width: 40%;



  @media (max-width: 769px) {
    img {
      width: 100%;
      height: auto;
    }

    width: 92%;
    margin-top: 10%;
  }
`;

export const MainImage = styled.div`
  display: flex;
  align-items: center;
.arrow {
  color: white;
  cursor: pointer;
  font-size: 4em;
  transition: 1s ease-out;
  z-index: 1;
}
.left {
  margin-right: 20px;
}
.right {
  margin-left: 20px;
}

.arrow:hover {
  transform: scale(1.5);  
  transition: transform .5s ease;
  color: grey;
}
  img {
    background-color: black;
    &:hover {
      cursor: pointer;
    }
  }
  .loader-cp {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 580px;
    height: 580px;
    img{
      background-color: white;
      text-align: center;
      opacity: 1;
    }
  }

  @media (max-width: 769px) {
    margin-top: 64px;
    flex-flow: column;
    .mobile
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
export const DetailWrapper = styled.div`
  width: 55vw;
  margin-left: -5vw;
  @media (max-width: 769px) {
    width: 100%;
    margin-left: 0;
  }
`;
export const CollectLinks = styled.div`
  display: flex;
  align-items: center;

  a:first-of-type {
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;

    width: 170px;
    font-weight: 700;
    background-color: #f5b900;
    color: #000;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    border: none;
    padding: 0;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: white;
    background-color: transparent;
    text-align: center;
    width: 170px;
    padding: 0;
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
  font-weight: ${(props) => (props.active ? "600" : "400")};
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
  .bal {
    display: flex;
    justify-content: space-around;
  }
`;

export const BidNow = styled.a`
  color: white;
  &:hover {
    color: var(--yellow);
  }
`;
export const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100vw;
  /* bottom: -10%;
  height: 64px; */
  overflow: hidden;
  position: relative;
  img {
    cursor: pointer;
  }
`;
export const PlaceHolder = styled.div``;
export const LeftImg = styled.div`
  position: fixed;
  bottom: -10%;
  left: 0;
  cursor: pointer;
  img {
    margin-top: -48px;
  }
  @media (max-width: 475px) {
    position: relative;
  }
`;

export const RightImg = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  cursor: pointer;
  bottom: -10%;
  @media (max-width: 475px) {
    position: relative;
  }
`;

export const ShareView = styled.div`
  width: 100%;
`;

export const Copy = styled.div`
  margin: 16px 0px;
  display: flex;
  height: 32px;
  min-width: 100%;
  input {
    color: white;
    background-color: transparent;
    padding-left: 8px;
    text-align: left;
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
