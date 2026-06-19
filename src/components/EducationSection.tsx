"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";
import { resumeData } from "../data/resume";

export default function EducationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 px-4 bg-[#17191e]/30">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-[#ffd493] mb-2">
            Education & Certifications
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#f2f6fa]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Education & Certifications
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#3245ff] to-[#b845ed] mx-auto mb-12 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-[#17191e] border border-[#545864]/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#0c0f19] border border-[#3245ff]/30 flex items-center justify-center">
                <GraduationCap size={16} className="text-[#acafff]" />
              </div>
              <h3 className="text-[#f2f6fa] font-semibold">Education</h3>
            </div>

            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="mb-4 last:mb-0">
                <h4 className="text-[#f2f6fa] font-medium text-sm">{edu.degree}</h4>
                <p className="text-[#858b98] text-sm">{edu.institution}</p>
                <p className="text-[#acafff] text-xs font-medium mt-1">{edu.dates}</p>
              </div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-[#17191e] border border-[#545864]/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#0c0f19] border border-[#ffd493]/30 flex items-center justify-center">
                <Award size={16} className="text-[#ffd493]" />
              </div>
              <h3 className="text-[#f2f6fa] font-semibold">Certifications</h3>
            </div>

            <div className="space-y-3">
              {resumeData.certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + idx * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#0c0f19] border border-[#ffd493]/15 hover:border-[#ffd493]/35 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#ffd493] to-[#b845ed] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#1f232e] text-xs font-bold">{idx + 1}</span>
                  </div>
                  <p className="text-[#e5e7eb] text-sm font-medium">{cert}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
