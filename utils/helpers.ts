import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ethers } from "ethers";
import { Transaction } from "types";

export const trimAccount = (string: string) => {
  return string.slice(0, 4) + "..." + string.slice(string.length - 4);
};

export const fixUpTransactionData = (
  transactions: TransactionResponse[],
  account: string
): (Transaction | undefined)[] => {
  return transactions
    .map((tx: TransactionResponse) => {
      if (tx.value.gt(0) && tx.to) {
        return {
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: ethers.utils.formatEther(tx.value),
        };
      }
    })
    .filter((tx) => tx)
    .reverse();
};
