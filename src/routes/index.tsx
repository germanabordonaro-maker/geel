import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import jelly from "@/assets/jelly.png";
import jellySmall from "@/assets/jelly-small.png";
import photoImg from "@/assets/photo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "geel studio — Siti web, design e fotografia" },
      {
        name: "description",
        content:
          "Siti web per piccoli brand e professionisti, fotografia e consulenza digitale. Scopri geel studio e richiedi una prima analisi gratuita del tuo sito.",
      },
      { property: "og:title", content: "geel studio — Siti web, design e fotografia" },
      {
        property: "og:description",
        content: "Ideas take shape. Siti web, fotografia e consulenza per piccoli brand e professionisti.",
      },
    ],
  }),
  component: Index,
});

/* ——— Config: da compilare ——— */
const CONTACT_EMAIL = ""; // es. "ciao@geelstudio.it"
const INSTAGRAM_URL = ""; // es. "https://instagram.com/geelstudio"
const PRIVACY_URL = ""; // quando disponibile

type RequestType = "progetto" | "sito" | "custom" | "analisi";

const nav = [
  ["#servizi", "Servizi"],
  ["#analisi", "Analisi gratuita"],
  ["#metodo", "Come lavoriamo"],
  ["#lavori", "Lavori"],
  ["#chi-siamo", "Chi siamo"],
  ["#faq", "FAQ"],
];

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
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" fill="currentColor" />
    </svg>
  );
}

function Blob({ className = "", tone = "lime" }: { className?: string; tone?: "lime" | "lavender" | "pink" }) {
  const fill = { lime: "fill-lime", lavender: "fill-lavender", pink: "fill-pink" }[tone];
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <path className={fill} d="M50 6c16 0 34 8 39 25 5 16-4 26-2 40 2 15-14 25-32 23-17-2-24-9-37-17C5 69 4 54 10 40 17 22 32 6 50 6Z" />
      <ellipse cx="36" cy="28" rx="12" ry="6" className="fill-card opacity-60" transform="rotate(-25 36 28)" />
    </svg>
  );
}

