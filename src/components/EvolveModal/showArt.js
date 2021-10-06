import { ItemTemp } from "assets/images";
import React, { useContext, useState, useEffect } from "react";
import { ActionButton, ShowArtArea, KoiiAddress } from "./style";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import queryString from "query-string";
import Web3 from "web3";
import axios from "../../service/customAxios";
import { DataContext } from "contexts/DataContextContainer";
import { useHistory } from "react-router";
import routerContract from "../../contracts/KoiRouter.json";
import koiTokenContract from "../../contracts/KoiToken.json";

const routerAbi = routerContract.abi;
const koiTokenAbi = koiTokenContract.abi;

const ShowArt = ({ action = () => {}, koiiAddress = "", kevinNft = [] }) => {
  const history = useHistory();
  const { address } = queryString.parse(history.location.search);
  const {
    addressEth,
    addressAr,
    setKevinNft,
    setAddressAr,
    selectedTokenId,
    setSelectedTokenId,
  } = useContext(DataContext);
  const [depositResult, setDepositResult] = useState();

  const uploadNFT = () => {
    console.log("----Lets evolve----");
    console.log("----Token id----", selectedTokenId);
    // sign(addressAr);
    bridgeDeposit();
    // console.log("$$$$", queryString.parse(history.location.search));
  };

  const bridgeDeposit = async () => {
    if (!window.ethereum) {
      alert("no metamask");
    } else {
      try {
        const result = await window.ethereum._metamask.isUnlocked();
        // console.log(result);
        if (result) {
          // await window.ethereum.enable();
          let web3 = new Web3(window.ethereum);
          await window.ethereum.enable();

          let accounts = await web3.eth.getAccounts();

          // debugging accounts
          console.log(accounts);

          // making instance of token contract for sending a functiom

          const routerContractMethods = new web3.eth.Contract(
            routerAbi,
            "0xD1183ad3B7934466aCB98D17B85Ced15999EA3AC"
          );

          const tokenContracMethods = new web3.eth.Contract(
            koiTokenAbi,
            "0xff3096ED566445c9F24F615b3afD6677AD4Dcba4"
          );

          let isApprovedForAll = await tokenContracMethods.methods
            .isApprovedForAll(
              "0xB7180670fc3e7a4Ccd8fE4bcBEcAe2bEaA7d92E0",
              "0xD1183ad3B7934466aCB98D17B85Ced15999EA3AC"
            )
            .call();

          // console.log("jhdsdfshfbsdfk", isApprovedForAll);
          if (isApprovedForAll) {
            let result = await routerContractMethods.methods
              .deposit(
                "0xff3096ed566445c9f24f615b3afd6677ad4dcba4",
                selectedTokenId,
                1,
                addressAr
              )
              .send({
                from: accounts[0],
                gas: web3.utils.toHex(210000),
                // gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
              });

            console.log("res Events ", result.events);
            const tTx = await routerContractMethods.getPastEvents("Deposit", {
              fromBlock: 0,
              toBlock: "latest",
              filter: { to: accounts[0] },
            });

            console.log("res ", tTx);
            // debugging response
            // console.log("token bought", result);
          } else if (!isApprovedForAll) {
            let setApprovalForAll = await routerContractMethods.methods
              .setApprovalForAll(
                "0xD1183ad3B7934466aCB98D17B85Ced15999EA3AC",
                true
              )
              .send({
                from: accounts[0],
                gas: web3.utils.toHex(210000),
                // gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
              });

            if (setApprovalForAll) {
              let result = await routerContractMethods.methods
                .deposit(
                  "0xff3096ed566445c9f24f615b3afd6677ad4dcba4",
                  selectedTokenId,
                  1,
                  addressAr
                )
                .send({
                  from: accounts[0],
                  gas: web3.utils.toHex(210000),
                  // gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
                });
              console.log("res Events ", result.events);
              const tTx = await routerContractMethods.getPastEvents("Deposit", {
                fromBlock: 0,
                toBlock: "latest",
                filter: { to: accounts[0] },
              });
            }
          }
        }
      } catch (error) {}
    }
  };

  //   console.log("res ", depositResult);

  //   function redeem(payload) {
  //     console.log("payload......", payload);
  //     axios
  //       .post("http://localhost:8887/api/v1/registerKevinNFT", payload)
  //       .then((res) => {
  //         console.log("statusCode-:", res?.statusCode);
  //         console.log(res);
  //         //Register with Koi
  //       })
  //       .catch((error) => {
  //         console.error("err ", error);
  //       });
  //   }
  //   const sign = (address) => {
  //     const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  //     if (address) {
  //       var payload = {
  //         ownerArAddress: address.arAddress,
  //         token_id: address.tokenId,
  //         address: address.ethAddress,
  //       };
  //     } else {
  //     }

  //     window.ethereum.enable().then(async (accounts) =>
  //       web3.eth.personal.sign(address, accounts[0]).then((res) => {
  //         payload.signature = res;
  //         console.log("signature", res);
  //         console.log("signature", payload);
  //         redeem(payload);
  //       })
  //     );
  //   };

  //   useEffect(() => {
  //     return () => {
  //       setSelectedTokenId("");
  //     };
  //   }, []);

  return (
    <>
      <h3 className="m-t-15 f-bold">Make the Most of your Art</h3>
      <ShowArtArea className="m-t-15">
        {kevinNft
          .reverse()
          .filter((item) => item.token_id == selectedTokenId)
          .map((item, _i) => {
            if (_i < 1) {
              return (
                <div className="art-row">
                  <img
                    src={item.image_thumbnail_url}
                    className="w120"
                    alt="kevin1111 nft img"
                  />
                </div>
              );
            } else return null;
          })}
      </ShowArtArea>
      <KoiiAddress className="koii-address m-t-15 w-100">
        <div className="lbl-cap1 w100">Koii Address</div>
        <div className="lbl-cap1 text-center">
          <span className="f-yellow f-bold">{koiiAddress}</span>
        </div>
      </KoiiAddress>
      <div className="lbl-cap3 m-t-5 w-100 text-left">
        *This address is auto-filled from the Finnie Wallet Extension
      </div>
      <div className="lbl-cap1 m-t-20">
        Evolving your NFT uses Koii’s Ethereum-Arweave bridge. To tranform this
        NFT into it’s 1,111 pieces, the bridge will burn the Ethereum NFT.
      </div>
      <div className="lbl-cap1 m-t-10">
        If you ever need it on Ethereum again, the bridge will be there for you.
      </div>
      <ActionButton onClick={uploadNFT} className="m-t-30 m-b-25">
        Evolve
      </ActionButton>
    </>
  );
};

export default ShowArt;
