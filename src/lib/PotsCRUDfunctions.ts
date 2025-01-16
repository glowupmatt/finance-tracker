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

export async function postPot(pot: POSTpot) {
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

  return "Pot added successfully!";
}

export async function putPot(pot: PotType) {
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
