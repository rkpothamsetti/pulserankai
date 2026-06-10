import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { ArrowUpRight, Trophy, Network, Sparkles, Zap, Target, Brain } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PulseRank AI — Reasoning recruiter for the post-resume era" },
      { name: "description", content: "Stop keyword-matching resumes. PulseRank runs a recruiter reasoning tournament across candidates, weighted by the signals you actually care about." },
    ],
  }),
  component: Landing,
});

const signals = [
  { tag: "01", title: "Semantic fit", body: "We parse the JD into a requirement graph — must-haves, nice-to-haves, latent skills — and score every candidate against it." },
  { tag: "02", title: "Career velocity", body: "Promotions per year, role-scope deltas, time-to-impact. We read trajectory, not titles." },
  { tag: "03", title: "Leadership scope", body: "Team size led, system ownership, mentorship evidence. Calibrated against the seniority the role actually needs." },
  { tag: "04", title: "Learning agility", body: "Tools learned in the last 18 months, OSS contributions, certifications. A proxy for who keeps up." },
  { tag: "05", title: "Behavioral proxies", body: "Execution consistency, initiative, ownership culture — synthesized from career history and public artifacts." },
  { tag: "06", title: "Risk indicators", body: "Job hopping, seniority mismatches, unexplained gaps. Surfaced honestly, never hidden." },
];

const logos = ["NETFLIX", "STRIPE", "VERCEL", "AWS", "HASHICORP", "RED HAT", "IBM", "MIT"];

