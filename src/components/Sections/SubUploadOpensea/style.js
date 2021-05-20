import styled from "styled-components";
import { colors, mixins } from "theme";

export const OpenseaUploadArea = styled.div`
  display: flex;
  flex-direction: column;
  .ant-upload {
    &.ant-upload-drag {
      background: transparent;
      &:hover {
        border: 1px dashed ${colors.greenLight};
      }
    }
  }
  .loading-container{
    width: 100%;
    text-align:center;
  }
  .value-input{
    border: 1.5px solid ${colors.blueDark};
    box-sizing: border-box;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    color: ${colors.blueDark};
  }
  .font-d-1{ font-size: 16px; line-height: 18px; font-weight: 600; }
  .font-d-2{ font-size: 14px; line-height: 20px; font-weight: 400; }
  .card1-head{
    margin: 20px 50px;
    @media (max-width: ${mixins.xs}px){
      text-align: center;
    }
  }
  .card1-body{
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    flex-direction: column;
    margin: 0px 25px;
    @media (max-width: 768px) {
      margin: 0 10px;
    }
    @media (max-width: 480px) {
      margin: 0;
    }
  }
  .card2-head{
    position: relative;
    .upload-step {
      position: absolute;
      width: 24px;
      height: 24px;
      right: 15px;
      top: -3px;
    }
  }
  .card2-body{
    padding: 10px 30px;
    .upload-content-form{
      display: flex;
      flex-direction: row;
      .content-img-wrapper{
        flex: 3;
        display: flex;
        justify-content: center;
        .card-image{
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
          border-radius: 4px;
          background: ${colors.white};
          padding: 8px;
          height: fit-content;
          // img{ width: 100%; border-radius: 4px;}
        }
      }
      .upload-content-row{
        flex: 7;
        display: flex;
        flex-direction: column;
        .control-row{
          display: flex;
          flex-direction: row;
          margin-bottom: 10px;
          .left{ 
            width: 200px; 
            padding-left: 20px;
            @media (max-width: 1500px) {width: 130px;}
          }
          .value-input { flex: 1; }
          .button-input { flex: 1; }
          .btn-blueDark {
            padding-left: 30px;
            padding-right: 30px;
          }
          @media (max-width: ${mixins.xs}px) {
            flex-direction: column;
            .left{ 
              width: 100%; 
              padding-left: 0px;
            }
            .button-input{
              justify-content: center;
              display: flex;
            }
          }
        }
      }
      @media (max-width: ${mixins.sm}px) {
        flex-direction: column;
        .upload-content-row{
          margin-top: 15px;
        }
      }
      
    }
  }
  .card3-body{
    padding: 10px 30px;
    .upload-content-result{
      display: flex;
      flex-direction: row;
      .card-slider{
        margin-right: 60px;
        @media (max-width: ${mixins.xl}px) {
          margin-right: 10px;
        }
        @media (max-width: 1050px) {
          margin-right: 60px;
        }
        @media (max-width: ${mixins.md}px) {
          margin-right: 0px;
        }
      }
      .carousel.carousel-slider{ height: 155px; }
      .card-content{
        display: flex;
        flex-direction: row;
        background: ${colors.white};
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
        border-radius: 4px;
        padding: 8px;
        height: 120px;
        .content-info{
          display: flex;
          align-items: stretch;
          flex-direction: column;
          justify-content: center;
          padding-left: 10px;
          text-align: left;
          .font1{font-size: 14px; line-height: 18px; font-weight: 600;}
          .font2{
            font-size: 14px; line-height: 18px; font-weight: 500; margin: 5px 0;
            span{background: ${colors.orange}; border-radius: 2px;padding: 0 5px;}
          }
          .font3{font-size: 14px; line-height: 18px; font-weight: 400;}
        }
      }
      .estimate-result{
        display: flex;
        flex-direction: column;
        .flex1{ margin-top: 10px; }
        .font-d-1{ font-size: 14px; line-height: 18px; font-weight: 600; }
        .font-d-2{ font-size: 14px; line-height: 18px; font-weight: 500;}
        .sub-detail-info{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .font-weight-400{font-weight: 400;}
      }
      @media (max-width: ${mixins.md}px) {
        flex-direction: column;
        .content-result{margin-right: 0px;}
        .estimate-result{
          justify-content: center;
          text-align: center;
          margin-top: 0px;
        }
      }
    }
    .upload-success{
      width: 350px;
      margin: 0 auto;
      margin-top: 10px;
      .font1{font-size: 14px;line-height: 18px;font-weight: 600; text-align: center;}
      .font2{font-size: 14px;line-height: 18px;font-weight: 400; text-align: center;margin-top: 10px;}
      @media (max-width: ${mixins.xs}px) {
        width: 100%;
      }
    }
  }
  .card3-footer{
    justify-content: center;
    margin: 10px 10px 20px;
  }
`;

