import styled from 'styled-components'
import { colors } from "theme";

export const PageLayoutContainer = styled.div`
 background-color: #000000;
 width:100vw;
 max-height:${props => props.collection ? "100%" : "100vh"};;
 overflow:${props => props.collection ? "scroll" : "hidden"};
`;
