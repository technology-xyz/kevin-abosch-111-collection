import React, {useContext, useState}  from "react";
import {
  MenuWrapper,
  SideContent,
  Nav,
  Nlink,
  KoiLink,
  EvolveTooltip,
  Elink,
  KoiiBtn
} from "./style";
import { DataContext } from "contexts/DataContextContainer";
import { alertTimeout } from "config";
import { useHistory } from "react-router-dom";
import {ModalContext} from 'contexts/ModalContext'
import { NewLogo } from "assets/images";

const Menu = ({
  hide = () => {}
}) => {
  const history = useHistory()
  const { setAddressEth, setKevinNft} = useContext(DataContext);
  const [showAlert, setShowAlert] = useState(false);
  const [errMessage, setErrMessage] = useState(false);
  const {setModalInfo} = useContext(ModalContext)

  const genRand = () => Math.floor(Math.random() * 1001);

  const onEvolve = () => {
    if (window.ethereum) {
      window.ethereum.enable().then(async (accounts) => {
          console.log(accounts[0])
          let address = accounts[0]
          hide()
          setAddressEth(address)
          setModalInfo({address, step: 'connect_opensea'}) // connect_opensea || show_nft
        }
      )
    } else {
      // metamask extension didn't install
      // show_notification("Please install metamask extension first.", "KOII");
      show_alert('Please install metamask extension first.')
      setTimeout(() => {
        let url = "https://metamask.io/download.html";
        window.open(url, "_blank");
      }, 1000);
    }
  }
  const show_alert = (message = "") => {
    setShowAlert(true);
    setErrMessage(message);
    setTimeout(() => {
      setShowAlert(false);
      setErrMessage("");
    }, alertTimeout);
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

              <KoiiBtn>Connect Wallet</KoiiBtn>
            </EvolveTooltip>
          </Elink>
        </Nav>
        <KoiLink href="openkoi.com" target="_blank" rel="noopener noreferrer">
          <img src={NewLogo} alt="new koii logo white" />
          &nbsp;&nbsp;&nbsp;Powered By Koi
        </KoiLink>
      </SideContent>
    </MenuWrapper>
  );
};
export default Menu;
