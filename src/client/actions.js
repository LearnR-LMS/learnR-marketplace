import { UPDATE_AURA_STAKED, UPDATE_CLIENT_SIGNER, UPDATE_LIST_PEN, UPDATE_WALLET_ADDRESS } from "./constants";

export function updateWalletAddress(address) {
  return {
    type: UPDATE_WALLET_ADDRESS,
    payload: address,
  };
}

export function updateAuraStaked(auraStaked) {
  return {
    type: UPDATE_AURA_STAKED,
    payload: auraStaked,
  };
}
export function updateClientSigner(clientSigner) {
  return {
    type: UPDATE_CLIENT_SIGNER,
    payload: clientSigner,
  };
}
export function updateListPenNFTs(pens) {
  return {
    type: UPDATE_LIST_PEN,
    payload: pens,
  };
}
