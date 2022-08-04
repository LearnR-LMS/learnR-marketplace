import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { updateAuraStaked, updateClientSigner, updateWalletAddress } from "../client/actions";
import { store } from "../redux/store";

export const getClientSigner = async (offlineSigner) => {
  if(!offlineSigner){
    offlineSigner = window.getOfflineSigner("serenity-testnet-001")
  }
  const client = await SigningCosmWasmClient.connectWithSigner(
    "https://rpc.serenity.aura.network:443",
    offlineSigner
  );
  return client;
};

export const getAuraStaked = async (clientSigner, address) => {
  const auraStaked = await clientSigner.getBalance(address, "uaura");
  return auraStaked;
};

export const connectWallet = async () => {
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
      const clientSigner = await getClientSigner(offlineSigner)
      const auraStaked = await getAuraStaked(clientSigner, accountRes.address);
      account = {
        address: accountRes.address,
        auraStaked,
      };
    } else {
      console.error("Cannot connect wallet");
    }
  } catch (error) {
    console.error(error);
  }

  store.dispatch(updateWalletAddress(account.address));
  store.dispatch(updateAuraStaked(account.auraStaked));

  // get NFTs info
  
};