function Landing() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 lg:col-span-8">
              <div className="flex items-center gap-3 mb-10">
                <span className="h-px w-10 bg-ink" />
                <span className="eyebrow">Issue №01 — Reasoning recruiter</span>
              </div>
              <h1 className="font-display font-light leading-[0.92] tracking-[-0.04em] text-[clamp(3rem,9vw,9.5rem)]">
                Hire the <em className="italic font-normal text-vermillion">signal,</em>
                <br />
                not the <span className="relative inline-block">
                  résumé.
                  <svg className="absolute -bottom-2 left-0 w-full" height="14" viewBox="0 0 300 14" fill="none">
                    <path d="M2 8 Q 75 2 150 7 T 298 6" stroke="currentColor" strokeWidth="2" fill="none" className="text-vermillion" />
                  </svg>
                </span>
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:pl-8">
              <p className="text-lg leading-relaxed text-muted-foreground max-w-sm">
                PulseRank runs a recruiter reasoning tournament across your candidate pool — scoring trajectory, leadership scope and learning agility the way a senior recruiter actually thinks.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/app" className="ink-button">
                  Open the engine <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href="#method" className="ghost-button">See the method</a>
              </div>
            </div>
          </div>

          {/* hero meta strip */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-rule border border-rule">
            {[
              { k: "Signals weighed", v: "27" },
              { k: "Tournament rounds", v: "n × log n" },
              { k: "Median time-to-shortlist", v: "12s" },
              { k: "Bias-audited weights", v: "Yes" },
            ].map((m) => (
              <div key={m.k} className="bg-paper p-6">
                <div className="eyebrow text-muted-foreground">{m.k}</div>
                <div className="font-display text-4xl mt-2">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-rule bg-paper-deep overflow-hidden py-6">
        <div className="flex whitespace-nowrap marquee">
          {[...logos, ...logos, ...logos].map((l, i) => (
            <span key={i} className="mx-10 font-display text-2xl text-ink/40 tracking-tight">
              {l}
              <span className="mx-10 text-vermillion">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* METHOD */}
      <section id="method" className="mx-auto max-w-[1400px] px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <div className="eyebrow text-vermillion mb-6">§ Method</div>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tight">
              A recruiter
              <br />
              <em className="italic font-normal">reasoning</em>
              <br />
              tournament.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-8 lg:pl-12">
            <p className="text-xl lg:text-2xl leading-snug font-display font-light max-w-2xl">
              Keyword search treats candidates as bags of tokens. We pit every candidate against every other in an ELO-style bracket, judging head-to-head matchups against your weighted signal profile.
            </p>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule">
              {[
                { icon: Brain, title: "Parse JD", body: "Decompose to a requirement graph of must / nice / latent." },
                { icon: Network, title: "Match signals", body: "Score each candidate across 27 weighted axes." },
                { icon: Trophy, title: "Tournament", body: "Head-to-head bracket settles ranking with ELO updates." },
              ].map((s) => (
                <div key={s.title} className="bg-paper p-8">
                  <s.icon className="h-5 w-5 text-vermillion" strokeWidth={1.5} />
                  <h3 className="font-display text-2xl mt-6">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SIGNALS */}
      <section id="signals" className="bg-ink text-paper py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div>
              <div className="eyebrow text-vermillion mb-4">§ Signals</div>
              <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] max-w-3xl">
                Six lenses. <em className="italic font-normal text-vermillion">One honest score.</em>
              </h2>
            </div>
            <p className="text-paper/60 max-w-sm">
              Every weight is exposed. You can rebalance the entire engine in real time — no model retraining, no support ticket.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-paper/15 border border-paper/15">
            {signals.map((s) => (
              <article key={s.tag} className="bg-ink p-8 lg:p-10 hover:bg-paper hover:text-ink transition-colors duration-300 group">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-vermillion">{s.tag}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
                </div>
                <h3 className="font-display text-3xl mt-12 leading-tight">{s.title}</h3>
                <p className="text-sm mt-4 opacity-70 leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TOURNAMENT */}
      <section id="tournament" className="mx-auto max-w-[1400px] px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow text-vermillion mb-6">§ Tournament</div>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tight">
              Head to head.
              <br />
              <em className="italic font-normal">Round</em> after <em className="italic font-normal">round.</em>
            </h2>
            <p className="mt-8 text-lg text-muted-foreground max-w-md leading-relaxed">
              Instead of a leaderboard built on opaque embeddings, every match is an explainable comparison. Open a candidate and see the exact rounds they won and lost — and why.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:pl-12">
            <div className="border border-rule bg-paper-deep p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-2 bg-vermillion text-paper eyebrow">Round 03 · Final</div>

              <div className="mt-12 grid grid-cols-7 gap-4 items-center">
                <div className="col-span-3 text-right">
                  <div className="eyebrow text-muted-foreground">Candidate A</div>
                  <div className="font-display text-2xl mt-1">Alex Mercer</div>
                  <div className="text-sm text-muted-foreground">ML Platform · Netflix</div>
                  <div className="mt-3 font-mono text-4xl text-vermillion">94</div>
                </div>
                <div className="col-span-1 text-center">
                  <span className="font-display text-3xl italic">vs</span>
                </div>
                <div className="col-span-3">
                  <div className="eyebrow text-muted-foreground">Candidate B</div>
                  <div className="font-display text-2xl mt-1">Marcus Chen</div>
                  <div className="text-sm text-muted-foreground">Systems · AWS</div>
                  <div className="mt-3 font-mono text-4xl text-ink/40">89</div>
                </div>
              </div>

              <div className="hairline mt-10 pt-8 space-y-3">
                {[
                  { k: "Semantic fit", a: 94, b: 89 },
                  { k: "Career velocity", a: 88, b: 80 },
                  { k: "Leadership scope", a: 78, b: 82 },
                  { k: "Learning agility", a: 90, b: 84 },
                ].map((r) => (
                  <div key={r.k} className="grid grid-cols-7 gap-4 items-center text-sm">
                    <div className="col-span-3 text-right font-mono">{r.a}</div>
                    <div className="col-span-1 text-center eyebrow text-muted-foreground">{r.k}</div>
                    <div className="col-span-3 font-mono">{r.b}</div>
                  </div>
                ))}
              </div>

              <Link to="/app" className="mt-10 ink-button text-sm">
                Run a tournament <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-rule bg-paper-deep py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.95]">
              <em className="italic font-normal">Pricing</em>, in plain English.
            </h2>
            <p className="eyebrow text-muted-foreground">No seats. No per-hire fees.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-rule border border-rule">
            {[
              { name: "Sketch", price: "Free", desc: "200 candidates / mo. Public signals only.", cta: "Start free" },
              { name: "Studio", price: "$249", per: "/mo", desc: "5,000 candidates. Full signal weights. ATS sync.", cta: "Pick Studio", featured: true },
              { name: "House", price: "Custom", desc: "Unlimited candidates. Private models. SLA.", cta: "Talk to us" },
            ].map((p) => (
              <div key={p.name} className={`p-10 ${p.featured ? "bg-ink text-paper" : "bg-paper"}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-3xl">{p.name}</h3>
                  {p.featured && <Sparkles className="h-4 w-4 text-vermillion" />}
                </div>
                <div className="mt-8 font-display text-6xl">
                  {p.price}
                  {p.per && <span className="text-xl opacity-60">{p.per}</span>}
                </div>
                <p className="mt-4 text-sm opacity-70">{p.desc}</p>
                <Link to="/app" className={`mt-10 inline-flex items-center gap-2 text-sm font-medium border-b pb-1 ${p.featured ? "border-vermillion text-vermillion" : "border-ink hover:text-vermillion hover:border-vermillion"} transition-colors`}>
                  {p.cta} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-ink text-paper py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
          <Zap className="h-6 w-6 text-vermillion mx-auto" />
          <h2 className="mt-8 font-display text-6xl lg:text-8xl leading-[0.95] tracking-tight">
            Your next hire <em className="italic text-vermillion">is</em>
            <br />
            already in the pool.
          </h2>
          <p className="mt-8 text-paper/60 max-w-md mx-auto">
            Stop scrolling. Start a tournament and watch the right name surface in seconds.
          </p>
          <Link to="/app" className="mt-12 inline-flex items-center gap-2 bg-vermillion text-paper rounded-full px-8 py-4 font-medium hover:bg-paper hover:text-ink transition-colors">
            Launch PulseRank <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-rule">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-10 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-vermillion" />
            <span className="font-display text-lg">PulseRank AI</span>
            <span className="text-muted-foreground ml-4">© {new Date().getFullYear()}</span>
          </div>
          <div className="eyebrow text-muted-foreground">Crafted for recruiters who think.</div>
        </div>
      </footer>
    </div>
  );
}
