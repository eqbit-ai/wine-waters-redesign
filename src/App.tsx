import { useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Award,
  Check,
  ChevronRight,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  Wine,
  X,
} from "lucide-react";
import { Button } from "./components/ui/button";
import heroImage from "./assets/cellar-hero.jpg";
import sommelierImage from "./assets/sommelier.jpg";
import rieslingImage from "./assets/riesling-product-alpha.png";
import brunelloImage from "./assets/brunello-product.jpg";
import pinotImage from "./assets/pinot-product.jpg";
import champagneImage from "./assets/champagne-product.jpg";
import waterImage from "./assets/water-product.jpg";

const categories = [
  { title: "Große Weine", note: "Charakterstarke Entdeckungen", index: "01", className: "category--wine", image: rieslingImage },
  { title: "Seltene Jahrgänge", note: "Raritäten & Auktionen", index: "02", className: "category--rare", image: brunelloImage },
  { title: "Mineralwasser", note: "Terroir in seiner reinsten Form", index: "03", className: "category--water", image: waterImage },
];

const products = [
  { name: "Westhofener Morstein", maker: "Weingut Wittmann · Rheinhessen", year: "2021", price: "86 €", tone: "ivory", type: "Weißwein", image: rieslingImage },
  { name: "Brunello di Montalcino", maker: "Tenuta Le Potazzine · Toskana", year: "2018", price: "92 €", tone: "ruby", type: "Rotwein", image: brunelloImage },
  { name: "Deidesheimer Kieselberg", maker: "Weingut Spindler · Pfalz", year: "2020", price: "48 €", tone: "cream", type: "Weißwein", image: pinotImage },
  { name: "Ruinart Blanc de Blancs", maker: "Maison Ruinart · Champagne", year: "NV", price: "98 €", tone: "gold", type: "Champagner", image: champagneImage },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function Monogram() {
  return (
    <a className="brand" href="#top" aria-label="Wine and Waters Startseite">
      <span className="brand__mark">W<span>&</span>W</span>
      <span className="brand__name">Wine <i>&</i> Waters</span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState("Alle");
  const [subscribed, setSubscribed] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 90]);

  return (
    <main id="top">
      <div className="announcement">
        <span>Persönlich kuratiert vom Sommelier</span>
        <span className="announcement__center">Kostenloser Versand in Deutschland ab 99 €</span>
        <a href="tel:+493069566050">Beratung · 030 695 66 050</a>
      </div>

      <header className="nav-shell">
        <Monogram />
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          <a href="#selection">Wein</a>
          <a href="#selection">Wasser</a>
          <a href="#collection">Raritäten</a>
          <a href="#sommelier">Der Sommelier</a>
        </nav>
        <div className="nav-actions">
          <button aria-label="Suche öffnen"><Search size={19} strokeWidth={1.5} /></button>
          <button className="bag" aria-label={`Warenkorb mit ${cartCount} Artikeln`}>
            <ShoppingBag size={19} strokeWidth={1.5} />
            {cartCount > 0 && <span>{cartCount}</span>}
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Menü öffnen">
            <Menu size={22} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} transition={{ duration: 0.35 }}>
            <button onClick={() => setMenuOpen(false)} aria-label="Menü schließen"><X /></button>
            <Monogram />
            <nav>{["Wein", "Wasser", "Raritäten", "Der Sommelier"].map((item) => <a key={item} href="#selection" onClick={() => setMenuOpen(false)}>{item}<ChevronRight /></a>)}</nav>
            <p>Persönliche Beratung<br /><a href="tel:+493069566050">030 695 66 050</a></p>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="hero">
        <motion.img style={{ y: heroY }} src={heroImage} alt="Wein und Mineralwasser in einem atmosphärischen Weinkeller" />
        <div className="hero__veil" />
        <motion.div className="hero__content" initial="hidden" animate="visible" variants={reveal}>
          <p className="eyebrow">Berlin · Est. 2012</p>
          <h1>Außergewöhnlicher<br />Geschmack ist<br /><em>kein Zufall.</em></h1>
          <p className="hero__intro">Handverlesene Weine, seltene Jahrgänge und besondere Mineralwässer — persönlich ausgewählt für Menschen mit Anspruch.</p>
          <div className="hero__buttons">
            <Button onClick={() => document.querySelector("#selection")?.scrollIntoView({ behavior: "smooth" })}>Kollektion entdecken <ArrowRight size={16} /></Button>
            <Button variant="ghost" onClick={() => document.querySelector("#sommelier")?.scrollIntoView({ behavior: "smooth" })}>Unsere Philosophie</Button>
          </div>
        </motion.div>
        <div className="hero__seal"><span>Ausgezeichnet</span><strong>4.8</strong><span>von Kennern</span></div>
        <a className="scroll-cue" href="#collection"><ArrowDown size={17} /> Entdecken</a>
      </section>

      <section className="intro" id="collection">
        <motion.p className="eyebrow" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>Die Kunst der Auswahl</motion.p>
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>Weniger Flaschen.<br /><em>Mehr Bedeutung.</em></motion.h2>
        <motion.p className="intro__copy" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>Wir suchen nicht nach dem Lautesten, sondern nach dem Wahrhaftigen. Jede Flasche in unserer Kollektion erzählt von Herkunft, Handwerk und einer Handschrift, die bleibt.</motion.p>
      </section>

      <section className="categories">
        {categories.map((category, index) => (
          <motion.a href="#selection" className={`category ${category.className}`} key={category.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.12, duration: 0.65 }} viewport={{ once: true }}>
            <span className="category__number">{category.index}</span>
            <img className="category__bottle" src={category.image} alt="" />
            <div><p>{category.note}</p><h3>{category.title}</h3></div>
            <span className="category__arrow"><ArrowRight /></span>
          </motion.a>
        ))}
      </section>

      <section className="selection" id="selection">
        <div className="section-heading">
          <div><p className="eyebrow">Arnos Auswahl</p><h2>Für Ihren <em>Keller</em></h2></div>
          <p>Flaschen mit Persönlichkeit. Herkunft, Jahrgang und Trinkmoment sorgfältig aufeinander abgestimmt.</p>
        </div>
        <div className="filters" role="tablist" aria-label="Produkte filtern">
          {["Alle", "Rotwein", "Weißwein", "Champagner"].map((filter) => <button key={filter} className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
        </div>
        <motion.div className="product-grid" layout>
          <AnimatePresence mode="popLayout">
            {products.filter((product) => activeFilter === "Alle" || product.type === activeFilter).map((product) => (
              <motion.article className="product" key={product.name} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className={`product__visual product__visual--${product.tone}`}>
                  <span className="product__year">{product.year}</span>
                  <img className="product__bottle" src={product.image} alt={`${product.name}, ${product.year}`} />
                  <button className="quick-add" onClick={() => setCartCount((count) => count + 1)}>In den Warenkorb <ArrowRight size={15} /></button>
                </div>
                <div className="product__info"><p>{product.maker}</p><h3>{product.name}</h3><strong>{product.price}</strong></div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        <Button variant="outline" className="all-products">Gesamte Auswahl ansehen <ArrowRight size={16} /></Button>
      </section>

      <section className="sommelier" id="sommelier">
        <motion.div className="sommelier__image" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}><img src={sommelierImage} alt="Sommelier bei der Verkostung eines Weines" /><span>Seit 2005<br />Wassersommelier</span></motion.div>
        <motion.div className="sommelier__copy" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="eyebrow">Erfahrung, die man schmeckt</p>
          <h2>„Eine gute Flasche<br />beginnt mit <em>Neugier.</em>“</h2>
          <p>Vom Hotel Adlon bis zum ersten Wassersommelier Europas: Arno Steguweit verbindet jahrzehntelange Erfahrung mit einer ungebrochenen Freude am Entdecken.</p>
          <p>Seine Auswahl folgt keinem Trend, sondern einem einfachen Maßstab: Charakter, Herkunft und ein Geschmack, den man nicht vergisst.</p>
          <a href="#newsletter">Arno kennenlernen <ArrowRight size={16} /></a>
          <div className="signature">Arno Steguweit <span>Sommelier & Gründer</span></div>
        </motion.div>
      </section>

      <section className="promise">
        <p className="eyebrow">Unser Versprechen</p>
        <div className="promise__grid">
          {[{ icon: Wine, title: "Persönlich kuratiert", text: "Jede Flasche von erfahrenen Sommeliers verkostet." }, { icon: Award, title: "Mit Auszeichnung", text: "Von führenden Genussmagazinen mehrfach empfohlen." }, { icon: Sparkles, title: "Sicher versendet", text: "Schnell, nachhaltig und bruchsicher bei Ihnen." }].map(({ icon: Icon, title, text }) => <div key={title}><Icon strokeWidth={1.2} /><h3>{title}</h3><p>{text}</p></div>)}
        </div>
      </section>

      <section className="newsletter" id="newsletter">
        <div><p className="eyebrow">Post aus dem Keller</p><h2>Geschmack lässt sich<br /><em>entdecken.</em></h2></div>
        <div className="newsletter__form">
          <p>Neue Winzer, seltene Jahrgänge und persönliche Empfehlungen — in Ruhe ausgewählt, gelegentlich gesendet.</p>
          {subscribed ? <div className="success"><Check /> Vielen Dank. Sie sind dabei.</div> : <form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}><input type="email" required placeholder="Ihre E-Mail-Adresse" aria-label="E-Mail-Adresse" /><button aria-label="Newsletter abonnieren"><ArrowRight /></button></form>}
          <small>Mit der Anmeldung stimmen Sie unserer Datenschutzerklärung zu.</small>
        </div>
      </section>

      <footer>
        <div className="footer__top"><Monogram /><p>Besondere Weine und Mineralwässer.<br />Persönlich ausgewählt in Berlin.</p><a href="tel:+493069566050">030 695 66 050</a></div>
        <div className="footer__links"><div><span>Entdecken</span><a href="#selection">Rotwein</a><a href="#selection">Weißwein</a><a href="#selection">Champagner</a><a href="#selection">Mineralwasser</a></div><div><span>Wine & Waters</span><a href="#sommelier">Über uns</a><a href="#sommelier">Auszeichnungen</a><a href="#newsletter">Journal</a><a href="#newsletter">Kontakt</a></div><div><span>Service</span><a href="#top">Versand & Zahlung</a><a href="#top">Persönliche Beratung</a><a href="#top">FAQ</a><a href="#top">Großhandel</a></div></div>
        <div className="footer__bottom"><span>© 2026 Wine & Waters OHG</span><div><a href="#top">Impressum</a><a href="#top">Datenschutz</a><a href="#top">AGB</a></div><span>Berlin, Deutschland</span></div>
      </footer>
    </main>
  );
}

export default App;
