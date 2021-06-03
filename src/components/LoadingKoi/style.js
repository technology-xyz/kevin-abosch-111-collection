import styled, { keyframes } from "styled-components";

const Bubbles = keyframes`
   
    0% { fill:none}
    100% {fill:white}

`;

export const LoadingContainer = styled.div`
  svg g circle {
    &:nth-child(1) {
      animation: ${Bubbles};
      animation-duration: 4s;
      animation-iteration-count: infinite;
      animation-delay: 1s;
    }
    &:nth-child(2) {
      animation: ${Bubbles};
      animation-duration: 4s;
      animation-iteration-count: infinite;
     
    }
    &:nth-child(3) {
      animation: ${Bubbles};
      animation-duration: 4s;
      animation-iteration-count: infinite;
      animation-delay: 2s;
    }
    &:nth-child(4) {
      animation: ${Bubbles};
      animation-duration: 4s;
      animation-iteration-count: infinite;
      animation-delay: 3s;
    }
  }
`;
