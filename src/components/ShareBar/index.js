import React from "react";
import {
  Twitter,
  discord,
  email,
  facebook,
  linkein,
  sms,
  telegram,
} from "../../assets/images";

import { SocialBar } from "./styles";
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
      <a href="discord.com">
        <img src={discord} alt="discord-logo" />
      </a>
    </SocialBar>
  );
};

export default ShareBar;
