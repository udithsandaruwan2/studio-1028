import type { Clause, DocKind } from '../types'

export const alwaysOnPolicies: Clause[] = [
  {
    id: 'brand',
    title: 'Brand attribution',
    body: 'All work, software, websites, campaigns, and products delivered by Studio 1028 must carry the credit “Developed by Studio 1028”. The credit may not be removed, replaced, or hidden without written consent from Studio 1028.',
  },
  {
    id: 'code',
    title: 'Source code and intellectual property',
    body: 'Studio 1028 does not share source code, repositories, design source files, or internal tooling with clients. Source remains the exclusive property of Studio 1028 and is accessible only to the Studio 1028 team. The client receives the agreed deliverable (compiled software, hosted product, device, content, or service) and a licence to use it — not ownership of the underlying code or systems, unless a separate written source-escrow agreement is signed.',
  },
  {
    id: 'confidential',
    title: 'Confidentiality',
    body: 'Both parties will keep non-public information learned during the engagement confidential. Studio 1028 may list the client name in its portfolio unless the client requests otherwise in writing.',
  },
  {
    id: 'law',
    title: 'Governing law',
    body: 'These terms are governed by the laws of Sri Lanka. Disputes will first be addressed in good faith between the parties.',
  },
]

export const kindPolicies: Record<DocKind, Clause[]> = {
  quotation: [
    {
      id: 'validity',
      title: 'Validity',
      body: 'This quotation is valid until the date shown. After that date, prices and availability may change.',
    },
    {
      id: 'advance',
      title: 'Commencement',
      body: 'Work, procurement, or build starts after the stated advance (if any) is received. Remaining balance is due on delivery or as scheduled in a follow-on invoice.',
    },
    {
      id: 'scope',
      title: 'Scope',
      body: 'Only items listed are included. Anything not listed is out of scope and will be quoted separately.',
    },
  ],
  invoice: [
    {
      id: 'payment',
      title: 'Payment',
      body: 'Payment is due on receipt unless a later due date is stated. Late payment may pause support, warranty, or remaining work.',
    },
    {
      id: 'title',
      title: 'Title',
      body: 'Hardware remains the property of Studio 1028 until paid in full. Digital licences activate on cleared payment.',
    },
  ],
  'product-sale': [
    {
      id: 'spec',
      title: 'Specification',
      body: 'The device or product is supplied to the specification listed. Cosmetic variation that does not affect function is not a defect.',
    },
    {
      id: 'returns',
      title: 'Returns',
      body: 'Opened hardware, custom builds, and ordered-to-spec devices are not returnable except where required by law or covered by the warranty clause.',
    },
  ],
  maintenance: [
    {
      id: 'data',
      title: 'Client data',
      body: 'The client is responsible for backing up data before servicing. Studio 1028 is not liable for data loss unless caused by wilful misconduct.',
    },
    {
      id: 'parts',
      title: 'Parts',
      body: 'Replaced parts may be new or equivalent. Old parts are not returned unless requested at drop-off.',
    },
  ],
  software: [
    {
      id: 'licence',
      title: 'Licence',
      body: 'The client is granted a non-exclusive licence to use the delivered software for their business. The licence is not transferable without written approval. Source code, repositories, and build pipelines are not part of the delivery.',
    },
    {
      id: 'hosting',
      title: 'Hosting and third parties',
      body: 'Domain, hosting, app-store, and third-party fees are the client’s unless listed as a line item. Studio 1028 may use subcontractors under the same confidentiality terms.',
    },
    {
      id: 'changes',
      title: 'Change requests',
      body: 'Work outside the listed items is a change request and will be quoted before it is built.',
    },
  ],
  warranty: [
    {
      id: 'cover',
      title: 'Coverage',
      body: 'Warranty covers manufacturing or workmanship faults during the stated period. It does not cover accidental damage, liquid, power surge, unauthorised repair, or normal wear.',
    },
    {
      id: 'claim',
      title: 'Claims',
      body: 'To claim, contact Studio 1028 with this certificate and a description of the fault. Studio 1028 may repair, replace, or refund at its discretion.',
    },
  ],
  report: [
    {
      id: 'findings',
      title: 'Findings',
      body: 'This report records observations at the time of inspection or delivery. It is not a guarantee of future condition unless a warranty document is issued separately.',
    },
  ],
  contract: [
    {
      id: 'term',
      title: 'Term',
      body: 'This agreement starts on the date above and continues until the listed work is delivered, or until either party ends it in writing with fourteen (14) days’ notice, subject to payment for work already done.',
    },
    {
      id: 'ip',
      title: 'Intellectual property',
      body: 'Pre-existing Studio 1028 tools, templates, libraries, and code stay with Studio 1028. Client content stays with the client. Deliverables are licensed as described in the software and brand clauses.',
    },
    {
      id: 'liability',
      title: 'Liability',
      body: 'Studio 1028’s total liability under this agreement is limited to the fees paid for the specific items giving rise to the claim. Indirect or consequential loss is excluded to the extent permitted by law.',
    },
  ],
  terms: [
    {
      id: 'house',
      title: 'House rules',
      body: 'Studio 1028 works on a written brief. Verbal extras are not binding until added to a quotation or invoice. Communication is expected in good faith and within reasonable hours.',
    },
  ],
}

export function clausesFor(kind: DocKind): Clause[] {
  return [...kindPolicies[kind], ...alwaysOnPolicies]
}
