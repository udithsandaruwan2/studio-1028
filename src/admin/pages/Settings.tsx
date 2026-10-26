import { useState, type FormEvent } from 'react'
import { defaultSettings, loadSettings, saveSettings } from '../lib/storage'
import type { StudioSettings } from '../types'

export function Settings() {
  const [form, setForm] = useState<StudioSettings>(loadSettings)
  const [saved, setSaved] = useState(false)

  const set = (key: keyof StudioSettings, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    saveSettings(form)
    setSaved(true)
  }

  return (
    <div className="office-settings">
      <div className="office-head">
        <div>
          <h1>Studio details</h1>
          <p>These print on every document. Stored in this browser until you move to production.</p>
        </div>
      </div>
      <form className="panel" onSubmit={onSubmit}>
        <div className="field-grid cols-2">
          <Field label="Company" value={form.company} onChange={(v) => set('company', v)} />
          <Field label="Legal name" value={form.legalName} onChange={(v) => set('legalName', v)} />
          <Field label="Email" value={form.email} onChange={(v) => set('email', v)} />
          <Field label="Phone" value={form.phone} onChange={(v) => set('phone', v)} />
          <div className="office-field span-2">
            <label htmlFor="address">Address</label>
            <input id="address" value={form.address} onChange={(e) => set('address', e.target.value)} />
          </div>
          <Field label="Website" value={form.website} onChange={(v) => set('website', v)} />
          <Field label="Currency" value={form.currency} onChange={(v) => set('currency', v)} />
          <Field label="Bank" value={form.bankName} onChange={(v) => set('bankName', v)} />
          <Field label="Account" value={form.bankAccount} onChange={(v) => set('bankAccount', v)} />
        </div>
        <div className="office-actions" style={{ marginTop: '1rem' }}>
          <button className="office-btn" type="submit">
            Save details
          </button>
          <button
            className="office-btn office-btn--ghost"
            type="button"
            onClick={() => {
              setForm(defaultSettings)
              saveSettings(defaultSettings)
              setSaved(true)
            }}
          >
            Reset
          </button>
          {saved ? <span className="status">Saved.</span> : null}
        </div>
      </form>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  const id = label.toLowerCase().replaceAll(' ', '-')
  return (
    <div className="office-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}
