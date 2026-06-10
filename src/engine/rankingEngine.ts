import type { Candidate } from '../data/candidates';

export interface SignalWeights {
  semanticFit: number;
  leadershipImportance: number;
  careerVelocity: number;
  learningAgility: number;
  riskSensitivity: number;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'requirement' | 'skill' | 'concept' | 'domain';
  connectedTo: string[];
}

export interface RequirementGraph {
  nodes: GraphNode[];
  edges: { source: string; target: string; relation: string }[];
}

export interface CandidateScorecard {
  candidate: Candidate;
  eloRating: number;
  tournamentRecord: { wins: number; losses: number; ties: number };
  breakdown: {
    semanticFitScore: number;
    seniorityAlignmentScore: number;
    careerVelocityScore: number;
    projectImpactScore: number;
    learningAgilityScore: number;
    initiativeScore: number;
    cultureAlignmentScore: number;
    riskAnalysisScore: number;
    overallWeightedScore: number;
  };
  strengths: string[];
  risks: string[];
  recruiterInsight: string;
  transferableSkillsMapped: { sourceSkill: string; targetSkill: string; reason: string }[];
}

const semanticMapping: Record<string, { target: string; reason: string; related: string[] }> = {
  'fraud detection': {
    target: 'recommendation systems',
    reason: 'Both fraud detection and recommendation engines share core requirements: processing large-scale live events, deploying real-time ML inference pipelines, feature engineering, and monitoring latency.',
    related: ['Anomaly Detection', 'Streaming Systems', 'Large Scale ML', 'Real-Time Inference']
  },
  'recommendation systems': {
    target: 'fraud detection',
    reason: 'Both domains leverage low-latency ML scoring, Kafka event streaming, user state modeling, and distributed system architectures.',
    related: ['Large Scale ML', 'Real-Time Inference', 'Kafka', 'Distributed Systems']
  },
  'distributed systems': {
    target: 'cloud platforms',
    reason: 'System scale relies heavily on Docker, Kubernetes orchestration, and cloud infrastructure paradigms.',
    related: ['Kubernetes', 'Docker', 'AWS', 'gRPC', 'Microservices']
  },
  'react': {
    target: 'frontend framework',
    reason: 'Frontend development is highly transferable across Single Page App frameworks.',
    related: ['Next.js', 'Redux', 'TypeScript', 'Vite', 'TailwindCSS']
  }
};

export function generateRequirementGraph(jd: string): RequirementGraph {
  const normalized = jd.toLowerCase();
  const nodes: GraphNode[] = [];
  const edges: { source: string; target: string; relation: string }[] = [];

  let roleType = 'Software Engineer';
  if (normalized.includes('backend')) roleType = 'Backend Engineer';
  if (normalized.includes('frontend')) roleType = 'Frontend Engineer';
  if (normalized.includes('full stack')) roleType = 'Full Stack Engineer';
  if (normalized.includes('architect')) roleType = 'Software Architect';
  if (normalized.includes('machine learning') || normalized.includes('ml')) roleType = 'ML Engineer';

  nodes.push({ id: 'role', label: roleType, type: 'requirement', connectedTo: [] });

  let detectedDomain = 'General SaaS';
  if (normalized.includes('fraud') || normalized.includes('risk') || normalized.includes('fintech') || normalized.includes('finance')) {
    detectedDomain = 'Fraud Detection & FinTech';
    nodes.push({ id: 'domain', label: detectedDomain, type: 'domain', connectedTo: ['role'] });
    edges.push({ source: 'role', target: 'domain', relation: 'operates_in' });

    const mapping = semanticMapping['fraud detection'];
    mapping.related.forEach(rel => {
      nodes.push({ id: rel.toLowerCase().replace(' ', '_'), label: rel, type: 'concept', connectedTo: ['domain'] });
      edges.push({ source: 'domain', target: rel.toLowerCase().replace(' ', '_'), relation: 'requires_competency' });
    });
  } else {
    nodes.push({ id: 'domain', label: detectedDomain, type: 'domain', connectedTo: ['role'] });
    edges.push({ source: 'role', target: 'domain', relation: 'operates_in' });
  }

  const allKnownSkills = [
    'react', 'typescript', 'node.js', 'next.js', 'postgresql', 'graphql', 'aws', 'redis', 
    'go', 'kubernetes', 'docker', 'grpc', 'python', 'kafka', 'java', 'spring boot', 'system design', 'machine learning'
  ];

  allKnownSkills.forEach(skill => {
    if (normalized.includes(skill.toLowerCase())) {
      const skillId = skill.replace(' ', '_');
      nodes.push({ id: skillId, label: skill, type: 'skill', connectedTo: ['role'] });
      edges.push({ source: 'role', target: skillId, relation: 'requires_skill' });
      
      const mapped = semanticMapping[skill.toLowerCase()];
      if (mapped) {
        mapped.related.slice(0, 2).forEach(rel => {
          const relId = rel.toLowerCase().replace(' ', '_');
          if (!nodes.some(n => n.id === relId)) {
            nodes.push({ id: relId, label: rel, type: 'concept', connectedTo: [skillId] });
            edges.push({ source: skillId, target: relId, relation: 'relates_to' });
          }
        });
      }
    }
  });

  return { nodes, edges };
}

