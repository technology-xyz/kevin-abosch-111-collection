import styled from "styled-components";
import { colors, mixins } from "theme";

export const UploadAreaContainer = styled.div`
  // position: relative;
  position: sticky;
  top: 139px;
  width: 100%;
  padding: 0px 25px 0 50px;
  background-color: transparent;
  z-index: 9;
  .icon-back{
    position: absolute;
    left: 5px;
    top: 5px;
    z-index: 9999;
  }
  .import-area {
    flex: 1;
    padding: 5px;
    border-radius: 4px;
    background-color: ${colors.greenLight2};
    box-shadow: 0px 2px 4px rgb(0 0 0 / 16%);
    &.type-opensea{
      padding: 0;
      background: linear-gradient(180deg, #BEF0ED 0%, #FFFFFF 40.41%);
      .sub-import-area{
        border-width: 0px;
      }
    }
  }
  .sub-import-area {
    position: relative;
    border-radius: 4px;
    border: 1px dashed ${colors.blueDark};
    // padding: 10px;
    border-width: 0px;
    overflow-y: auto;
    max-height: 450px;
    &.blueBk{
      background-color: ${colors.greenLight2};
    }
  }
  .full-scroll-height{
    padding: 50px 10px !important;
    @media (max-width: ${mixins.sm}px) {
      padding: 10px;
    }
  }
  .ant-input{
    padding: 1px 6px;
    font-size: 14px;
    line-height: 17px;
  }
  button{
    padding: 3px 13px;
    font-size: 16px;
    line-height: 18px;
    font-weight: 400 !important;
  }

  @media (max-width: 1050px) {
    padding: 0px 50px;
  }
  @media (max-width: ${mixins.md}px) {
    // top: 129px;
  }
  @media (max-width: ${mixins.sm}px) {
    top: 93px;
    padding: 0 35px;
  }
  @media (max-width: 480px) {
    top: 93px;
    padding: 0 16px;
  }
`;

export const LinkNftUpload = styled.div`
  padding: 10px;
  &.big{ padding: 25px; }
  &.full-scroll-height{
    padding: 50px 10px;
  }
`;

export const RegisterContentArea = styled.div`
  .font-d-2{
    color: ${colors.blueDark};
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.03em;
    text-align: center;
  }
  .choose-types{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 25px 0;
    .card1{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      width: 136px;
      height: 112px;
      background: white;
      border-radius: 4px;
      box-shadow: 0px 2px 4px rgb(0 0 0 / 16%);
    }
    @media (max-width: ${mixins.xs}px) {
      flex-direction: column;
      .card1{
        margin-bottom: 15px;
        flex-direction: row;
        width: 300px;
        margin-left: auto;
        margin-right: auto;
        height: 40px;
        .font-d-2{
          text-align: left;
          width: 250px;
        }
      }
    }
    @media (max-width: 374px) {
      .card1{
        width: 275px;
        .font-d-2{
          width: 210px;
        }
      }
    }
  }
`;