import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import {
  updateAuraStaked,
  updateListPenNFTs,
  updateWalletAddress,
} from "../client/actions";
import { store } from "../redux/store";
import { PEN_CONTRACTS } from "./const";

class WalletClient {

  constructor(){
    window.onload = () => {
      this.connectWallet()
    }
  }

  client;
  getClientSigner = async (offlineSigner) => {
    if (!offlineSigner) {
      offlineSigner = window.getOfflineSigner("serenity-testnet-001");
    }
    this.client = await SigningCosmWasmClient.connectWithSigner(
      "https://rpc.serenity.aura.network:443",
      offlineSigner
    );
    return this.client;
  };

  getAuraStaked = async (clientSigner, address) => {
    const auraStaked = await clientSigner.getBalance(address, "uaura");
    return auraStaked;
  };

  connectWallet = async () => {
    const chainId = "serenity-testnet-001";
    let account = {
      address: "",
      auraStaked: {
        amount: "0",
        denom: "",
      },
    };
    // get info wallet
    try {
      const keplrEnable = await window.keplr.enable(chainId);
      if (keplrEnable) {
        const offlineSigner = window.getOfflineSigner(chainId);
        const accountRes = (await offlineSigner.getAccounts())[0];
        const clientSigner = await this.getClientSigner(offlineSigner);
        const auraStaked = await this.getAuraStaked(
          clientSigner,
          accountRes.address
        );
        account = {
          address: accountRes.address,
          auraStaked,
        };
      } else {
        store.dispatch(updateWalletAddress(""));
        store.dispatch(
          updateAuraStaked({
            amount: "0",
            denom: "",
          })
        );
      }
    } catch (error) {
      console.error(error);
    }

    store.dispatch(updateWalletAddress(account.address));
    store.dispatch(updateAuraStaked(account.auraStaked));

    // get NFTs info
    if(account.address){
      const pens = await this.getOwnTokens(account.address)
      store.dispatch(updateListPenNFTs(pens.tokens));
    }else {
      store.dispatch(updateListPenNFTs([]));
    }
  };

  getOwnTokens = async (address) => {
    const msg = {
      tokens: {
        owner: address
      }
    }
    return await this.client.queryContractSmart(PEN_CONTRACTS, msg)
  }

}

export default new WalletClient()