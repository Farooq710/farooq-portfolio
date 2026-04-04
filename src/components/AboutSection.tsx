"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Globe, ExternalLink, TrendingUp } from "lucide-react";
import { resumeData } from "../data/resume";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-4">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-12 rounded-full" />
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
              className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group"
            >
              <TrendingUp
                size={16}
                className="mx-auto mb-2 text-indigo-400 group-hover:text-indigo-600 transition-colors"
              />
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {h.metric}
              </p>
              <p className="text-gray-500 text-xs mt-1 font-medium">{h.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Contact + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
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
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                    <item.icon size={14} className="text-indigo-600" />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-gray-600 text-sm hover:text-indigo-600 transition-colors break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-600 text-sm">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
              Professional Summary
            </h3>
            <p className="text-gray-600 leading-relaxed">{resumeData.basics.summary}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
