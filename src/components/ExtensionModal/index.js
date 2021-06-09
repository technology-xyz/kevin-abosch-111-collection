import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import queryString from "query-string";
import { ModalWrapper, Modal, ArLink, Exit, BackArrow } from "./style";
import { DataContext } from "contexts/DataContextContainer";
import { alertTimeout } from "config";
import Web3 from "web3";


const EvolveModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { address } = queryString.parse(history.location.search);
  const [showAlert, setShowAlert] = useState(false);
  const [errMessage, setErrMessage] = useState(false);
  const { openSeas, setOpenSeas, addressAr } = useContext(DataContext);
  const [iskevinNft, setIskevinNft] = useState(null);
  useEffect(() => {
    if (window.ethereum) {
      setIsLoading(true);
      window.ethereum.enable().then(async (accounts) => {
        console.log(accounts);
        const options = {
          method: "GET",
        };

        fetch(
          `https://api.opensea.io/api/v1/assets?owner=${accounts[0]}&order_direction=desc&offset=0&limit=20`,
          options
        )
          .then((response) => {
            return response.json();
          })
          .then(async (data) => {
            console.log({ data });
            if (data.assets.length === 0) {
              show_alert(
                `Our school of koi couldn't find anything on OpenSea NFTs associated with that wallet[${address}].`
              );
            }

            checkKevinNFT(data.assets);
            console.log(data.assets);
          })
          .catch((err) => {
            console.log(err);
            show_alert(
              `Our school of koi couldn't find anything on OpenSea NFTs associated with that wallet[${address}].`
            );
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
    }
  }, [history.location.pathname]);

  const show_alert = (message = "") => {
    setShowAlert(true);
    setErrMessage(message);
    setTimeout(() => {
      setShowAlert(false);
      setErrMessage("");
    }, alertTimeout);
  };

  const checkKevinNFT = (nfts = []) => {
    for (var i = 0; i < nfts.length; i++) {
      if (
        nfts[i].asset_contract.address ===
        "0x7f72528229f85c99d8843c0317ef91f4a2793edf"
      ) {
        // if(nfts[i].asset_contract.address === "0x495f947276749ce646f68ac8c248420045cb7b5e") {
        console.log(nfts[i].asset_contract.address);
        setIskevinNft(nfts[i]);
        break;
      }
    }
  };
  return (
    <ModalWrapper>
      <Modal>
        <p>Need a Koi & Arweave compatible wallet?</p>
        <p>
          Use the Koi browser extension. Create, then securely manage your
          wallets, and see your registered NFTs and the KOI you’ve earned on
          each one. It’s simple and easy to get started.
        </p>
        <button>Get Koi Extension</button>
      </Modal>

      <Modal>
        <p>Let’s get started</p>
        <p>
          Once you’ve downloaded Koi’s secure extension, click Evolve to
          register your 1111 content and start earning rewards.
        </p>
        <button>Evolve</button>
      </Modal>

      <Modal>
        <BackArrow width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1 1L15 15" stroke="white" stroke-width="2" />
          <path d="M15 1L1 15" stroke="white" stroke-width="2" />
        </BackArrow>
        <p>Add a Username</p>
        <Exit width="24" height="20" viewBox="0 0 24 20" fill="none">
          <path
            d="M9.6 0.399994L11.28 2.07999L4.56 8.79999H24V11.2H4.56L11.28 17.92L9.6 19.6L0 9.99999L9.6 0.399994Z"
            fill="white"
          />
        </Exit>

        <p>
          The only place this name will be seen is on the leaderboard of all the
          top content registered with Koi.
        </p>
        <label>
          Username: <input />
        </label>
        <button>Add Username</button>
      </Modal>

      <Modal>
      <BackArrow width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1 1L15 15" stroke="white" stroke-width="2" />
          <path d="M15 1L1 15" stroke="white" stroke-width="2" />
        </BackArrow>
        <p>Confirm Registration</p>
        <Exit width="24" height="20" viewBox="0 0 24 20" fill="none">
          <path
            d="M9.6 0.399994L11.28 2.07999L4.56 8.79999H24V11.2H4.56L11.28 17.92L9.6 19.6L0 9.99999L9.6 0.399994Z"
            fill="white"
          />
        </Exit>
        <p>
          Register your Kevin Abosch NFT #0722 on Koi to start earning attention
          rewards
        </p>
        <p>Username: kayla kroot</p>
        <button>Confirm</button>
      </Modal>

      <Modal>
        <p>Succes</p>
        <Exit width="24" height="20" viewBox="0 0 24 20" fill="none">
          <path
            d="M9.6 0.399994L11.28 2.07999L4.56 8.79999H24V11.2H4.56L11.28 17.92L9.6 19.6L0 9.99999L9.6 0.399994Z"
            fill="white"
          />
        </Exit>
        <p>
          Your NFT will start earning attention rewards soon. It may take a few
          minutes to process fully.
        </p>
        <p>Check out the Arweave transaction here:</p>
        <ArLink>Pending transaction</ArLink>
        <p>
          Share the koi.rocks link with your friends and followers to start
          earning.
        </p>
        <button>Share</button>
      </Modal>
    </ModalWrapper>
  );
};

export default EvolveModal;
