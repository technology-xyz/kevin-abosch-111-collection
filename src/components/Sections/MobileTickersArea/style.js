import styled from "styled-components";
import { colors } from "theme";

export const MobileTickersAreaContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0px 5px;
  background-color: transparent;
  z-index: 999;
  .icon-close {
    position: absolute;
    right: 5px;
    top: 10px;
  }
  .koi-area {
    padding: 10px;
    padding-bottom: 0px;
  }
  .w50 {
    width: 50px;
    display: flex;
    align-items: center;
  }
  .font-balance1 {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0.03em;
    color: ${colors.blueDark};
  }
  .font-cap1 {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.03em;
    color: ${colors.blueDark};
  }
  .line4 {
    height: 4px;
    background: ${colors.blueGradient};
    margin: 10px 0px;
  }
  .ticker-area {
    padding: 10px 4px;
    .ticker-tabs {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      margin-top: 30px;
      margin-bottom: 10px;
      cursor: pointer;
      .ticker-tab-label {
        color: ${colors.blueDark};
        font-weight: 600;
        font-size: 16px !important;
        line-height: 16px;
        border-bottom: solid 3px ${colors.white};
        &.selected {
          border-bottom: solid 3px ${colors.blueDark};
        }
      }
    }
  }
  .ticker-body {
    padding: 0 10px;
    .font-18-40 {
      font-size: 18px;
      line-height: 40px;
      letter-spacing: 0.03em;
      color: ${colors.blueDark};
    }
    .font-15-17 {
      font-size: 15px;
      line-height: 17px;
      letter-spacing: 0.03em;
      color: ${colors.blueDark};
    }
    .font-cap2 {
      letter-spacing: 0.03em;
      color: ${colors.blueDark};
      font-size: 15px;
      line-height: 18px;
    }
    .font-cap3 {
      letter-spacing: 0.03em;
      color: ${colors.blueDark};
      font-size: 12px;
      line-height: 15px;
      a {
        color: ${colors.greenDark};
      }
    }
    .w20 {
      width: 20px;
      span {
        font-weight: bold;
        font-size: 18px;
        line-height: 20px;
        letter-spacing: 0.03em;
        color: ${colors.blueDark};
      }
    }
    .btn-get-koi {
      background: ${colors.blueDark};
      border: 2.5px solid ${colors.blueDark};
      box-sizing: border-box;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
      border-radius: 4px;
      font-weight: 600;
      font-size: 16px;
      line-height: 18px;
      color: ${colors.white};
    }
  }
`;
