import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const BackArrow = () => {
  const history = useHistory();
  const handleClick = () => {
    history.goBack();
  };
  return (
    <Button onClick={handleClick}>
      <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
        <path
          d="M9.6 0.399994L11.28 2.07999L4.56 8.79999H24V11.2H4.56L11.28 17.92L9.6 19.6L0 9.99999L9.6 0.399994Z"
          fill="white"
        />
      </svg>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  outline: 0;
  border:0;
  position: absolute;
  top:64px;
  left:32px;
  z-index:3;
`;

export default BackArrow;
