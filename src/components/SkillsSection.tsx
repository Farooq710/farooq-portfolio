"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Cloud,
  Container,
  Monitor,
  Brain,
  GitBranch,
  Network,
  ShieldCheck,
  Settings,
  Database,
  Workflow,
  Wrench,
} from "lucide-react";
import { resumeData } from "../data/resume";

const skillGroups = [
  {
    title: "Languages",
    icon: Code2,
    items: resumeData.skills.languages,
    iconColor: "text-[#54b9ff]",
    border: "border-[#54b9ff]/25",
    chipBorder: "border-[#54b9ff]/30",
    chipText: "text-[#54b9ff]",
  },
  {
    title: "Cloud Platforms",
    icon: Cloud,
    items: resumeData.skills.cloud,
    iconColor: "text-[#acafff]",
    border: "border-[#3245ff]/30",
    chipBorder: "border-[#acafff]/30",
    chipText: "text-[#acafff]",
  },
  {
    title: "Configuration Mgmt",
    icon: Settings,
    items: resumeData.skills.configMgmt,
    iconColor: "text-[#acafff]",
    border: "border-[#acafff]/25",
    chipBorder: "border-[#acafff]/30",
    chipText: "text-[#acafff]",
  },
  {
    title: "Containerization",
    icon: Container,
    items: resumeData.skills.containerization,
    iconColor: "text-[#4bf3c8]",
    border: "border-[#4bf3c8]/25",
    chipBorder: "border-[#4bf3c8]/30",
    chipText: "text-[#4bf3c8]",
  },
  {
    title: "CI/CD",
    icon: Workflow,
    items: resumeData.skills.cicd,
    iconColor: "text-[#ffd493]",
    border: "border-[#ffd493]/25",
    chipBorder: "border-[#ffd493]/30",
    chipText: "text-[#ffd493]",
  },
  {
    title: "Monitoring",
    icon: Monitor,
    items: resumeData.skills.monitoring,
    iconColor: "text-[#4bf3c8]",
    border: "border-[#4bf3c8]/20",
    chipBorder: "border-[#4bf3c8]/25",
    chipText: "text-[#4bf3c8]",
  },
  {
    title: "Databases",
    icon: Database,
    items: resumeData.skills.databases,
    iconColor: "text-[#b845ed]",
    border: "border-[#b845ed]/25",
    chipBorder: "border-[#b845ed]/30",
    chipText: "text-[#b845ed]",
  },
  {
    title: "AI",
    icon: Brain,
    items: resumeData.skills.ai,
    iconColor: "text-[#b845ed]",
    border: "border-[#b845ed]/30",
    chipBorder: "border-[#b845ed]/35",
    chipText: "text-[#b845ed]",
  },
  {
    title: "Version Control",
    icon: GitBranch,
    items: resumeData.skills.versionControl,
    iconColor: "text-[#bfc1c9]",
    border: "border-[#545864]/35",
    chipBorder: "border-[#545864]/40",
    chipText: "text-[#bfc1c9]",
  },
  {
    title: "Networking",
    icon: Network,
    items: resumeData.skills.networking,
    iconColor: "text-[#00daef]",
    border: "border-[#00daef]/25",
    chipBorder: "border-[#00daef]/30",
    chipText: "text-[#00daef]",
  },
  {
    title: "Security & DevSecOps",
    icon: ShieldCheck,
    items: resumeData.skills.security,
    iconColor: "text-[#61dafb]",
    border: "border-[#61dafb]/25",
    chipBorder: "border-[#61dafb]/30",
    chipText: "text-[#61dafb]",
  },
  {
    title: "ITOps",
    icon: Wrench,
    items: resumeData.skills.itops,
    iconColor: "text-[#ffd493]",
    border: "border-[#ffd493]/20",
    chipBorder: "border-[#ffd493]/25",
    chipText: "text-[#ffd493]",
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-4">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-[#4bf3c8] mb-2">
            Skills
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#f2f6fa]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Technical Skills
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#3245ff] to-[#b845ed] mx-auto mb-12 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + gi * 0.05 }}
              className={`bg-[#17191e] border ${group.border} rounded-2xl p-5 hover:scale-[1.02] transition-all`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#0c0f19] border border-[#545864]/20 flex items-center justify-center">
                  <group.icon size={14} className={group.iconColor} />
                </div>
                <h3 className="text-[#f2f6fa] font-semibold text-sm">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill, si) => (
                  <span
                    key={si}
                    className={`px-2.5 py-1 text-xs rounded-full bg-[#0c0f19] ${group.chipText} font-medium border ${group.chipBorder}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
