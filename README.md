# Kevin Abosch 1111

## Evolve flow
* A user can click the ```Verify your 1111``` button which will prompt them to connect their metamask wallet if metamask is detected, or to install metamask if it is not detected.
* After the metamask wallet has been connected, if any of the 1111 NFTs are found in the users wallet, the user will be prompted to Evolve those found NFTs.
  * If the user doesn't have Finnie connected they will be prompted to get Finnie so they have an Arweave wallet to evolve their NFTs.
  * If the user has already connected Finnie, they will receive a final prompt to evolve their NFT / NFTs. 
* If none of the 1111 NFTs are found in the users wallet, they will be prompted to buy 1111 NFTs by clicking on the 1111 Collection button that directs them to the Opensea collection link.

## Setup
* To access the site on your local machine:
  * Clone down the repo through the command line
  * Set local node version to ```v14.16.1```
  * Run ```$npm install``` to install dependencies
  * Run ```$npm start``` to open the page on a local browser
  * Run ```$npx cypress run``` to run the tests
* To access via deployed link through github pages click [here](https://1111.koi.rocks/#/)