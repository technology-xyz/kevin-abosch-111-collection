/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext } from "react";
import { useLocation } from "react-router";
import Navbar from "../components/Navbar";
import { PageLayoutContainer } from "./style";
import OldModal from "../components/ExtensionModal";
import EvolveModal from "../components/EvolveModal";
import { DataContext } from "contexts/DataContextContainer";
import { ModalContext } from "contexts/ModalContext";

const PageLayout = ({ children }) => {
  const { modalOpen } = useContext(DataContext);
  const { modal, onHide } = useContext(ModalContext);
  const { pathname } = useLocation();

  return (
    <PageLayoutContainer collection={pathname === "/collection"}>
      <Navbar />
      {modalOpen && <OldModal />}
      {modal.show && <EvolveModal initStep={modal.step} hide={onHide} />}
      {children}
    </PageLayoutContainer>
  );
};

export default PageLayout;
