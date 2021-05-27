import styled from "styled-components";

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;
  overflow: ${(props) => (props.lockScroll ? "hidden" :"scroll" )};
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

export const Details = styled.div`
  width: 100%;
  height: 100%;
  color:#fff;
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
    margin-right:10%;
  }
`;
export const CollectLinks = styled.div`
display: flex;
a:first-of-type{
  background-color: #f5b900;
    color: #000;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    border:none;
}
`
export const CurrentOwners = styled.div`

span {
  display:inline-block;
  border-bottom: 3px solid var(--yellow);
  margin-bottom: 5%;
}
`
export const DetailLink = styled.button`
  background-color:transparent;
  border:none;
  padding: none;
  outline:0;
  border-bottom: ${props => props.active ? "3px solid var(--yellow)" : "none"};
  color: ${props => props.active ? "var(--yellow)" : "white"};
`;

export const TagGroup = styled.div`
  display: flex;
  width:100%;
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
  width: min-content;
`;

export const ImageMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #ffffff;
  margin: 8px 0px;
  span {
    display:block;
    height:24px
  }
  img{
    width:24px;
  }
  
`;
export const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  position:absolute;
  bottom: 0;
  width: 100%;
`;
export const PlaceHolder = styled.div``;
export const LeftImg = styled.div`
 
`;

export const RightImg = styled.div`
`;

export const ShareView = styled.div`
`;

export const Copy = styled.div``

export const SocialBar = styled.div``
