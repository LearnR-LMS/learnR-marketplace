import { UPDATE_AURA_STAKED, UPDATE_WALLET_ADDRESS } from "./constants";

const initialState = {
  address_wallet: "",
  aura_staked: {
    amount: "0",
    denom: "uaura",
  },
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
    default:
      return state;
  }
}
