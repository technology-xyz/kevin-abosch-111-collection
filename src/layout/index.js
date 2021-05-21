/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext, useRef } from "react";
import Navbar from "../components/Navbar"
import { PageLayoutContainer } from "./style";

const PageLayout = ({ children }) => {
  return <PageLayoutContainer>
    <Navbar/>
    {children}
    
    
    </PageLayoutContainer>;
};

export default PageLayout;
