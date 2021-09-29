import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import queryString from "query-string";
import {
  ModalWrapper,
  Modal,
  ArLink,
  Exit,
  BackArrow,
  ActionButton,
} from "./style";

import { DataContext } from "contexts/DataContextContainer";

import axios from "../../service/customAxios";
import Web3 from "web3";
import * as Kcommon from "@_koi/sdk/common";

const EvolveModal = () => {
  const history = useHistory();
  const { address } = queryString.parse(history.location.search);
  const [modalStep, setModalStep] = useState(3);
  const [userName, setUserName] = useState("");

  const { setModalOpen, addressAr, kevinNft } = useContext(DataContext);

  function redeem(payload) {
    console.log("payload......", payload);
    axios
      .post("http://localhost:8887/registerKevinNFT", payload)
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
        //Register with Koi
      })
      .catch((error) => {
        //   console.error(error)
      });
  }

  const sign = (address) => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    if (addressAr) {
      var payload = {
        ownerArAddress: addressAr,
      };
    } else {
    }

    window.ethereum.enable().then(async (accounts) =>
      web3.eth.personal.sign(address, accounts[0]).then((res) => {
        payload.signature = res;
        console.log("signature", res);
        console.log("signature", payload);
        redeem(payload);
      })
    );
  };

  const onEvolve = () => {
    console.log("modal log 1");
    // const params = {
    //   from: addressAr,
    //   to: "0xd0000000000",
    //   data: iskevinNft,
    // };

    // window.ethereum
    //   .request({
    //     method: "eth_sendTransaction",
    //     params,
    //   })
    //   .then((result) => {
    //     //verify burn and send to server for verification.

    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     throw (error)
    //   });
    sign(address);
  };

  const onChange = (e) => {
    setUserName(e.target.value);
  };
  const onExit = () => {
    setModalOpen(false);
  };
  return (
    <ModalWrapper>
      {modalStep === 1 && (
        <Modal>
          <p>Need a Koi & Arweave compatible wallet?</p>
          <p>
            Use the Koi browser extension. Create, then securely manage your
            wallets, and see your registered NFTs and the KOI you’ve earned on
            each one. It’s simple and easy to get started.
          </p>
          <button>Get Koi Extension</button>
        </Modal>
      )}

      {modalStep === 2 && (
        <Modal>
          <h3>Let’s get started</h3>
          <p>
            Once you’ve downloaded Koi’s secure extension, click Evolve to
            register your 1111 content and start earning rewards.
          </p>
          <ActionButton onClick={onEvolve}>Evolve</ActionButton>
        </Modal>
      )}

      {modalStep === 3 && (
        <Modal>
          <BackArrow>
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
              <path
                d="M9.6 0.399994L11.28 2.07999L4.56 8.79999H24V11.2H4.56L11.28 17.92L9.6 19.6L0 9.99999L9.6 0.399994Z"
                fill="white"
              />
            </svg>
          </BackArrow>
          <h3>Add a Username</h3>
          <Exit onClick={onExit}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1L15 15" stroke="white" strokeWidth="2" />
              <path d="M15 1L1 15" stroke="white" strokeWidth="2" />
            </svg>
          </Exit>

          <p>
            The only place this name will be seen is on the leaderboard of all
            the top content registered with Koi.
          </p>
          <label>
            Username: <input value={userName} onChange={onChange} />
          </label>
          <ActionButton>Add Username</ActionButton>
        </Modal>
      )}

      {modalStep === 4 && (
        <Modal>
          <BackArrow>
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
              <path
                d="M9.6 0.399994L11.28 2.07999L4.56 8.79999H24V11.2H4.56L11.28 17.92L9.6 19.6L0 9.99999L9.6 0.399994Z"
                fill="white"
              />
            </svg>
          </BackArrow>
          <h3>Confirm Registration</h3>
          <Exit onClick={onExit}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1L15 15" stroke="white" strokeWidth="2" />
              <path d="M15 1L1 15" stroke="white" strokeWidth="2" />
            </svg>
          </Exit>
          <p>
            Register your Kevin Abosch NFT #0722 on Koi to start earning
            attention rewards
          </p>
          <p>Username: {userName}</p>
          <ActionButton>Confirm</ActionButton>
        </Modal>
      )}

      {modalStep === 5 && (
        <Modal>
          <h3>Succes</h3>

          <Exit onClick={onExit}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1L15 15" stroke="white" strokeWidth="2" />
              <path d="M15 1L1 15" stroke="white" strokeWidth="2" />
            </svg>
          </Exit>
          <p>
            Your NFT will start earning attention rewards soon. It may take a
            few minutes to process fully.
          </p>
          <p>Check out the Arweave transaction here:</p>
          <ArLink>Pending transaction</ArLink>
          <p>
            Share the koi.rocks link with your friends and followers to start
            earning.
          </p>
          <ActionButton>Share</ActionButton>
        </Modal>
      )}
    </ModalWrapper>
  );
};

export default EvolveModal;
