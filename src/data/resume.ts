export const resumeData = {
  basics: {
    name: "Farooq Khan Pathan",
    title: "IT Professional | DevOps | Cloud | AIOps",
    email: "farooqpathan710@gmail.com",
    phone: "+91 9704069431",
    location: "Hyderabad, T.S",
    linkedin: "https://linkedin.com/in/farooq710",
    github: "https://github.com/farooq710",
    summary:
      "Experienced IT professional with a strong foundation in infrastructure monitoring, cloud operations, DevOps, and intelligent automation. Adept at managing and maintaining enterprise-level IT environments, ensuring high availability, operational stability, and rapid incident resolution. Passionate about leveraging AI and automation to modernize IT operations, reduce manual intervention, and drive continuous improvement across infrastructure and DevOps workflows. Holds multiple cloud certifications and brings a proactive, problem-solving mindset to every challenge.",
  },
  skills: {
    languages: ["Python", "Bash", "YAML"],
    cloud: [
      "AWS (EC2, VPC, S3, IAM, CloudWatch)",
      "GCP",
    ],
    configMgmt: ["Ansible", "Ansible Playbooks"],
    containerization: ["Docker", "Kubernetes (Amazon EKS)"],
    cicd: ["GitLab CI"],
    monitoring: ["Prometheus", "Grafana", "Datadog", "Nagios", "ELK Stack"],
    databases: ["MongoDB Atlas", "SQL"],
    ai: ["AIOps", "GenAI", "LLM Integration", "Agentic AI", "Machine Learning"],
    versionControl: ["GitLab", "GitHub"],
    networking: ["TCP/IP", "Load Balancers", "VPC Networking"],
    security: ["VAPT", "Cloud Security"],
    itops: [
      "Alert Handling",
      "Incident Response",
      "Infrastructure Monitoring",
      "Log Analysis",
      "Network Troubleshooting",
      "ITSM (ITIL Concepts)",
    ],
  },
  experience: [
    {
      company: "PurpleTalk India Pvt Ltd",
      location: "Hyderabad, India",
      role: "Associate Analyst - IT NOC",
      dates: "April 2025 – Present",
      bullets: [
        "Monitored critical on-premises and cloud project servers using Nagios, Grafana, and Datadog, ensuring 99.9% uptime across production environments.",
        "Handled system and server administration tasks, frequently stepping into DevOps-level responsibilities including deployment support and infrastructure troubleshooting.",
        "Designed and deployed an enterprise AI-powered ITOps auto-remediation agent, adopted in production at the company level.",
        "Performed initial diagnostics, triaged and escalated critical incidents, and maintained smooth uninterrupted project operations.",
      ],
    },
    {
      company: "Firstsource Solutions Limited",
      location: "Hyderabad, India",
      role: "Technical Support Associate",
      dates: "Sept 2024 – April 2025",
      bullets: [
        "Delivered technical assistance to end users, resolving hardware, software, and connectivity issues with high first-call resolution rates.",
        "Supported incident management lifecycle including logging, tracking, escalation, and resolution documentation to improve support processes.",
        "Contributed to knowledge base development by documenting recurring issues and solutions to enhance team efficiency.",
      ],
    },
  ],
  projects: [
    {
      title: "AI-Powered ITOps Auto Remediation Agent",
      stack: "AIOps, ITOps, DevOps",
      bullets: [
        "Architected and deployed an enterprise-grade AI-driven ITOps auto-remediation system that intelligently detects, analyzes, and resolves infrastructure issues across company servers with minimal human intervention.",
        "Integrated a monitoring data source, correlating alerts with logs and metrics via ELK Stack to perform automated root cause analysis, infrastructure pattern detection, and future failure predictions using LLM-based log analysis.",
        "Leveraged Large LLM to read and interpret infrastructure logs — enabling intelligent root cause analysis, recurring pattern recognition, and predictive insights to proactively prevent future incidents.",
        "Implemented Ansible playbooks as the execution layer to automatically remediate identified infrastructure issues.",
        "Incorporated a Human-in-the-Loop approval mechanism ensuring all remediation actions are reviewed and authorized by an engineer before execution — maintaining operational safety and enterprise change management compliance.",
        "Successfully adopted and deployed in production across company infrastructure, reducing MTTR and maintaining a full audit trail of every agent action taken.",
      ],
    },
    {
      title: "AI-Based Heart Stroke Prediction using ECG and PPG Bio Signals",
      stack: "Deep Learning, ANN, Python",
      github: true,
      bullets: [
        "Designed and trained a deep learning model using Artificial Neural Networks (ANN) on ECG and PPG biosignal patient datasets to predict cardiac events with over 92% accuracy.",
        "Outperformed conventional ML decision-making baselines through deep learning model optimization and feature engineering — demonstrating superior reliability for medical prediction tasks.",
      ],
    },
  ],
  education: [
    {
      degree: "B.Tech, Electronics and Communication Engineering",
      institution: "KKR and KSR Institute of Technology and Sciences",
      dates: "2020 – 2024",
    },
  ],
  certifications: [
    "Google Cloud Certified — Associate Cloud Engineer",
    "Oracle Cloud Infrastructure (OCI) 2025 — Certified Architect Associate",
    "AWS Certified — Cloud Practitioner",
    "Microsoft Certified — Azure AI Fundamentals (AI-900)",
  ],
  impactHighlights: [
    { metric: "99.9%", label: "Server Uptime" },
    { metric: "92%+", label: "ML Prediction Accuracy" },
    { metric: "4", label: "Cloud Certifications" },
    { metric: "Enterprise", label: "AI Agent in Production" },
  ],
};
