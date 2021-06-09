import styled from "styled-components";
export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 4;
  width: 100vw;
  height: 100vh;
`;
export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  position: relative;
  color: #fff;
  width: 400px;
  text-align: left;
  align-items: center;
  padding: 8px;
  border: 2px solid #f5b900;
  button {
      display:flex;
      justify-content: center;
      align-items: center;
      background-color: var(--yellow);
      width:150px;
      height:32px;
      border:0;
      font-weight: 700;
  }
  label {
      display: flex;
      justify-content: space-between;
      width:100%;
  }
`;
export const Exit = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
`
export const BackArrow = styled.svg`
position: absolute;
    top: 0;
    right: 0;
`
export const ArLink = styled.a``;
