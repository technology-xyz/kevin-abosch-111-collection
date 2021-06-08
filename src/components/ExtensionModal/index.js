import React, {useContext} from "react";

import {ModalWrapper, Modal,ArLink} from "./style"

const EvolveModal = () => {
   
  return (
    <ModalWrapper>

      <Modal>
        <p>Need a Koi & Arweave compatible wallet?</p>
        <p>
          Use the Koi browser extension. Create, then securely manage your
          wallets, and see your registered NFTs and the KOI you’ve earned on
          each one. It’s simple and easy to get started.
        </p>
        <button>Get Koi Extension</button>
      </Modal>

      <Modal>
        <p>Let’s get started</p>
        <p>
          Once you’ve downloaded Koi’s secure extension, click Evolve to
          register your 1111 content and start earning rewards.
        </p>
        <button>Evolve</button>
      </Modal>

      <Modal>
        <p>Add a Username</p>
        <p>
          The only place this name will be seen is on the leaderboard of all the
          top content registered with Koi.
        </p>
        <labe>Username: <input/></labe>
        <button>Add Username</button>
      </Modal>

      <Modal>
        <p>Confirm Registration</p>
        <p>
        Register your Kevin Abosch NFT #0722 on Koi to start earning attention rewards
        </p>
        <p>Username: kayla kroot</p>
        <button>Confirm</button>
      </Modal>

      <Modal>
        <p>Succes</p>
        <p>
        Your NFT will start earning attention rewards soon. It may take a few minutes to process fully.
        </p>
        <p>Check out the Arweave transaction here:</p>
            <ArLink>Pending transaction</ArLink>
        <p>Share the koi.rocks link with your friends and followers to start earning.</p>
        <button>Share</button>
      </Modal>
    </ModalWrapper>
  );
};

export default EvolveModal;