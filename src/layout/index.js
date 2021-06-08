/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useContext} from "react";
import { matchPath, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import { PageLayoutContainer } from "./style";
import BackArrow from "../components/BackArrow"
import { DataContext } from "contexts/DataContextContainer";
const PageLayout = ({ children }) => {
  const { modalOpen, setModalOpen } = useContext(DataContext);
  const {pathname} = useLocation()

  return (
    <PageLayoutContainer collection={pathname === "/collection"}>
      <Navbar />
      
      {children}
    </PageLayoutContainer>
  );
};

export default PageLayout;
