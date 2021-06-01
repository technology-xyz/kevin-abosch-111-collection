import styled from "styled-components";

export const Button = styled.button`
  display: block;
  background-color: transparent;
  outline: 0;
  border: 0;
  height: 40px;
  width:90px;
  transform: ${(props) => (props.right ? "scaleX(-1)" : "")};
`;
