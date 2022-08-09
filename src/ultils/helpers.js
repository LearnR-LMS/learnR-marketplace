export function formatWalletAddress(address) {
  return `${address.substring(0, 3)}....${address.substring(
    address.length - 4,
    address.length
  )}`;
}

export function formatBalance(balance) {
  if(!balance) return ""
  const decimalsCount = getDecimals(balance.denom);
  const amount = balance.amount;
  const decimal = amount.substring(
    amount.length - decimalsCount,
    amount.length
  );
  const integer = amount.substring(0, amount.length - decimalsCount);
  return integer + '.' + decimal + " "  + getSubfix(balance.denom)
}

function getDecimals(denom) {
  switch (denom) {
    case "uaura":
      return 6;

    default:
      return "...";
  }
}

function getSubfix(denom){
  switch (denom) {
    case "uaura":
      return 'Aura';

    default:
      return "...";
  }
}