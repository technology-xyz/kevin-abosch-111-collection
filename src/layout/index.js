/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext, useRef } from "react";

import { PageLayoutContainer } from "./style";

const PageLayout = ({ children }) => {
  return <PageLayoutContainer>{children}</PageLayoutContainer>;
};

export default PageLayout;
