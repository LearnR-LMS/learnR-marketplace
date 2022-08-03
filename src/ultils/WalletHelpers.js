import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export const getAuraStaked = async (offlineSigner) => {
  const client = await SigningCosmWasmClient.connectWithSigner(
    "https://rpc.serenity.aura.network:443",
    offlineSigner
  );
  const accountRes = (await offlineSigner.getAccounts())[0];
  const auraStaked = await client.getBalance(accountRes.address, "uaura");
  return auraStaked
};

export const connectWallet = async () => {
  const chainId = "serenity-testnet-001";
  let account = {
    address: '',
    auraStaked: {
      amount: '0',
      denom: ''
    },
  }
  try {
    const keplrEnable = await window.keplr.enable(chainId);
    if (keplrEnable) {
      const offlineSigner = window.getOfflineSigner(chainId);
      const accountRes = (await offlineSigner.getAccounts())[0];
      const auraStaked = await getAuraStaked(offlineSigner);
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
  return account;
};
