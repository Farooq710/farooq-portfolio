"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Rocket, ChevronDown, ExternalLink } from "lucide-react";
import { resumeData } from "../data/resume";

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="projects" className="py-24 px-4 bg-[#17191e]/30">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-[#b845ed] mb-2">
            Projects
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#f2f6fa]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What I&apos;ve Built
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#3245ff] to-[#b845ed] mx-auto mb-12 rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {resumeData.projects.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + idx * 0.15 }}
              className="bg-[#17191e] border border-[#545864]/20 rounded-2xl overflow-hidden hover:border-[#b845ed]/30 transition-all cursor-pointer"
              onClick={() => setExpanded(expanded === idx ? null : idx)}
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3245ff] to-[#b845ed] flex items-center justify-center flex-shrink-0">
                        <Rocket size={14} className="text-white" />
                      </div>
                      <h3 className="text-[#f2f6fa] font-semibold text-sm sm:text-base">
                        {proj.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-10">
                      {proj.stack.split(", ").map((tech, ti) => (
                        <span
                          key={ti}
                          className="px-2.5 py-0.5 text-xs rounded-full bg-[#0c0f19] text-[#acafff] border border-[#3245ff]/30 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {proj.github && (
                        <a
                          href={resumeData.basics.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2.5 py-0.5 text-xs rounded-full bg-[#0c0f19] border border-[#545864]/30 text-[#858b98] hover:text-[#f2f6fa] hover:border-[#545864]/60 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={10} />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expanded === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-[#545864]" />
                  </motion.div>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: expanded === idx ? "auto" : 0,
                    opacity: expanded === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="mt-4 space-y-3 border-t border-[#545864]/15 pt-4">
                    {proj.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex items-start gap-3 text-[#858b98] text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b845ed] mt-2 flex-shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
