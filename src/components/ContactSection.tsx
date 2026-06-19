"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Globe, ExternalLink, Heart, Send } from "lucide-react";
import { resumeData } from "../data/resume";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 px-4">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-[#54b9ff] mb-2">
            Contact
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#f2f6fa]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#3245ff] to-[#b845ed] mx-auto mb-4 rounded-full" />
          <p className="text-center text-[#858b98] mb-12 max-w-lg mx-auto">
            Open to new opportunities and collaborations. Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-[#17191e] border border-[#545864]/20 rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Mail,
                label: "Email",
                value: resumeData.basics.email,
                href: `mailto:${resumeData.basics.email}`,
                accent: "text-[#acafff] bg-[#0c0f19] border-[#3245ff]/25",
              },
              {
                icon: Phone,
                label: "Phone",
                value: resumeData.basics.phone,
                href: `tel:${resumeData.basics.phone}`,
                accent: "text-[#4bf3c8] bg-[#0c0f19] border-[#4bf3c8]/25",
              },
              {
                icon: MapPin,
                label: "Location",
                value: resumeData.basics.location,
                accent: "text-[#b845ed] bg-[#0c0f19] border-[#b845ed]/25",
              },
              {
                icon: Globe,
                label: "LinkedIn",
                value: "farooq710",
                href: resumeData.basics.linkedin,
                accent: "text-[#54b9ff] bg-[#0c0f19] border-[#54b9ff]/25",
              },
              {
                icon: ExternalLink,
                label: "GitHub",
                value: "Farooq710",
                href: resumeData.basics.github,
                accent: "text-[#bfc1c9] bg-[#0c0f19] border-[#545864]/30",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className={`flex items-center gap-3 p-4 rounded-xl border border-[#545864]/15 hover:border-[#3245ff]/30 hover:bg-[#0c0f19]/50 transition-all ${
                  i === 4 ? "sm:col-span-2" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl border ${item.accent} flex items-center justify-center flex-shrink-0`}
                >
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-[#545864] font-medium uppercase tracking-wider">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[#e5e7eb] text-sm font-medium hover:text-[#acafff] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[#e5e7eb] text-sm font-medium">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <a
              href={`mailto:${resumeData.basics.email}`}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-[#1f232e] font-semibold hover:shadow-lg hover:shadow-[#3245ff]/20 transition-all hover:scale-105"
            >
              <Send size={16} />
              Send Me a Message
            </a>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-16 pt-8 border-t border-[#545864]/20 text-center"
        >
          <p className="text-[#545864] text-sm flex items-center justify-center gap-1">
            Built with <Heart size={12} className="text-[#b845ed]" /> by Farooq Khan Pathan
          </p>
        </motion.div>
      </div>
    </section>
  );
}
