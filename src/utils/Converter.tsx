import Moralis from "moralis";

export function readableBalance(balance: string, decimal: number, trailing: number = 4) {
  const num = Moralis.Units.FromWei(balance, decimal);
  return parseFloat(num).toFixed(trailing);
}