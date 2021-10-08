# Kevin Abosch 1111 - https://1111.koi.rocks

## Evolve Flow - Make your NFTs permanent with the "Atomic NFT Standard" atomicnft.com
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
## Deployment

* After finishing a feature or bug fix, send up a pull request to deployment/testing branch
* After successfully merging new commits into the staging branch, test to make sure that the changes are behaving as expected
* Once tests have been setup and are passing, send a pull request to main from staging branch
* Lastly after merging with main, to update gh pages from local main branch:
  * run ```$npm run build``` followed by ```$npm run deploy```
