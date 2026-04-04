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
  { title: "Languages", icon: Code2, items: resumeData.skills.languages, color: "from-blue-500 to-cyan-500", bg: "bg-blue-50", border: "border-blue-200" },
  { title: "Cloud Platforms", icon: Cloud, items: resumeData.skills.cloud, color: "from-indigo-500 to-blue-500", bg: "bg-indigo-50", border: "border-indigo-200" },
  { title: "Configuration Mgmt", icon: Settings, items: resumeData.skills.configMgmt, color: "from-violet-500 to-indigo-500", bg: "bg-violet-50", border: "border-violet-200" },
  { title: "Containerization", icon: Container, items: resumeData.skills.containerization, color: "from-cyan-500 to-teal-500", bg: "bg-cyan-50", border: "border-cyan-200" },
  { title: "CI/CD", icon: Workflow, items: resumeData.skills.cicd, color: "from-orange-500 to-amber-500", bg: "bg-orange-50", border: "border-orange-200" },
  { title: "Monitoring", icon: Monitor, items: resumeData.skills.monitoring, color: "from-emerald-500 to-green-500", bg: "bg-emerald-50", border: "border-emerald-200" },
  { title: "Databases", icon: Database, items: resumeData.skills.databases, color: "from-rose-500 to-pink-500", bg: "bg-rose-50", border: "border-rose-200" },
  { title: "AI", icon: Brain, items: resumeData.skills.ai, color: "from-purple-500 to-fuchsia-500", bg: "bg-purple-50", border: "border-purple-200" },
  { title: "Version Control", icon: GitBranch, items: resumeData.skills.versionControl, color: "from-gray-600 to-gray-800", bg: "bg-gray-50", border: "border-gray-200" },
  { title: "Networking", icon: Network, items: resumeData.skills.networking, color: "from-teal-500 to-cyan-500", bg: "bg-teal-50", border: "border-teal-200" },
  { title: "Security & DevSecOps", icon: ShieldCheck, items: resumeData.skills.security, color: "from-red-500 to-rose-500", bg: "bg-red-50", border: "border-red-200" },
  { title: "ITOps", icon: Wrench, items: resumeData.skills.itops, color: "from-amber-500 to-yellow-500", bg: "bg-amber-50", border: "border-amber-200" },
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-12 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + gi * 0.05 }}
              className={`bg-white border ${group.border} rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={`w-7 h-7 rounded-lg ${group.bg} flex items-center justify-center`}
                >
                  <group.icon size={14} className="text-gray-700" />
                </div>
                <h3 className="text-gray-900 font-semibold text-sm">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill, si) => (
                  <span
                    key={si}
                    className={`px-2.5 py-1 text-xs rounded-full ${group.bg} text-gray-700 font-medium border ${group.border} hover:shadow-sm transition-shadow`}
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