export const CountsWapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
  margin-left: 25px;
  @media (max-width: 450px) {margin-left: 10px;}
  .selected-counts {
    width: 32px;
    height: 32px;
    background: ${colors.gray};
    border: 2px solid transparent;
    box-sizing: border-box;
    font-size: 22px;
    line-height: 22px;
    letter-spacing: 0.03em;
    color: ${colors.grayDark};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    &.isSet {
      color: ${colors.blueDark};
      background: ${colors.green};
      border: 2px solid ${colors.blueDark};
    }
  }
  .btn-all {
    background: ${colors.white};
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    height: 34px;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.03em;
    color: ${colors.blueDark};
    margin-left: 17px;
    padding: 3px 9px;
    &.selected-all {
      background: ${colors.greenLight};
      border: 2px solid ${colors.blueDark};
      box-sizing: border-box;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
    }
  }
`

export const OpenseaCards = styled.div`{
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  margin-bottom: 15px;
  .gutter-row{
    flex: 0 0 25%;
    max-width: 25%;
    &.disabled{
      cursor: wait;
    }
    @media (max-width: 1400px) {
      flex: 0 0 33.333%;
      max-width: 33.333%;
    }
    @media (max-width: 1150px) {
      flex: 0 0 50%;
      max-width: 50%;
    }
    @media (max-width: 1050px) {
      flex: 0 0 33.333%;
      max-width: 33.333%;
    }
    @media (max-width: 800px) {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
  .opensea-card {
    position: relative;
    min-height: 205px;
    background: ${colors.white};
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.5s ease;
    margin: 8px;
    &:hover {
      /* animation: pulse;
      animation-duration: 0.5s; */
      border: 2px solid ${colors.blueDark};
    }
    &.disabled {
      display: none;
      background: ${colors.grayLight};
    }
    &.disabled:hover {
      border: 2px solid ${colors.grayLight} !important;
      cursor: wait;
    }
    &.selected {
      background: ${colors.greenLight};
      border: 2px solid ${colors.blueDark};
      box-sizing: border-box;
    }
    .icon-plus {
      position: absolute;
      right: -10px;
      top: -10px;
      width: 26px;
      height: 26px;
      background: ${colors.gray};
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: ${colors.grayDark};
      z-index: 9999;
    }
    .icon-checked {
      position: absolute;
      right: -10px;
      top: -10px;
      width: 26px;
      height: 26px;
      background: ${colors.green};
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: ${colors.blueDark};
      border: 2px solid ${colors.blueDark};
      box-sizing: border-box;
      font-size: 18px;
    }
    .card-img {
      min-height: 140px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.16));
        border-radius: 4px;
        max-width: 128px;
      }
    }
    .card-content {
      flex: 1;
      text-align: center;
      padding: 0 20px;
      h6 {
        margin-bottom: 3px;
        font-weight: 600;
        color: ${colors.blueDark};
        line-height: 22px;
      }
      p {
        line-height: 24px;
        letter-spacing: 0.02em;
        color: ${colors.blueDark};
      }
    }
  }
}`
export const KevinContainer = styled.div`
  margin-bottom: 20px;
  h1{ margin-bottom: 50px; }
  .orange-area{
    background: ${colors.greenLight};
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    padding: 10px 35px;
  }
  .cap1{
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0.03em;
    color: ${colors.blueDark};
  }
  .cap2{
    font-size: 20px;
    line-height: 24px;
    font-weight: 400;
    letter-spacing: 0.03em;
    color: ${colors.blueDark};
  }
  .cap3{
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.03em;
    color: ${colors.blueDark};
  }
  .cap4{
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 0.03em;
    color: ${colors.blueDark};
  }
  .kevin-area{
    display: flex;
    .img-area{ 
      flex: 1; 
      display: flex;
      justify-content: flex-end;
      .border-white{
        background: white;
        padding: 8px;
        border-radius: 4px;
        width: fit-content;
        height: fit-content;
      }
      img{ 
        max-width: 300px;
        width: 100%;
        border-radius: 4px;
      }
    }
    .info-area {
      flex: 1; 
      padding-left: 50px;
    }
    button{
      border-radius: 4px;
      font-size: 16px;
      line-height: 15px;
      font-weight: 600 !important;
      width: 130px;
      height: 30px;
    }
    .btn-outline{
      color: ${colors.blueDark};
      background: white;
      border: 1.5px solid ${colors.blueDark};
    }
    .success-btn-area{
      display: flex;
      .btn-outline{ margin-left: 25px; }
    }
  }
  @media (max-width: ${mixins.sm}px) {
    h1{ margin-bottom: 30px; font-size: 26px !important; }
    .orange-area{
      padding: 20px 25px;
    }
    .cap1{
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0em;
    }
    .kevin-area{
      flex-direction: column;
      .img-area{ 
        justify-content: center;
      }
      .info-area {
        margin-top: 20px;
        padding-left: 0px;
        text-align: center;
        .success-btn-area{
          justify-content: center;
        }
      }
    }
  }
`