import styled from "styled-components";

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;
  overflow: ${(props) => (props.showDetails ? "scroll" : "hidden")};
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

export const Details = styled.div`
  max-width: 100%;
  height: 100%;
  a {
    display: block;
    text-align: center;
    border: 1px solid #fff;
    width: 127px;
    height: 32px;
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    line-height: 28px;
  }
`;
export const DetailLink = styled.div`
  border-bottom: ${props => props.active ? "3px solid var(--yellow)" : "none"};
`;

export const TagGroup = styled.div`
  display: flex;
`;

export const Tag = styled.div`
  width: 97px;
  height: 24px;

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
  width: min-content;
`;

export const ImageMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #ffffff;
`;
export const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const PlaceHolder = styled.div``;
export const LeftImg = styled.div`
  width: 100px;
`;

export const RightImg = styled.div`
  width: 100px;
`;
