/* eslint-disable @typescript-eslint/no-explicit-any */
import { POSTpot, PotType } from "../types/PotTypes";

export async function fetchPots() {
  try {
    const response = await fetch("/api/pots");
    const data = await response.json();
    return data.pots;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPot(id: string) {
  try {
    const response = await fetch(`/api/pots/${id}`);
    const data = await response.json();
    return data.pot;
  } catch (error) {
    console.log(error);
  }
}

export async function postPot(pot: POSTpot | any | undefined) {
  if (!pot) return;
  return await fetch("/api/pots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: pot.title,
      targetAmount: Number(pot.targetAmount),
      colorTag: pot.colorTag,
    }),
  });
}

export async function putPot(pot: PotType | any | undefined) {
  if (!pot) return;
  return await fetch(`/api/pots/${pot.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: pot.title,
      targetAmount: Number(pot.targetAmount),
      colorTag: pot.colorTag,
    }),
  });
}

export async function deletePot(id: string | undefined) {
  if (!id) return;

  return await fetch(`/api/pots/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function postTransaction(
  potId: string,
  transactionAmount: number,
  isDeposit: boolean
) {
  return await fetch(`/api/pots/${potId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Number(transactionAmount),
      isDeposit,
    }),
  });
}
