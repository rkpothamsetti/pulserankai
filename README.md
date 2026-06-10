# PulseRank AI — Cognitive Hiring Platform

PulseRank AI is an AI-powered Cognitive Hiring Intelligence Platform that moves beyond basic keyword filtering to understand jobs like an experienced recruiter, evaluate candidates like a hiring manager, and deliver an explainable, ranked shortlist.

Instead of asking *"Does this candidate contain the right keywords?"*, PulseRank asks: *"Would an experienced recruiter shortlist this candidate for this role, and why?"*

---

## 🚀 Key Innovations

### 1. Recruiter Reasoning Tournament (ELO-Based Ranking)
Most applicant tracking systems score candidates in isolation. PulseRank implements a **round-robin pairwise tournament engine**. The algorithm matches candidates head-to-head for a specific job description, comparing multi-dimensional signals (e.g. weighing leadership scope vs technical depth for senior roles), and calculates stable final ranks using **ELO rating updates**.

### 2. Requirement Knowledge Graph & Transferable Skills
Job requirements are parsed into connected semantic concepts rather than isolated keywords. For example, if a job description requires a **Fraud Detection Engineer**, the engine automatically maps and ranks candidates with a **Recommendation Systems** background, explaining that both require low-latency ML scoring, event streaming (Kafka), and distributed scalability.

### 3. 8-Factor Multi-Signal Evaluation
Candidates are assessed across 8 independent parameters:
* **Semantic Fit (35%):** Skills and concept overlap.
* **Seniority Alignment (15%):** Alignment of role scope and tenure.
* **Career Velocity (10%):** Calculated based on promotion velocity and job stability.
* **Project Impact (10%):** Quantifiable scale and business outcomes.
* **Learning Agility (10%):** Adoption rate of tools and certifications.
* **Initiative (5%):** Open-source contributions and side-project footprints.
* **Culture Alignment (5%):** Evidence of ownership and mentorship.
* **Risk Analysis (up to -10%):** Penalty scale for frequent job hopping or low responsiveness.

---

## 🛠️ Technology Stack
* **Frontend UI:** React, TypeScript, TanStack Start (React Router), Tailwind CSS v4, Lucide React
* **Engine Layer:** TypeScript (ELO Tournament Matchmaking, SVG network graph generators, semantic synonym mappings)

---

## 📂 Project Structure
* [`src/routes/app.tsx`](file:///C:/Users/krish/OneDrive/Desktop/pulserank-ui-refresh-new_frontend/src/routes/app.tsx) — Main interactive workspace dashboard (weight sliders, SVG nodes graph, ELO leaderboards).
* [`src/engine/rankingEngine.ts`](file:///C:/Users/krish/OneDrive/Desktop/pulserank-ui-refresh-new_frontend/src/engine/rankingEngine.ts) — Parsers, scorecard scoring, and ELO matchmaking logic.
* [`src/data/candidates.ts`](file:///C:/Users/krish/OneDrive/Desktop/pulserank-ui-refresh-new_frontend/src/data/candidates.ts) — Enriched signal-based candidate database.

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open **`http://localhost:8080/app`** to launch the interactive recruiter workspace.

### 3. Build for Production
```bash
npm run build
```
