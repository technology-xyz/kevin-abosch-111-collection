import Arweave from "arweave";
import * as kweb from "@_koi/sdk/web";
import Web3 from "web3";
import customAxios from "service/customAxios";

const arweaveOptions = {
    host: "arweave.net", // Hostname or IP address for a Arweave host
    port: 443, // Port
    protocol: "https", // Network protocol http or https
    timeout: 20000, // Network request timeouts in milliseconds
    logging: false, // Enable network request logging
};


/**
 *
 * @param {Function} fn Function to poll for result
 * @param {Number} timeout How long to poll for
 * @param {Number} interval Polling interval
 * @returns {Promise}
 */
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
            reject(new Error("timed out for " + fn + ": " + arguments));
        }
    };

    return new Promise(checkCondition);
};
/**
 * Initiates arweave object if on window or uses library otherwise
 * @returns Initiated arweave object
 */
const initArweave = async () => {
    let arweave;

    try {
        arweave = await poll(() => window.Arweave, 5000, 200);
    } catch (error) {
        arweave = Arweave;
    }

    arweave = new arweave(arweaveOptions);

    console.log("aweraerve", arweave);
    return arweave;
};

const getKoi = async (keyAr) => {
    const ktools = new kweb.Web();
    try {
        console.log(keyAr)
        await ktools.loadWallet(keyAr)

        // let temp_address = await ktools.getWalletAddress()
        let arBalance = await ktools.getWalletBalance() // "5500000000000"
        let koiBalance = await ktools.getKoiBalance()
        console.log(arBalance)
        console.log(koiBalance)
        return {
            arBalance,
            koiBalance
        }
    } catch (err) {
        throw err.message
    }
}
const transferNFTtoFinnie = async (tx_id, ownerAddress, wallet = null) => {
    try {
        const ktools = new kweb.Web();
        let arweave = await initArweave();
        const res = await ktools.registerData(tx_id, ownerAddress, wallet, arweave);
        console.log(res)
    } catch (error) {
        console.log('transfer error', error)
    }

}
const registerContent = async (
    token_id,
    contentType = "opensea",
    ownerArAddress = "",
    signature = "",
    addressEth
  ) => {
    let param = {
      token_id,
      address: addressEth,
      contentType,
      ownerArAddress,
      signature,
    };

    let url = "registerOpenseaNFT";
    if (contentType === "kevin1111") url = "registerKevinNFT";
    let {
      ok,
      data: { data },
    } = await customAxios.post(`/${url}`, param);
    if (ok) {
      // show_notification(data.message)
      console.log(data);
      return true;
    } else {
      show_notification(data.message);
      return false;
    }
};
const onUploadKevin1111 = async (token_id, payload) => {
    console.log("here");
    // setLoading(true);
    await registerContent(
      token_id,
      "kevin1111",
      payload.ownerArAddress,
      payload.signature
    );
    // setLoading(false);
    // finished transfer
};
const sign = (addressAr) => {
    // setIsAllSelected(!isAllSelected);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    if (addressAr) {
        // var arAddress = "FeSD9TV8aB0GK0yby8A40KEX1N-3wrJQTDbRW4uUiEA"
        var payload = {
            // ownerArAddress: arAddress,
            ownerArAddress: addressAr,
        };
    }
    // else{
    //   history.push("/wallet-key");
    // }

    //var hash = web3.utils.sha3(message)
    //var accounts = await web3.eth.getAccounts()
    window.ethereum.enable().then(async (accounts) =>
        web3.eth.personal.sign(addressAr, accounts[0]).then(async (res) => {
            payload.signature = res;
            console.log("signature", res);
            console.log("signature", payload);
            await onUploadKevin1111(payload);
        })
    );
};

export {
    getKoi,
    transferNFTtoFinnie
}