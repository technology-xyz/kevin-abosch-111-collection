import React, { useEffect, useState, useContext } from "react";
import {
  convertArBalance,
  show_notification,
  showShortString,
  show_fixed_number,
  isVideoContent,
} from "service/utils";
import queryString from "query-string";
import { getArWalletAddressFromJson, exportNFT } from "service/NFT";
import Arweave from "arweave";
import { DataContext } from "contexts/DataContextContainer";
import Web3 from "web3";
import customAxios from "service/customAxios";
import { useHistory } from "react-router";
import axios from "axios";
import { alertTimeout } from "config";
const [isLoading, setIsLoading] = useState(false);
const Evolve = () => {
  const history = useHistory();
  const { address } = queryString.parse(history.location.search);
  const [showAlert, setShowAlert] = useState(false);
  const [isAlertCancel, setIsAlertCancel] = useState(false);
  const [alertVariant, setAlertVariant] = useState("danger");
  const [errEmessage, setErrMessage] = useState("");
  const [iskevinNft, setIskevinNft] = useState(null);
  const { addressAr, openSeas, setOpenSeas, setAddressAr, keyAr, setKeyAr } =
    useContext(DataContext);

  const show_alert = (message = "", type = "danger", isCancel = false) => {
    setShowAlert(true);
    setAlertVariant(type);
    setErrMessage(message);
    setIsAlertCancel(isCancel);
    if (!isCancel) {
      setTimeout(() => {
        setShowAlert(false);
        setErrMessage("");
      }, alertTimeout);
    }
  };

  const sign = () => {
    // setIsAllSelected(!isAllSelected);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    if (addressAr) {
      // var arAddress = "FeSD9TV8aB0GK0yby8A40KEX1N-3wrJQTDbRW4uUiEA"
      var payload = {
        ownerArAddress: addressAr,
      };
    } else {
      history.push("/wallet-key");
    }

    //var hash = web3.utils.sha3(message)
    //var accounts = await web3.eth.getAccounts()
    window.ethereum.enable().then(async (accounts) =>
      web3.eth.personal.sign(addressAr, accounts[0]).then((res) => {
        payload.signature = res;
        console.log("signature", res);
        console.log("signature", payload);
        redeem(payload);

        // Dong, here we need to submit the payload to server(koi.server), i will provide the api
      })
    );
  };
  function redeem(payload) {
    // await ktools.loadWallet(walletKeyLocation);
    //let key
    // const payload =  {ownerArAddress: "FeSD9TV8aB0GK0yby8A40KEX1N-13wrJQTDbRW4uUiEA", signature: "0x9ddcce4db3a2101cdc56a0b6785f399b193372ac88f62188890420094e158b803ba4de22960a576525661218c3137264d5f4640f4efbfbb855e2d21852cbe4e21c"};

    console.log("payload......", payload);

    axios
      .post("http://localhost:8886/voucher", payload)
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
      })
      .catch((error) => {
        //   console.error(error)
      });
  }

  const checkKevinNFT = (nfts = []) => {
    let kevinNFTs = []
    for(var i = 0; i < nfts.length; i++){
     // if(!nfts[i].isUpload && nfts[i].asset_contract.address === "0x495f947276749ce646f68ac8c248420045cb7b5e") {
        if(!nfts[i].isUpload && nfts[i].asset_contract.address === "0x7f72528229f85c99d8843c0317ef91f4a2793edf") {
        console.log(nfts[i].asset_contract.address)
        kevinNFTs.push(nfts[i])
        setIskevinNft(nfts[i])
        break;
      }
    }
    // setIskevinNft(kevinNFTs[0])
  }
  useEffect(() => {
    if (address) {
      setIsLoading(true);
      const options = {
        method: "GET",
        // params: {
        //   owner: "0x3a3d6f2b81187Bd4c365b6dAfB260b59f5783854",
        // },
      };

      fetch(
        // `https://api.opensea.io/api/v1/assets?owner=0xd703accc62251189a67106f22d54cd470494de40&order_direction=desc&offset=0&limit=20`,
        // `https://api.opensea.io/api/v1/assets?owner=0x8dea9139b0e84d5cc2933072f5ba43c2b043f6db&order_direction=desc&offset=0&limit=20`,
        `https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=0&limit=20`,
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

          setOpenSeas(data.assets);
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
    }
  }, [history.location.pathname]);

  return <div></div>;
};

export default Evolve;
