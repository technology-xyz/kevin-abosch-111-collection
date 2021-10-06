import React, { useContext, useState } from "react";
import {
  MenuWrapper,
  SideContent,
  Nav,
  Nlink,
  KoiLink,
  EvolveTooltip,
  Elink,
  KoiiBtn,
} from "./style";
import { DataContext } from "contexts/DataContextContainer";
import { alertTimeout } from "config";
import { useHistory } from "react-router-dom";
import { ModalContext } from "contexts/ModalContext";
import { ReactComponent as NewLogo } from "assets/images/logo.svg";

const Menu = ({ hide = () => {} }) => {
  const history = useHistory();
  const { setAddressEth, setKevinNft } = useContext(DataContext);
  const [showAlert, setShowAlert] = useState(false);
  const [errMessage, setErrMessage] = useState(false);
  const { setModalInfo } = useContext(ModalContext);

  const genRand = () => Math.floor(Math.random() * 1001);

  const onEvolve = () => {
    if (window.ethereum) {
      window.ethereum.enable().then(async (accounts) => {
        console.log(accounts[0]);
        let address = accounts[0];
        hide();
        setAddressEth(address);
        console.log("-----", address);
        setModalInfo({ address, step: "connect_opensea" }); // connect_opensea || show_nft

        const options = { method: "GET" };

        fetch(
          `https://api.opensea.io/api/v1/collections?asset_owner=${address}&offset=0&limit=20`,
          options
        )
          .then((response) => response.json())
          .then((response) => console.log("aaaaaaaaaa", response))
          .catch((err) => console.error("eeeeeeeeeeeeee", err));
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
      setErrMessage("");
    }, alertTimeout);
  };

  const poll = (fn, timeout, interval) => {
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

    var checkCondition = function (resolve, reject) {
      // If the condition is met, we're done!
      var result = fn();
      if (result) {
        resolve(result);
      }
      // If the condition isn't met but the timeout hasn't elapsed, go again
      else if (Number(new Date()) < endTime) {
        setTimeout(checkCondition, interval, resolve, reject);
      }
      // Didn't match and too much time, reject!
      else {
        reject(
          alert("Please install KoiWallet")
          // new Error("timed out for " + fn + ": " + arguments)
        );
      }
    };

    return new Promise(checkCondition);
  };

  const onClick = async () => {
    let extensionObj = await poll(() => window.koiiWallet, 1000, 200); // check extension's existance
    let isConnected;
    if (extensionObj) {
      isConnected = await extensionObj.getPermissions();
      if (isConnected.status === 200) {
        alert("Finnie Connected");
        console.log("--", await window.koiiWallet.getAddress());
        console.log("-all-", window.koiiWallet);
      } else if (isConnected.status === 401) {
        let res = extensionObj.connect();

        console.log(await res);
        console.log("--", window.koiiWallet);
      }
    } else {
      // console.log("no");
    }
  };

  return (
    <MenuWrapper>
      <SideContent>
        <Nav>
          <Nlink to="/collection">The Collection</Nlink>
          <Nlink to="/about">About 1111</Nlink>

          <Nlink to={`/gallery/${genRand()}`}>Random</Nlink>
          <Elink onClick={onEvolve}>
            Evolve my NFT
            <EvolveTooltip>
              <p>
                Store your NFT forever and start earning attention rewards by
                evolving it into an Atomic NFT. Atomic NFTs are permanently
                archived on Arweave and earn rewards through Koi when they are
                viewed.
              </p>
              <p>
                Make sure to connect the wallet that holds your 1111 Ethereum
                transaction ID.
              </p>

              <KoiiBtn>Verify your 1111</KoiiBtn>
            </EvolveTooltip>
          </Elink>
          {/* <Elink onClick={onClick}>
            Connect Finnie Wallet
            <EvolveTooltip>
              <p>
                Make sure to connect the wallet that holds your 1111 Ethereum
                transaction ID.
              </p>

              <KoiiBtn>Connect</KoiiBtn>
            </EvolveTooltip>
          </Elink> */}
        </Nav>
        <KoiLink
          href="https://koii.cx/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <NewLogo className="koii-logo" />
          Powered By Koi
        </KoiLink>
      </SideContent>
    </MenuWrapper>
  );
};
export default Menu;
