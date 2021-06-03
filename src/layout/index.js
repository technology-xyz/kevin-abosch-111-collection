/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React from "react";
import { matchPath, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import { PageLayoutContainer } from "./style";
import BackArrow from "../components/BackArrow"
const PageLayout = ({ children }) => {
  const {pathname} = useLocation()
  const matchMain = matchPath(pathname, { path: "/gallery/:id/", exact: true });
  const matchAbout = matchPath(pathname, {path: "/about", exact: true})
  const matchDetail = matchPath(pathname, "/gallery/:id/details");
  const matchCollect = matchPath(pathname, "/gallery/:id/collect");
  return (
    <PageLayoutContainer collection={pathname === "/collection"}>
      <Navbar />
      
      {children}
    </PageLayoutContainer>
  );
};

export default PageLayout;
