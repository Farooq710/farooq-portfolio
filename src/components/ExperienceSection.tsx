"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, ChevronDown, MapPin, Calendar } from "lucide-react";
import { resumeData } from "../data/resume";

export default function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="py-24 px-4">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-12 rounded-full" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 via-purple-300 to-transparent" />

          {resumeData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + idx * 0.2 }}
              className="relative pl-12 sm:pl-20 mb-8"
            >
              <div className="absolute left-2.5 sm:left-6.5 top-3 w-3.5 h-3.5 rounded-full bg-indigo-500 shadow-lg shadow-indigo-300/50 border-2 border-white" />

              <div
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer"
                onClick={() => setExpanded(expanded === idx ? null : idx)}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={16} className="text-indigo-600" />
                        <h3 className="text-gray-900 font-semibold text-sm sm:text-base">
                          {exp.role}
                        </h3>
                      </div>
                      <p className="text-indigo-600 text-sm font-medium">{exp.company}</p>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded-full">
                          <Calendar size={11} />
                          {exp.dates}
                        </span>
                        <span className="flex items-center gap-1 bg-purple-50 px-2 py-0.5 rounded-full">
                          <MapPin size={11} />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expanded === idx ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} className="text-gray-400" />
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
                    <ul className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                      {exp.bullets.map((bullet, bi) => (
                        <li key={bi} className="flex items-start gap-3 text-gray-600 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
