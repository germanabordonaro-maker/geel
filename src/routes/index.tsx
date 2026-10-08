import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import hero from "@/assets/hero.jpg";
import web from "@/assets/web.jpg";
import photo from "@/assets/photo.jpg";
import consult from "@/assets/consult.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studio — Ti aiutiamo a raccontare meglio quello che fai" },
      {
        name: "description",
        content:
          "Piccolo team creativo: siti web, foto e contenuti visivi, consulenza per brand, professionisti e realtà indipendenti.",
      },
      { property: "og:title", content: "Studio — Ti aiutiamo a raccontare meglio quello che fai" },
      {
        property: "og:description",
        content: "Strategia, design e immagini per dare forma alla tua presenza online.",
      },
    ],
  }),
  component: Index,
});

const EMAIL = "ciao@studio.it";
const INSTAGRAM = "@studio";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Cta({ href = "#contatti", children, variant = "solid" }: { href?: string; children: ReactNode; variant?: "solid" | "line" | "accent" }) {
  const styles = {
    solid: "bg-primary text-primary-foreground hover:bg-accent",
    accent: "bg-accent text-accent-foreground hover:bg-primary",
    line: "border border-foreground/30 text-foreground hover:border-foreground",
  }[variant];
  return (
    <a href={href} className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-300 ${styles}`}>
      {children}
    </a>
  );
}

function TextLink({ href = "#contatti", children }: { href?: string; children: ReactNode }) {
  return (
    <a href={href} className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-sm font-medium transition-colors hover:border-accent hover:text-accent">
      {children}
    </a>
  );
}

const services = [
  {
    n: "A", tag: "Sito web", img: web, title: "Un sito che ti assomiglia.",
    text: "Progettiamo siti web semplici, belli e facili da usare, pensati per raccontare il tuo progetto e accompagnare le persone verso ciò che vuoi far loro fare.",
    items: ["Struttura e contenuti", "UX e user journey", "Design", "Responsive", "Sviluppo e messa online"],
    cta: "Parliamo del tuo sito →", value: "sito",
  },
  {
    n: "B", tag: "Foto & contenuti", img: photo, title: "Immagini che fanno venire voglia di fermarsi.",
    text: "Realizziamo fotografie e contenuti visivi per raccontare il tuo brand, il tuo spazio, i tuoi prodotti o il tuo lavoro sul sito e sui social.",
    items: ["Sito web", "Instagram", "Campagne", "Portfolio", "E-commerce", "Storytelling del brand"],
    cta: "Parliamo delle immagini →", value: "foto",
  },
  {
    n: "C", tag: "Consulenza", img: consult, title: "Prima di fare, capiamo cosa serve davvero.",
    text: "Se hai già un sito, un'identità o dei contenuti ma non sai come migliorarli, partiamo da quello che hai e individuiamo insieme cosa funziona, cosa manca e cosa vale davvero la pena cambiare.",
    items: ["UX audit", "Analisi del sito", "Consulenza strategica", "Revisione della presenza digitale", "Direzione visiva", "Roadmap di intervento"],
    cta: "Chiedi una consulenza →", value: "consulenza",
  },
];

const principles = [
  ["01", "Ascolto", "Partiamo da te, non dal servizio da vendere."],
  ["02", "Chiarezza", "Trasformiamo idee e bisogni in soluzioni semplici."],
  ["03", "Cura", "Seguiamo personalmente ogni progetto, dall'idea al risultato."],
  ["04", "Flessibilità", "Costruiamo il lavoro intorno alle tue esigenze, senza pacchetti preconfezionati."],
];

const projects = [
  { cat: "Website", span: "md:col-span-7", ratio: "aspect-[4/3]" },
  { cat: "Photography", span: "md:col-span-5", ratio: "aspect-[4/5]" },
  { cat: "UX & Digital", span: "md:col-span-5", ratio: "aspect-[4/5]" },
  { cat: "Brand Content", span: "md:col-span-7", ratio: "aspect-[4/3]" },
];

function Index() {
  useReveal();
  const [need, setNeed] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Nome: ${f.get("nome")}\nEmail: ${f.get("email")}\nDi cosa ho bisogno: ${f.get("bisogno") || "-"}\n\n${f.get("messaggio")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Parliamone — " + f.get("nome"))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="bg-background text-foreground">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-40 bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <a href="#" className="font-serif text-xl italic">Studio</a>
          <nav className="hidden items-center gap-8 text-sm md:flex">
            <a href="#servizi" className="hover:text-accent">Servizi</a>
            <a href="#approccio" className="hover:text-accent">Approccio</a>
            <a href="#chi-siamo" className="hover:text-accent">Chi siamo</a>
            <a href="#lavori" className="hover:text-accent">Lavori</a>
            <Cta>Parliamone →</Cta>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 pt-32 md:px-10 md:pt-44">
          <p className="eyebrow reveal">Piccolo studio creativo indipendente</p>
          <h1 className="reveal mt-6 max-w-5xl text-5xl leading-[1.02] md:text-8xl">
            Il tuo progetto merita di essere <em className="text-accent">raccontato bene.</em>
          </h1>
          <div className="reveal mt-10 grid gap-10 md:grid-cols-12">
            <p className="text-lg leading-relaxed text-muted-foreground md:col-span-6 md:text-xl">
              Siamo un piccolo team creativo e aiutiamo brand, professionisti e realtà indipendenti a costruire una presenza online più chiara, bella e coerente.
            </p>
            <div className="md:col-span-5 md:col-start-8">
              <div className="flex flex-wrap items-center gap-4">
                <Cta>Parliamone →</Cta>
                <TextLink href="#servizi">Scopri cosa possiamo fare</TextLink>
              </div>
              <p className="mt-5 font-serif text-base italic text-muted-foreground">Anche se non sai ancora esattamente da dove partire.</p>
            </div>
          </div>
          <div className="reveal mt-16 overflow-hidden rounded-sm md:mt-24">
            <img src={hero} alt="Tavolo di lavoro con provini fotografici, campioni di carta e una macchina fotografica" width={1536} height={1024} className="h-[60vh] w-full object-cover md:h-[80vh]" />
          </div>
        </section>

        {/* Problema */}
        <section className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
          <div className="grid gap-12 md:grid-cols-12">
            <h2 className="reveal text-4xl leading-tight md:col-span-7 md:text-6xl">
              Hai qualcosa di bello da raccontare. Ma online non si vede ancora.
            </h2>
            <div className="reveal space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9 md:pt-4">
              <p>Può essere un prodotto, un'attività, uno studio, un progetto o semplicemente un'idea a cui tieni molto.</p>
              <p className="text-foreground">Spesso il problema non è quello che fai, ma il modo in cui lo racconti.</p>
            </div>
          </div>
          <div className="mt-20 grid border-t border-border md:grid-cols-3">
            {["Il sito non ti rappresenta più.", "Le tue immagini non raccontano davvero il tuo lavoro.", "Non sai da dove partire per migliorare la tua presenza online."].map((t, i) => (
              <div key={t} className="reveal border-b border-border py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                <span className="eyebrow">0{i + 1}</span>
                <p className="mt-4 font-serif text-2xl leading-snug">"{t}"</p>
              </div>
            ))}
          </div>
          <p className="reveal mt-16 font-serif text-3xl italic text-accent md:text-4xl">È qui che possiamo aiutarti.</p>
        </section>

        {/* Servizi */}
        <section id="servizi" className="bg-card py-28 md:py-40">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <p className="eyebrow reveal">Servizi</p>
            <h2 className="reveal mt-4 text-4xl md:text-7xl">Da dove possiamo partire.</h2>
            <div className="mt-20 space-y-24 md:space-y-36">
              {services.map((s, i) => (
                <article key={s.n} className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
                  <div className={`reveal img-zoom rounded-sm md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}>
                    <img src={s.img} alt={s.tag} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
                  </div>
                  <div className={`reveal md:col-span-5 ${i % 2 ? "md:order-1" : "md:col-start-8"}`}>
                    <p className="eyebrow">{s.n} — {s.tag}</p>
                    <h3 className="mt-4 text-3xl leading-tight md:text-5xl">{s.title}</h3>
                    <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{s.text}</p>
                    <ul className="mt-8 flex flex-wrap gap-2">
                      {s.items.map((it) => (
                        <li key={it} className="rounded-full border border-border px-3 py-1 text-xs">{it}</li>
                      ))}
                    </ul>
                    <div className="mt-10">
                      <TextLink href="#contatti">
                        <span onClick={() => setNeed(s.value)}>{s.cta}</span>
                      </TextLink>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Approccio */}
        <section id="approccio" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow reveal">Il nostro approccio</p>
              <h2 className="reveal mt-4 text-4xl leading-tight md:text-6xl">Non partiamo da un template.</h2>
            </div>
            <div className="reveal space-y-4 text-lg leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7 md:pt-10">
              <p className="text-foreground">Prima di progettare, ascoltiamo.</p>
              <p>Cerchiamo di capire cosa fai, chi vuoi raggiungere e cosa vuoi ottenere. Poi scegliamo insieme cosa serve davvero.</p>
            </div>
          </div>
          <div className="mt-20 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(([n, t, d]) => (
              <div key={n} className="reveal bg-background p-8 transition-colors hover:bg-card">
                <span className="font-serif text-5xl italic text-accent">{n}</span>
                <h3 className="mt-8 font-sans text-sm font-semibold uppercase tracking-[0.18em]">{t}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Non sai cosa ti serve */}
        <section className="bg-primary py-28 text-primary-foreground md:py-40">
          <div className="mx-auto max-w-5xl px-5 text-center md:px-10">
            <h2 className="reveal text-4xl leading-tight md:text-6xl">
              Non sai se ti serve un sito, delle foto o semplicemente <em className="text-accent-foreground/70">qualcuno con cui fare ordine?</em>
            </h2>
            <p className="reveal mt-10 font-serif text-2xl italic">Va benissimo. Non devi arrivare da noi con un brief già pronto.</p>
            <p className="reveal mx-auto mt-6 max-w-2xl text-lg leading-relaxed opacity-75">
              Raccontaci semplicemente cosa fai, cosa vorresti migliorare e dove senti che qualcosa non funziona. Ti aiutiamo noi a capire da dove partire.
            </p>
            <div className="reveal mt-12">
              <a href="#contatti" onClick={() => setNeed("non-so")} className="inline-flex items-center gap-2 rounded-full bg-accent px-9 py-5 text-base font-medium text-accent-foreground transition-transform duration-300 hover:scale-[1.03]">
                Raccontaci il tuo progetto →
              </a>
            </div>
          </div>
        </section>

        {/* Chi siamo */}
        <section id="chi-siamo" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
          <p className="eyebrow reveal">Chi siamo</p>
          <h2 className="reveal mt-4 max-w-4xl text-4xl leading-tight md:text-6xl">Due persone, competenze diverse, la stessa idea.</h2>
          <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-12">
            {[
              { name: "Nome Cognome", role: "Product & UX Designer", text: "Product & UX Designer con un background in arti visive e cultura. Mi occupo di trasformare bisogni, idee e contenuti in esperienze digitali intuitive, curate e significative." },
              { name: "Nome Cognome", role: "Sviluppo web & contenuti visivi", text: "Spazio per la descrizione: chi sei, da dove arrivi, cosa ti piace fare e come lavori con i clienti." },
            ].map((p, i) => (
              <div key={i} className={`reveal ${i === 1 ? "md:mt-24" : ""}`}>
                <div className="flex aspect-[4/5] items-center justify-center rounded-sm border border-dashed border-foreground/25 bg-card">
                  <span className="eyebrow">Foto in arrivo</span>
                </div>
                <h3 className="mt-6 text-3xl">{p.name}</h3>
                <p className="eyebrow mt-2">{p.role}</p>
                <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
          <p className="reveal mt-20 text-center font-serif text-3xl italic md:text-5xl">Piccoli team, <span className="text-accent">grandi attenzioni.</span></p>
        </section>

        {/* Lavori */}
        <section id="lavori" className="bg-card py-28 md:py-40">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow reveal">Lavori</p>
                <h2 className="reveal mt-4 text-4xl md:text-6xl">Alcuni progetti.</h2>
              </div>
              <Cta variant="line">Parliamone →</Cta>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-12">
              {projects.map((p, i) => (
                <article key={i} className={`reveal group ${p.span}`}>
                  <div className={`flex ${p.ratio} items-center justify-center rounded-sm border border-dashed border-foreground/25 bg-background transition-colors group-hover:bg-secondary`}>
                    <span className="eyebrow">Immagine progetto</span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl">Nome progetto {i + 1}</h3>
                    <span className="eyebrow">{p.cat}</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">Breve descrizione del progetto, da sostituire.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA finale + Contatti */}
        <section id="contatti" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="reveal text-5xl leading-none md:text-8xl">Da dove <em className="text-accent">partiamo?</em></h2>
              <p className="reveal mt-8 text-lg leading-relaxed text-muted-foreground">
                Scrivici due righe sul tuo progetto. Non serve avere già tutto chiaro: ci pensiamo insieme.
              </p>
              <p className="reveal mt-4 font-serif italic">Prima chiacchierata conoscitiva, senza impegno.</p>
              <div className="reveal mt-12 space-y-3 text-sm">
                <p className="eyebrow">Oppure scrivici qui</p>
                <a href={`mailto:${EMAIL}`} className="block font-serif text-2xl hover:text-accent">{EMAIL}</a>
                <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="block font-serif text-2xl hover:text-accent">{INSTAGRAM}</a>
              </div>
            </div>
            <form onSubmit={onSubmit} className="reveal space-y-8 md:col-span-6 md:col-start-7">
              <Field label="Nome"><input required name="nome" className="field" /></Field>
              <Field label="Email"><input required type="email" name="email" className="field" /></Field>
              <Field label="Di cosa hai bisogno? (opzionale)">
                <select name="bisogno" value={need} onChange={(e) => setNeed(e.target.value)} className="field">
                  <option value="">Scegli…</option>
                  <option value="sito">Sito web</option>
                  <option value="foto">Foto / contenuti</option>
                  <option value="consulenza">Consulenza</option>
                  <option value="non-so">Non lo so ancora</option>
                </select>
              </Field>
              <Field label="Raccontaci brevemente cosa fai e di cosa hai bisogno">
                <textarea required name="messaggio" rows={5} className="field resize-none" />
              </Field>
              <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent">
                Invia il messaggio →
              </button>
              {sent && <p className="text-sm text-muted-foreground">Grazie! Si è aperta la tua app email con il messaggio pronto da inviare.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-5 py-10 pb-28 text-sm text-muted-foreground md:px-10 md:pb-10">
          <span className="font-serif italic text-foreground">Studio</span>
          <span>Ti aiutiamo a raccontare meglio quello che fai.</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <a href="#contatti" className="flex items-center justify-center rounded-full bg-primary py-4 text-sm font-medium text-primary-foreground shadow-lg">
          Parliamone →
        </a>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
