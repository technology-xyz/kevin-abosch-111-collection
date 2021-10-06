import React from "react";
import {
  Twitter,
  email,
  facebook,
  linkein,
  sms,
  telegram,
} from "../assets/images";
import styled from "styled-components";

const ShareBar = () => {
  const popupWindow = (url, windowName, w, h) => {
    const y = window.top.outerHeight / 2 + window.top.screenY - h / 2;
    const x = window.top.outerWidth / 2 + window.top.screenX - w / 2;
    return window.open(
      url,
      windowName,
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`
    );
  };

  return (
    <SocialBar>
      <a
        onClick={() =>
          popupWindow(
            `https://twitter.com/intent/tweet?url${""}`,
            "Twitter",
            350,
            350
          )
        }
      >
        <img src={Twitter} alt="twitter-logo" />
      </a>
      <a
        onClick={() =>
          popupWindow(
            `https://www.linkedin.com/shareArticle?mini=true&url=%{}`,
            "Twitter",
            350,
            350
          )
        }
      >
        <img src={linkein} alt="linkedin-logo" />
      </a>

      <a
        onClick={() =>
          popupWindow(
            `https://www.facebook.com/sharer.php?u=${""}`,
            "Facebook",
            350,
            350
          )
        }
      >
        <img src={facebook} alt="facebook-logo" />
      </a>
      <a onClick={() => popupWindow(`sms:8888888`, "Sms", 350, 350)}>
        <img src={sms} alt="sms-logo" />
      </a>

      <a
        onClick={() =>
          popupWindow(
            `mailto:?subject=I wanted you to see this site&amp;body=Check out this site --Link--`,
            "Share by Email",
            350,
            350
          )
        }
      >
        <img src={email} alt="email-logo" />
      </a>

      <a
        onClick={() =>
          popupWindow(
            `https://telegram.me/share/url?url=`,
            "telegram",
            350,
            350
          )
        }
      >
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
    cursor: pointer;
  }

  margin: 16px 0px;
  display: flex;
  width: 80%;
  justify-content: space-between;
`;

export default ShareBar;
