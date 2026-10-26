import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export async function downloadPdf(el: HTMLElement, filename: string) {
  const canvas = await html2canvas(el, {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true,
    logging: false,
  })
  const img = canvas.toDataURL('image/png')
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageW = 210
  const pageH = 297
  const imgH = (canvas.height * pageW) / canvas.width
  let heightLeft = imgH
  let position = 0

  pdf.addImage(img, 'PNG', 0, position, pageW, imgH)
  heightLeft -= pageH

  while (heightLeft > 0.5) {
    position = heightLeft - imgH
    pdf.addPage()
    pdf.addImage(img, 'PNG', 0, position, pageW, imgH)
    heightLeft -= pageH
  }

  pdf.save(filename)
}
