import { products } from '../data/content'
import { Reveal } from './Reveal'

export function Products() {
  return (
    <section className="section" id="products">
      <div className="shell">
        <div className="work__head">
          <Reveal>
            <p className="mono section__label">003b — Open products</p>
            <h2 className="section__title">What the community is shipping</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section__lead">
              Studio 1028 is a community and open-source project company. These are live tools and
              builds in progress — made to be used, forked, and improved.
            </p>
          </Reveal>
        </div>

        <div className="products__grid">
          {products.map((item, i) => {
            const inner = (
              <>
                <div className="products__meta">
                  <span className="mono">{item.id}</span>
                  <span className={`products__status mono${item.status === 'Live' ? ' is-live' : ''}`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="products__title">{item.title}</h3>
                <p className="products__blurb">{item.blurb}</p>
                {item.url ? (
                  <span className="products__link mono">Open →</span>
                ) : (
                  <span className="products__link mono">Coming soon</span>
                )}
              </>
            )

            return (
              <Reveal key={item.id} delay={i * 0.06}>
                {item.url ? (
                  <a
                    className="products__card"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="products__card products__card--soon">{inner}</div>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