function Index() {
  useReveal();
  const [type, setType] = useState<RequestType>("progetto");
  const [status, setStatus] = useState<"idle" | "opened" | "noconfig">("idle");
  const heroJelly = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = heroJelly.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      el.style.transform = `translate(${x * 24}px, ${y * 24}px) scale(${1 + x * 0.04}, ${1 - x * 0.04}) rotate(${x * 6}deg)`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const goContact = (t: RequestType) => {
    setType(t);
    setStatus("idle");
    document.getElementById("contatti")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.getElementById("f-nome")?.focus({ preventScroll: true }), 600);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!CONTACT_EMAIL) {
      setStatus("noconfig");
      return;
    }
    const f = new FormData(e.currentTarget);
    const labels: Record<RequestType, string> = {
      progetto: "Nuovo progetto",
      sito: "Sito web",
      custom: "Progetto custom",
      analisi: "Prima analisi gratuita",
    };
    const lines = [
      `Nome: ${f.get("nome")}`,
      `Email: ${f.get("email")}`,
      `Tipo di richiesta: ${labels[type]}`,
      type === "analisi" ? `Sito: ${f.get("url")}` : "",
      "",
      String(f.get("messaggio") || ""),
    ].filter((l, i) => l !== "" || i === 4);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${labels[type]} — ${f.get("nome")}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setStatus("opened");
  };

  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-border bg-card/90 px-5 py-2.5 backdrop-blur">
          <a href="#top" className="font-display text-xl font-bold tracking-tight">
            geel<span className="text-muted-foreground"> studio</span>
          </a>
          <nav aria-label="Principale" className="hidden items-center gap-6 text-sm font-medium lg:flex">
            {nav.slice(0, 5).map(([h, l]) => (
              <a key={h} href={h} className="hover:underline hover:decoration-2 hover:underline-offset-4">{l}</a>
            ))}
          </nav>
          <button onClick={() => goContact("progetto")} className="btn-jelly !px-5 !py-2.5 text-sm">Parliamone</button>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-32 md:px-10 md:pt-40">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="relative z-10 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="sticker"><Star className="h-3 w-3 text-lavender" /> Ideas take shape.</span>
                <span className="sticker hidden sm:inline-flex">Web · UX · Foto</span>
              </div>
              <h1 className="mt-8 text-[clamp(2.6rem,7vw,6.2rem)] leading-[0.92]">
                Facciamo prendere <span className="relative inline-block"><span className="relative z-10">forma</span><span aria-hidden className="absolute inset-x-[-0.1em] bottom-[0.08em] -z-0 h-[0.4em] rounded-full bg-lime" /></span> alla tua presenza online.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Progettiamo siti web per piccoli brand, professionisti e attività indipendenti. E, quando serve, aggiungiamo immagini e consulenza per raccontare meglio quello che fai.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <button onClick={() => goContact("progetto")} className="btn-jelly">Parliamo del tuo progetto →</button>
                <a href="#analisi" className="btn-ghost">Hai già un sito? Analizziamolo</a>
              </div>
            </div>
            <div className="relative lg:col-span-5">
              <div className="relative mx-auto aspect-square max-w-[520px]">
                <img
                  ref={heroJelly}
                  src={jelly}
                  alt=""
                  width={1024}
                  height={1024}
                  className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 ease-out"
                />
                <img src={jellySmall} alt="" width={816} height={816} className="wobble absolute -bottom-6 -left-4 w-32 md:w-40" />
                <span className="sticker absolute right-2 top-6 rotate-6">Let's get a little gooey</span>
                <Star className="absolute left-6 top-4 h-8 w-8 text-foreground" />
                <Star className="absolute bottom-16 right-4 h-5 w-5 text-pink" />
              </div>
            </div>
          </div>
        </section>

        {/* Ticker */}
        <div aria-hidden className="overflow-hidden border-y-2 border-foreground bg-lime py-3">
          <div className="marquee flex whitespace-nowrap font-display text-2xl font-bold">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex shrink-0 items-center gap-6 px-3">
                Siti vetrina <Star className="h-4 w-4" /> Landing page <Star className="h-4 w-4" /> UX & UI <Star className="h-4 w-4" /> Fotografia <Star className="h-4 w-4" /> Consulenza <Star className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        {/* SERVIZI */}
        <section id="servizi" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <h2 className="reveal max-w-3xl text-5xl leading-[0.95] md:text-7xl">Cosa possiamo fare insieme?</h2>

          <div className="mt-16 grid gap-6 lg:grid-cols-12">
            {/* Standard */}
            <article className="reveal relative overflow-hidden rounded-[2.5rem] bg-secondary p-8 text-secondary-foreground md:p-12 lg:col-span-6">
              <Blob tone="lime" className="absolute -right-16 -top-16 h-64 w-64 opacity-90" />
              <div className="relative">
                <span className="eyebrow text-lime">Standard</span>
                <h3 className="mt-4 max-w-md text-4xl leading-none md:text-6xl">Soluzioni chiare, dall'idea al sito.</h3>
                <p className="mt-6 max-w-lg text-lg opacity-80">
                  Per chi ha bisogno di presentare un'attività, un prodotto o un progetto online con un sito curato, chiaro e facile da usare.
                </p>
                <ul className="mt-10 divide-y divide-secondary-foreground/20 border-y border-secondary-foreground/20">
                  {["Siti vetrina", "Siti web per professionisti e piccoli brand", "Landing page", "Progettazione UX e UI", "Realizzazione di siti responsive"].map((s, i) => (
                    <li key={s} className="flex items-baseline gap-5 py-4 font-display text-xl md:text-2xl">
                      <span className="eyebrow text-lime">0{i + 1}</span>{s}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <button onClick={() => goContact("sito")} className="btn-jelly">Parliamo del tuo sito →</button>
                </div>
              </div>
            </article>

            {/* Custom */}
            <article className="reveal relative overflow-hidden rounded-[2.5rem] border-2 border-foreground bg-lavender p-8 md:p-10 lg:col-span-6">
              <img src={jellySmall} alt="" loading="lazy" width={816} height={816} className="wobble absolute -right-6 -top-6 w-28" />
              <span className="eyebrow">Custom</span>
              <h3 className="mt-4 max-w-xs text-3xl leading-none md:text-5xl">Progetti che prendono una forma tutta loro.</h3>
              <p className="mt-5 text-base leading-relaxed">
                Per chi ha un'esigenza specifica o vuole combinare competenze diverse in un progetto costruito su misura.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {["Servizi fotografici per brand, prodotti, siti e social", "Consulenza UX e revisione di siti esistenti", "Consulenza per la presenza digitale e i social", "Direzione visiva e coordinamento di contenuti", "Progetti che combinano più servizi"].map((s) => (
                  <li key={s} className="rounded-full border-[1.5px] border-foreground bg-card px-3 py-1.5 text-sm">{s}</li>
                ))}
              </ul>
              <button onClick={() => goContact("custom")} className="btn-ghost mt-8 bg-card">Raccontaci la tua idea →</button>
            </article>
            <div className="reveal relative hidden overflow-hidden rounded-[2.5rem] lg:col-span-12 lg:block">
              <img src={photoImg} alt="Set fotografico con ceramiche alla luce naturale" loading="lazy" width={1024} height={1280} className="h-full max-h-72 w-full object-cover" />
              <span className="sticker absolute bottom-4 left-4">Soft ideas, solid design</span>
            </div>
          </div>
        </section>

        {/* ANALISI */}
        <section id="analisi" className="px-3 md:px-6">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-pink px-6 py-20 md:px-16 md:py-28">
            <Blob tone="lime" className="absolute -bottom-20 -left-20 h-72 w-72" />
            <Star className="absolute right-10 top-10 h-12 w-12" />
            <div className="relative grid gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <span className="sticker">Prima analisi gratuita</span>
                <h2 className="reveal mt-6 text-5xl leading-[0.95] md:text-7xl">Hai già un sito? Diamogli un'occhiata.</h2>
              </div>
              <div className="reveal md:col-span-5 md:pt-16">
                <p className="text-lg leading-relaxed">
                  Prima di rifarlo da zero, <strong className="font-bold">capiamo cosa funziona</strong> e cosa si può migliorare. Facciamo una <strong className="font-bold">prima valutazione gratuita</strong> del tuo sito e ti indichiamo le <strong className="font-bold">opportunità più interessanti</strong> per renderlo <strong className="font-bold">più chiaro, efficace e coerente</strong> con il tuo progetto.
                </p>
                <button onClick={() => goContact("analisi")} className="btn-jelly mt-8 bg-secondary text-secondary-foreground">Richiedi la prima analisi gratuita →</button>
              </div>
            </div>
          </div>
        </section>

        {/* METODO */}
        <section id="metodo" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <h2 className="reveal max-w-4xl text-4xl leading-[0.95] md:text-6xl">Niente formule rigide. Prima capiamo cosa ti serve.</h2>
          <ol className="mt-16 grid gap-6 md:grid-cols-3 md:pb-32">
            {[
              ["01", "Ci racconti", "Ci spieghi cosa fai, cosa vuoi ottenere e cosa oggi non funziona come vorresti.", "lavender", "md:translate-y-0"],
              ["02", "Facciamo ordine", "Valutiamo insieme le priorità e scegliamo la soluzione più adatta al tuo progetto.", "pink", "md:translate-y-16"],
              ["03", "Gli diamo forma", "Progettiamo una soluzione curata e coerente con le tue esigenze.", "lime", "md:translate-y-32"],
            ].map(([n, t, d, tone, offset]) => (
              <li key={n} className={`reveal relative rounded-[2rem] border-2 border-foreground bg-card p-8 ${offset}`}>
                <div className="flex items-start justify-between">
                  <span className="font-display text-7xl font-extrabold leading-none">{n}</span>
                  <Blob tone={tone as "lime"} className={`h-14 w-14 ${n === "02" ? "rotate-45" : n === "03" ? "-rotate-12 scale-x-125" : ""}`} />
                </div>
                <h3 className="mt-8 text-2xl">{t}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* PORTFOLIO */}
        <section id="lavori" className="bg-secondary py-24 text-secondary-foreground md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="reveal max-w-2xl text-5xl leading-[0.95] md:text-7xl">Idee che hanno preso forma.</h2>
              <span className="sticker text-foreground">Portfolio in arrivo</span>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-12">
              {[
                ["Sito web", "md:col-span-7 aspect-[16/10]"],
                ["Fotografia", "md:col-span-5 aspect-[4/5]"],
                ["Direzione visiva", "md:col-span-4 aspect-square"],
                ["Landing page", "md:col-span-8 aspect-[16/9]"],
              ].map(([cat, cls], i) => (
                <article key={i} className={`reveal group ${cls.split(" ")[0]}`}>
                  <div className={`flex ${cls.split(" ")[1]} items-center justify-center rounded-[2rem] border-2 border-dashed border-secondary-foreground/30 transition-colors group-hover:border-lime`}>
                    <span className="eyebrow opacity-60">[ Immagine progetto ]</span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl">[ Nome progetto ]</h3>
                    <span className="eyebrow text-lime">{cat}</span>
                  </div>
                  <p className="mt-1 opacity-70">[ Breve descrizione del progetto ]</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CHI SIAMO */}
        <section id="chi-siamo" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <div className="grid gap-10 md:grid-cols-12">
            <h2 className="reveal text-5xl leading-[0.95] md:col-span-6 md:text-7xl">Piccolo team, idee elastiche.</h2>
            <p className="reveal text-lg leading-relaxed text-muted-foreground md:col-span-5 md:col-start-8 md:pt-4">
              geel studio è una collaborazione tra professionisti con competenze complementari in design digitale e contenuti visivi. Lavoriamo a stretto contatto con chi ci sceglie, per trovare soluzioni curate, concrete e adatte al progetto.
            </p>
          </div>
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {[
              { role: "Product & UX Designer", text: "[ Descrizione breve ]", tone: "bg-lavender", rot: "-rotate-2" },
              { role: "[ Ruolo ]", text: "[ Descrizione breve ]", tone: "bg-pink", rot: "rotate-2 md:mt-20" },
            ].map((p, i) => (
              <div key={i} className={`reveal ${p.rot.includes("mt") ? "md:mt-20" : ""}`}>
                <div className={`flex aspect-[4/5] items-center justify-center rounded-[2.5rem] border-2 border-foreground ${p.tone} ${p.rot.split(" ")[0]}`}>
                  <span className="sticker">[ Foto ]</span>
                </div>
                <h3 className="mt-6 text-3xl">[ Nome Cognome ]</h3>
                <p className="eyebrow mt-2 text-muted-foreground">{p.role}</p>
                <p className="mt-3 max-w-md text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-4xl px-5 pb-24 md:px-10 md:pb-32">
          <h2 className="reveal text-4xl md:text-6xl">Domande frequenti</h2>
          <div className="mt-10 divide-y-2 divide-foreground border-y-2 border-foreground">
            {[
              ["Quanto costa realizzare un sito web?", "Dipende da cosa ti serve: quante pagine, quali contenuti, se servono foto nuove. Non abbiamo pacchetti fissi: ci racconti il progetto e ti prepariamo una proposta su misura, chiara e senza sorprese."],
              ["Posso chiedervi solo un servizio fotografico?", "Sì. Fotografia e consulenza si possono richiedere anche separatamente, senza dover fare un sito con noi."],
              ["Ho già un sito: potete aiutarmi a migliorarlo?", "Certo. Possiamo partire da una prima analisi gratuita per capire cosa funziona e cosa si può migliorare, prima di decidere se intervenire o rifarlo."],
              ["Devo sapere già esattamente cosa mi serve?", "No. Basta raccontarci cosa fai e cosa vorresti ottenere: a fare ordine ci pensiamo insieme."],
              ["Lavorate anche con piccoli progetti?", "Sì, anzi: lavoriamo soprattutto con professionisti, piccoli brand e attività indipendenti. Scrivici e valutiamo insieme il tuo caso."],
            ].map(([q, a]) => (
              <details key={q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-bold md:text-2xl">
                  {q}
                  <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA FINALE + FORM */}
        <section id="contatti" className="px-3 pb-6 md:px-6">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-secondary px-6 py-20 text-secondary-foreground md:px-16 md:py-24">
            <img src={jelly} alt="" loading="lazy" width={1024} height={1024} className="wobble pointer-events-none absolute -right-24 -top-24 w-80 opacity-90 md:w-[28rem]" />
            <div className="relative grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="text-5xl leading-[0.95] md:text-6xl">La tua prossima idea potrebbe prendere forma qui.</h2>
                <p className="mt-6 text-lg opacity-80">
                  Raccontaci cosa stai costruendo. Anche se hai solo un'idea, possiamo iniziare da lì.
                </p>
                <p className="mt-6 font-display text-lg text-lime">Good ideas. Gooey results.</p>
              </div>
              <form onSubmit={onSubmit} className="space-y-5 rounded-[2rem] bg-card p-6 text-card-foreground md:p-8 lg:col-span-6 lg:col-start-7" noValidate={false}>
                <fieldset>
                  <legend className="eyebrow">Di cosa vuoi parlarci?</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {([
                      ["progetto", "Un nuovo progetto"],
                      ["sito", "Un sito web"],
                      ["custom", "Foto / consulenza"],
                      ["analisi", "Analisi gratuita"],
                    ] as [RequestType, string][]).map(([v, l]) => (
                      <label key={v} className={`cursor-pointer rounded-full border-[1.5px] border-foreground px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring ${type === v ? "bg-primary" : "hover:bg-muted"}`}>
                        <input type="radio" name="tipo" value={v} checked={type === v} onChange={() => setType(v)} className="sr-only" />
                        {l}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow">Nome</span>
                    <input id="f-nome" required name="nome" autoComplete="name" className="field mt-2" />
                  </label>
                  <label className="block">
                    <span className="eyebrow">Email</span>
                    <input required type="email" name="email" autoComplete="email" className="field mt-2" />
                  </label>
                </div>
                {type === "analisi" && (
                  <label className="block">
                    <span className="eyebrow">URL del sito</span>
                    <input required type="url" name="url" placeholder="https://" className="field mt-2" />
                  </label>
                )}
                <label className="block">
                  <span className="eyebrow">
                    {type === "analisi" ? "Cosa vorresti migliorare? (facoltativo)" : "Raccontaci il progetto"}
                  </span>
                  <textarea name="messaggio" rows={4} required={type !== "analisi"} className="field mt-2 resize-none" />
                </label>
                <button type="submit" className="btn-jelly w-full">
                  {type === "analisi" ? "Richiedi la prima analisi gratuita" : "Parliamone"} →
                </button>
                <div aria-live="polite" className="text-sm">
                  {status === "opened" && <p>Abbiamo aperto la tua app email con il messaggio pronto: ricordati di premere "invia".</p>}
                  {status === "noconfig" && <p className="font-medium text-destructive">L'invio non è ancora attivo: l'indirizzo email dello studio non è stato configurato.</p>}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mx-auto max-w-7xl px-5 pb-28 pt-12 md:px-10 md:pb-12">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div>
            <p className="font-display text-5xl font-extrabold tracking-tight md:text-7xl">geel studio</p>
            <p className="mt-2 text-muted-foreground">Ideas take shape.</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm font-medium">
            {nav.map(([h, l]) => <a key={h} href={h} className="hover:underline">{l}</a>)}
          </nav>
          <div className="space-y-2 text-sm font-medium">
            {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`} className="block hover:underline">{CONTACT_EMAIL}</a>}
            {INSTAGRAM_URL && <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="block hover:underline">Instagram</a>}
            {PRIVACY_URL && <a href={PRIVACY_URL} className="block hover:underline">Privacy policy</a>}
            <p className="text-muted-foreground">© {new Date().getFullYear()} geel studio</p>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <button onClick={() => goContact("progetto")} className="btn-jelly w-full">Parliamone →</button>
      </div>
    </div>
  );
}

export type { ReactNode };
