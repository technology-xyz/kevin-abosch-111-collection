import styled from "styled-components";
import { colors, mixins } from "theme";

export const ArweaveUploadArea = styled.div`
  background-color: ${colors.greenLight2};
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
  .value-input{
    border: 1.5px solid ${colors.blueDark};
    box-sizing: border-box;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    color: ${colors.blueDark};
  }
  .font-d-1{ font-size: 16px; line-height: 18px; font-weight: 600; }
  .control-row{
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    .left{ 
      width: 200px; 
      text-align: left;
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
  .card1-body{
    padding: 10px 30px;
    .w600{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 600px;
      margin: 0 auto;
      text-align: center;
    }
    .control-row{
      align-items: center;
      width: 100%;
    }
    @media (max-width: ${mixins.md}px) {
      .w600{width: 100%;}
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
      .card-content{
        margin-right: 60px;
        display: flex;
        flex-direction: row;
        background: ${colors.white};
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
        border-radius: 4px;
        padding: 8px;
        .content-info{
          display: flex;
          align-items: stretch;
          flex-direction: column;
          justify-content: center;
          padding-left: 10px;
          .font1{font-size: 14px; line-height: 18px; font-weight: 600;}
          .font2{
            font-size: 14px; line-height: 18px; font-weight: 500; margin: 5px 0;
            span{background: ${colors.orange}; border-radius: 2px;padding: 0 5px;}
          }
          .font3{font-size: 14px; line-height: 18px; font-weight: 400;}
        }
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
      .estimate-result{
        display: flex;
        flex-direction: column;
        .flex1{ margin-top: 10px; }
        .font-d-1{ font-size: 14px; line-height: 18px; font-weight: 600; }
        .font-d-2{ font-size: 14px; line-height: 18px; font-weight: 500;}
      }
      @media (max-width: ${mixins.md}px) {
        flex-direction: column;
        .content-result{margin-right: 0px;}
        .estimate-result{
          justify-content: center;
          text-align: center;
          margin-top: 20px;
        }
      }
    }
    .upload-success{
      width: 460px;
      margin: 0 auto;
      margin-top: 10px;
      .font1{font-size: 16px;line-height: 24px;font-weight: 600; text-align: center;}
      .font2{font-size: 16px;line-height: 24px;font-weight: 400; text-align: center;margin-top: 10px;}
      @media (max-width: ${mixins.xs}px) {
        width: 100%;
      }
    }
  }
  .card3-footer{
    justify-content: center;
    margin: 10px 10px 20px;
    button{ margin: 0 15px; }
    .w115 { width: 115px; }
  }
`;