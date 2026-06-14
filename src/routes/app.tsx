import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/Nav";
import { candidates } from "@/data/candidates";
import { 
  runReasoningTournament, 
  generateRequirementGraph, 
  parseJobDescription,
  SignalWeights
} from "@/engine/rankingEngine";
import { 
  ArrowUpRight, 
  Trophy, 
  Network, 
  User, 
  AlertTriangle, 
  MapPin, 
  Github, 
  Activity, 
  GraduationCap, 
  Sparkles,
  Award,
  CheckCircle2
} from "lucide-react";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Workspace — PulseRank AI" },
      { name: "description", content: "Tune signal weights, run the recruiter reasoning tournament, and inspect candidate scorecards." }
    ],
  }),
  component: AppPage,
});

const DEFAULT_JD = `Staff Engineer — Fraud Detection

Core
· Python with large-scale ML systems
· Distributed systems & real-time inference
· Kafka streaming, PostgreSQL state

Preferred
· Leadership scope & mentorship
· Gigabyte-scale throughput
· Highly responsive, fast feedback`;

type Tab = "profile" | "graph" | "tournament";

function AppPage() {
  const [jd, setJd] = useState(DEFAULT_JD);
  const [weights, setWeights] = useState<SignalWeights>({
    semanticFit: 50,
    leadershipImportance: 30,
    careerVelocity: 40,
    learningAgility: 30,
    riskSensitivity: 25
  });
  const [selectedId, setSelectedId] = useState<string>("c4");
  const [tab, setTab] = useState<Tab>("profile");
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);

  const parsedJd = useMemo(() => {
    return parseJobDescription(jd);
  }, [jd]);

  const reqGraph = useMemo(() => {
    return generateRequirementGraph(jd);
  }, [jd]);

  // Run the Recruiter Reasoning Tournament ELO algorithm
  const tournamentResults = useMemo(() => {
    return runReasoningTournament(candidates, jd, weights);
  }, [jd, weights]);

  const top = tournamentResults[0];
  const selected = useMemo(() => {
    return tournamentResults.find((r) => r.candidate.id === selectedId) ?? tournamentResults[0];
  }, [tournamentResults, selectedId]);
  
  const c = selected.candidate;

  const handleSliderChange = (key: keyof SignalWeights, val: number) => {
    setWeights(prev => ({
      ...prev,
      [key]: val
    }));
  };

  const toggleShortlist = (id: string) => {
    setShortlistedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const exportShortlist = () => {
    if (shortlistedIds.length === 0) {
      alert("No candidates have been shortlisted yet.");
      return;
    }
    const shortlistedCandidates = tournamentResults.filter(r => shortlistedIds.includes(r.candidate.id));
    
    const headers = ["Rank", "Name", "Title", "Location", "ELO Rating", "Composite Score"];
    const rows = shortlistedCandidates.map((r, index) => [
      index + 1,
      `"${r.candidate.name}"`,
      `"${r.candidate.title}"`,
      `"${r.candidate.location}"`,
      r.eloRating,
      r.breakdown.overallWeightedScore
    ]);
    
    const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `pulserank-shortlist-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans flex flex-col">
      <Nav />

      {/* Workspace header */}
      <div className="border-b border-rule bg-paper-deep shrink-0">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="eyebrow text-vermillion font-semibold">Workspace</div>
            <h1 className="font-display text-3xl mt-1">Reasoning Tournament <em className="italic">№ 27</em></h1>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-vermillion animate-pulse" />
              <span className="text-muted-foreground">Live · {tournamentResults.length} candidates</span>
            </div>
            <button 
              onClick={exportShortlist}
              className="ink-button text-sm cursor-pointer"
            >
              Export shortlist ({shortlistedIds.length}) <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] w-full px-6 lg:px-10 py-8 grid grid-cols-12 gap-6 flex-1 lg:h-[calc(100vh-170px)] lg:min-h-[650px] overflow-hidden">
        {/* LEFT — JD + weights */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6 h-full overflow-hidden">
          <section className="border border-rule bg-paper flex flex-col flex-1 overflow-hidden min-h-[220px]">
            <header className="flex items-center justify-between px-4 py-3 border-b border-rule shrink-0">
              <span className="eyebrow text-xs uppercase tracking-wider font-mono font-semibold text-vermillion">Job description</span>
              <span className="font-mono text-xs text-muted-foreground">{jd.length} ch</span>
            </header>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              className="w-full flex-1 p-4 bg-transparent text-sm font-mono resize-none outline-none focus:bg-vermillion-soft/20 transition overflow-y-auto"
              spellCheck={false}
            />
            <footer className="px-4 py-2 border-t border-rule bg-paper-deep flex justify-between text-xs text-muted-foreground shrink-0">
              <span>Seniority: <b className="text-ink">{parsedJd.seniority}</b></span>
              <span>Exp: <b className="text-ink">{parsedJd.preferredExperienceYears}+ yrs</b></span>
            </footer>
          </section>

          <section className="border border-rule bg-paper flex flex-col flex-1 overflow-hidden min-h-[220px]">
            <header className="px-4 py-3 border-b border-rule eyebrow text-xs uppercase tracking-wider font-mono font-semibold text-vermillion shrink-0">Signal weights</header>
            <div className="p-4 space-y-5 overflow-y-auto flex-1">
              {[
                { key: "semanticFit", label: "Semantic fit" },
                { key: "leadershipImportance", label: "Leadership importance" },
                { key: "careerVelocity", label: "Career velocity" },
                { key: "learningAgility", label: "Learning agility" },
                { key: "riskSensitivity", label: "Risk sensitivity" }
              ].map(({ key, label }) => (
                <div key={key}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span>{label}</span>
                    <span className="font-mono text-vermillion">{weights[key as keyof SignalWeights]}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={weights[key as keyof SignalWeights]}
                    onChange={(e) => handleSliderChange(key as keyof SignalWeights, Number(e.target.value))}
                    className="w-full accent-vermillion cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* MIDDLE — ranking */}
        <main className="col-span-12 lg:col-span-5 flex flex-col h-full overflow-hidden">
          <div className="flex items-end justify-between mb-4 shrink-0">
            <div>
              <div className="eyebrow text-vermillion text-xs uppercase tracking-wider font-mono font-semibold">Tournament results</div>
              <h2 className="font-display text-3xl mt-1">The bracket</h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Trophy className="h-3.5 w-3.5 text-vermillion" /> Top: <span className="text-ink font-medium">{top.candidate.name}</span>
            </div>
          </div>

          <ol className="border border-rule bg-paper overflow-y-auto flex-1">
            {tournamentResults.map((r, i) => {
              const isSel = r.candidate.id === selectedId;
              const isTop = i === 0;
              const isShortlisted = shortlistedIds.includes(r.candidate.id);
              return (
                <li key={r.candidate.id}>
                  <button
                    onClick={() => setSelectedId(r.candidate.id)}
                    className={`w-full text-left grid grid-cols-12 gap-3 items-center px-4 py-4 border-b border-rule last:border-0 transition-all cursor-pointer ${
                      isSel ? "bg-ink text-paper" : "hover:bg-paper-deep"
                    }`}
                  >
                    <div className="col-span-1 font-display text-3xl leading-none">
                      {isTop && !isSel ? <span className="text-vermillion">{(i + 1).toString().padStart(2, "0")}</span> : (i + 1).toString().padStart(2, "0")}
                    </div>
                    <div className="col-span-7">
                      <div className="font-display text-lg leading-tight flex items-center gap-2 flex-wrap">
                        {r.candidate.name}
                        {isShortlisted && (
                          <span className={`text-[0.6rem] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider ${
                            isSel ? "bg-emerald-600 text-white font-semibold" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          }`}>
                            Shortlisted
                          </span>
                        )}
                        {r.candidate.activity.urgency === "high" && (
                          <span className={`text-[0.6rem] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider ${
                            isSel ? "bg-vermillion text-paper" : "bg-vermillion-soft text-vermillion"
                          }`}>
                            Active
                          </span>
                        )}
                      </div>
                      <div className={`text-xs mt-0.5 ${isSel ? "text-paper/60" : "text-muted-foreground"}`}>{r.candidate.title}</div>
                    </div>
                    <div className="col-span-3 text-right">
                      <div className={`font-mono text-2xl ${isSel ? "text-vermillion" : isTop ? "text-vermillion" : ""}`}>{r.eloRating}</div>
                      <div className={`eyebrow text-[0.6rem] ${isSel ? "text-paper/50" : "text-muted-foreground"}`}>ELO Rating</div>
                    </div>
                    <div className="col-span-1 text-right">
                      <ArrowUpRight className={`h-4 w-4 inline ${isSel ? "" : "opacity-40"}`} />
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </main>

        {/* RIGHT — scorecard */}
        <section className="col-span-12 lg:col-span-4 h-full overflow-hidden">
          <div className="border border-rule bg-paper h-full flex flex-col overflow-hidden">
            <header className="border-b border-rule p-5 shrink-0">
              <div className="flex items-center gap-2">
                <span className="eyebrow text-vermillion text-xs uppercase tracking-wider font-mono font-semibold">Scorecard</span>
                <span className="font-mono text-xs text-muted-foreground">#{c.id.toUpperCase()}</span>
              </div>
              <h3 className="font-display text-3xl mt-2 leading-tight">{c.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.title}</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {c.location}
              </div>

              <div className="mt-5 flex items-baseline gap-3">
                <div className="font-display text-6xl text-vermillion">{selected.breakdown.overallWeightedScore}</div>
                <div className="eyebrow text-muted-foreground text-xs uppercase tracking-wider font-mono font-semibold">/ 100 composite</div>
              </div>
            </header>

            {/* tabs */}
            <div className="flex border-b border-rule bg-paper-deep shrink-0">
              {([
                ["profile", User],
                ["graph", Network],
                ["tournament", Trophy],
              ] as [Tab, typeof User][]).map(([t, Icon]) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 px-3 py-3 text-sm flex items-center justify-center gap-1.5 capitalize border-b-2 -mb-px transition-colors cursor-pointer ${
                    tab === t ? "border-vermillion text-ink font-medium" : "border-transparent text-muted-foreground hover:text-ink"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t}
                </button>
              ))}
            </div>

            <div className="p-5 flex-1 overflow-y-auto space-y-6">
              {tab === "profile" && (
                <div className="space-y-6">
                  <p className="text-sm leading-relaxed">{c.bio}</p>

                  <div className="grid grid-cols-3 gap-px bg-rule border border-rule">
                    <Stat label="Years" value={c.experienceYears} />
                    <Stat label="Repos" value={c.github.repos} />
                    <Stat label="Stars" value={c.github.stars} />
                  </div>

                  {/* Recruiter Insight Box */}
                  <div className="p-4 border border-rule bg-paper-deep text-sm space-y-1">
                    <span className="eyebrow text-vermillion text-xs uppercase tracking-wider font-mono font-semibold block">Recruiter Insight</span>
                    <p className="leading-relaxed text-xs text-muted-foreground">{selected.recruiterInsight}</p>
                  </div>

                  {/* Transferable Skills Mapping */}
                  {selected.transferableSkillsMapped.length > 0 && (
                    <div className="p-4 border border-vermillion/40 bg-vermillion-soft/20 text-sm space-y-2">
                      <span className="eyebrow text-vermillion text-xs uppercase tracking-wider font-mono font-semibold block">Transferable Skills Mapped</span>
                      {selected.transferableSkillsMapped.map((t, idx) => (
                        <div key={idx} className="text-xs space-y-1">
                          <div>Candidate background in <b className="text-ink">{t.sourceSkill}</b> bridges requirements for <b className="text-ink">{t.targetSkill}</b>:</div>
                          <p className="italic text-muted-foreground">{t.reason}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <Section title="Education" icon={GraduationCap}>
                    <p className="text-sm text-muted-foreground">{c.education}</p>
                  </Section>

                  <Section title="Skills" icon={Sparkles}>
                    <div className="flex flex-wrap gap-1.5">
                      {c.skills.map((s) => (
                        <span key={s} className="text-xs px-2 py-0.5 border border-rule bg-paper">{s}</span>
                      ))}
                    </div>
                  </Section>

                  <Section title="Activity" icon={Activity}>
                    <ul className="text-sm space-y-1.5">
                      <Row k="Last active" v={`${c.activity.lastActiveHours}h ago`} />
                      <Row k="Response rate" v={`${c.activity.responseRate}%`} />
                      <Row k="Urgency" v={c.activity.urgency} accent={c.activity.urgency === "high"} />
                    </ul>
                  </Section>
                </div>
              )}

              {tab === "graph" && (
                <div className="space-y-6">
                  <div>
                    <div className="eyebrow text-vermillion text-xs uppercase tracking-wider font-mono font-semibold">Requirement Graph match</div>
                    <p className="text-xs text-muted-foreground mt-1">Real-time mapping of parsed JD parameters and skills.</p>
                  </div>

                  {/* Interactive SVG Graph Container */}
                  <div className="w-full h-56 border border-rule bg-paper-deep relative rounded overflow-hidden">
                    <svg className="w-full h-full absolute inset-0">
                      {/* Connections */}
                      {reqGraph.edges.map((edge, idx) => {
                        const srcIdx = reqGraph.nodes.findIndex(n => n.id === edge.source);
                        const tgtIdx = reqGraph.nodes.findIndex(n => n.id === edge.target);
                        if (srcIdx === -1 || tgtIdx === -1) return null;
                        
                        const total = reqGraph.nodes.length;
                        const getPos = (index: number) => {
                          if (index === 0) return { x: 180, y: 110 };
                          if (index === 1) return { x: 80, y: 50 };
                          const angle = ((index - 2) / (total - 2)) * 2 * Math.PI;
                          return {
                            x: 180 + Math.cos(angle) * 110,
                            y: 110 + Math.sin(angle) * 75
                          };
                        };
                        const p1 = getPos(srcIdx);
                        const p2 = getPos(tgtIdx);

                        return (
                          <line 
                            key={idx} 
                            x1={p1.x} y1={p1.y} 
                            x2={p2.x} y2={p2.y} 
                            stroke="rgba(0, 0, 0, 0.15)" 
                            strokeWidth="1.2" 
                          />
                        );
                      })}

                      {/* Nodes */}
                      {reqGraph.nodes.map((node, idx) => {
                        const total = reqGraph.nodes.length;
                        const getPos = (index: number) => {
                          if (index === 0) return { x: 180, y: 110 };
                          if (index === 1) return { x: 80, y: 50 };
                          const angle = ((index - 2) / (total - 2)) * 2 * Math.PI;
                          return {
                            x: 180 + Math.cos(angle) * 110,
                            y: 110 + Math.sin(angle) * 75
                          };
                        };
                        const pos = getPos(idx);

                        let fillCol = "#ff4500"; // Vermillion
                        if (node.type === "domain") fillCol = "#008080"; // Teal
                        if (node.type === "concept") fillCol = "#d97706"; // Amber
                        if (node.type === "skill") fillCol = "#16a34a"; // Green

                        return (
                          <g key={node.id}>
                            <circle cx={pos.x} cy={pos.y} r={10} fill="#fcfcf9" stroke={fillCol} strokeWidth="2" />
                            <circle cx={pos.x} cy={pos.y} r={4} fill={fillCol} />
                            <text 
                              x={pos.x} 
                              y={pos.y + 18} 
                              fill="var(--text-ink)" 
                              fontSize="8" 
                              fontWeight="600" 
                              textAnchor="middle"
                            >
                              {node.label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* 8-Factor detailed score meters */}
                  <div className="space-y-4 pt-2 border-t border-rule">
                    <span className="eyebrow text-vermillion text-xs uppercase tracking-wider font-mono font-semibold block">8-Factor scorecard breakdown</span>
                    {[
                      ["Semantic Fit", selected.breakdown.semanticFitScore],
                      ["Seniority Alignment", selected.breakdown.seniorityAlignmentScore],
                      ["Career Velocity", selected.breakdown.careerVelocityScore],
                      ["Project Impact", selected.breakdown.projectImpactScore],
                      ["Learning Agility", selected.breakdown.learningAgilityScore],
                      ["Initiative", selected.breakdown.initiativeScore],
                      ["Culture Alignment", selected.breakdown.cultureAlignmentScore]
                    ].map(([label, score]) => (
                      <div key={label}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>{label}</span>
                          <span className="font-mono text-vermillion">{score}</span>
                        </div>
                        <div className="h-1 bg-paper-deep relative">
                          <div className="absolute inset-y-0 left-0 bg-vermillion" style={{ width: `${score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Section title="Tools learned recently" icon={Sparkles}>
                    <div className="flex flex-wrap gap-1.5">
                      {c.tools.map((t) => <span key={t} className="text-xs px-2 py-0.5 bg-vermillion-soft text-vermillion font-mono">{t}</span>)}
                    </div>
                  </Section>

                  {selected.breakdown.riskAnalysisScore < 0 && (
                    <div className="flex gap-2 p-3 border border-vermillion text-xs bg-vermillion-soft/20">
                      <AlertTriangle className="h-4 w-4 text-vermillion shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-vermillion">Risk Indicators surfaced</span>
                        <ul className="list-disc pl-4 mt-1 text-muted-foreground space-y-0.5">
                          {selected.risks.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {tab === "tournament" && (
                <div className="space-y-5">
                  <div className="eyebrow text-vermillion text-xs uppercase tracking-wider font-mono font-semibold">Tournament Match Record</div>
                  
                  {/* Tournament ELO Standings details */}
                  <div className="p-4 border border-rule bg-paper-deep space-y-2 rounded">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ELO Rating</span>
                      <span className="font-mono text-vermillion font-bold">{selected.eloRating}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Head-to-Head Record</span>
                      <span>
                        <b className="text-green-600">{selected.tournamentRecord.wins}W</b> -{" "}
                        <b className="text-red-600">{selected.tournamentRecord.losses}L</b> -{" "}
                        <b>{selected.tournamentRecord.ties}D</b>
                      </span>
                    </div>
                  </div>

                  <div className="eyebrow text-vermillion text-xs uppercase tracking-wider font-mono font-semibold">Career rounds & highlights</div>
                  {c.careerHistory.map((h, i) => (
                    <div key={i} className="border-l border-rule pl-4 space-y-1 relative">
                      <div className="absolute top-1.5 left-[-3.5px] w-1.5 h-1.5 rounded-full bg-vermillion" />
                      <div className="font-display text-lg leading-tight">{h.role}</div>
                      <div className="text-xs text-vermillion">{h.company} · {h.durationMonths} months</div>
                      <p className="text-sm mt-1 text-muted-foreground leading-relaxed">{h.description}</p>
                      {h.projectImpact && (
                        <div className="p-2 border border-rule bg-paper-deep text-[0.7rem] text-muted-foreground leading-snug">
                          Scale: <b className="text-ink">{h.projectImpact.scale}</b> | Outcome: <b className="text-ink">{h.projectImpact.businessOutcome}</b>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="pt-4 border-t border-rule">
                    <div className="eyebrow text-vermillion text-xs uppercase tracking-wider font-mono font-semibold mb-2">GitHub footprint</div>
                    <ul className="text-sm space-y-1.5">
                      <Row k="Repositories" v={c.github.repos} />
                      <Row k="Stars earned" v={c.github.stars} />
                      <Row k="Contributions / yr" v={c.github.contributions} />
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <footer className="border-t border-rule p-4 flex items-center gap-3 bg-paper-deep shrink-0">
              <button 
                onClick={() => toggleShortlist(c.id)}
                className={`ink-button flex-1 justify-center text-sm flex items-center gap-2 transition-colors cursor-pointer ${
                  shortlistedIds.includes(c.id) 
                    ? "bg-emerald-600 text-white hover:bg-emerald-700" 
                    : ""
                }`}
              >
                {shortlistedIds.includes(c.id) ? (
                  <>Shortlisted <CheckCircle2 className="h-4 w-4 fill-current" /></>
                ) : (
                  <>Shortlist Candidate <CheckCircle2 className="h-4 w-4" /></>
                )}
              </button>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-paper p-3 text-center">
      <div className="font-display text-2xl">{value}</div>
      <div className="eyebrow text-[0.6rem] text-muted-foreground uppercase tracking-wider font-mono">{label}</div>
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: typeof User; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="eyebrow text-vermillion text-xs uppercase tracking-wider font-mono font-semibold flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-vermillion" /> {title}
      </div>
      {children}
    </div>
  );
}

function Row({ k, v, accent }: { k: string; v: string | number; accent?: boolean }) {
  return (
    <li className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">{k}</span>
      <span className={accent ? "text-vermillion font-semibold" : "font-medium"}>{v}</span>
    </li>
  );
}
