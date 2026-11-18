import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { ImageStrip } from '../components/ImageStrip'
import { About } from '../components/About'
import { FilmBand } from '../components/FilmBand'
import { Practices } from '../components/Practices'
import { Products } from '../components/Products'
import { Work } from '../components/Work'
import { Method } from '../components/Method'
import { Notes } from '../components/Notes'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { useLenis } from '../hooks/useLenis'

export function Home() {
  useLenis()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ImageStrip />
        <About />
        <FilmBand />
        <Practices />
        <Products />
        <Work />
        <Method />
        <Notes />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