export function parseJobDescription(jd: string) {
  const normalized = jd.toLowerCase();
  
  let preferredExperienceYears = 3;
  const expMatch = normalized.match(/(\d+)\+?\s*(years?|yrs?)/);
  if (expMatch) {
    preferredExperienceYears = parseInt(expMatch[1], 10);
  }

  const allSkills = [
    'React', 'TypeScript', 'Node.js', 'Next.js', 'TailwindCSS', 'PostgreSQL', 'GraphQL', 'AWS', 'Redis',
    'Go', 'Kubernetes', 'Docker', 'gRPC', 'Python', 'Kafka', 'Java', 'Spring Boot', 'System Design', 'Machine Learning', 'TensorFlow'
  ];

  const requiredSkills = allSkills.filter(skill => 
    normalized.includes(skill.toLowerCase())
  );

  let seniority = 'Mid-Level';
  if (normalized.includes('senior') || normalized.includes('sr')) seniority = 'Senior Engineer';
  if (normalized.includes('lead') || normalized.includes('principal') || normalized.includes('staff') || normalized.includes('architect')) {
    seniority = 'Staff / Lead Architect';
  }

  const hiddenRequirements: string[] = [];
  if (normalized.includes('architect') || normalized.includes('scale') || normalized.includes('own')) {
    hiddenRequirements.push('System Ownership', 'Architecture Guidance', 'Technical Mentorship');
  } else {
    hiddenRequirements.push('Collaborative Engineering', 'Feature Delivery');
  }

  return {
    requiredSkills,
    preferredExperienceYears,
    seniority,
    hiddenRequirements
  };
}

