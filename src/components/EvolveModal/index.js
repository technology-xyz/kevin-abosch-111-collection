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
import ConnectOpensea from "./connect";
import ShowOpensea from "./showOpensea";
import { IconClose } from "assets/images";

const EvolveModal = ({
  hide = () => {},
  initStep = 0,
}) => {
  console.log({initStep})
  const history = useHistory();
  const { address } = queryString.parse(history.location.search);
  const [modalStep, setModalStep] = useState(initStep)
  const [userName, setUserName] = useState("");

  const { addressAr, kevinNft } = useContext(DataContext);

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
        console.log('signature', res);
        console.log('signature', payload);
        redeem(payload);

      })
    );
  };

  const onEvolve = () => {
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
    sign(address)
  };

  const onChange = (e) => {
    setUserName(e.target.value);
  };
  const onExit = () => {
    hide()
  };
  const getNFTwallet = () => {
    setModalStep(1)
  }
  return (
    <ModalWrapper>
      <Modal>
        <Exit onClick={onExit}>
          <img src={IconClose} alt="modal close" />
        </Exit>
        {modalStep === 0 && <ConnectOpensea getNFTwallet={getNFTwallet} /> }
        {modalStep === 1 && <ShowOpensea /> }
      </Modal>
    </ModalWrapper>
  );
};

export default EvolveModal;
