import React from "react";
import {
  Twitter,
  email,
  facebook,
  linkein,
  sms,
  telegram,
} from "../../assets/images";
import styled from "styled-components";

const ShareBar = () => {
  return (
    <SocialBar>
      <a href={`https://twitter.com/intent/tweet?url${""}`}>
        <img src={Twitter} alt="twitter-logo" />
      </a>
      <a href={`https://www.linkedin.com/shareArticle?mini=true&url=%{}`}>
        <img src={linkein} alt="linkedin-logo" />
      </a>

      <a href={`https://www.facebook.com/sharer.php?u=${""}`}>
        <img src={facebook} alt="facebook-logo" />
      </a>
      <a href="8888888">
        <img src={sms} alt="sms-logo" />
      </a>

      <a
        href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site --Link--"
        title="Share by Email"
      >
        <img src={email} alt="email-logo" />
      </a>

      <a href={`https://telegram.me/share/url?url=`}>
        <img src={telegram} alt="telegram-logo" />
      </a>
      
    </SocialBar>
  );
};


export const SocialBar = styled.div`
  a {
    width: auto;
    border: 0;
    outline: 0;
  }
  margin: 16px 0px;
  display: flex;
  width: 80%;
  justify-content: space-between;
`;

export default ShareBar;
