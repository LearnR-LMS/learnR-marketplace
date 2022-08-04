import { UPDATE_AURA_STAKED, UPDATE_CLIENT_SIGNER, UPDATE_LIST_PEN, UPDATE_WALLET_ADDRESS } from "./constants";

const initialState = {
  address_wallet: "",
  aura_staked: {
    amount: "0",
    denom: "uaura",
  },
  clientSigner: null,
  pen_nfts: []
};

export default function clientReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case UPDATE_WALLET_ADDRESS: {
      return {
        ...state,
        address_wallet: action?.payload,
      };
    }
    case UPDATE_AURA_STAKED: {
      return {
        ...state,
        aura_staked: action?.payload,
      };
    }
    case UPDATE_CLIENT_SIGNER: {
      return {
        ...state,
        clientSigner: action?.payload,
      };
    }
    case UPDATE_LIST_PEN: {
      return {
        ...state,
        pen_nfts: action?.payload,
      };
    }
    default:
      return state;
  }
}
