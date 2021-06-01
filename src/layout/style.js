import styled from 'styled-components'

export const PageLayoutContainer = styled.div`
 background-color: #000000;
 width:100vw;
 min-height: 100%;
 max-height:${props => props.collection ? "100%" : "100vh"};;
 @media (max-width: 475px) {
    height:700px;
  }
`;
