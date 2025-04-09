const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export function currency(amount: number): string {
  return format.format(amount);
}