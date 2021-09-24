
import styled from "styled-components";
export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10%;
  position: absolute;
  z-index: 4;
  letter-spacing: 0px;
`;
export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  position: relative;
  color: #fff;
  &.small{
    max-width: 470px;
  }
  max-width: 910px;
  margin: 20px;
  text-align: center;
  align-items: center;
  padding: 8px 15px;
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
  .atomic-btn-area{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    button{
      width: 45%;
    }
    @media (max-width: 370px){
      flex-direction: column;
      button{
        width: 90%;
        margin-left: 5%;
        &:first-child {
          margin-bottom: 15px;
        }
      }
    }
  }
  .loading-gif{
    width: 300px;
    height: 150px;
    object-fit: none;
  }
`;
export const Exit = styled.button`
  background-color: transparent;
  border: 0;
  position: absolute;
  top: 5px;
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
  &.black-btn{
    background: #000000;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 1px;
    color: white;
  }
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
  @media (max-width: 768px) {
    flex-wrap: wrap;
    .a-stage{
      min-width: 150px;
      max-width: 200px;
    }
  }
`;

export const SliderArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  .card-slider{
    margin: 0 25px;
    width: 160px;
  }
  .carousel.carousel-slider{ height: 155px; }
  .carousel .control-dots .dot{
    border-radius: 50%;
    width: 5px;
    height: 5px;
    cursor: pointer;
    display: inline-block;
    margin: 0 8px;
    background: black;
    border: 1px solid #F5B900;
  }
  .card-content{
    display: flex;
    flex-direction: row;
    padding: 8px;
    height: 120px;
  }
  .slider-caption{
    text-align: left;
    flex: 1;
  }
  .w120{ width: 120px;}
  @media (max-width: 375px) {
    flex-direction: column;
  }
`

export const NoFinnieArea = styled.div`
  text-align: center;
  .koii-img-area{
    display: flex;
    flex-direction: row;
    align-items: center;
    .koii-img{
      width: 68px;
      margin: 0 20px;
    }
    .description{
      flex: 1;
    }
  }
`
export const ShowArtArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`
export const KoiiAddress = styled.div`
  display: flex;
  flex-direction: row;
  .w100{ width: 100px; text-align: left; }
`