/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React from "react";
import { useLocation } from "react-router";
import Navbar from "../components/Navbar";
import { PageLayoutContainer } from "./style";

const PageLayout = ({ children }) => {
  const path = useLocation().pathname;
  return (
    <PageLayoutContainer collection={path === "/collection"}>
      <Navbar />
      {children}
    </PageLayoutContainer>
  );
};

export default PageLayout;
