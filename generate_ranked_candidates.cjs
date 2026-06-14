
const semanticMapping = {
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

const candidates = [
  {
    id: 'c1',
    name: 'Sarah Jenkins',
    title: 'Senior Full Stack Engineer',
    location: 'San Francisco, CA · Hybrid',
    experienceYears: 7,
    education: 'B.S. Computer Science, Stanford University',
    skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'TailwindCSS', 'PostgreSQL', 'GraphQL', 'AWS', 'Redis'],
    github: {
      repos: 45,
      stars: 128,
      contributions: 1240
    },
    activity: {
      lastActiveHours: 1,
      responseRate: 98,
      urgency: 'high',
      assessmentScore: 95
    },
    careerHistory: [
      {
        company: 'Stripe',
        role: 'Senior Software Engineer',
        durationMonths: 24,
        promotions: 1,
        description: 'Led a team of 4 to rebuild core dashboard features using React and GraphQL. Promoted from L4 to L5 in 18 months.',
        projectImpact: {
          scale: "10M+ daily API calls",
          businessOutcome: "Reduced check-out latency by 120ms, increasing checkout conversions by 1.2%"
        }
      },
      {
        company: 'Vercel',
        role: 'Software Engineer II',
        durationMonths: 36,
        promotions: 1,
        description: 'Contributed to Next.js open-source features, optimized build pipeline speeds, and improved dashboard accessibility.',
        projectImpact: {
          scale: "Millions of deployments globally",
          businessOutcome: "Optimized incremental static regeneration logic saving Vercel clients 15% in build compute costs"
        }
      }
    ],
    bio: 'Passionate full-stack product engineer specializing in React, Next.js, and high-performance APIs. Active open-source contributor.',
    behavioralSignals: {
      learningVelocity: 0.95,
      executionConsistency: 0.92,
      initiative: 0.88,
      cultureEvidence: {
        ownership: true,
        mentorship: true,
        collaboration: true
      }
    },
    certifications: ['AWS Certified Solutions Architect', 'Vercel Expert'],
    tools: ['GraphQL', 'Next.js 14 App Router', 'TailwindCSS v4'],
    riskIndicators: {
      frequentJobHopping: false,
      seniorityMismatch: false,
      unexplainedGaps: false
    }
  },
  {
    id: 'c2',
    name: 'Marcus Chen',
    title: 'Senior Backend Systems Engineer',
    location: 'Seattle, WA · Remote',
    experienceYears: 8,
    education: 'M.S. Computer Science, University of Washington',
    skills: ['Go', 'Kubernetes', 'Docker', 'PostgreSQL', 'gRPC', 'AWS', 'Redis', 'Python', 'Kafka', 'Apache Spark', 'Distributed Systems'],
    github: {
      repos: 30,
      stars: 840,
      contributions: 980
    },
    activity: {
      lastActiveHours: 4,
      responseRate: 94,
      urgency: 'medium',
      assessmentScore: 98
    },
    careerHistory: [
      {
        company: 'Amazon Web Services',
        role: 'Senior Systems Engineer',
        durationMonths: 30,
        promotions: 1,
        description: 'Designed internal control plane services using Go and gRPC. Reduced latency of system initialization by 40%.',
        projectImpact: {
          scale: "100k+ EC2 cluster instances",
          businessOutcome: "Improved system reliability to 99.999% uptime for core virtualization services"
        }
      },
      {
        company: 'HashiCorp',
        role: 'Systems Engineer II',
        durationMonths: 42,
        promotions: 1,
        description: 'Developed backend features for Consul and Nomad. Actively worked on distributed consensus algorithms.',
        projectImpact: {
          scale: "Used by 80% of Fortune 500",
          businessOutcome: "Designed and implemented raft consensus optimizations that reduced database lock conflicts"
        }
      }
    ],
    bio: 'Distributed systems builder focused on scaling cloud infrastructure. Expert in Go, microservices, and Kubernetes orchestration.',
    behavioralSignals: {
      learningVelocity: 0.90,
      executionConsistency: 0.95,
      initiative: 0.92,
      cultureEvidence: {
        ownership: true,
        mentorship: true,
        collaboration: true
      }
    },
    certifications: ['Certified Kubernetes Administrator (CKA)'],
    tools: ['Go 1.22 generics', 'eBPF', 'Terraform'],
    riskIndicators: {
      frequentJobHopping: false,
      seniorityMismatch: false,
      unexplainedGaps: false
    }
  },
  {
    id: 'c3',
    name: 'Elena Rostova',
    title: 'Frontend Developer',
    location: 'New York, NY · On-site',
    experienceYears: 4,
    education: 'B.S. Information Systems, NYU',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'TailwindCSS', 'Redux', 'Vite', 'Sass', 'Figma'],
    github: {
      repos: 18,
      stars: 12,
      contributions: 310
    },
    activity: {
      lastActiveHours: 48,
      responseRate: 75,
      urgency: 'low',
      assessmentScore: 82
    },
    careerHistory: [
      {
        company: 'Squarespace',
        role: 'Software Engineer',
        durationMonths: 24,
        promotions: 0,
        description: 'Developed interactive UI templates and styling components. Worked closely with design teams to iterate on layouts.',
        projectImpact: {
          scale: "Over 500k merchant websites",
          businessOutcome: "Rebuilt visual editors which boosted customer conversion by 5%"
        }
      }
    ],
    bio: 'Detail-oriented frontend engineer crafting beautiful UIs with a focus on design systems and accessibility.',
    behavioralSignals: {
      learningVelocity: 0.70,
      executionConsistency: 0.85,
      initiative: 0.65,
      cultureEvidence: {
        ownership: false,
        mentorship: false,
        collaboration: true
      }
    },
    certifications: [],
    tools: ['Figma to code tools', 'TailwindCSS v3.4'],
    riskIndicators: {
      frequentJobHopping: false,
      seniorityMismatch: false,
      unexplainedGaps: false
    }
  },
  {
    id: 'c4',
    name: 'Alex Mercer',
    title: 'Senior Recommendations Platform Engineer',
    location: 'Los Angeles, CA · Remote',
    experienceYears: 6,
    education: 'B.S. Software Engineering, UCLA',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Apache Kafka', 'Distributed Systems', 'Redis', 'PostgreSQL', 'Docker', 'System Design'],
    github: {
      repos: 24,
      stars: 95,
      contributions: 420
    },
    activity: {
      lastActiveHours: 3,
      responseRate: 92,
      urgency: 'high',
      assessmentScore: 88
    },
    careerHistory: [
      {
        company: 'Netflix',
        role: 'Senior Machine Learning Engineer',
        durationMonths: 36,
        promotions: 1,
        description: 'Developed real-time recommendation engines. Scaled prediction pipelines processing millions of requests per second. Built complex feature store tables.',
        projectImpact: {
          scale: "200M+ global subscribers",
          businessOutcome: "Boosted recommendation click-through rates by 2.4% through hybrid deep learning models"
        }
      },
      {
        company: 'Hulu',
        role: 'Software Engineer II (Data)',
        durationMonths: 36,
        promotions: 1,
        description: 'Built data processing pipelines for video usage metrics. Optimized Kafka clusters and streaming ingestion pipelines.',
        projectImpact: {
          scale: "Tens of terabytes per day",
          businessOutcome: "Reduced pipeline delay by 8 minutes, ensuring near-instant dashboard metrics"
        }
      }
    ],
    bio: 'Machine learning systems engineer with strong expertise in real-time inference, distributed systems, streaming architectures, and feature store modeling.',
    behavioralSignals: {
      learningVelocity: 0.88,
      executionConsistency: 0.90,
      initiative: 0.82,
      cultureEvidence: {
        ownership: true,
        mentorship: true,
        collaboration: true
      }
    },
    certifications: ['TensorFlow Developer Certificate'],
    tools: ['PyTorch', 'Kafka Streams', 'FastAPI'],
    riskIndicators: {
      frequentJobHopping: false,
      seniorityMismatch: false,
      unexplainedGaps: false
    }
  },
  {
    id: 'c5',
    name: 'Sophia Bennett',
    title: 'Lead Software Architect',
    location: 'Boston, MA · Hybrid',
    experienceYears: 12,
    education: 'Ph.D. Software Engineering, MIT',
    skills: ['Java', 'Spring Boot', 'Python', 'AWS', 'Kubernetes', 'Apache Kafka', 'Microservices', 'PostgreSQL', 'System Design'],
    github: {
      repos: 58,
      stars: 1500,
      contributions: 670
    },
    activity: {
      lastActiveHours: 168,
      responseRate: 60,
      urgency: 'low'
    },
    careerHistory: [
      {
        company: 'Red Hat',
        role: 'Principal Software Engineer',
        durationMonths: 48,
        promotions: 1,
        description: 'Led container runtime optimizations. Regular speaker at KubeCon and open-source advocate.',
        projectImpact: {
          scale: "Core Kubernetes project runtime",
          businessOutcome: "Improved container startup time globally by 10%"
        }
      },
      {
        company: 'IBM',
        role: 'Senior Software Engineer',
        durationMonths: 60,
        promotions: 2,
        description: 'Developed and optimized enterprise Java applications. Promoted twice for leadership and excellence in delivery.',
        projectImpact: {
          scale: "Enterprise banking core databases",
          businessOutcome: "Re-architected messaging pipelines saving over $1M in server cloud bills"
        }
      }
    ],
    bio: 'Architect and researcher specializing in high-throughput messaging, cloud platform architecture, and distributed databases.',
    behavioralSignals: {
      learningVelocity: 0.80,
      executionConsistency: 0.96,
      initiative: 0.95,
      cultureEvidence: {
        ownership: true,
        mentorship: true,
        collaboration: true
      }
    },
    certifications: ['Red Hat Certified Architect'],
    tools: ['WebAssembly', 'Rust'],
    riskIndicators: {
      frequentJobHopping: false,
      seniorityMismatch: false,
      unexplainedGaps: false
    }
  },
  {
    id: 'c6',
    name: 'Jordan Miller',
    title: 'Junior Frontend Developer',
    location: 'Denver, CO · Remote',
    experienceYears: 2,
    education: 'B.A. Psychology, CU Boulder',
    skills: ['React', 'JavaScript', 'CSS3', 'TailwindCSS', 'Git'],
    github: {
      repos: 10,
      stars: 3,
      contributions: 120
    },
    activity: {
      lastActiveHours: 2,
      responseRate: 99,
      urgency: 'high',
      assessmentScore: 70
    },
    careerHistory: [
      {
        company: 'Contractor Ltd',
        role: 'Frontend Developer (Freelance)',
        durationMonths: 12,
        promotions: 0,
        description: 'Built simple marketing landing pages and responsive forms using TailwindCSS.',
        projectImpact: {
          scale: "Local business websites",
          businessOutcome: "Boosted client page loading scores by 20 points"
        }
      },
      {
        company: 'Innovate Corp',
        role: 'Intern Developer',
        durationMonths: 12,
        promotions: 0,
        description: 'Assisted in styling responsive web dashboards and fixing bugs.',
        projectImpact: {
          scale: "Internal support portals",
          businessOutcome: "Resolved 45+ backlog tickets within 3 months"
        }
      }
    ],
    bio: 'Self-motivated developer looking to expand React capabilities and gain mentorship in structured engineering teams.',
    behavioralSignals: {
      learningVelocity: 0.85,
      executionConsistency: 0.60,
      initiative: 0.70,
      cultureEvidence: {
        ownership: false,
        mentorship: false,
        collaboration: true
      }
    },
    certifications: [],
    tools: ['React Hooks', 'Vite'],
    riskIndicators: {
      frequentJobHopping: true,
      seniorityMismatch: false,
      unexplainedGaps: false
    }
  }
];

