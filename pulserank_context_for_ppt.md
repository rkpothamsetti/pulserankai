# PulseRank AI — Pitch Deck Content & Project Context

Use this comprehensive markdown document as your source material for building your competition presentation. The content is structured logically in slide-by-slide format.

---

## Slide 1: Title & Hook
*   **Slide Title:** PulseRank AI
*   **Subtitle:** The Reasoning Recruiter for the Post-Resume Era
*   **Presenter Note / Hook:** Keyword matching treats candidates as bags of words. PulseRank runs a reasoning tournament across candidates, weighted by real-world engineering signals.

---

## Slide 2: The Problem with Traditional ATS
*   **Slide Title:** Why Traditional Hiring Systems Are Broken
*   **Bullet Points:**
    *   **Keyword Stuffing Bias:** ATS search algorithms favor candidates who copy-paste exact buzzwords, creating false positives.
    *   **Rigid Boolean Logic:** Literal string matches miss perfect, adjacent talent (e.g. a candidate with "distributed systems" experience could easily excel at a "fraud detection pipeline" role).
    *   **Ignore Career Trajectory:** Traditional filters read titles and durations in isolation, ignoring promotions, learning velocity, and project impact.
    *   **No Risk Assessment:** Mismatches and job-hopping patterns are ignored by initial filters, wasting recruiter screening time.

---

## Slide 3: The PulseRank Solution
*   **Slide Title:** The Recruiter Reasoning Tournament
*   **Bullet Points:**
    *   **Requirement Graph Parser:** JD is parsed into a node graph mapping must-haves, nice-to-haves, and latent skills.
    *   **8-Factor Scorecard:** Translates resume data into eight structured axes of performance, velocity, and risks.
    *   **Adversarial Pairwise Brackets:** Candidates face off in simulated head-to-head matchups to calculate their ELO ratings.

---

## Slide 4: Under the Hood: The ELO Matchup Engine
*   **Slide Title:** How the Tournament Ranks Candidates
*   **Technical Details:**
    *   **Algorithm Time Complexity:** Runs in $O(n \log n)$ time, sorting 1,000+ candidates in under 13 seconds.
    *   **Matchup Rules:**
        *   If the weighted scorecard delta is > 4 points, the higher-scoring candidate wins.
        *   If the difference is small ($\le 4$), the engine runs contextual tie-breakers based on role seniority.
    *   **Seniority Tie-Breaker:** Evaluates ownership evidence and leadership history.
    *   **Mid-Level Tie-Breaker:** Evaluates learning agility (technologies learned recently) and career velocity.
    *   **Mathematical Rating:** Chess-style ELO ratings are updated iteratively using a $K$-factor of 32.

---

## Slide 5: The 8-Factor Scorecard Lenses
*   **Slide Title:** Beyond Resumes: Multi-Axis Scoring
*   **The 8 Scorecard Pillars:**
    1.  **Semantic Fit:** Contextual graph match between candidate skills and job needs.
    2.  **Seniority Alignment:** Title, scope, and team size calibration.
    3.  **Career Velocity:** Calculation of promotions per year and scope deltas.
    4.  **Project Impact:** Quantifiable metrics (e.g., millions of users, gigabytes processed).
    5.  **Learning Agility:** Recent open-source contributions and newly acquired technologies.
    6.  **Initiative:** Evidence of proactive ownership, zero-to-one builds, and refactoring.
    7.  **Culture Alignment:** Mentorship and collaboration indicators.
    8.  **Risk Analysis:** Scoring negative indicators (job-hopping, response rate drops).

---

## Slide 6: Product Architecture & UI Console
*   **Slide Title:** Interactive Recruiter Workspace
*   **Core UI Features:**
    *   **Real-time JD Parsing:** Instantly generates interactive SVG requirement graphs.
    *   **Dynamic Weight Sliders:** Recruiters can adjust the importance of semantic fit, leadership, velocity, agility, and risk in real time.
    *   **Visual Standings Bracket:** Displays current ELO rankings and shortlist states.
    *   **Deep Scorecard Inspector:** Provides tabbed profiles with transferable skill mapping, ELO record, and risk summaries.
    *   **Exporter:** One-click CSV export of shortlisted profiles.

---

## Slide 7: Technical Stack & Performance
*   **Slide Title:** High-Performance Engineering Foundation
*   **Stack:**
    *   **Frontend framework:** React & TypeScript using TanStack Router for file-based routing.
    *   **CSS & Styling:** Custom Vanilla CSS styling utilizing HSL and OKLCH color palettes (cream paper and vermillion accents).
    *   **Visualizations:** Recharts for dynamic curves and inline SVGs for the requirement networks.
