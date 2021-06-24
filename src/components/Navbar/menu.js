import React, {useContext, useState}  from "react";
import { Logo } from "../../assets/images";
import {
  MenuWrapper,
  SideContent,
  Nav,
  Nlink,
  KoiLink,
  EvolveTooltip,
  Elink
} from "./style";
import { DataContext } from "contexts/DataContextContainer";
import { alertTimeout } from "config";
import { useHistory } from "react-router-dom";
const Menu = () => {
  const history = useHistory()
  const { modalOpen, setModalOpen, setAddressEth, setKevinNft} = useContext(DataContext);
  const [showAlert, setShowAlert] = useState(false);
  const [errMessage, setErrMessage] = useState(false);


  const genRand = () => Math.floor(Math.random() * 1001);

  const onEvolve = () => {
    window.ethereum.request({ method: 'eth_requestAccounts' }).then(async (accounts) => {
      console.log(accounts[0]);
      setAddressEth(accounts[0]);
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
          console.log(data.assets.length);
          if (data.assets.length === 0) {
            show_alert(
              `Our school of koi couldn't find anything on OpenSea NFTs associated with that wallet[${accounts[0]}].`
            );
          }

          if (checkKevinNFT(data.assets)) {
            console.log("trade")
          }
          else {
            console.log('you dont have any 1111 NFTS')
          }
        })

        .catch((err) => {
          console.log(err);
          
        })
        .finally(() => {
          
        });
    });
    

  }
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
        "0x495f947276749ce646f68ac8c248420045cb7b5e"
      ) {
        const MOCK_NAME ="1111 #0245"
        const extractName = (name) => {
            
            let start = name.indexOf('#')
            let route = parseInt(name.slice(start +1),10)
            return route
        }
        const route = extractName(MOCK_NAME)
        history.push(`/gallery/${route}/`)
        console.log(nfts[i].asset_contract.address);
        console.log(nfts[i].name)
        // route to nft with name,need to verify what name looks like
        setKevinNft(nfts[i]);
        return true;
      }
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
            <EvolveTooltip>git 
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

              <div
                
              >
                Connect Wallet
              </div>
            </EvolveTooltip>
          </Elink>
        </Nav>
        <KoiLink href="openkoi.com" target="_blank" rel="noopener noreferrer">
          <svg width="28" height="20" viewBox="0 0 28 20">
            <path d="M27.4761 11.2923C27.3466 11.0852 24.4325 6.49829 19.7884 5.21173C20.0348 4.14069 19.8533 3.01575 19.2825 2.07659C18.9334 1.48111 18.4331 0.988466 17.8323 0.648535C17.2315 0.308605 16.5516 0.133464 15.8614 0.140849C15.1712 0.148235 14.4951 0.337884 13.9018 0.690592C13.3084 1.0433 12.8188 1.54654 12.4825 2.14935C9.58501 1.84335 7.41649 4.73709 8.27839 7.50537C7.62694 7.94803 7.04359 8.48339 6.54677 9.09453C5.34483 8.18428 4.31356 7.0684 3.50071 5.79857C3.43618 5.6993 3.3502 5.61578 3.24909 5.55418C3.14798 5.49258 3.03433 5.45447 2.91653 5.44265C2.79872 5.43084 2.67977 5.44563 2.56844 5.48593C2.45711 5.52623 2.35625 5.59101 2.27331 5.67549C0.546107 7.42649 -0.314093 9.71775 1.13431 11.736C-0.313753 13.7522 0.545767 16.0435 2.27297 17.7948C2.35591 17.8793 2.45677 17.9441 2.5681 17.9844C2.67943 18.0247 2.79838 18.0394 2.91619 18.0276C3.03399 18.0158 3.14764 17.9777 3.24875 17.9161C3.34986 17.8545 3.43584 17.771 3.50037 17.6717C4.31479 16.3992 5.34868 15.2814 6.55391 14.3703C7.42225 15.3787 8.48734 16.1993 9.68395 16.7816C9.34785 17.2109 8.94022 17.5789 8.47899 17.8696C8.35373 17.9468 8.25175 18.0565 8.18389 18.1871C8.11603 18.3177 8.08484 18.4642 8.09363 18.6111C8.10242 18.758 8.15087 18.8997 8.23381 19.0213C8.31675 19.1428 8.43109 19.2396 8.56467 19.3013C9.66964 19.7828 10.8839 19.958 12.0799 19.8084C13.2759 19.6589 14.4096 19.1901 15.3619 18.4513C16.0364 18.5303 16.7148 18.5701 17.3938 18.5707C19.8992 18.5707 22.4418 17.4551 24.7463 15.3441C25.7836 14.3986 26.7004 13.3288 27.4758 12.159C27.5569 12.0292 27.5999 11.8793 27.5999 11.7263C27.5999 11.5733 27.5569 11.4234 27.4758 11.2936L27.4761 11.2923ZM12.7157 3.83541C12.9085 3.89056 13.115 3.87074 13.2938 3.77992C13.4726 3.68911 13.6104 3.53403 13.6796 3.34581C13.8425 2.88417 14.1436 2.48386 14.5419 2.19925C14.9402 1.91463 15.4164 1.75951 15.9059 1.75495C17.5665 1.75495 18.6103 3.42401 18.2149 4.92307C15.2798 4.75447 12.3511 5.34992 9.71489 6.65129C9.44731 4.93225 10.9654 3.32881 12.7157 3.83541ZM2.77277 15.9207C2.42833 15.4789 2.18171 14.969 2.04925 14.4247C1.96711 14.0415 1.98833 13.6434 2.11075 13.2711C2.23317 12.8988 2.45238 12.5658 2.74591 12.3062C2.89562 12.1536 2.9795 11.9484 2.9795 11.7346C2.9795 11.5209 2.89562 11.3157 2.74591 11.1631C2.45249 10.9036 2.23329 10.5709 2.11076 10.1989C1.98823 9.82684 1.96676 9.42895 2.04857 9.04591C2.18083 8.50092 2.42746 7.99029 2.77209 7.54787C3.60924 8.68083 4.61467 9.67916 5.75355 10.5083C5.47397 11.3015 5.47493 12.1667 5.75627 12.9593C4.61629 13.7887 3.60992 14.7876 2.77209 15.9214L2.77277 15.9207ZM23.6488 14.1704C21.6224 16.0163 19.5184 16.9519 17.3955 16.9519C17.1891 16.9519 16.9817 16.9472 16.7736 16.939C17.4487 15.9367 17.9236 14.8134 18.1724 13.6308C18.2207 13.4231 18.185 13.2047 18.073 13.0231C17.9611 12.8416 17.782 12.7116 17.5747 12.6615C17.4721 12.6379 17.366 12.6349 17.2622 12.6526C17.1585 12.6703 17.0594 12.7083 16.9704 12.7645C16.8815 12.8207 16.8046 12.894 16.7441 12.98C16.6835 13.0661 16.6407 13.1633 16.6179 13.266C16.132 15.4009 15.0729 16.9349 13.5555 17.702C12.6345 18.1639 11.5955 18.3371 10.5744 18.1991C11.5099 17.1361 12.2111 15.8881 12.6324 14.5362C12.6921 14.3317 12.6688 14.1118 12.5675 13.9244C12.4661 13.7369 12.295 13.597 12.0911 13.5349C11.9902 13.5055 11.8845 13.4963 11.78 13.5079C11.6755 13.5195 11.5744 13.5516 11.4824 13.6025C11.3904 13.6534 11.3094 13.722 11.2441 13.8044C11.1788 13.8867 11.1304 13.9812 11.1017 14.0823C10.9554 14.54 10.7719 14.985 10.553 15.4128C9.09099 14.692 7.99721 13.7916 7.47735 12.8848C7.46696 12.861 7.45432 12.8383 7.43961 12.8169C7.24057 12.4821 7.13674 12.0993 7.13931 11.7098C7.14189 11.3203 7.25078 10.939 7.45423 10.6069C9.02571 7.77125 15.075 6.03453 18.5994 6.59859C21.4445 7.05419 24.118 9.36381 25.8316 11.7248C25.1871 12.611 24.4554 13.4304 23.6474 14.1707L23.6488 14.1704Z" />
            <path d="M21.2391 9.3347C21.1297 9.26157 21.0039 9.21657 20.8729 9.20368C20.7419 9.19078 20.6097 9.2104 20.4881 9.26078C20.3665 9.31116 20.2592 9.39075 20.1757 9.49251C20.0922 9.59427 20.0351 9.71505 20.0095 9.84415C19.9838 9.97325 19.9904 10.1067 20.0286 10.2326C20.0668 10.3586 20.1355 10.4732 20.2286 10.5662C20.3217 10.6593 20.4363 10.7279 20.5623 10.7661C20.6883 10.8043 20.8217 10.8108 20.9508 10.7851C21.1059 10.7541 21.2484 10.6778 21.3602 10.5658C21.472 10.4539 21.5481 10.3113 21.5789 10.1561C21.6098 10.0009 21.594 9.84011 21.5335 9.69392C21.473 9.54772 21.3706 9.42272 21.2391 9.3347Z" />
          </svg>
          Powered By Koi
        </KoiLink>
      </SideContent>
    </MenuWrapper>
  );
};
export default Menu;
