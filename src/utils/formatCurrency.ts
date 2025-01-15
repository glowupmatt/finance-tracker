export const formatCurrency = (
  amount: number | string | undefined,
  fractionDigits: number = 2
): string => {
  if (amount === undefined) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
  }).format(+amount);
};
