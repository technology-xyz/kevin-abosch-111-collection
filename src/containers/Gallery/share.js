import React, { useState, useRef } from "react";
import ShareBar from "../../components/ShareBar";
import { ShareView, Copy } from "./style";

const Share = () => {
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);
  const currentURL = window.location.href;
  const onCopy = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("Copied!");
  };
  return (
    <ShareView>
      <Copy>
        <input value={currentURL} ref={textAreaRef}/>
        
        
        <button onClick={onCopy}>Copy</button>
        {copySuccess}
      </Copy>
      <ShareBar />
    </ShareView>
  );
};

export default Share;
