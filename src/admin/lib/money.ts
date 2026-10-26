import type { LineItem } from '../types'

export function money(n: number, currency = 'LKR') {
  const value = Number.isFinite(n) ? n : 0
  try {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(value)
  } catch {
    return `${currency} ${value.toFixed(2)}`
  }
}

export function lineTotal(item: LineItem) {
  return round2((item.qty || 0) * (item.unitPrice || 0))
}

export function totals(items: LineItem[], taxRate: number, discount: number) {
  const subtotal = round2(items.reduce((sum, item) => sum + lineTotal(item), 0))
  const less = round2(Math.max(0, discount || 0))
  const taxable = round2(Math.max(0, subtotal - less))
  const tax = round2(taxable * ((taxRate || 0) / 100))
  const grand = round2(taxable + tax)
  return { subtotal, discount: less, tax, grand }
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}
