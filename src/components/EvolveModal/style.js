
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
  &.small{
    max-width: 460px;
  }
  max-width: 910px;
  text-align: center;
  align-items: center;
  padding: 8px;
  border: 2px solid #f5b900;
   
  h3{
    /* Connect your Ethereum wallet & Verify your NFT */
    font-size: 24px;
    line-height: 30px;
  }
  .lbl-cap1{
    font-size: 15px;
    line-height: 19px;
  }
  .lbl-cap2{
    font-size: 17px;
    line-height: 22px;
  }
  .lbl-cap2{
    font-size: 12px;
    line-height: 15px;
  }
  label {
    display: flex;
    justify-content: space-between;
    width: 100%;
    input {
        border-color: var(--yellow);
        background-color: black;
        color: var(--yellow);
        &:focus {
            outline: none !important;
        }
    }
  }
`;
export const Exit = styled.button`
  background-color: transparent;
  border: 0;
  position: absolute;
  top: 0;
  right: 5px;
`;
export const BackArrow = styled.button`
  background-color: transparent;
  border: 0;
position: absolute;
  top: 0;
  right: 0;
`;

export const ActionButton = styled.button`
  display:flex;
  justify-content:center;
  align-items:center;
  font-weight: bold;
  font-size: 17px;
  line-height: 21px;
  text-align: center;
  color: #000000;
  padding: 5px 22px;
  background-color: var(--yellow);
  border-radius: 1px;
  border: 2px solid #F5B900;
`


export const NFTStageArea = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  .a-stage{
    flex: 1;
    padding: 0 10px;
    text-align: center;
  }
  .img-part{
    display: flex;
    justify-content: center;
  }
  .img-area{
    display: flex;
    align-content: center;
    justify-content: center;
    padding: 25px;
    width: 108px;
    height: 108px;
    border-radius: 50%;
    background-color: var(--yellow);
  }
  .content-part{
    min-height: 90px;
  }
`;
