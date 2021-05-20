import * as kweb from "koi_tools/web"

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