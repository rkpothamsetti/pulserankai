import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/Nav";
import { 
  ArrowUpRight, 
  Trophy, 
  Network, 
  Sparkles, 
  Zap, 
  Target, 
  Brain,
  Layers,
  Flame,
  Briefcase,
  UserCheck
} from "lucide-react";

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
              <div className="eyebrow text-vermillion mb-4">§ 8-Factor Scorecard</div>
              <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] max-w-3xl">
                Eight lenses. <em className="italic font-normal text-vermillion">One honest score.</em>
              </h2>
            </div>
            <p className="text-paper/60 max-w-sm">
              We analyze candidates across eight specific dimensions to compute their final fit rating. Rebalance weights in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-paper/15 border border-paper/15">
            {[
              { tag: "01", title: "Semantic fit", body: "Deep context mapping of candidate skills against requirements in the JD.", icon: Target },
              { tag: "02", title: "Seniority Alignment", body: "Analysis of roles, titles, and ownership scope relative to the target position.", icon: Layers },
              { tag: "03", title: "Career Velocity", body: "Calculation of trajectories, promotion frequencies, and time-to-impact.", icon: Flame },
              { tag: "04", title: "Project Impact", body: "Quantifiable scale and business outcomes of core projects led by the candidate.", icon: Briefcase },
              { tag: "05", title: "Learning Agility", body: "Tracking new tools, frameworks, and open-source contributions over the last 18 months.", icon: Sparkles },
              { tag: "06", title: "Initiative", body: "Evidence of proactive ownership, refactoring, or zero-to-one engineering.", icon: Brain },
              { tag: "07", title: "Culture Alignment", body: "Behavioral patterns indicating collaboration, mentorship, and excellence.", icon: UserCheck },
              { tag: "08", title: "Risk Analysis", body: "Surfacing red flags like high-frequency job hopping or extreme role mismatches.", icon: Zap },
            ].map((s) => (
              <article key={s.tag} className="bg-ink p-8 hover:bg-paper hover:text-ink transition-colors duration-300 group">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-vermillion">{s.tag}</span>
                  <s.icon className="h-5 w-5 text-vermillion/75 group-hover:text-vermillion transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl mt-8 leading-tight">{s.title}</h3>
                <p className="text-sm mt-3 opacity-70 leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TOURNAMENT */}
      <TournamentSection />

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

const candidatesMock = [
  {
    id: "c4",
    name: "Alex Mercer",
    title: "Senior Recommendations",
    company: "Netflix",
    baseScores: { semanticFit: 94, careerVelocity: 88, leadershipScope: 78, learningAgility: 90 }
  },
  {
    id: "c2",
    name: "Marcus Chen",
    title: "Senior Systems Engineer",
    company: "AWS",
    baseScores: { semanticFit: 88, careerVelocity: 85, leadershipScope: 92, learningAgility: 90 }
  },
  {
    id: "c1",
    name: "Sarah Jenkins",
    title: "Senior Full Stack",
    company: "Stripe",
    baseScores: { semanticFit: 95, careerVelocity: 90, leadershipScope: 80, learningAgility: 88 }
  },
  {
    id: "c5",
    name: "Sophia Bennett",
    title: "Lead Software Architect",
    company: "Red Hat",
    baseScores: { semanticFit: 90, careerVelocity: 82, leadershipScope: 95, learningAgility: 80 }
  }
];

function TournamentSection() {
  const [candAId, setCandAId] = useState("c4");
  const [candBId, setCandBId] = useState("c2");
  
  const [wSemantic, setWSemantic] = useState(50);
  const [wVelocity, setWVelocity] = useState(40);
  const [wLeadership, setWLeadership] = useState(30);
  const [wAgility, setWAgility] = useState(30);

  const candA = candidatesMock.find(c => c.id === candAId) || candidatesMock[0];
  const candB = candidatesMock.find(c => c.id === candBId) || candidatesMock[1];

  const calcScore = (cand: typeof candA) => {
    const totalWeight = wSemantic + wVelocity + wLeadership + wAgility || 1;
    const weightedSum = 
      cand.baseScores.semanticFit * wSemantic +
      cand.baseScores.careerVelocity * wVelocity +
      cand.baseScores.leadershipScope * wLeadership +
      cand.baseScores.learningAgility * wAgility;
    return Math.round(weightedSum / totalWeight);
  };

  const scoreA = calcScore(candA);
  const scoreB = calcScore(candB);

  return (
    <section id="tournament" className="mx-auto max-w-[1400px] px-6 lg:px-10 py-24 lg:py-32">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div>
            <div className="eyebrow text-vermillion mb-6">§ Tournament Simulator</div>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tight">
              Head to head.
              <br />
              <em className="italic font-normal">Real-time</em> feedback.
            </h2>
            <p className="mt-8 text-md text-muted-foreground leading-relaxed">
              Adjust the signal weights to see how matchups shift dynamically. The ELO algorithm simulates recruiter head-to-head decisions using your priority profile.
            </p>
          </div>

          <div className="p-5 border border-rule bg-paper space-y-4 rounded">
            <span className="eyebrow text-vermillion text-xs uppercase tracking-wider font-mono font-semibold block">Tune Signal Weights</span>
            
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span>Semantic Fit</span>
                <span className="text-vermillion">{wSemantic}</span>
              </div>
              <input 
                type="range" min="0" max="100" value={wSemantic} 
                onChange={(e) => setWSemantic(Number(e.target.value))} 
                className="w-full accent-vermillion cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span>Career Velocity</span>
                <span className="text-vermillion">{wVelocity}</span>
              </div>
              <input 
                type="range" min="0" max="100" value={wVelocity} 
                onChange={(e) => setWVelocity(Number(e.target.value))} 
                className="w-full accent-vermillion cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span>Leadership Scope</span>
                <span className="text-vermillion">{wLeadership}</span>
              </div>
              <input 
                type="range" min="0" max="100" value={wLeadership} 
                onChange={(e) => setWLeadership(Number(e.target.value))} 
                className="w-full accent-vermillion cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span>Learning Agility</span>
                <span className="text-vermillion">{wAgility}</span>
              </div>
              <input 
                type="range" min="0" max="100" value={wAgility} 
                onChange={(e) => setWAgility(Number(e.target.value))} 
                className="w-full accent-vermillion cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="border border-rule bg-paper-deep p-8 lg:p-10 relative overflow-hidden rounded h-full flex flex-col justify-between">
            <div>
              <div className="absolute top-0 right-0 px-4 py-2 bg-vermillion text-paper eyebrow font-mono font-semibold">Live ELO Simulator</div>

              <div className="mt-8 grid grid-cols-7 gap-4 items-center">
                {/* Candidate A */}
                <div className="col-span-3 text-right">
                  <span className="eyebrow text-[0.65rem] text-muted-foreground block mb-1">Candidate A</span>
                  <select 
                    value={candAId} 
                    onChange={(e) => setCandAId(e.target.value)}
                    className="font-display text-xl bg-transparent outline-none border-b border-rule cursor-pointer py-1 font-semibold text-right w-full"
                  >
                    {candidatesMock.map(c => (
                      <option key={c.id} value={c.id} disabled={c.id === candBId} className="bg-paper text-ink text-left">{c.name}</option>
                    ))}
                  </select>
                  <div className="text-xs text-muted-foreground mt-1">{candA.title} · {candA.company}</div>
                  <div className="mt-4 flex items-baseline justify-end gap-2">
                    <span className="font-mono text-5xl text-vermillion">{scoreA}</span>
                    {scoreA >= scoreB && <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono uppercase tracking-wider font-semibold">Winner</span>}
                  </div>
                </div>

                <div className="col-span-1 text-center">
                  <span className="font-display text-3xl italic text-muted-foreground">vs</span>
                </div>

                {/* Candidate B */}
                <div className="col-span-3 text-left">
                  <span className="eyebrow text-[0.65rem] text-muted-foreground block mb-1">Candidate B</span>
                  <select 
                    value={candBId} 
                    onChange={(e) => setCandBId(e.target.value)}
                    className="font-display text-xl bg-transparent outline-none border-b border-rule cursor-pointer py-1 font-semibold text-left w-full"
                  >
                    {candidatesMock.map(c => (
                      <option key={c.id} value={c.id} disabled={c.id === candAId} className="bg-paper text-ink text-left">{c.name}</option>
                    ))}
                  </select>
                  <div className="text-xs text-muted-foreground mt-1">{candB.title} · {candB.company}</div>
                  <div className="mt-4 flex items-baseline justify-start gap-2">
                    <span className={`font-mono text-5xl ${scoreB > scoreA ? "text-vermillion" : "text-ink/40"}`}>{scoreB}</span>
                    {scoreB > scoreA && <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono uppercase tracking-wider font-semibold">Winner</span>}
                  </div>
                </div>
              </div>

              <div className="hairline mt-10 pt-8 space-y-3">
                {[
                  { k: "Semantic Fit", valKey: "semanticFit" },
                  { k: "Career Velocity", valKey: "careerVelocity" },
                  { k: "Leadership Scope", valKey: "leadershipScope" },
                  { k: "Learning Agility", valKey: "learningAgility" }
                ].map((item) => {
                  const scoreValA = candA.baseScores[item.valKey as keyof typeof candA.baseScores];
                  const scoreValB = candB.baseScores[item.valKey as keyof typeof candB.baseScores];
                  return (
                    <div key={item.k} className="grid grid-cols-7 gap-4 items-center text-sm">
                      <div className={`col-span-3 text-right font-mono ${scoreValA >= scoreValB ? "text-vermillion font-bold" : "text-muted-foreground"}`}>{scoreValA}</div>
                      <div className="col-span-1 text-center eyebrow text-[0.65rem] text-muted-foreground font-semibold font-mono">{item.k}</div>
                      <div className={`col-span-3 text-left font-mono ${scoreValB >= scoreValA ? "text-vermillion font-bold" : "text-muted-foreground"}`}>{scoreValB}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-rule">
              <Link to="/app" className="ink-button text-sm w-full lg:w-auto justify-center">
                Launch Full Tournament <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
