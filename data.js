window.CRF_DATA = {
  "domains": [
    {
      "id": "personal",
      "name": "Personal",
      "description": "Personal development, career growth, hobbies, and lifestyle management roles",
      "version": "1.0.0",
      "roles": [
        "job-seeker",
        "student",
        "diy-enthusiast",
        "fitness-coach"
      ],
      "metadata": {
        "tags": [
          "personal",
          "career",
          "learning",
          "hobbies",
          "lifestyle"
        ],
        "icon": "user",
        "color": "#d946ef"
      },
      "_filePath": "examples/personal/domain.json"
    },
    {
      "id": "security",
      "name": "Security",
      "description": "Information security, penetration testing, and compliance roles focused on protecting systems and ensuring regulatory adherence",
      "version": "1.0.0",
      "roles": [
        "security-analyst",
        "penetration-tester",
        "compliance-officer"
      ],
      "metadata": {
        "tags": [
          "security",
          "compliance",
          "pentesting",
          "vulnerability",
          "risk"
        ],
        "icon": "shield",
        "color": "#dc2626"
      },
      "_filePath": "examples/security/domain.json"
    },
    {
      "id": "development",
      "name": "Development",
      "description": "Software development and engineering roles spanning frontend, backend, DevOps, and full-stack development",
      "version": "1.0.0",
      "roles": [
        "frontend-developer",
        "backend-developer",
        "devops-engineer",
        "full-stack-developer"
      ],
      "metadata": {
        "tags": [
          "engineering",
          "technology",
          "software",
          "coding"
        ],
        "icon": "code",
        "color": "#0066cc"
      },
      "_filePath": "examples/development/domain.json"
    },
    {
      "id": "business",
      "name": "Business",
      "description": "Business analysis, product management, and marketing roles focused on strategy, analytics, and growth",
      "version": "1.0.0",
      "roles": [
        "data-analyst",
        "product-manager",
        "marketing-manager"
      ],
      "metadata": {
        "tags": [
          "business",
          "analytics",
          "product",
          "marketing",
          "strategy"
        ],
        "icon": "briefcase",
        "color": "#059669"
      },
      "_filePath": "examples/business/domain.json"
    },
    {
      "id": "operations",
      "name": "Operations",
      "description": "IT operations, site reliability engineering, cloud architecture, and system administration roles",
      "version": "1.0.0",
      "roles": [
        "site-reliability-engineer",
        "cloud-architect",
        "system-administrator"
      ],
      "metadata": {
        "tags": [
          "operations",
          "infrastructure",
          "sre",
          "cloud",
          "systems"
        ],
        "icon": "settings",
        "color": "#0891b2"
      },
      "_filePath": "examples/operations/domain.json"
    },
    {
      "id": "home-family",
      "name": "Home & Family",
      "description": "Family management, home organization, education, and household planning roles",
      "version": "1.0.0",
      "roles": [
        "parent-educator",
        "home-manager",
        "meal-planner"
      ],
      "metadata": {
        "tags": [
          "family",
          "home",
          "parenting",
          "education",
          "organization"
        ],
        "icon": "home",
        "color": "#ea580c"
      },
      "_filePath": "examples/home-family/domain.json"
    },
    {
      "id": "hr",
      "name": "Human Resources",
      "description": "Human resources roles focused on recruitment, employee relations, benefits administration, and HR management",
      "version": "1.0.0",
      "roles": [
        "recruiter",
        "hr-manager",
        "benefits-administrator"
      ],
      "metadata": {
        "tags": [
          "hr",
          "human-resources",
          "recruiting",
          "benefits",
          "people"
        ],
        "icon": "users",
        "color": "#7c3aed"
      },
      "_filePath": "examples/hr/domain.json"
    },
    {
      "id": "finance",
      "name": "Finance",
      "description": "Financial analysis, accounting, and financial management roles focused on budgeting, reporting, and compliance",
      "version": "1.0.0",
      "roles": [
        "financial-analyst",
        "controller",
        "accountant"
      ],
      "metadata": {
        "tags": [
          "finance",
          "accounting",
          "budgeting",
          "financial-analysis",
          "reporting"
        ],
        "icon": "dollar-sign",
        "color": "#15803d"
      },
      "_filePath": "examples/finance/domain.json"
    }
  ],
  "roles": [
    {
      "id": "student",
      "name": "Student",
      "domain": "personal",
      "description": "Manage academic work, organize study materials, write papers, prepare for exams, and balance coursework effectively.",
      "version": "1.0.0",
      "skills": [
        "docx",
        "pdf",
        "pptx",
        "xlsx"
      ],
      "mcps": [
        "scholarly-databases",
        "citation-manager",
        "note-taking-app",
        "learning-management-system"
      ],
      "context": {
        "educationLevels": [
          "High School",
          "Undergraduate",
          "Graduate",
          "Professional"
        ],
        "responsibilities": [
          "Organize notes and study materials",
          "Write essays, papers, and reports",
          "Prepare for exams and quizzes",
          "Conduct research and cite sources",
          "Manage time and deadlines",
          "Create study guides and flashcards",
          "Track assignments and grades"
        ],
        "studySkills": [
          "Active reading and annotation",
          "Note-taking methods (Cornell, outline)",
          "Spaced repetition for memorization",
          "Practice problems and self-testing",
          "Study groups and peer learning",
          "Time blocking and scheduling",
          "Test-taking strategies"
        ],
        "academicWriting": [
          "Thesis statement development",
          "Outlining and organization",
          "Research and source evaluation",
          "Citations and bibliographies (APA, MLA, Chicago)",
          "Editing and proofreading",
          "Avoiding plagiarism",
          "Academic integrity"
        ],
        "bestPractices": [
          "Review notes within 24 hours of class",
          "Break large projects into smaller tasks",
          "Use active recall and practice tests",
          "Maintain organized digital and physical files",
          "Start assignments early to allow for revision",
          "Seek help from professors and tutors",
          "Balance academics with self-care"
        ],
        "tools": [
          "Note-taking apps (Notion, OneNote)",
          "Citation managers (Zotero, Mendeley)",
          "Flashcard apps (Anki, Quizlet)",
          "Project management tools",
          "Cloud storage and backup",
          "Grammar checkers"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "student",
          "studying",
          "academic-writing",
          "research",
          "education"
        ],
        "difficulty": "beginner",
        "icon": "graduation-cap",
        "color": "#f0abfc"
      },
      "_filePath": "examples/personal/student.json"
    },
    {
      "id": "fitness-coach",
      "name": "Fitness Coach",
      "domain": "personal",
      "description": "Design workout programs, track fitness progress, plan nutrition, and achieve health and fitness goals through structured training.",
      "version": "1.0.0",
      "skills": [
        "xlsx",
        "pdf",
        "docx"
      ],
      "mcps": [
        "fitness-tracker",
        "nutrition-database",
        "workout-library"
      ],
      "context": {
        "fitnessGoals": [
          "Weight loss and body composition",
          "Muscle building and strength",
          "Cardiovascular endurance",
          "Flexibility and mobility",
          "Athletic performance",
          "General health and wellness"
        ],
        "responsibilities": [
          "Design personalized workout programs",
          "Create nutrition and meal plans",
          "Track progress and metrics",
          "Adjust programs based on results",
          "Ensure proper form and technique",
          "Motivate and maintain accountability",
          "Prevent injury through proper programming"
        ],
        "workoutComponents": [
          "Warm-up and mobility",
          "Strength training exercises",
          "Cardiovascular conditioning",
          "Flexibility and stretching",
          "Core strengthening",
          "Cool-down and recovery"
        ],
        "trainingPrinciples": [
          "Progressive overload",
          "Specificity and adaptation",
          "Recovery and rest days",
          "Proper form and technique",
          "Periodization and variation",
          "Consistency and adherence",
          "Listen to your body"
        ],
        "bestPractices": [
          "Set SMART fitness goals",
          "Start with appropriate difficulty level",
          "Focus on compound movements",
          "Track workouts and progress",
          "Prioritize recovery and sleep",
          "Balance training with nutrition",
          "Adjust program based on feedback"
        ],
        "nutritionBasics": [
          "Calculate caloric needs",
          "Balance macronutrients (protein, carbs, fats)",
          "Hydration and electrolytes",
          "Pre and post-workout nutrition",
          "Meal timing and frequency",
          "Whole foods emphasis"
        ],
        "metrics": [
          "Body weight and composition",
          "Strength levels (1RM, working sets)",
          "Cardiovascular fitness (heart rate, VO2 max)",
          "Body measurements",
          "Performance benchmarks",
          "Energy levels and recovery"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "fitness",
          "workout",
          "nutrition",
          "health",
          "training"
        ],
        "difficulty": "intermediate",
        "icon": "activity",
        "color": "#a78bfa"
      },
      "_filePath": "examples/personal/fitness-coach.json"
    },
    {
      "id": "diy-enthusiast",
      "name": "DIY Enthusiast",
      "domain": "personal",
      "description": "Plan and execute home improvement projects, repairs, and creative builds. Learn new skills and complete projects successfully.",
      "version": "1.0.0",
      "skills": [
        "canvas-design",
        "pdf",
        "xlsx"
      ],
      "mcps": [
        "youtube",
        "home-improvement-resources",
        "tool-library"
      ],
      "context": {
        "projectTypes": [
          "Home repairs and maintenance",
          "Woodworking and furniture building",
          "Home improvement and renovation",
          "Crafts and decorative projects",
          "Electronics and automation",
          "Outdoor projects and landscaping"
        ],
        "responsibilities": [
          "Research and plan DIY projects",
          "Create project budgets and material lists",
          "Learn new skills and techniques",
          "Follow safety protocols and best practices",
          "Document project progress",
          "Troubleshoot problems and adapt plans",
          "Finish projects to completion"
        ],
        "planningSteps": [
          "Define project scope and goals",
          "Research techniques and best practices",
          "Create detailed materials and tools list",
          "Estimate time and budget",
          "Gather necessary permits if required",
          "Prepare workspace and safety equipment",
          "Break project into manageable phases"
        ],
        "commonProjects": [
          "Painting and wall treatments",
          "Building shelves and storage",
          "Installing fixtures and hardware",
          "Deck and patio construction",
          "Garden beds and landscaping",
          "Basic electrical and plumbing",
          "Furniture refinishing and upcycling"
        ],
        "bestPractices": [
          "Measure twice, cut once",
          "Always prioritize safety",
          "Start with simpler projects to build skills",
          "Invest in quality essential tools",
          "Watch tutorials and read instructions thoroughly",
          "Allow extra time and budget for mistakes",
          "Know when to call a professional"
        ],
        "safetyConsiderations": [
          "Proper protective equipment (goggles, gloves, masks)",
          "Tool safety and maintenance",
          "Ventilation for painting and chemicals",
          "Electrical safety and circuit breakers",
          "Ladder safety and fall prevention",
          "First aid preparedness"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "diy",
          "home-improvement",
          "woodworking",
          "crafts",
          "projects"
        ],
        "difficulty": "intermediate",
        "icon": "hammer",
        "color": "#c084fc"
      },
      "_filePath": "examples/personal/diy-enthusiast.json"
    },
    {
      "id": "job-seeker",
      "name": "Job Seeker",
      "domain": "personal",
      "description": "Navigate the job search process including resume creation, cover letters, interview preparation, and career planning. Land your next opportunity.",
      "version": "1.0.0",
      "skills": [
        "docx",
        "pdf",
        "pptx"
      ],
      "mcps": [
        "linkedin",
        "indeed",
        "glassdoor",
        "job-boards"
      ],
      "context": {
        "jobSearchPhases": [
          "Self-assessment and career planning",
          "Resume and cover letter creation",
          "Job search and application",
          "Interview preparation",
          "Negotiation and offer evaluation",
          "Onboarding preparation"
        ],
        "responsibilities": [
          "Create and optimize resume and LinkedIn profile",
          "Write tailored cover letters",
          "Research companies and opportunities",
          "Prepare for interviews and practice responses",
          "Track job applications and follow-ups",
          "Negotiate salary and benefits",
          "Build professional network"
        ],
        "resumeSections": [
          "Contact information and summary",
          "Work experience with achievements",
          "Education and certifications",
          "Skills and technical competencies",
          "Projects and portfolio",
          "Awards and publications"
        ],
        "interviewPreparation": [
          "Research company and role",
          "Prepare STAR method responses",
          "Practice common interview questions",
          "Prepare questions for interviewer",
          "Plan interview outfit and logistics",
          "Follow up with thank-you notes"
        ],
        "bestPractices": [
          "Tailor resume for each application",
          "Quantify achievements with metrics",
          "Use industry keywords for ATS",
          "Network actively on LinkedIn",
          "Prepare stories that highlight skills",
          "Research salary ranges before negotiating",
          "Stay organized with application tracker"
        ],
        "networkingStrategies": [
          "Attend industry events and meetups",
          "Conduct informational interviews",
          "Engage on professional social media",
          "Join professional associations",
          "Leverage alumni networks",
          "Ask for referrals"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "job-search",
          "resume",
          "interview",
          "career",
          "networking"
        ],
        "difficulty": "intermediate",
        "icon": "briefcase",
        "color": "#e879f9"
      },
      "_filePath": "examples/personal/job-seeker.json"
    },
    {
      "id": "compliance-officer",
      "name": "Compliance Officer",
      "domain": "security",
      "description": "Ensure organizational compliance with regulatory requirements, industry standards, and internal policies. Manage audits and compliance programs.",
      "version": "1.0.0",
      "skills": [
        "docx",
        "xlsx",
        "pdf",
        "doc-coauthoring"
      ],
      "mcps": [
        "compliance-management-system",
        "document-management",
        "risk-register"
      ],
      "context": {
        "frameworks": [
          "SOC 2",
          "ISO 27001",
          "GDPR",
          "HIPAA",
          "PCI DSS",
          "CCPA",
          "NIST CSF"
        ],
        "responsibilities": [
          "Develop and maintain compliance policies and procedures",
          "Conduct compliance risk assessments",
          "Coordinate internal and external audits",
          "Monitor regulatory changes and updates",
          "Train employees on compliance requirements",
          "Investigate compliance violations",
          "Maintain compliance documentation and evidence"
        ],
        "deliverables": [
          "Compliance policies and procedures",
          "Risk assessment reports",
          "Audit readiness checklists",
          "Compliance training materials",
          "Gap analysis reports",
          "Compliance status dashboards",
          "Audit response documentation"
        ],
        "bestPractices": [
          "Maintain centralized policy repository",
          "Document all compliance decisions",
          "Conduct regular compliance assessments",
          "Implement continuous monitoring controls",
          "Keep evidence organized for audits",
          "Foster culture of compliance awareness",
          "Establish clear escalation procedures"
        ],
        "commonActivities": [
          "Policy development and review",
          "Control testing and validation",
          "Vendor risk assessments",
          "Data privacy impact assessments",
          "Incident response coordination",
          "Compliance metrics reporting"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "compliance",
          "audit",
          "governance",
          "risk",
          "regulatory"
        ],
        "difficulty": "advanced",
        "icon": "clipboard-check",
        "color": "#7c2d12"
      },
      "_filePath": "examples/security/compliance-officer.json"
    },
    {
      "id": "security-analyst",
      "name": "Security Analyst",
      "domain": "security",
      "description": "Monitor systems for security threats, investigate incidents, and implement security controls to protect organizational assets.",
      "version": "1.0.0",
      "skills": [
        "xlsx",
        "pdf",
        "docx"
      ],
      "mcps": [
        "splunk",
        "elasticsearch",
        "crowdstrike",
        "sentinel",
        "virustotal",
        "github"
      ],
      "context": {
        "primaryLanguages": [
          "Python",
          "PowerShell",
          "Bash"
        ],
        "tools": [
          "Splunk",
          "ELK Stack",
          "Wireshark",
          "Nessus",
          "Qualys",
          "CrowdStrike"
        ],
        "frameworks": [
          "NIST Cybersecurity Framework",
          "MITRE ATT&CK",
          "ISO 27001"
        ],
        "responsibilities": [
          "Monitor security events and alerts",
          "Investigate security incidents and breaches",
          "Perform vulnerability assessments",
          "Analyze logs and network traffic",
          "Document security incidents and findings",
          "Implement security hardening measures",
          "Coordinate incident response activities"
        ],
        "threats": [
          "Phishing and social engineering",
          "Malware and ransomware",
          "DDoS attacks",
          "Insider threats",
          "Zero-day exploits",
          "Supply chain attacks"
        ],
        "bestPractices": [
          "Maintain detailed incident documentation",
          "Follow chain of custody for evidence",
          "Use threat intelligence feeds",
          "Implement defense in depth strategy",
          "Conduct regular security assessments",
          "Stay updated on emerging threats and CVEs"
        ],
        "deliverables": [
          "Security incident reports",
          "Vulnerability assessment reports",
          "Threat intelligence briefings",
          "Security metrics dashboards",
          "Incident response playbooks"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "security",
          "soc",
          "incident-response",
          "threat-analysis",
          "monitoring"
        ],
        "difficulty": "advanced",
        "icon": "eye",
        "color": "#ef4444"
      },
      "_filePath": "examples/security/security-analyst.json"
    },
    {
      "id": "penetration-tester",
      "name": "Penetration Tester",
      "domain": "security",
      "description": "Conduct authorized simulated attacks to identify security vulnerabilities in systems, networks, and applications before malicious actors can exploit them.",
      "version": "1.0.0",
      "skills": [
        "docx",
        "pdf"
      ],
      "mcps": [
        "github",
        "burp-suite",
        "metasploit",
        "nmap"
      ],
      "context": {
        "primaryLanguages": [
          "Python",
          "Bash",
          "PowerShell",
          "Ruby"
        ],
        "tools": [
          "Metasploit",
          "Burp Suite",
          "Nmap",
          "Wireshark",
          "John the Ripper",
          "Hashcat"
        ],
        "methodologies": [
          "OWASP Testing Guide",
          "PTES",
          "OSSTMM"
        ],
        "responsibilities": [
          "Conduct penetration tests on applications and infrastructure",
          "Perform web application security assessments",
          "Test network security and segmentation",
          "Exploit identified vulnerabilities ethically",
          "Document findings with proof of concepts",
          "Provide remediation recommendations",
          "Validate security fix implementations"
        ],
        "testingPhases": [
          "Reconnaissance and information gathering",
          "Vulnerability scanning and analysis",
          "Exploitation and privilege escalation",
          "Post-exploitation and persistence",
          "Reporting and remediation guidance"
        ],
        "commonVulnerabilities": [
          "SQL injection",
          "Cross-site scripting (XSS)",
          "Authentication and session management flaws",
          "Server misconfigurations",
          "Insecure direct object references",
          "Security misconfiguration",
          "Broken access control"
        ],
        "bestPractices": [
          "Obtain proper authorization before testing",
          "Define clear scope and rules of engagement",
          "Use safe exploitation techniques",
          "Document all findings with evidence",
          "Provide clear remediation guidance",
          "Maintain confidentiality of findings",
          "Follow responsible disclosure practices"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "pentesting",
          "ethical-hacking",
          "vulnerability",
          "security-testing",
          "exploitation"
        ],
        "difficulty": "expert",
        "icon": "target",
        "color": "#991b1b"
      },
      "_filePath": "examples/security/penetration-tester.json"
    },
    {
      "id": "full-stack-developer",
      "name": "Full Stack Developer",
      "domain": "development",
      "description": "Work across the entire stack from frontend UI to backend services and databases. Build complete web applications end-to-end.",
      "version": "1.0.0",
      "skills": [
        "canvas-design",
        "web-artifacts-builder",
        "frontend-design",
        "webapp-testing",
        "mcp-builder"
      ],
      "mcps": [
        "github",
        "npm-registry",
        "docker",
        "postgres",
        "redis",
        "figma"
      ],
      "context": {
        "primaryLanguages": [
          "JavaScript",
          "TypeScript",
          "Python",
          "SQL"
        ],
        "frontendFrameworks": [
          "React",
          "Vue",
          "Next.js",
          "Svelte"
        ],
        "backendFrameworks": [
          "Node.js",
          "Express",
          "FastAPI",
          "NestJS"
        ],
        "databases": [
          "PostgreSQL",
          "MongoDB",
          "Redis"
        ],
        "responsibilities": [
          "Design and implement full application architecture",
          "Build responsive frontend interfaces",
          "Develop scalable backend APIs",
          "Design and optimize database schemas",
          "Implement end-to-end features independently",
          "Coordinate frontend and backend integration"
        ],
        "bestPractices": [
          "Use monorepo structure for full-stack applications",
          "Implement type-safe API contracts (tRPC, GraphQL)",
          "Share validation logic between frontend and backend",
          "Optimize data fetching and state management",
          "Implement comprehensive testing at all layers",
          "Use consistent coding standards across the stack"
        ]
      },
      "inheritance": {
        "extends": [
          "frontend-developer",
          "backend-developer"
        ],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "full-stack",
          "web",
          "frontend",
          "backend",
          "end-to-end"
        ],
        "difficulty": "advanced",
        "icon": "layers",
        "color": "#7c3aed"
      },
      "_filePath": "examples/development/full-stack-developer.json"
    },
    {
      "id": "devops-engineer",
      "name": "DevOps Engineer",
      "domain": "development",
      "description": "Automate infrastructure, implement CI/CD pipelines, and ensure reliable deployment and monitoring of applications.",
      "version": "1.0.0",
      "skills": [],
      "mcps": [
        "github",
        "gitlab",
        "docker",
        "kubernetes",
        "terraform",
        "ansible",
        "aws-cli",
        "gcp-cli",
        "azure-cli",
        "jenkins",
        "prometheus",
        "grafana"
      ],
      "context": {
        "primaryLanguages": [
          "Bash",
          "Python",
          "Go",
          "YAML",
          "HCL"
        ],
        "tools": [
          "Docker",
          "Kubernetes",
          "Terraform",
          "Ansible",
          "Jenkins",
          "GitLab CI",
          "GitHub Actions"
        ],
        "cloudPlatforms": [
          "AWS",
          "Google Cloud",
          "Azure",
          "DigitalOcean"
        ],
        "responsibilities": [
          "Design and maintain CI/CD pipelines",
          "Automate infrastructure provisioning with IaC",
          "Monitor system health and performance",
          "Implement container orchestration strategies",
          "Manage cloud infrastructure and costs",
          "Ensure high availability and disaster recovery"
        ],
        "bestPractices": [
          "Infrastructure as Code for all resources",
          "Implement immutable infrastructure patterns",
          "Use GitOps for deployment workflows",
          "Automate security scanning in pipelines",
          "Implement comprehensive monitoring and alerting",
          "Document runbooks for incident response"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "devops",
          "ci-cd",
          "kubernetes",
          "docker",
          "infrastructure",
          "cloud"
        ],
        "difficulty": "advanced",
        "icon": "cloud",
        "color": "#326ce5"
      },
      "_filePath": "examples/development/devops-engineer.json"
    },
    {
      "id": "backend-developer",
      "name": "Backend Developer",
      "domain": "development",
      "description": "Design and implement server-side logic, APIs, and database systems. Build scalable, secure, and maintainable backend services.",
      "version": "1.0.0",
      "skills": [
        "mcp-builder",
        "webapp-testing"
      ],
      "mcps": [
        "github",
        "docker",
        "postgres",
        "redis",
        "aws-cli",
        "kubernetes"
      ],
      "context": {
        "primaryLanguages": [
          "Python",
          "Node.js",
          "Go",
          "Java",
          "Rust"
        ],
        "frameworks": [
          "FastAPI",
          "Express",
          "Django",
          "Spring Boot",
          "Flask"
        ],
        "databases": [
          "PostgreSQL",
          "MySQL",
          "MongoDB",
          "Redis",
          "Elasticsearch"
        ],
        "tools": [
          "Docker",
          "Kubernetes",
          "CI/CD pipelines",
          "API testing tools"
        ],
        "responsibilities": [
          "Design and implement RESTful and GraphQL APIs",
          "Optimize database queries and schema design",
          "Implement authentication and authorization systems",
          "Build scalable microservices architecture",
          "Write comprehensive API documentation",
          "Monitor performance and resolve bottlenecks"
        ],
        "bestPractices": [
          "Follow SOLID principles and clean architecture",
          "Implement proper error handling and logging",
          "Use database migrations for schema changes",
          "Write integration and unit tests",
          "Implement rate limiting and caching strategies",
          "Use environment-based configuration management"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "api",
          "backend",
          "server",
          "database",
          "microservices"
        ],
        "difficulty": "intermediate",
        "icon": "server",
        "color": "#336791"
      },
      "_filePath": "examples/development/backend-developer.json"
    },
    {
      "id": "frontend-developer",
      "name": "Frontend Developer",
      "domain": "development",
      "description": "Build modern web user interfaces with React, Vue, and other frameworks. Specializes in creating responsive, accessible, and performant web applications.",
      "version": "1.0.0",
      "skills": [
        "canvas-design",
        "web-artifacts-builder",
        "frontend-design",
        "webapp-testing",
        "algorithmic-art"
      ],
      "mcps": [
        "github",
        "npm-registry",
        "figma",
        "browser-devtools"
      ],
      "context": {
        "primaryLanguages": [
          "JavaScript",
          "TypeScript",
          "HTML",
          "CSS"
        ],
        "frameworks": [
          "React",
          "Vue",
          "Angular",
          "Svelte",
          "Next.js"
        ],
        "tools": [
          "Webpack",
          "Vite",
          "ESLint",
          "Prettier",
          "PostCSS"
        ],
        "responsibilities": [
          "Implement responsive user interfaces",
          "Ensure cross-browser compatibility",
          "Optimize frontend performance and bundle size",
          "Collaborate with designers and backend developers",
          "Implement accessibility standards (WCAG 2.1)",
          "Write and maintain component tests"
        ],
        "bestPractices": [
          "Use semantic HTML for better accessibility",
          "Implement CSS-in-JS or utility-first CSS frameworks",
          "Follow component-based architecture patterns",
          "Optimize images and assets for web delivery",
          "Use lazy loading for code splitting",
          "Implement proper error boundaries and loading states"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "web",
          "ui",
          "javascript",
          "react",
          "typescript"
        ],
        "difficulty": "intermediate",
        "icon": "layout",
        "color": "#61dafb"
      },
      "_filePath": "examples/development/frontend-developer.json"
    },
    {
      "id": "marketing-manager",
      "name": "Marketing Manager",
      "domain": "business",
      "description": "Plan and execute marketing campaigns, analyze campaign performance, and drive customer acquisition and retention through strategic marketing initiatives.",
      "version": "1.0.0",
      "skills": [
        "pptx",
        "xlsx",
        "pdf",
        "canvas-design",
        "doc-coauthoring"
      ],
      "mcps": [
        "google-analytics",
        "hubspot",
        "mailchimp",
        "social-media-apis",
        "airtable"
      ],
      "context": {
        "tools": [
          "Google Analytics",
          "HubSpot",
          "Mailchimp",
          "Hootsuite",
          "Canva",
          "SEMrush"
        ],
        "channels": [
          "Email",
          "Social Media",
          "Content Marketing",
          "SEO/SEM",
          "Events",
          "Partnerships"
        ],
        "responsibilities": [
          "Develop marketing strategies and campaigns",
          "Create content calendars and editorial plans",
          "Analyze campaign performance and ROI",
          "Manage marketing budget and resources",
          "Coordinate with sales, product, and creative teams",
          "Build and segment target audiences",
          "Optimize conversion funnels"
        ],
        "metrics": [
          "Customer Acquisition Cost (CAC)",
          "Lifetime Value (LTV)",
          "Conversion rates",
          "Email open and click-through rates",
          "Social media engagement",
          "Website traffic and bounce rates",
          "Lead generation and qualification"
        ],
        "campaigns": [
          "Product launches",
          "Seasonal promotions",
          "Lead nurture sequences",
          "Content marketing programs",
          "Social media campaigns",
          "Event marketing"
        ],
        "bestPractices": [
          "Define clear campaign goals and KPIs",
          "Segment audiences for personalized messaging",
          "A/B test messaging and creative elements",
          "Maintain consistent brand voice across channels",
          "Track attribution across customer journey",
          "Document campaign learnings and iterate"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "marketing",
          "campaigns",
          "analytics",
          "content",
          "growth"
        ],
        "difficulty": "intermediate",
        "icon": "megaphone",
        "color": "#ec4899"
      },
      "_filePath": "examples/business/marketing-manager.json"
    },
    {
      "id": "data-analyst",
      "name": "Data Analyst",
      "domain": "business",
      "description": "Analyze business data, create visualizations, and provide insights to drive decision-making. Transform raw data into actionable business intelligence.",
      "version": "1.0.0",
      "skills": [
        "xlsx",
        "pdf",
        "canvas-design"
      ],
      "mcps": [
        "postgres",
        "mysql",
        "bigquery",
        "tableau",
        "power-bi",
        "google-analytics"
      ],
      "context": {
        "primaryLanguages": [
          "SQL",
          "Python",
          "R"
        ],
        "tools": [
          "Excel",
          "Tableau",
          "Power BI",
          "Google Analytics",
          "Looker"
        ],
        "databases": [
          "PostgreSQL",
          "MySQL",
          "BigQuery",
          "Snowflake"
        ],
        "responsibilities": [
          "Extract and analyze data from multiple sources",
          "Create dashboards and data visualizations",
          "Identify trends and patterns in business metrics",
          "Build predictive models and forecasts",
          "Present findings to stakeholders",
          "Ensure data quality and accuracy"
        ],
        "bestPractices": [
          "Document data sources and transformations",
          "Use version control for analysis scripts",
          "Validate data before analysis",
          "Create reproducible analysis workflows",
          "Design intuitive and actionable dashboards",
          "Communicate insights in business terms"
        ],
        "commonAnalyses": [
          "Customer segmentation and cohort analysis",
          "Sales funnel and conversion optimization",
          "A/B testing and experiment analysis",
          "Time series forecasting",
          "Churn prediction and retention analysis"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "data",
          "analytics",
          "sql",
          "visualization",
          "business-intelligence"
        ],
        "difficulty": "intermediate",
        "icon": "bar-chart",
        "color": "#3b82f6"
      },
      "_filePath": "examples/business/data-analyst.json"
    },
    {
      "id": "product-manager",
      "name": "Product Manager",
      "domain": "business",
      "description": "Define product vision, strategy, and roadmap. Balance customer needs, business goals, and technical constraints to deliver successful products.",
      "version": "1.0.0",
      "skills": [
        "docx",
        "pptx",
        "xlsx",
        "pdf",
        "doc-coauthoring"
      ],
      "mcps": [
        "jira",
        "confluence",
        "github",
        "figma",
        "productboard",
        "mixpanel",
        "amplitude"
      ],
      "context": {
        "tools": [
          "Jira",
          "Confluence",
          "Figma",
          "Miro",
          "ProductBoard",
          "Mixpanel"
        ],
        "responsibilities": [
          "Define product vision and strategy",
          "Create and maintain product roadmaps",
          "Gather and prioritize requirements",
          "Write user stories and acceptance criteria",
          "Coordinate with engineering, design, and stakeholders",
          "Analyze product metrics and user feedback",
          "Make data-driven prioritization decisions"
        ],
        "frameworks": [
          "Jobs to Be Done (JTBD)",
          "Opportunity Solution Trees",
          "OKRs (Objectives and Key Results)",
          "RICE prioritization",
          "Kano model for feature prioritization"
        ],
        "deliverables": [
          "Product requirements documents (PRDs)",
          "User stories and epics",
          "Product roadmaps",
          "Go-to-market plans",
          "Competitive analysis reports",
          "Product metrics dashboards"
        ],
        "bestPractices": [
          "Start with customer problems, not solutions",
          "Use data to validate assumptions",
          "Maintain clear product documentation",
          "Communicate roadmap changes proactively",
          "Balance short-term wins with long-term vision",
          "Foster collaboration between cross-functional teams"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "product",
          "strategy",
          "roadmap",
          "agile",
          "requirements"
        ],
        "difficulty": "advanced",
        "icon": "compass",
        "color": "#f59e0b"
      },
      "_filePath": "examples/business/product-manager.json"
    },
    {
      "id": "system-administrator",
      "name": "System Administrator",
      "domain": "operations",
      "description": "Manage and maintain servers, networks, and IT infrastructure. Ensure system availability, security, and performance.",
      "version": "1.0.0",
      "skills": [],
      "mcps": [
        "active-directory",
        "ansible",
        "puppet",
        "nagios",
        "zabbix"
      ],
      "context": {
        "primaryLanguages": [
          "Bash",
          "PowerShell",
          "Python"
        ],
        "operatingSystems": [
          "Linux (Ubuntu, CentOS, RHEL)",
          "Windows Server",
          "macOS"
        ],
        "tools": [
          "Ansible",
          "Puppet",
          "Active Directory",
          "Nagios",
          "Zabbix",
          "VMware"
        ],
        "responsibilities": [
          "Install, configure, and maintain servers",
          "Manage user accounts and permissions",
          "Perform system backups and recovery",
          "Monitor system performance and health",
          "Apply security patches and updates",
          "Troubleshoot system and network issues",
          "Maintain documentation and procedures"
        ],
        "commonTasks": [
          "User and group management",
          "File system and storage management",
          "Network configuration and troubleshooting",
          "Service and daemon management",
          "Log analysis and monitoring",
          "Backup and disaster recovery",
          "Security hardening"
        ],
        "bestPractices": [
          "Automate repetitive tasks with scripts",
          "Maintain detailed system documentation",
          "Implement proper backup strategies",
          "Use configuration management tools",
          "Follow principle of least privilege",
          "Monitor and analyze system logs",
          "Test changes in non-production first",
          "Keep systems patched and updated"
        ],
        "domains": [
          "Server administration",
          "Network management",
          "Storage and backup",
          "Identity and access management",
          "Monitoring and alerting",
          "Virtualization"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "sysadmin",
          "linux",
          "windows",
          "servers",
          "infrastructure"
        ],
        "difficulty": "intermediate",
        "icon": "terminal",
        "color": "#059669"
      },
      "_filePath": "examples/operations/system-administrator.json"
    },
    {
      "id": "cloud-architect",
      "name": "Cloud Architect",
      "domain": "operations",
      "description": "Design and implement cloud infrastructure solutions. Define cloud strategy, architecture patterns, and best practices for scalable, secure, and cost-effective systems.",
      "version": "1.0.0",
      "skills": [
        "canvas-design"
      ],
      "mcps": [
        "aws-cli",
        "gcp-cli",
        "azure-cli",
        "terraform",
        "cloudformation",
        "kubernetes"
      ],
      "context": {
        "cloudProviders": [
          "AWS",
          "Google Cloud Platform",
          "Microsoft Azure",
          "Multi-cloud"
        ],
        "tools": [
          "Terraform",
          "CloudFormation",
          "Pulumi",
          "Kubernetes",
          "Service Mesh"
        ],
        "responsibilities": [
          "Design cloud architecture and migration strategies",
          "Define infrastructure as code standards",
          "Optimize cloud costs and resource utilization",
          "Ensure security and compliance in cloud environments",
          "Design for high availability and disaster recovery",
          "Establish cloud governance and best practices",
          "Evaluate and select cloud services"
        ],
        "architecturePatterns": [
          "Microservices architecture",
          "Event-driven architecture",
          "Serverless computing",
          "Multi-tier web applications",
          "Data lake and analytics platforms",
          "Hybrid and multi-cloud patterns"
        ],
        "designPrinciples": [
          "Well-Architected Framework (AWS)",
          "Cloud Adoption Framework",
          "12-Factor App methodology",
          "Reliability, security, and cost optimization",
          "Scalability and elasticity",
          "Operational excellence"
        ],
        "bestPractices": [
          "Design for failure and resilience",
          "Implement least privilege access",
          "Use managed services when appropriate",
          "Automate everything with IaC",
          "Monitor costs and set budgets",
          "Plan for disaster recovery and backup",
          "Document architecture decisions (ADRs)"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "cloud",
          "architecture",
          "aws",
          "azure",
          "gcp",
          "infrastructure"
        ],
        "difficulty": "expert",
        "icon": "cloud-upload",
        "color": "#0284c7"
      },
      "_filePath": "examples/operations/cloud-architect.json"
    },
    {
      "id": "site-reliability-engineer",
      "name": "Site Reliability Engineer",
      "domain": "operations",
      "description": "Ensure reliability, availability, and performance of production systems through automation, monitoring, and incident management.",
      "version": "1.0.0",
      "skills": [],
      "mcps": [
        "github",
        "kubernetes",
        "docker",
        "prometheus",
        "grafana",
        "datadog",
        "pagerduty",
        "terraform",
        "aws-cli"
      ],
      "context": {
        "primaryLanguages": [
          "Python",
          "Go",
          "Bash"
        ],
        "tools": [
          "Kubernetes",
          "Prometheus",
          "Grafana",
          "Terraform",
          "PagerDuty",
          "Datadog"
        ],
        "responsibilities": [
          "Define and track Service Level Objectives (SLOs)",
          "Design and implement monitoring and alerting",
          "Automate operational tasks and toil reduction",
          "Conduct incident response and post-mortems",
          "Perform capacity planning and scaling",
          "Implement chaos engineering practices",
          "Build self-healing systems"
        ],
        "metrics": [
          "Service Level Indicators (SLIs)",
          "Service Level Objectives (SLOs)",
          "Error budgets",
          "Mean Time to Recovery (MTTR)",
          "Mean Time Between Failures (MTBF)",
          "Availability percentage (uptime)",
          "Request latency percentiles"
        ],
        "bestPractices": [
          "Treat operations as software engineering",
          "Automate toil and manual processes",
          "Embrace blameless post-mortems",
          "Use error budgets for feature velocity",
          "Implement gradual rollouts and feature flags",
          "Practice chaos engineering in production",
          "Document runbooks and operational procedures"
        ],
        "incidentManagement": [
          "On-call rotation and escalation",
          "Incident triage and severity assessment",
          "Communication during incidents",
          "Post-mortem analysis",
          "Action item tracking and follow-up"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "sre",
          "reliability",
          "monitoring",
          "incident-response",
          "automation"
        ],
        "difficulty": "advanced",
        "icon": "activity",
        "color": "#0ea5e9"
      },
      "_filePath": "examples/operations/site-reliability-engineer.json"
    },
    {
      "id": "meal-planner",
      "name": "Meal Planner",
      "domain": "home-family",
      "description": "Plan nutritious meals, create shopping lists, manage recipes, and organize meal preparation. Balance nutrition, budget, and family preferences.",
      "version": "1.0.0",
      "skills": [
        "xlsx",
        "pdf",
        "docx"
      ],
      "mcps": [
        "recipe-database",
        "nutrition-api",
        "grocery-delivery"
      ],
      "context": {
        "responsibilities": [
          "Create weekly or monthly meal plans",
          "Generate shopping lists and manage grocery budget",
          "Find and organize recipes",
          "Accommodate dietary restrictions and preferences",
          "Plan for batch cooking and meal prep",
          "Reduce food waste through planning",
          "Balance nutrition across meals"
        ],
        "planningFactors": [
          "Nutritional balance and dietary needs",
          "Food budget and cost per meal",
          "Time available for cooking",
          "Seasonal ingredients and availability",
          "Family preferences and restrictions",
          "Kitchen equipment and skills",
          "Leftovers and meal prep efficiency"
        ],
        "mealTypes": [
          "Breakfast options",
          "Lunch ideas (home and packed)",
          "Dinner meals",
          "Snacks and sides",
          "Special occasion meals",
          "Batch cooking and freezer meals"
        ],
        "bestPractices": [
          "Plan meals around weekly schedule",
          "Use seasonal and sale ingredients",
          "Prep ingredients in advance",
          "Cook in batches for efficiency",
          "Maintain a well-stocked pantry",
          "Rotate meals to avoid monotony",
          "Track successful recipes and favorites"
        ],
        "dietaryConsiderations": [
          "Food allergies and intolerances",
          "Vegetarian and vegan options",
          "Low-carb or keto diets",
          "Heart-healthy and low-sodium",
          "Kid-friendly and picky eaters",
          "Budget-conscious meals",
          "Quick and easy weeknight dinners"
        ],
        "tools": [
          "Meal planning apps and templates",
          "Recipe managers",
          "Grocery list apps",
          "Nutrition calculators",
          "Recipe websites and cookbooks"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "meal-planning",
          "cooking",
          "nutrition",
          "recipes",
          "grocery"
        ],
        "difficulty": "beginner",
        "icon": "utensils",
        "color": "#fdba74"
      },
      "_filePath": "examples/home-family/meal-planner.json"
    },
    {
      "id": "home-manager",
      "name": "Home Manager",
      "domain": "home-family",
      "description": "Organize household operations, manage budgets, coordinate schedules, and maintain home systems. Keep the household running smoothly.",
      "version": "1.0.0",
      "skills": [
        "xlsx",
        "pdf",
        "docx"
      ],
      "mcps": [
        "calendar",
        "task-management",
        "budget-tracker"
      ],
      "context": {
        "responsibilities": [
          "Create and manage household budget",
          "Coordinate family schedules and activities",
          "Maintain home organization systems",
          "Manage household inventory and supplies",
          "Coordinate home maintenance and repairs",
          "Plan and track household projects",
          "Organize important documents and records"
        ],
        "managementAreas": [
          "Financial planning and budgeting",
          "Schedule and calendar management",
          "Home maintenance and repairs",
          "Cleaning and organization",
          "Inventory and supply management",
          "Document organization",
          "Emergency preparedness"
        ],
        "budgetCategories": [
          "Housing (mortgage/rent, utilities)",
          "Food and groceries",
          "Transportation",
          "Healthcare",
          "Education and childcare",
          "Entertainment and recreation",
          "Savings and emergency fund"
        ],
        "bestPractices": [
          "Create and maintain family calendar",
          "Track expenses and stick to budget",
          "Establish cleaning and maintenance routines",
          "Keep emergency contacts and documents organized",
          "Plan ahead for seasonal tasks",
          "Involve family members in household tasks",
          "Regular decluttering and organization"
        ],
        "tools": [
          "Budgeting apps and spreadsheets",
          "Digital calendars and scheduling tools",
          "Task management apps",
          "Home inventory systems",
          "Document storage solutions"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "home-management",
          "budgeting",
          "organization",
          "household",
          "planning"
        ],
        "difficulty": "beginner",
        "icon": "clipboard-list",
        "color": "#fb923c"
      },
      "_filePath": "examples/home-family/home-manager.json"
    },
    {
      "id": "parent-educator",
      "name": "Parent/Educator",
      "domain": "home-family",
      "description": "Support children's learning and development through educational activities, homework help, and enrichment. Create age-appropriate learning experiences.",
      "version": "1.0.0",
      "skills": [
        "docx",
        "pdf",
        "pptx",
        "canvas-design"
      ],
      "mcps": [
        "educational-resources",
        "library-catalog",
        "khan-academy"
      ],
      "context": {
        "ageGroups": [
          "Preschool (3-5)",
          "Elementary (6-11)",
          "Middle School (12-14)",
          "High School (15-18)"
        ],
        "responsibilities": [
          "Plan age-appropriate learning activities",
          "Help with homework and assignments",
          "Create educational games and worksheets",
          "Research educational resources and materials",
          "Track academic progress and milestones",
          "Coordinate with teachers and schools",
          "Foster love of learning and curiosity"
        ],
        "learningAreas": [
          "Reading and literacy",
          "Mathematics and problem-solving",
          "Science and exploration",
          "Social studies and geography",
          "Arts and creativity",
          "Physical education and sports",
          "Social-emotional learning"
        ],
        "activities": [
          "Reading together and discussing books",
          "Science experiments and STEM projects",
          "Educational games and puzzles",
          "Field trips and experiential learning",
          "Arts and crafts projects",
          "Music and movement activities",
          "Outdoor exploration"
        ],
        "bestPractices": [
          "Adapt to individual learning styles",
          "Make learning fun and engaging",
          "Encourage questions and curiosity",
          "Celebrate effort and progress",
          "Create consistent learning routines",
          "Balance structured and free play",
          "Foster independence and critical thinking"
        ],
        "resources": [
          "Educational websites and apps",
          "Library books and programs",
          "Museums and educational centers",
          "Online learning platforms",
          "Educational subscription boxes",
          "Community programs"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "parenting",
          "education",
          "homeschool",
          "learning",
          "child-development"
        ],
        "difficulty": "intermediate",
        "icon": "book",
        "color": "#f97316"
      },
      "_filePath": "examples/home-family/parent-educator.json"
    },
    {
      "id": "recruiter",
      "name": "Recruiter",
      "domain": "hr",
      "description": "Source, screen, and hire top talent. Manage the full recruitment lifecycle from job posting to offer acceptance.",
      "version": "1.0.0",
      "skills": [
        "docx",
        "pdf",
        "xlsx"
      ],
      "mcps": [
        "linkedin",
        "greenhouse",
        "lever",
        "workday",
        "applicant-tracking-system"
      ],
      "context": {
        "tools": [
          "LinkedIn Recruiter",
          "Greenhouse",
          "Lever",
          "Indeed",
          "Workday"
        ],
        "responsibilities": [
          "Source candidates through multiple channels",
          "Screen resumes and conduct initial interviews",
          "Coordinate interview schedules with hiring managers",
          "Manage candidate experience throughout process",
          "Extend job offers and negotiate compensation",
          "Maintain applicant tracking system",
          "Build talent pipelines for future roles"
        ],
        "sourcingChannels": [
          "LinkedIn and professional networks",
          "Job boards (Indeed, Glassdoor)",
          "Employee referrals",
          "University recruiting",
          "Professional associations",
          "Social media outreach"
        ],
        "interviewProcess": [
          "Resume screening",
          "Phone screening",
          "Technical/skills assessment",
          "Cultural fit interview",
          "Final round interviews",
          "Reference checks",
          "Offer negotiation"
        ],
        "bestPractices": [
          "Write clear and inclusive job descriptions",
          "Respond promptly to all candidates",
          "Provide structured interview questions",
          "Maintain detailed candidate notes",
          "Build relationships with passive candidates",
          "Track recruiting metrics and optimize",
          "Ensure fair and unbiased screening process"
        ],
        "metrics": [
          "Time to hire",
          "Source of hire",
          "Offer acceptance rate",
          "Quality of hire",
          "Cost per hire",
          "Candidate satisfaction"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "recruiting",
          "talent-acquisition",
          "hiring",
          "interviewing"
        ],
        "difficulty": "intermediate",
        "icon": "user-plus",
        "color": "#8b5cf6"
      },
      "_filePath": "examples/hr/recruiter.json"
    },
    {
      "id": "hr-manager",
      "name": "HR Manager",
      "domain": "hr",
      "description": "Oversee HR operations, employee relations, performance management, and organizational development. Ensure compliance with employment laws and company policies.",
      "version": "1.0.0",
      "skills": [
        "docx",
        "pdf",
        "xlsx",
        "pptx",
        "doc-coauthoring"
      ],
      "mcps": [
        "workday",
        "bamboohr",
        "adp",
        "document-management"
      ],
      "context": {
        "tools": [
          "Workday",
          "BambooHR",
          "ADP",
          "HRIS systems"
        ],
        "responsibilities": [
          "Develop and implement HR policies and procedures",
          "Handle employee relations and conflict resolution",
          "Manage performance review processes",
          "Ensure compliance with employment laws",
          "Oversee onboarding and offboarding",
          "Coordinate training and development programs",
          "Advise management on HR matters"
        ],
        "keyAreas": [
          "Employee relations",
          "Performance management",
          "Compensation and benefits",
          "Talent development",
          "HR compliance",
          "Organizational development",
          "Change management"
        ],
        "compliance": [
          "Equal Employment Opportunity (EEO)",
          "Fair Labor Standards Act (FLSA)",
          "Family and Medical Leave Act (FMLA)",
          "Americans with Disabilities Act (ADA)",
          "Occupational Safety and Health Act (OSHA)",
          "State and local employment laws"
        ],
        "bestPractices": [
          "Maintain confidentiality of employee information",
          "Document all employee interactions",
          "Ensure consistent policy application",
          "Foster inclusive workplace culture",
          "Provide regular training on compliance",
          "Conduct stay and exit interviews",
          "Use data-driven decision making"
        ],
        "programs": [
          "Onboarding and orientation",
          "Performance management cycles",
          "Career development planning",
          "Succession planning",
          "Employee engagement initiatives",
          "Diversity and inclusion programs"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "hr",
          "employee-relations",
          "performance-management",
          "compliance",
          "people-management"
        ],
        "difficulty": "advanced",
        "icon": "user-check",
        "color": "#6d28d9"
      },
      "_filePath": "examples/hr/hr-manager.json"
    },
    {
      "id": "benefits-administrator",
      "name": "Benefits Administrator",
      "domain": "hr",
      "description": "Manage employee benefits programs including health insurance, retirement plans, and other perks. Handle enrollment, claims, and vendor relationships.",
      "version": "1.0.0",
      "skills": [
        "xlsx",
        "pdf",
        "docx"
      ],
      "mcps": [
        "benefits-administration-system",
        "adp",
        "bamboohr"
      ],
      "context": {
        "tools": [
          "Benefits administration systems",
          "ADP",
          "BambooHR",
          "Excel"
        ],
        "responsibilities": [
          "Manage benefits enrollment and changes",
          "Coordinate with benefits vendors and brokers",
          "Process benefits-related payroll deductions",
          "Respond to employee benefits inquiries",
          "Ensure compliance with benefits regulations",
          "Conduct benefits orientation for new hires",
          "Analyze benefits utilization and costs"
        ],
        "benefitsPrograms": [
          "Health insurance (medical, dental, vision)",
          "Retirement plans (401k, pension)",
          "Life and disability insurance",
          "Flexible Spending Accounts (FSA/HSA)",
          "Paid time off and leave programs",
          "Employee assistance programs (EAP)",
          "Wellness programs"
        ],
        "compliance": [
          "Affordable Care Act (ACA)",
          "ERISA (Employee Retirement Income Security Act)",
          "COBRA (Consolidated Omnibus Budget Reconciliation Act)",
          "HIPAA (Health Insurance Portability and Accountability Act)",
          "Section 125 cafeteria plans",
          "Non-discrimination testing"
        ],
        "annualActivities": [
          "Open enrollment coordination",
          "Benefits plan renewals",
          "Carrier and vendor negotiations",
          "Compliance reporting (5500, ACA 1095s)",
          "Benefits communications and education",
          "Plan document updates"
        ],
        "bestPractices": [
          "Maintain accurate benefits records",
          "Communicate changes clearly to employees",
          "Ensure timely enrollment processing",
          "Protect employee health information (PHI)",
          "Monitor compliance deadlines",
          "Provide excellent customer service",
          "Benchmark benefits against market"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "benefits",
          "insurance",
          "retirement",
          "compliance",
          "enrollment"
        ],
        "difficulty": "intermediate",
        "icon": "heart",
        "color": "#a855f7"
      },
      "_filePath": "examples/hr/benefits-administrator.json"
    },
    {
      "id": "financial-analyst",
      "name": "Financial Analyst",
      "domain": "finance",
      "description": "Analyze financial data, create forecasts, and provide insights to support business decision-making. Build financial models and evaluate investment opportunities.",
      "version": "1.0.0",
      "skills": [
        "xlsx",
        "pdf",
        "pptx"
      ],
      "mcps": [
        "quickbooks",
        "sap",
        "oracle-financials",
        "bloomberg-terminal"
      ],
      "context": {
        "tools": [
          "Excel",
          "Financial modeling software",
          "Bloomberg Terminal",
          "FactSet"
        ],
        "responsibilities": [
          "Build financial models and forecasts",
          "Analyze financial statements and KPIs",
          "Prepare budget variance reports",
          "Conduct valuation and investment analysis",
          "Create presentations for stakeholders",
          "Monitor financial performance metrics",
          "Perform scenario and sensitivity analysis"
        ],
        "analyses": [
          "DCF (Discounted Cash Flow) models",
          "Financial statement analysis",
          "Budgeting and forecasting",
          "Variance analysis",
          "ROI and NPV calculations",
          "Break-even analysis",
          "Trend analysis and projections"
        ],
        "metrics": [
          "Revenue and revenue growth",
          "EBITDA and profit margins",
          "Cash flow and working capital",
          "Return on Investment (ROI)",
          "Return on Equity (ROE)",
          "Debt-to-equity ratio",
          "Liquidity ratios"
        ],
        "bestPractices": [
          "Use consistent assumptions across models",
          "Document model logic and formulas",
          "Implement scenario analysis for uncertainty",
          "Validate data sources and calculations",
          "Create clear and actionable visualizations",
          "Maintain version control for models",
          "Present findings in business context"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "finance",
          "analysis",
          "modeling",
          "forecasting",
          "valuation"
        ],
        "difficulty": "advanced",
        "icon": "trending-up",
        "color": "#16a34a"
      },
      "_filePath": "examples/finance/financial-analyst.json"
    },
    {
      "id": "controller",
      "name": "Controller",
      "domain": "finance",
      "description": "Oversee accounting operations, financial reporting, and internal controls. Ensure compliance with accounting standards and regulatory requirements.",
      "version": "1.0.0",
      "skills": [
        "xlsx",
        "pdf",
        "docx"
      ],
      "mcps": [
        "quickbooks",
        "netsuite",
        "sap",
        "oracle-financials"
      ],
      "context": {
        "tools": [
          "QuickBooks",
          "NetSuite",
          "SAP",
          "Oracle Financials",
          "Excel"
        ],
        "responsibilities": [
          "Oversee month-end and year-end close processes",
          "Prepare financial statements and reports",
          "Ensure compliance with GAAP/IFRS standards",
          "Manage accounts payable and receivable",
          "Coordinate external audits",
          "Implement and maintain internal controls",
          "Supervise accounting team operations"
        ],
        "financialStatements": [
          "Balance Sheet",
          "Income Statement (P&L)",
          "Cash Flow Statement",
          "Statement of Shareholders' Equity"
        ],
        "processes": [
          "Month-end close and reconciliation",
          "Revenue recognition",
          "Expense accruals and deferrals",
          "Fixed asset management",
          "Intercompany eliminations",
          "Journal entry review and approval"
        ],
        "bestPractices": [
          "Maintain strong internal controls",
          "Document accounting policies and procedures",
          "Implement segregation of duties",
          "Conduct regular account reconciliations",
          "Establish clear close calendar and deadlines",
          "Maintain audit-ready documentation",
          "Foster transparent financial reporting"
        ],
        "compliance": [
          "GAAP/IFRS adherence",
          "SOX compliance (if applicable)",
          "Tax reporting requirements",
          "Regulatory filings",
          "Audit coordination"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "controller",
          "accounting",
          "financial-reporting",
          "compliance",
          "gaap"
        ],
        "difficulty": "expert",
        "icon": "book-open",
        "color": "#166534"
      },
      "_filePath": "examples/finance/controller.json"
    },
    {
      "id": "accountant",
      "name": "Accountant",
      "domain": "finance",
      "description": "Manage day-to-day accounting operations including bookkeeping, reconciliations, and financial record-keeping. Ensure accurate and timely financial reporting.",
      "version": "1.0.0",
      "skills": [
        "xlsx",
        "pdf",
        "docx"
      ],
      "mcps": [
        "quickbooks",
        "xero",
        "freshbooks"
      ],
      "context": {
        "tools": [
          "QuickBooks",
          "Xero",
          "FreshBooks",
          "Excel"
        ],
        "responsibilities": [
          "Perform daily bookkeeping and data entry",
          "Reconcile bank and credit card accounts",
          "Process accounts payable and receivable",
          "Prepare journal entries and adjustments",
          "Assist with month-end close procedures",
          "Maintain general ledger accuracy",
          "Support tax preparation and audits"
        ],
        "commonTasks": [
          "Recording financial transactions",
          "Bank reconciliations",
          "Invoice processing and payments",
          "Expense report review",
          "Depreciation calculations",
          "Prepaid and accrual entries",
          "Account analysis and reconciliation"
        ],
        "accountingCycle": [
          "Identify and analyze transactions",
          "Record transactions in journals",
          "Post to general ledger",
          "Prepare trial balance",
          "Make adjusting entries",
          "Prepare financial statements",
          "Close temporary accounts"
        ],
        "bestPractices": [
          "Maintain organized supporting documentation",
          "Reconcile accounts regularly",
          "Follow double-entry bookkeeping principles",
          "Use consistent account coding",
          "Review entries for accuracy before posting",
          "Keep current with accounting standards",
          "Maintain confidentiality of financial data"
        ]
      },
      "inheritance": {
        "extends": [],
        "overrides": {}
      },
      "metadata": {
        "tags": [
          "accounting",
          "bookkeeping",
          "reconciliation",
          "general-ledger"
        ],
        "difficulty": "beginner",
        "icon": "calculator",
        "color": "#22c55e"
      },
      "_filePath": "examples/finance/accountant.json"
    }
  ]
};