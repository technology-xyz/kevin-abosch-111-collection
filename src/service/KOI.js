import Arweave from "arweave";
import * as kweb from "@_koi/sdk/web";
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

export {
    getKoi,
}