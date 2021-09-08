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
import { show_notification } from "service/utils";

const EvolveModal = ({
  hide = () => {},
  initStep = 0,
}) => {
  console.log({initStep})
  const history = useHistory();
  const { address } = queryString.parse(history.location.search);
  const [modalStep, setModalStep] = useState(initStep)

  const { addressEth, addressAr, kevinNft } = useContext(DataContext);

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

  const onExit = () => {
    hide()
  };
  const getNFTwallet = () => {
    const tempEth = '0xe35a42153fecf7710733252fd8ef16b92fac4b95'
    fetch(
      //  `https://api.opensea.io/api/v1/assets?owner=0x8dea9139b0e84d5cc2933072f5ba43c2b043f6db&order_direction=desc&offset=0&limit=20`,
      //  `https://api.opensea.io/api/v1/assets?owner=0x9428E55418755b2F902D3B1f898A871AB5634182&order_direction=desc&offset=0&limit=100`,
      // `https://api.opensea.io/api/v1/assets?owner=${addressEth}&order_direction=desc&offset=0&limit=50`,
      `https://api.opensea.io/api/v1/assets?owner=${tempEth}&order_direction=desc&offset=0&limit=50`,
      { method: "GET" }
    )
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        console.log({ data });
        if (data.assets.length === 0) {
          show_notification(
            `Our school of Koii couldn't find anything on OpenSea NFTs associated with that wallet[${addressEth}].`
          );
        }

        let newest_nfts = [];
        let temp_opensea = data.assets;
        if (temp_opensea.length > 0) {
          console.log({ newest_nfts });
          checkKevinNFT(temp_opensea);
        }
      })
      .catch((err) => {
        console.log(err);
        show_alert(
          `Our school of Koii couldn't find anything on OpenSea NFTs associated with that wallet[${addressEth}].`
        );
      })
      .finally(() => {
        // show_alert('It looks like you don\'t have enough AR tokens.<br> Please visit the <a href="https://faucet.arweave.net/" target="_blank">Arweave Faucet</a> to get some— it\'s free!', 'danger', true)
        setLoading(false);
      });
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
