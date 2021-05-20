import styled from "styled-components";
import { colors, mixins } from "theme";

export const TickersAreaContainer = styled.div`
  // position: sticky;
  // top: 139px;
  overflow-y: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0px 5px;
  background-color: transparent;
  padding-top: 64px;
  padding-bottom: 100px;
  z-index: 999;
  .koi-area{
    padding: 10px;
    padding-bottom: 0px;
  }
  .w50{ 
    width: 50px;
    display: flex;
    align-items: center; 
  }
  .font-balance1{
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0.03em;
    color: ${colors.blueDark};
  }
  .font-cap1{
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.03em;
    color: ${colors.blueDark};
  }
  .line4{
    height: 4px;
    background: ${colors.blueGradient};
    margin: 10px 0px;
  }
  .ticker-area {
    margin-bottom: 25px;
    padding: 20px 10px;
    background: #F5F5F5;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    
  }
  .ticker-body{
    padding: 0 10px;
    .font-18-40{
      font-size: 18px;
      line-height: 40px;
      letter-spacing: 0.03em;
      color: ${colors.blueDark};
    }
    .font-15-17{
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
      a{ color: ${colors.greenDark}; }
    }
    .w20 { 
      width: 20px; 
      span{ 
        font-weight: bold; 
        font-size: 18px; 
        line-height: 20px;
        letter-spacing: 0.03em;
        color: ${colors.blueDark}; 
      }
    }
    .btn-outline {
      background: transparent;
      border: 2.5px solid ${colors.blueDark};
      box-sizing: border-box;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
      border-radius: 4px;
      font-weight: 600;
      font-size: 16px;
      line-height: 18px;
      color: ${colors.blueDark};
    }
  }
  @media (max-width: ${mixins.md}px){
    padding-top: 50px;
  }
`;