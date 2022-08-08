import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import axios from "axios";
import {
  updateAuraStaked,
  updateListPenNFTs,
  updateWalletAddress,
} from "../client/actions";
import { store } from "../redux/store";
import { PEN_CONTRACTS } from "./const";

class WalletClient {
  constructor() {
    window.onload = () => {
      this.connectWallet();
    };
    this.account = {
      address: "",
      auraStaked: {
        amount: "0",
        denom: "",
      },
    };
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
        this.account = account;
      } else {
        store.dispatch(updateWalletAddress(""));
        store.dispatch(
          updateAuraStaked({
            amount: "0",
            denom: "",
          })
        );
        this.account = {
          address: "",
          auraStaked: {
            amount: "0",
            denom: "",
          },
        };
      }
    } catch (error) {
      console.error(error);
    }

    store.dispatch(updateWalletAddress(account.address));
    store.dispatch(updateAuraStaked(account.auraStaked));

    // get NFTs info
    if (account.address) {
      const pens = await this.getOwnTokens(account.address);
      store.dispatch(updateListPenNFTs(pens.tokens));
    } else {
      store.dispatch(updateListPenNFTs([]));
    }
  };

  getOwnTokens = async (address) => {
    const msg = {
      tokens: {
        owner: address,
      },
    };
    return await this.client.queryContractSmart(PEN_CONTRACTS, msg);
  };

  mintPen = async () => {
    const responseCreatePen = await axios.post(
      "http://45.119.87.21:3000/Token/create",
      {
        owner: this.account.address,
      }
    );
    const mintMsg = {
      mint: {
        token_id: `${responseCreatePen.data.data.index}`,
        owner: this.account.address,
        extension: JSON.stringify({
          quality: responseCreatePen.data.data.quality,
          level: responseCreatePen.data.data.level,
          effect: responseCreatePen.data.data.effect,
          resilience: responseCreatePen.data.data.resilience,
          number_of_mints: responseCreatePen.data.data.number_of_mints,
          durability: responseCreatePen.data.data.durability,
        }),
      },
    };
    const fee = {
      amount: [
        {
          denom: "uaura",
          amount: "200",
        },
      ],
      gas: "200000",
    };
    const resMint = await this.client.execute(
      this.account.address,
      PEN_CONTRACTS,
      mintMsg,
      fee
    );
    console.log(resMint)
    return resMint
  };
}

export default new WalletClient();
