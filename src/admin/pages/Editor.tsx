import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Preview } from '../components/Preview'
import { kindOf } from '../data/kinds'
import { lineTotal, money, totals } from '../lib/money'
import { downloadPdf } from '../lib/pdf'
import { blankItem, createDoc, deleteDoc, getDoc, upsertDoc } from '../lib/storage'
import type { Clause, LineItem, StudioDoc } from '../types'

export function Editor() {
  const { kind, id } = useParams()
  const navigate = useNavigate()
  const sheetRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  const [doc, setDoc] = useState<StudioDoc>(() => {
    if (id) {
      const existing = getDoc(id)
      if (existing) return existing
    }
    const config = kindOf(kind || '')
    return createDoc(config?.id || 'quotation')
  })

  const config = kindOf(doc.kind)
  const sums = useMemo(
    () => totals(doc.items, doc.taxRate, doc.discount),
    [doc.items, doc.taxRate, doc.discount],
  )

  const patch = (partial: Partial<StudioDoc>) => setDoc((prev) => ({ ...prev, ...partial }))

  const patchClient = (key: keyof StudioDoc['client'], value: string) =>
    patch({ client: { ...doc.client, [key]: value } })

  const patchItem = (itemId: string, partial: Partial<LineItem>) =>
    patch({
      items: doc.items.map((item) => (item.id === itemId ? { ...item, ...partial } : item)),
    })

  const patchClause = (clauseId: string, partial: Partial<Clause>) =>
    patch({
      clauses: doc.clauses.map((c) => (c.id === clauseId ? { ...c, ...partial } : c)),
    })

  const save = () => {
    upsertDoc(doc)
    setStatus('Saved in this browser.')
  }

  const onPdf = async () => {
    if (!sheetRef.current) return
    setBusy(true)
    setStatus('Building PDF…')
    try {
      upsertDoc(doc)
      await downloadPdf(sheetRef.current, `${doc.number || 'studio-1028'}.pdf`)
      setStatus('PDF downloaded.')
    } catch {
      setStatus('PDF failed — try Print instead.')
    } finally {
      setBusy(false)
    }
  }

  if (!config) {
    return (
      <p className="empty">
        Unknown template. <Link to="/admin">Back to office</Link>
      </p>
    )
  }

  return (
    <div>
      <div className="office-head">
        <div>
          <h1>{config.label}</h1>
          <p>{config.blurb}</p>
        </div>
        <div className="office-actions">
          <button className="office-btn office-btn--ghost" type="button" onClick={save}>
            Save
          </button>
          <button className="office-btn" type="button" onClick={onPdf} disabled={busy}>
            Download PDF
          </button>
          <button className="office-btn office-btn--ghost" type="button" onClick={() => window.print()}>
            Print
          </button>
          {id ? (
            <button
              className="office-btn office-btn--danger"
              type="button"
              onClick={() => {
                if (confirm('Delete this document?')) {
                  deleteDoc(doc.id)
                  navigate('/admin')
                }
              }}
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
      {status ? <p className="status">{status}</p> : null}

      <div className="editor-layout">
        <div className="editor-form">
          <section className="panel">
            <h2>Document</h2>
            <div className="field-grid cols-2">
              <Field label="Number" value={doc.number} onChange={(v) => patch({ number: v })} />
              <Field label="Date" type="date" value={doc.date} onChange={(v) => patch({ date: v })} />
              {config.hasValidity ? (
                <Field
                  label="Valid until"
                  type="date"
                  value={doc.validUntil}
                  onChange={(v) => patch({ validUntil: v })}
                />
              ) : null}
              {config.hasWarranty ? (
                <Field
                  label="Warranty (months)"
                  type="number"
                  value={String(doc.warrantyMonths)}
                  onChange={(v) => patch({ warrantyMonths: Number(v) || 0 })}
                />
              ) : null}
              <div className="office-field span-2">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  value={doc.title}
                  onChange={(e) => patch({ title: e.target.value })}
                />
              </div>
            </div>
          </section>

          <section className="panel">
            <h2>Client</h2>
            <div className="field-grid cols-2">
              <Field label="Name" value={doc.client.name} onChange={(v) => patchClient('name', v)} />
              <Field
                label="Company"
                value={doc.client.company}
                onChange={(v) => patchClient('company', v)}
              />
              <Field label="Email" value={doc.client.email} onChange={(v) => patchClient('email', v)} />
              <Field label="Phone" value={doc.client.phone} onChange={(v) => patchClient('phone', v)} />
              <div className="office-field span-2">
                <label htmlFor="caddr">Address</label>
                <textarea
                  id="caddr"
                  value={doc.client.address}
                  onChange={(e) => patchClient('address', e.target.value)}
                />
              </div>
            </div>
          </section>

          {config.hasItems ? (
            <section className="panel">
              <h2>Items</h2>
              {doc.items.map((item) => (
                <div className="item-row" key={item.id}>
                  <div className="office-field">
                    <label htmlFor={`in-${item.id}`}>Item</label>
                    <input
                      id={`in-${item.id}`}
                      value={item.name}
                      onChange={(e) => patchItem(item.id, { name: e.target.value })}
                    />
                  </div>
                  <div className="office-field">
                    <label htmlFor={`id-${item.id}`}>Description</label>
                    <textarea
                      id={`id-${item.id}`}
                      value={item.description}
                      onChange={(e) => patchItem(item.id, { description: e.target.value })}
                    />
                  </div>
                  <div className="office-field">
                    <label htmlFor={`iq-${item.id}`}>Qty</label>
                    <input
                      id={`iq-${item.id}`}
                      type="number"
                      min={0}
                      step="0.01"
                      value={item.qty}
                      onChange={(e) => patchItem(item.id, { qty: Number(e.target.value) })}
                    />
                  </div>
                  <div className="office-field">
                    <label htmlFor={`iu-${item.id}`}>Unit</label>
                    <input
                      id={`iu-${item.id}`}
                      value={item.unit}
                      onChange={(e) => patchItem(item.id, { unit: e.target.value })}
                    />
                  </div>
                  <div className="office-field">
                    <label htmlFor={`ip-${item.id}`}>Unit price</label>
                    <input
                      id={`ip-${item.id}`}
                      type="number"
                      min={0}
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => patchItem(item.id, { unitPrice: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <div className="line-sum">{money(lineTotal(item), doc.currency)}</div>
                    <button
                      className="office-btn office-btn--ghost"
                      type="button"
                      style={{ marginTop: '0.4rem' }}
                      onClick={() => patch({ items: doc.items.filter((i) => i.id !== item.id) })}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="office-btn office-btn--ghost"
                type="button"
                style={{ marginTop: '0.85rem' }}
                onClick={() => patch({ items: [...doc.items, blankItem()] })}
              >
                Add item
              </button>

              <div className="field-grid cols-3" style={{ marginTop: '1rem' }}>
                <Field
                  label="Discount"
                  type="number"
                  value={String(doc.discount)}
                  onChange={(v) => patch({ discount: Number(v) || 0 })}
                />
                <Field
                  label="Tax %"
                  type="number"
                  value={String(doc.taxRate)}
                  onChange={(v) => patch({ taxRate: Number(v) || 0 })}
                />
                {config.hasAdvance ? (
                  <Field
                    label="Advance %"
                    type="number"
                    value={String(doc.advancePercent)}
                    onChange={(v) => patch({ advancePercent: Number(v) || 0 })}
                  />
                ) : (
                  <Field
                    label="Currency"
                    value={doc.currency}
                    onChange={(v) => patch({ currency: v.toUpperCase() })}
                  />
                )}
              </div>
              <div className="totals-box">
                <div>Subtotal {money(sums.subtotal, doc.currency)}</div>
                <strong>Total {money(sums.grand, doc.currency)}</strong>
              </div>
            </section>
          ) : null}

          <section className="panel">
            <h2>Notes</h2>
            <div className="office-field">
              <label htmlFor="notes">Internal / client notes</label>
              <textarea
                id="notes"
                value={doc.notes}
                onChange={(e) => patch({ notes: e.target.value })}
              />
            </div>
          </section>

          {config.hasClauses ? (
            <section className="panel">
              <h2>Rules, terms &amp; policies</h2>
              <p className="clause-lede">
                House rules are preloaded. Edit any clause for this document, or add more.
              </p>
              {doc.clauses.map((clause) => (
                <div className="clause-card" key={clause.id}>
                  <div className="clause-card__head">
                    <div className="office-field">
                      <label htmlFor={`ct-${clause.id}`}>Clause title</label>
                      <input
                        id={`ct-${clause.id}`}
                        value={clause.title}
                        onChange={(e) => patchClause(clause.id, { title: e.target.value })}
                      />
                    </div>
                    <button
                      className="office-btn office-btn--ghost"
                      type="button"
                      onClick={() =>
                        patch({ clauses: doc.clauses.filter((c) => c.id !== clause.id) })
                      }
                    >
                      Remove
                    </button>
                  </div>
                  <div className="office-field">
                    <label htmlFor={`cb-${clause.id}`}>Text</label>
                    <textarea
                      id={`cb-${clause.id}`}
                      value={clause.body}
                      onChange={(e) => patchClause(clause.id, { body: e.target.value })}
                    />
                  </div>
                </div>
              ))}
              <button
                className="office-btn office-btn--ghost"
                type="button"
                onClick={() =>
                  patch({
                    clauses: [
                      ...doc.clauses,
                      { id: `c-${Date.now()}`, title: 'New clause', body: '' },
                    ],
                  })
                }
              >
                Add clause
              </button>
            </section>
          ) : null}
        </div>

        <div className="preview-wrap">
          <p className="preview-label">Live preview</p>
          <Preview doc={doc} sheetRef={sheetRef} />
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  const id = label.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')
  return (
    <div className="office-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}
