import styled from "styled-components";

export const CollectionWrapper = styled.div`
    width:100%;
    display: flex;
    justify-content:center;
   

`
export const Loading = styled.div`

`
export const Grid = styled.div`

    margin-top: 10%;
    width:86%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-flow:row;
    grid-gap: 40px;
    img {
        width:100%;
        height: 100%;
        &:hover{
            cursor: pointer;
        }
    }
`