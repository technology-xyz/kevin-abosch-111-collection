import styled from "styled-components";
import { colors, mixins } from "theme";

export const LeaderboardItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  // border-bottom: 2px solid ${colors.blueGradient};
  min-height: 192px;
  padding: 0px 25px 0px 50px;
  .item-container{
    width: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    padding: 0 4px;
  }
  .gradient-boarder{
    width: calc(100% - 8px);
    height: 2px;
    padding: 0 4px;
    background: ${colors.blueGradient};
  }
  .w30{width: 30px;}
  .part-left {
    display: flex;
    flex: 1;
    align-items: center;
    .item-col {
      padding: 0 10px;
      .item-order {
        color: ${colors.blueDark};
      }
      &.item-img-wrapper {
        min-width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        .w30{ text-align: left;}
        img {
          width: 100%;
          max-width: 144px;
          border-radius: 4px;
          margin: 15px 0;
          border-radius: 4px;
        }
        .video-area{
          max-width: 144px;
          margin: 15px 0;
        }
      }
      &.item-info-wrapper {
        flex: 1;
        .item-title {
          color: ${colors.blueDark};
          font-weight: 600;
        }
        .item-username {
          background: ${colors.orange};
          color: ${colors.blueDark};
          border-radius: 2px;
          width: fit-content;
          padding: 0 10px;
          font-weight: 500;
        }
        .item-created_at {
          color: ${colors.greenDark};
        }
      }
    }
  }
  .part-right {
    min-width: 130px;
    .item-col {
      padding: 0 10px;
      &.item-reviews-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        background: #ecfffe;
        box-shadow: 0px 2px 4px rgb(0 0 0 / 16%);
        border-radius: 2px;
        margin-bottom: 10px;
        padding: 10px;
        h5 {
          color: ${colors.greenDark};
        }
      }
    }
    .share-wrapper {
      display: flex;
      flex-direction: column;
      .btns-wrapper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 14px;
        .btn {
          height: 40px;
          &.btn-html {
            margin-left: 28px;
            width: 40px;
            height: 40px;
            background: ${colors.white};
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
            border-radius: 3px;
            color: ${colors.blueDark};
            border: 2.5px solid ${colors.blueDark};
          }
          &.btn-share {
            flex: 1;
            background: ${colors.blueGradient};
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
            border-radius: 3px;
            font-size: 18px;
          }
        }
      }
      .social-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  @media (max-width: 1050px) {
    padding: 0 50px;
  }
  @media (max-width: ${mixins.sm}px) {
    padding: 0px 35px;
    .item-container{
      flex-direction: column;
      padding: 20px 10px 10px;
    }
    .part-left {
      width: 100%;
      margin-bottom: 0px;
      .item-col {
        &.item-info-wrapper {
          flex: 1;
          margin-left: auto;
          .item-title {
            font-size: 24px !important;
          }
          .item-created_at {
            font-size: 15px !important;
          }
        }
        &.item-img-wrapper {
          flex: 1;
          img {
            width: 128px;
          }
        }
      }
    }
    .part-right {
      min-width: 490px;
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
      .item-col {
        padding: 0px;
        &.item-reviews-wrapper {
          margin-left: 0px;
          flex-direction: row;
          text-align: right;
          flex: 2;
          padding: 3px 10px;
          align-items: center;
          margin: 0px;
          h5{
            flex: 1;
            font-size: 20px !important;
            line-height: 30px;
          }
        }
      }
      .share-wrapper {
        flex: 1;
        float: left;
        margin-left: 15px;
        .btns-wrapper{ width: 90px; margin-bottom: 0; }
      }
    }
  }
  @media (max-width: ${mixins.xs}px) {
    .sx-hidden-share{display: none;}
    .part-right {
      min-width: 410px;
      .share-wrapper {
        width: 90px;
        flex: 0;
      }
    }
  }
  @media (max-width: 480px) {
    padding: 0px;
    .part-right {
      .item-col {
        padding: 0px;
        &.item-reviews-wrapper {
          margin-left: 0px !important;
          padding: 5px !important;
          h5 { font-size: 16px !important; }
        }
      }
      .share-wrapper {
        flex: 1;
        float: left;
        margin-left: 15px;
        .btns-wrapper{ width: 90px; margin-bottom: 0; }
      }
    }
    .gradient-boarder{
      width: calc(100% - 48px);
    }
  }
  @media (max-width: 479px) {
    .part-left {
      .item-col {
        &.item-info-wrapper {
          .mb-3{
            margin-bottom: 5px !important;
          }
        }
      }
    }
    .part-right{
      min-width: 320px;
    }
  }
`;
