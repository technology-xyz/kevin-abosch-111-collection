import styled from "styled-components";

export const CollectionWrapper = styled.div`
    display: flex;
    align-items:center;
    max-width: 100%;

`

export const Grid = styled.div`
    width:100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-flow:row;
    grid-gap: 40px;
`