import type { RefObject } from 'react'
import { kindOf } from '../data/kinds'
import { loadSettings } from '../lib/storage'
import { lineTotal, money, totals } from '../lib/money'
import type { StudioDoc } from '../types'

type Props = {
  doc: StudioDoc
  sheetRef: RefObject<HTMLElement | null>
}

export function Preview({ doc, sheetRef }: Props) {
  const settings = loadSettings()
  const kind = kindOf(doc.kind)
  const sums = totals(doc.items, doc.taxRate, doc.discount)
  const advance = doc.advancePercent ? (sums.grand * doc.advancePercent) / 100 : 0

  return (
    <article className="sheet" ref={sheetRef} id="office-sheet">
      <header className="sheet__top">
        <div>
          <img className="sheet__logo" src="/brand/logo-black.png" alt="Studio 1028" />
          <p style={{ margin: '8px 0 0', fontSize: 11 }}>
            {settings.legalName}
            <br />
            {settings.address}
            <br />
            {settings.email}
            {settings.phone ? ` · ${settings.phone}` : ''}
            <br />
            {settings.website}
          </p>
        </div>
        <div className="sheet__meta">
          <h1>{kind?.label}</h1>
          <p>{doc.number || 'Draft'}</p>
          <p>Date {doc.date}</p>
          {doc.validUntil ? <p>Valid until {doc.validUntil}</p> : null}
          {doc.warrantyMonths ? <p>Warranty {doc.warrantyMonths} months</p> : null}
        </div>
      </header>

      <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, margin: '0 0 14px' }}>
        {doc.title || kind?.label}
      </p>

      <div className="sheet__parties">
        <div>
          <h3>From</h3>
          <p>
            {settings.company}
            <br />
            Colombo · Studio practice
          </p>
        </div>
        <div>
          <h3>Prepared for</h3>
          <p>
            {doc.client.name || 'Client name'}
            {doc.client.company ? (
              <>
                <br />
                {doc.client.company}
              </>
            ) : null}
            {doc.client.address ? (
              <>
                <br />
                {doc.client.address}
              </>
            ) : null}
            {doc.client.email ? (
              <>
                <br />
                {doc.client.email}
              </>
            ) : null}
            {doc.client.phone ? (
              <>
                <br />
                {doc.client.phone}
              </>
            ) : null}
          </p>
        </div>
      </div>

      {doc.items.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th className="num">Qty</th>
              <th className="num">Unit</th>
              <th className="num">Amount</th>
            </tr>
          </thead>
          <tbody>
            {doc.items.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.name || 'Untitled item'}</strong>
                  {item.description ? <div className="desc">{item.description}</div> : null}
                </td>
                <td className="num">
                  {item.qty} {item.unit}
                </td>
                <td className="num">{money(item.unitPrice, doc.currency)}</td>
                <td className="num">{money(lineTotal(item), doc.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {doc.items.length > 0 ? (
        <div className="sheet__totals">
          <div>
            <span>Subtotal</span>
            <span>{money(sums.subtotal, doc.currency)}</span>
          </div>
          {sums.discount > 0 ? (
            <div>
              <span>Discount</span>
              <span>− {money(sums.discount, doc.currency)}</span>
            </div>
          ) : null}
          {doc.taxRate > 0 ? (
            <div>
              <span>Tax {doc.taxRate}%</span>
              <span>{money(sums.tax, doc.currency)}</span>
            </div>
          ) : null}
          <div className="grand">
            <span>Total</span>
            <span>{money(sums.grand, doc.currency)}</span>
          </div>
          {advance > 0 ? (
            <div>
              <span>Advance {doc.advancePercent}%</span>
              <span>{money(advance, doc.currency)}</span>
            </div>
          ) : null}
        </div>
      ) : null}

      {doc.notes ? (
        <div className="sheet__notes">
          <h3 style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Notes</h3>
          <p>{doc.notes}</p>
        </div>
      ) : null}

      {doc.clauses.map((clause) => (
        <section className="sheet__clause" key={clause.id}>
          <h4>{clause.title}</h4>
          <p>{clause.body}</p>
        </section>
      ))}

      <div className="sheet__sign">
        <div className="sheet__sign-col">
          <img
            className="sheet__sign-mark"
            src="/brand/signature.png"
            alt="Signature of Udith Sandaruwan"
          />
          <p className="sheet__sign-line">
            Udith Sandaruwan
            <small>Studio 1028</small>
          </p>
        </div>
        <div className="sheet__sign-col sheet__sign-col--client">
          <p className="sheet__sign-line">Client acknowledgement</p>
        </div>
      </div>

      <footer className="sheet__foot">
        Developed by Studio 1028 · Source code and internal systems remain with the studio team ·{' '}
        {settings.website}
        {settings.bankName ? (
          <>
            <br />
            Bank: {settings.bankName} {settings.bankAccount}
          </>
        ) : null}
      </footer>
    </article>
  )
}
