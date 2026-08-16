export function formatPKR(price: number): string {
  if (price >= 10000000) {
    const crore = price / 10000000;
    return `PKR ${crore % 1 === 0 ? crore : crore.toFixed(2).replace(/\.00$/, '')} Crore`;
  }
  if (price >= 100000) {
    const lakh = price / 100000;
    return `PKR ${lakh % 1 === 0 ? lakh : lakh.toFixed(2).replace(/\.00$/, '')} Lakh`;
  }
  return `PKR ${price.toLocaleString()}`;
}
