import React, { useState, useContext } from "react";
import "./style.css";
import {
  Bar,
  Title,
  Koi,
  MenuIconWrapper,
  Right,
  NavigationWrapper,
  Tooltip,
} from "./style";
import { MenuIcon } from "../../assets/images";
import Menu from "./menu";
import { matchPath, useLocation } from "react-router";
import BackArrow from "../BackArrow";
import { ReactComponent as NewLogo } from "assets/images/logo.svg";
import { DataContext } from "contexts/DataContextContainer";
import { alertTimeout } from "config";
import { ModalContext } from "contexts/ModalContext";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const showMenu = () => {
    setActiveMenu(!activeMenu);
  };
  const { pathname } = useLocation();
  const matchMain = matchPath(pathname, { path: "/gallery/:id/", exact: true });
  const matchAbout = matchPath(pathname, { path: "/about", exact: true });
  const matchDetail = matchPath(pathname, "/gallery/:id/details");
  const matchCollect = matchPath(pathname, "/gallery/:id/collect");

  const [showAlert, setShowAlert] = useState(false);
  const [errMessage, setErrMessage] = useState(false);

  const { setAddressEth, setKevinNft } = useContext(DataContext);
  const { setModalInfo } = useContext(ModalContext);

  const onEvolve = () => {
    if (window.ethereum) {
      window.ethereum.enable().then(async (accounts) => {
        console.log(accounts[0]);
        let address = accounts[0];
        setAddressEth(address);
        console.log("-----", address);
        setModalInfo({ address, step: "connect_opensea" }); // connect_opensea || show_nft

        const options = { method: "GET" };

        // fetch(
        //   `https://api.opensea.io/api/v1/assets?owner=0x5d066A95Ee1514322977Db851E5FfA312c8C121F&order_direction=desc&offset=0&limit=20`,
        //   options
        // )
        //   .then((response) => response.json())
        //   .then((response) => console.log("aaaaaaaaaa", response))
        //   .catch((err) => console.error("eeeeeeeeeeeeee", err));
      });
    } else {
      // metamask extension didn't install
      // show_notification("Please install metamask extension first.", "KOII");
      show_alert("Please install metamask extension first.");
      setTimeout(() => {
        let url = "https://metamask.io/download.html";
        window.open(url, "_blank");
      }, 1000);
    }
  };
  const show_alert = (message = "") => {
    setShowAlert(true);
    setErrMessage(message);
    setTimeout(() => {
      setShowAlert(false);
      // setErrMessage("");
    }, alertTimeout);
  };

  return (
    <NavigationWrapper>
      <Bar>
        <Title
          href="https://www.kevinabosch.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Studio Kevin Abosch
        </Title>
        <Right>
          <div className="veryfy-btn" onClick={onEvolve}>
            Verify your 1111
          </div>

          <Koi>
            <NewLogo fill="white" />
            <Tooltip>
              <p>Powered by Koi.</p>
              <p>
                Koi is the first framework for building easy, customizable dApps
                where content earns attention rewards by default.
              </p>

              <a
                href="https://openkoi.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </Tooltip>
          </Koi>

          <MenuIconWrapper onClick={showMenu}>
            {!activeMenu ? (
              <img src={MenuIcon} alt="menu icon" />
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L15 15" stroke="white" stroke-width="2" />
                <path d="M15 1L1 15" stroke="white" stroke-width="2" />
              </svg>
            )}
          </MenuIconWrapper>
        </Right>
        {!matchMain && (matchCollect || matchDetail || matchAbout) && (
          <BackArrow />
        )}
      </Bar>

      {activeMenu && <Menu hide={() => setActiveMenu(false)} />}
    </NavigationWrapper>
  );
};

export default Navbar;
