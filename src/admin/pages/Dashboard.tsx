import { Link } from 'react-router-dom'
import { kinds } from '../data/kinds'
import { loadDocs } from '../lib/storage'
import { money, totals } from '../lib/money'

export function Dashboard() {
  const docs = loadDocs()

  return (
    <div>
      <div className="office-head">
        <div>
          <h1>Office</h1>
          <p>
            Create quotations, invoices, sales, maintenance, software, warranties, reports,
            contracts, and policy letters. Totals calculate as you type. Download as PDF.
          </p>
        </div>
      </div>

      <div className="kind-grid">
        {kinds.map((kind) => (
          <Link className="kind-card" key={kind.id} to={`/admin/new/${kind.id}`}>
            <strong>{kind.label}</strong>
            <span>{kind.blurb}</span>
            <em>New {kind.prefix}</em>
          </Link>
        ))}
      </div>

      <h2 className="office-section-title">Saved documents</h2>
      {docs.length === 0 ? (
        <p className="empty">Nothing saved yet. Pick a template above.</p>
      ) : (
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Number</th>
                <th>Type</th>
                <th>Client</th>
                <th>Date</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => {
                const kind = kinds.find((k) => k.id === doc.kind)
                const sum = totals(doc.items, doc.taxRate, doc.discount)
                return (
                  <tr key={doc.id}>
                    <td>
                      <Link to={`/admin/doc/${doc.id}`}>{doc.number || 'Draft'}</Link>
                    </td>
                    <td>{kind?.label}</td>
                    <td>{doc.client.name || doc.client.company || '—'}</td>
                    <td>{doc.date}</td>
                    <td>{doc.items.length ? money(sum.grand, doc.currency) : '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
