import { CartProvider } from './context/CartContext'
import BackgroundVideo from './components/BackgroundVideo'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Catalog from './components/Catalog'
import Reviews from './components/Reviews'
import Social from './components/Social'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

export default function App() {
  return (
    <CartProvider>
      {/* HERO SCREEN (replicates the provided spec layout) */}
      <div
        id="top"
        className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-ink antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen"
      >
        <BackgroundVideo />

        <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
          <Navbar />
          <main
            id="spade-hero"
            className="w-full max-w-7xl mx-auto px-6 pt-28 pb-12 lg:py-12 flex-1 flex flex-col justify-center"
          >
            <Hero />
          </main>
        </div>
      </div>

      {/* STORE SECTIONS */}
      <div className="relative bg-white">
        <Catalog />
        <Reviews />
        <Social />
        <Footer />
      </div>

      <CartDrawer />
    </CartProvider>
  )
}
