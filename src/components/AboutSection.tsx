"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Globe, ExternalLink, TrendingUp } from "lucide-react";
import { resumeData } from "../data/resume";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-4 bg-[#17191e]/30">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-[#4bf3c8] mb-2">
            About Me
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#f2f6fa]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Engineer Behind the Work
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#3245ff] to-[#b845ed] mx-auto mb-12 rounded-full" />
        </motion.div>

        {/* Impact Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          {resumeData.impactHighlights.map((h, i) => (
            <div
              key={i}
              className="bg-[#17191e] border border-[#545864]/20 rounded-2xl p-5 text-center hover:border-[#3245ff]/30 transition-all group"
            >
              <TrendingUp
                size={16}
                className="mx-auto mb-2 text-[#54b9ff] group-hover:text-[#acafff] transition-colors"
              />
              <p
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#3245ff] to-[#b845ed] bg-clip-text text-transparent"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {h.metric}
              </p>
              <p className="text-[#858b98] text-xs mt-1 font-medium">{h.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Contact + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-[#17191e] border border-[#545864]/20 rounded-2xl p-6"
          >
            <h3 className="text-xs font-semibold text-[#acafff] mb-4 uppercase tracking-widest">
              Contact
            </h3>
            <div className="space-y-3">
              {[
                { icon: Mail, value: resumeData.basics.email, href: `mailto:${resumeData.basics.email}` },
                { icon: Phone, value: resumeData.basics.phone, href: `tel:${resumeData.basics.phone}` },
                { icon: MapPin, value: resumeData.basics.location },
                { icon: Globe, value: "LinkedIn", href: resumeData.basics.linkedin },
                { icon: ExternalLink, value: "GitHub", href: resumeData.basics.github },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-[#0c0f19] border border-[#545864]/20 flex items-center justify-center flex-shrink-0 group-hover:border-[#3245ff]/40 transition-colors">
                    <item.icon size={14} className="text-[#acafff]" />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[#858b98] text-sm hover:text-[#acafff] transition-colors break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[#858b98] text-sm">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-[#17191e] border border-[#545864]/20 rounded-2xl p-6"
          >
            <h3 className="text-xs font-semibold text-[#acafff] mb-4 uppercase tracking-widest">
              Professional Summary
            </h3>
            <p className="text-[#858b98] leading-relaxed">{resumeData.basics.summary}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
