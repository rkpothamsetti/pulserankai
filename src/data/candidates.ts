export interface CareerExperience {
  company: string;
  role: string;
  durationMonths: number;
  promotions: number;
  description: string;
  projectImpact?: {
    scale: string;
    businessOutcome: string;
  };
}

export interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  experienceYears: number;
  education: string;
  skills: string[];
  github: {
    repos: number;
    stars: number;
    contributions: number;
  };
  activity: {
    lastActiveHours: number;
    responseRate: number;
    urgency: 'high' | 'medium' | 'low';
    assessmentScore?: number;
  };
  careerHistory: CareerExperience[];
  bio: string;
  
  // Upgraded Behavioral Proxies & Score Parameters
  behavioralSignals: {
    learningVelocity: number; // 0.0 - 1.0
    executionConsistency: number; // 0.0 - 1.0
    initiative: number; // 0.0 - 1.0
    cultureEvidence: {
      ownership: boolean;
      mentorship: boolean;
      collaboration: boolean;
    };
  };
  certifications: string[];
  tools: string[]; // recent tools learned
  riskIndicators: {
    frequentJobHopping: boolean;
    seniorityMismatch: boolean;
    unexplainedGaps: boolean;
  };
}

export const candidates: Candidate[] = [
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
