import { POSTpot } from "../types/PotTypes";

export function postPot(pot: POSTpot) {
  fetch("/api/pots", {
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
