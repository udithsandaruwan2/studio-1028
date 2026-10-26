export function uid(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

export function nextNumber(prefix: string, existing: string[]) {
  const stamp = new Date().toISOString().slice(0, 10).replaceAll('-', '')
  const head = `ST1028-${prefix}-${stamp}-`
  const seq =
    existing
      .filter((n) => n.startsWith(head))
      .map((n) => Number(n.slice(head.length)))
      .filter((n) => Number.isFinite(n))
      .reduce((max, n) => Math.max(max, n), 0) + 1
  return `${head}${String(seq).padStart(3, '0')}`
}

export function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

export function plusDays(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00`)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}
