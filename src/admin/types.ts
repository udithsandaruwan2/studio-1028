export type DocKind =
  | 'quotation'
  | 'invoice'
  | 'product-sale'
  | 'maintenance'
  | 'software'
  | 'warranty'
  | 'report'
  | 'contract'
  | 'terms'

export type LineItem = {
  id: string
  name: string
  description: string
  qty: number
  unit: string
  unitPrice: number
}

export type Clause = {
  id: string
  title: string
  body: string
}

export type Party = {
  name: string
  company: string
  email: string
  phone: string
  address: string
}

export type StudioDoc = {
  id: string
  kind: DocKind
  number: string
  title: string
  date: string
  validUntil: string
  currency: string
  taxRate: number
  discount: number
  advancePercent: number
  client: Party
  items: LineItem[]
  notes: string
  clauses: Clause[]
  warrantyMonths: number
  createdAt: string
  updatedAt: string
}

export type StudioSettings = {
  company: string
  legalName: string
  email: string
  phone: string
  address: string
  website: string
  bankName: string
  bankAccount: string
  currency: string
}

export type KindConfig = {
  id: DocKind
  label: string
  prefix: string
  blurb: string
  hasItems: boolean
  hasValidity: boolean
  hasWarranty: boolean
  hasAdvance: boolean
  hasClauses: boolean
}
