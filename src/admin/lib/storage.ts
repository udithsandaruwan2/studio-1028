import { clausesFor } from '../data/policies'
import { kindOf } from '../data/kinds'
import type { LineItem, Party, StudioDoc, StudioSettings } from '../types'
import { nextNumber, plusDays, todayIso, uid } from './ids'

const DOC_KEY = 'studio1028.office.docs.v1'
const SET_KEY = 'studio1028.office.settings.v1'

export const defaultSettings: StudioSettings = {
  company: 'Studio 1028',
  legalName: 'Studio 1028',
  email: 'hello@studio1028.com',
  phone: '',
  address: 'Colombo, Sri Lanka',
  website: 'https://1028.lumyrth.dev',
  bankName: '',
  bankAccount: '',
  currency: 'LKR',
}

const emptyClient: Party = {
  name: '',
  company: '',
  email: '',
  phone: '',
  address: '',
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function loadSettings(): StudioSettings {
  return { ...defaultSettings, ...readJson(SET_KEY, {}) }
}

export function saveSettings(next: StudioSettings) {
  localStorage.setItem(SET_KEY, JSON.stringify(next))
}

export function loadDocs(): StudioDoc[] {
  return readJson<StudioDoc[]>(DOC_KEY, []).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export function saveDocs(docs: StudioDoc[]) {
  localStorage.setItem(DOC_KEY, JSON.stringify(docs))
}

export function getDoc(id: string) {
  return loadDocs().find((d) => d.id === id)
}

export function upsertDoc(doc: StudioDoc) {
  const docs = loadDocs().filter((d) => d.id !== doc.id)
  docs.unshift({ ...doc, updatedAt: new Date().toISOString() })
  saveDocs(docs)
  return doc
}

export function deleteDoc(id: string) {
  saveDocs(loadDocs().filter((d) => d.id !== id))
}

export function blankItem(): LineItem {
  return {
    id: uid('item'),
    name: '',
    description: '',
    qty: 1,
    unit: 'unit',
    unitPrice: 0,
  }
}

export function createDoc(kindId: string): StudioDoc {
  const kind = kindOf(kindId)
  if (!kind) throw new Error('Unknown document kind')
  const date = todayIso()
  const settings = loadSettings()
  return {
    id: uid('doc'),
    kind: kind.id,
    number: nextNumber(
      kind.prefix,
      loadDocs().map((d) => d.number),
    ),
    title: `${kind.label} — `,
    date,
    validUntil: kind.hasValidity ? plusDays(date, 14) : '',
    currency: settings.currency,
    taxRate: 0,
    discount: 0,
    advancePercent: kind.hasAdvance ? 50 : 0,
    client: { ...emptyClient },
    items: kind.hasItems ? [blankItem()] : [],
    notes: '',
    clauses: clausesFor(kind.id),
    warrantyMonths: kind.hasWarranty ? 12 : 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export { emptyClient }