export function calculateCandidateScores(
  candidate: Candidate,
  jd: string,
  weights: SignalWeights
): CandidateScorecard {
  const { requiredSkills, preferredExperienceYears, seniority } = parseJobDescription(jd);
  const normalizedJd = jd.toLowerCase();
  
  const strengths: string[] = [];
  const risks: string[] = [];
  const transferableSkillsMapped: { sourceSkill: string; targetSkill: string; reason: string }[] = [];

  let skillsMatched = 0;
  const candidateSkillsLower = candidate.skills.map(s => s.toLowerCase());

  requiredSkills.forEach(req => {
    const reqLower = req.toLowerCase();
    if (candidateSkillsLower.includes(reqLower)) {
      skillsMatched += 1.0;
    } else {
      let foundTransferable = false;
      Object.keys(semanticMapping).forEach(key => {
        const mapData = semanticMapping[key];
        if (reqLower.includes(key) || key.includes(reqLower)) {
          if (candidateSkillsLower.includes(mapData.target)) {
            skillsMatched += 0.8;
            foundTransferable = true;
            transferableSkillsMapped.push({
              sourceSkill: mapData.target,
              targetSkill: req,
              reason: mapData.reason
            });
          }
        }
      });

      if (!foundTransferable) {
        const relatedMatch = candidate.skills.some(cs => 
          normalizedJd.includes(cs.toLowerCase())
        );
        if (relatedMatch) skillsMatched += 0.3;
      }
    }
  });

  const semanticFitScore = requiredSkills.length > 0
    ? Math.min(100, Math.round((skillsMatched / requiredSkills.length) * 100))
    : 75;

  if (semanticFitScore > 85) strengths.push("Exceptional semantic matching with core skills.");
  if (transferableSkillsMapped.length > 0) {
    strengths.push(`Strong domain transferable skills: ${transferableSkillsMapped.map(t => t.sourceSkill).join(', ')}.`);
  }

  let seniorityScore = 70;
  const isSeniorJd = seniority.includes('Senior') || seniority.includes('Staff') || seniority.includes('Lead');
  const isCandidateSenior = candidate.title.toLowerCase().includes('senior') || candidate.title.toLowerCase().includes('lead') || candidate.title.toLowerCase().includes('principal');

  const experienceDiff = candidate.experienceYears - preferredExperienceYears;
  
  if (isSeniorJd) {
    if (isCandidateSenior) seniorityScore += 15;
    if (experienceDiff >= 0) seniorityScore += 15;
    else {
      seniorityScore -= Math.min(40, Math.abs(experienceDiff) * 15);
      risks.push(`Fewer years of experience (${candidate.experienceYears}) than the preferred ${preferredExperienceYears}+ years.`);
    }
  } else {
    if (experienceDiff >= 0) seniorityScore += 20;
    if (candidate.experienceYears < 2) seniorityScore -= 10;
  }
  seniorityScore = Math.max(0, Math.min(100, seniorityScore));

  let totalDuration = 0;
  let totalPromotions = 0;
  candidate.careerHistory.forEach(job => {
    totalDuration += job.durationMonths;
    totalPromotions += job.promotions;
  });
  const yearsInCareer = totalDuration / 12 || 1;
  const promotionRate = totalPromotions / yearsInCareer;

  let careerVelocityScore = 50;
  if (promotionRate > 0.4) {
    careerVelocityScore = 95;
    strengths.push("Rapid career velocity (frequent promotions and leadership growth).");
  } else if (promotionRate > 0.2) {
    careerVelocityScore = 80;
  } else {
    const avgDuration = candidate.careerHistory.length > 0 ? totalDuration / candidate.careerHistory.length : 12;
    if (avgDuration > 24) {
      careerVelocityScore += 15;
    }
  }

  let projectImpactScore = 60;
  let hasStrongImpact = false;
  candidate.careerHistory.forEach(job => {
    if (job.projectImpact) {
      if (job.projectImpact.scale.includes('M+') || job.projectImpact.scale.includes('Millions') || job.projectImpact.scale.includes('terabytes')) {
        projectImpactScore += 15;
        hasStrongImpact = true;
      }
      if (job.projectImpact.businessOutcome.includes('%') || job.projectImpact.businessOutcome.includes('$')) {
        projectImpactScore += 15;
        hasStrongImpact = true;
      }
    }
  });
  projectImpactScore = Math.min(100, projectImpactScore);
  if (hasStrongImpact) {
    strengths.push("Proven high-impact delivery with quantifiable scale/business outcomes.");
  }

  const learningAgilityScore = Math.round(candidate.behavioralSignals.learningVelocity * 100);
  if (learningAgilityScore > 85) {
    strengths.push("High learning velocity (actively picking up new technologies and toolsets).");
  }

  const initiativeScore = Math.round(candidate.behavioralSignals.initiative * 100);
  if (initiativeScore > 80) {
    strengths.push("Demonstrates solid initiative via open-source or complex side projects.");
  }

  let cultureScore = 50;
  const civ = candidate.behavioralSignals.cultureEvidence;
  if (civ.ownership) cultureScore += 20;
  if (civ.mentorship) cultureScore += 20;
  if (civ.collaboration) cultureScore += 10;
  cultureScore = Math.min(100, cultureScore);

  let riskAnalysisScore = 0;
  if (candidate.riskIndicators.frequentJobHopping) {
    riskAnalysisScore -= 6;
    risks.push("Frequent short tenures (potential job-hopping pattern).");
  }
  if (candidate.activity.responseRate < 70) {
    riskAnalysisScore -= 4;
    risks.push("Lower candidate engagement (response rate below 70%).");
  }

  const totalWeightSlider = weights.semanticFit + weights.leadershipImportance + weights.careerVelocity + weights.learningAgility;
  const normWeights = {
    semantic: weights.semanticFit / totalWeightSlider,
    leadership: weights.leadershipImportance / totalWeightSlider,
    velocity: weights.careerVelocity / totalWeightSlider,
    agility: weights.learningAgility / totalWeightSlider
  };

  const overallWeightedScore = Math.round(
    (semanticFitScore * 0.35 * (normWeights.semantic * 2.85)) +
    (seniorityScore * 0.15 * (normWeights.leadership * 6.67)) +
    (careerVelocityScore * 0.10 * (normWeights.velocity * 10)) +
    (projectImpactScore * 0.10) +
    (learningAgilityScore * 0.10 * (normWeights.agility * 10)) +
    (initiativeScore * 0.05) +
    (cultureScore * 0.05) +
    (riskAnalysisScore * (weights.riskSensitivity / 50))
  );

  let recruiterInsight = '';
  if (transferableSkillsMapped.length > 0) {
    recruiterInsight = `Although ${candidate.name} lacks direct experience in the specified domain, they have highly transferable experience in ${transferableSkillsMapped[0].sourceSkill}. The mathematical overlaps indicate low ramp-up friction.`;
  } else if (semanticFitScore > 85) {
    recruiterInsight = `${candidate.name} matches the requested profile with high accuracy. They demonstrate strong technical depth and career stability.`;
  } else {
    recruiterInsight = `Matches general qualifications but lacks key core technical skills. Consider for adjacent roles.`;
  }

  return {
    candidate,
    eloRating: 1000,
    tournamentRecord: { wins: 0, losses: 0, ties: 0 },
    breakdown: {
      semanticFitScore,
      seniorityAlignmentScore: seniorityScore,
      careerVelocityScore,
      projectImpactScore,
      learningAgilityScore,
      initiativeScore,
      cultureAlignmentScore: cultureScore,
      riskAnalysisScore,
      overallWeightedScore: Math.max(0, Math.min(100, overallWeightedScore))
    },
    strengths,
    risks,
    recruiterInsight,
    transferableSkillsMapped
  };
}