const DEFAULT_JD = `Staff Engineer — Fraud Detection

Core
· Python with large-scale ML systems
· Distributed systems & real-time inference
· Kafka streaming, PostgreSQL state

Preferred
· Leadership scope & mentorship
· Gigabyte-scale throughput
· Highly responsive, fast feedback`;

const weights = {
  semanticFit: 50,
  leadershipImportance: 30,
  careerVelocity: 40,
  learningAgility: 30,
  riskSensitivity: 25
};

function parseJobDescription(jd) {
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

  const hiddenRequirements = [];
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

function calculateCandidateScores(candidate, jd, weights) {
  const { requiredSkills, preferredExperienceYears, seniority } = parseJobDescription(jd);
  const normalizedJd = jd.toLowerCase();
  
  const strengths = [];
  const risks = [];
  const transferableSkillsMapped = [];

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

function runReasoningTournament(candidatesList, jd, weights) {
  const scorecards = candidatesList.map(c => calculateCandidateScores(c, jd, weights));
  const K = 32;

  for (let iter = 0; iter < 3; iter++) {
    for (let i = 0; i < scorecards.length; i++) {
      for (let j = i + 1; j < scorecards.length; j++) {
        const cardA = scorecards[i];
        const cardB = scorecards[j];

        let winner = 'Tie';
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

const fs = require('fs');

const results = runReasoningTournament(candidates, DEFAULT_JD, weights);

const headers = ["Rank", "ID", "Name", "Title", "Location", "ELO Rating", "Composite Score", "Wins", "Losses", "Ties"];
const rows = results.map((r, index) => [
  index + 1,
  r.candidate.id,
  `"${r.candidate.name}"`,
  `"${r.candidate.title}"`,
  `"${r.candidate.location}"`,
  r.eloRating,
  r.breakdown.overallWeightedScore,
  r.tournamentRecord.wins,
  r.tournamentRecord.losses,
  r.tournamentRecord.ties
]);

const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
fs.writeFileSync('ranked_candidates.csv', csvContent, 'utf-8');
console.log('Successfully generated ranked_candidates.csv!');
