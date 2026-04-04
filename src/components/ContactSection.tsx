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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-4 rounded-full" />
          <p className="text-center text-gray-500 mb-12 max-w-lg mx-auto">
            Open to new opportunities and collaborations. Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Mail,
                label: "Email",
                value: resumeData.basics.email,
                href: `mailto:${resumeData.basics.email}`,
                color: "bg-indigo-50 text-indigo-600",
              },
              {
                icon: Phone,
                label: "Phone",
                value: resumeData.basics.phone,
                href: `tel:${resumeData.basics.phone}`,
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                icon: MapPin,
                label: "Location",
                value: resumeData.basics.location,
                color: "bg-rose-50 text-rose-600",
              },
              {
                icon: Globe,
                label: "LinkedIn",
                value: "farooq710",
                href: resumeData.basics.linkedin,
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: ExternalLink,
                label: "GitHub",
                value: "Farooq710",
                href: resumeData.basics.github,
                color: "bg-gray-100 text-gray-800",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className={`flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-sm transition-all ${
                  i === 4 ? "sm:col-span-2" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}
                >
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-gray-700 text-sm font-medium hover:text-indigo-600 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-700 text-sm font-medium">{item.value}</p>
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
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-400/30 transition-all hover:scale-105"
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
          className="mt-16 pt-8 border-t border-gray-200 text-center"
        >
          <p className="text-gray-400 text-sm flex items-center justify-center gap-1">
            Built with <Heart size={12} className="text-red-400" /> by Farooq Khan Pathan
          </p>
        </motion.div>
      </div>
    </section>
  );
}