export function runReasoningTournament(
  candidatesList: Candidate[],
  jd: string,
  weights: SignalWeights
): CandidateScorecard[] {
  const scorecards = candidatesList.map(c => calculateCandidateScores(c, jd, weights));
  const K = 32;

  for (let iter = 0; iter < 3; iter++) {
    for (let i = 0; i < scorecards.length; i++) {
      for (let j = i + 1; j < scorecards.length; j++) {
        const cardA = scorecards[i];
        const cardB = scorecards[j];

        let winner: 'A' | 'B' | 'Tie' = 'Tie';
        const scoreDiff = cardA.breakdown.overallWeightedScore - cardB.breakdown.overallWeightedScore;

        if (Math.abs(scoreDiff) > 4) {
          winner = scoreDiff > 0 ? 'A' : 'B';
        } else {
          const jdDetails = parseJobDescription(jd);
          const isSenior = jdDetails.seniority.includes('Staff') || jdDetails.seniority.includes('Senior');

          if (isSenior) {
            const rankA = cardA.breakdown.seniorityAlignmentScore + (cardA.candidate.behavioralSignals.cultureEvidence.ownership ? 15 : 0);
            const rankB = cardB.breakdown.seniorityAlignmentScore + (cardB.candidate.behavioralSignals.cultureEvidence.ownership ? 15 : 0);
            if (rankA !== rankB) {
              winner = rankA > rankB ? 'A' : 'B';
            } else {
              winner = scoreDiff >= 0 ? 'A' : 'B';
            }
          } else {
            const rateA = cardA.breakdown.learningAgilityScore + cardA.breakdown.careerVelocityScore;
            const rateB = cardB.breakdown.learningAgilityScore + cardB.breakdown.careerVelocityScore;
            if (rateA !== rateB) {
              winner = rateA > rateB ? 'A' : 'B';
            } else {
              winner = 'Tie';
            }
          }
        }

        const ratingA = cardA.eloRating;
        const ratingB = cardB.eloRating;

        const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
        const expectedB = 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400));

        let outcomeA = 0.5;
        let outcomeB = 0.5;

        if (winner === 'A') {
          outcomeA = 1;
          outcomeB = 0;
          if (iter === 2) {
            cardA.tournamentRecord.wins++;
            cardB.tournamentRecord.losses++;
          }
        } else if (winner === 'B') {
          outcomeA = 0;
          outcomeB = 1;
          if (iter === 2) {
            cardA.tournamentRecord.losses++;
            cardB.tournamentRecord.wins++;
          }
        } else {
          if (iter === 2) {
            cardA.tournamentRecord.ties++;
            cardB.tournamentRecord.ties++;
          }
        }

        cardA.eloRating = Math.round(ratingA + K * (outcomeA - expectedA));
        cardB.eloRating = Math.round(ratingB + K * (outcomeB - expectedB));
      }
    }
  }

  return scorecards.sort((a, b) => b.eloRating - a.eloRating);
}
