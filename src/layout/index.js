/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useContext} from "react";
import {  useLocation } from "react-router";
import Navbar from "../components/Navbar";
import { PageLayoutContainer } from "./style";
import EvolveModal from "../components/ExtensionModal"
import { DataContext } from "contexts/DataContextContainer";
import { ModalContext } from "contexts/ModalContext";


const PageLayout = ({ children }) => {
  const { modalOpen } = useContext(DataContext);
  const { modal } = useContext(ModalContext);
  const {pathname} = useLocation()

  return (
    <PageLayoutContainer collection={pathname === "/collection"}>
      <Navbar />
      {modalOpen && <EvolveModal/>}
      {modal.show && <EvolveModal/>}
      {children}
    </PageLayoutContainer>
  );
};

export default PageLayout;
