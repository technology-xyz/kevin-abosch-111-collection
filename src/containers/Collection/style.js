import styled, { keyframes } from "styled-components";

export const CollectionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
`;

const LoadingAnimation = keyframes`
    0% {transform:translate3d(1000%,0,0) scaleX(-1)}

   
    50% {transform:translate3d(-1000%,0,0) }
  
   
    100%{transform:translate3d(1000%,0,0) }
`;


export const Loading = styled.div`
display: flex;
  width: 86vw;
  justify-content: center;
  img {
      
    animation: ${LoadingAnimation};
  animation-duration: 6s;
  animation-iteration-count: infinite;
    
  }
  
`;


export const Grid = styled.div`
  margin-top: 10%;
  width: 86%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-flow: row;
  grid-gap: 40px;
  position: relative;
  h2 {
      color:white;
      font-size: 18px;
      font-weight:bold;
      position: absolute;
      top:-48px;
      left: 0;
     
  }
  img {
    width: 100%;
    height: 100%;
    &:hover {
      cursor: pointer;
    }
  }
`;
