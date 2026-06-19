"use client";

import { motion } from "framer-motion";
import { ChevronDown, Download, Globe, ExternalLink } from "lucide-react";
import { resumeData } from "../data/resume";
import Image from "next/image";

export default function HeroSection() {
  const { name, title, summary, linkedin, github } = resumeData.basics;

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl flex flex-col items-center"
      >
        {/* Photo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
          className="mb-6 relative"
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[#0c0f19] ring-4 ring-[#3245ff]/30">
            <Image
              src="/photo.jpg"
              alt="Farooq Khan Pathan"
              width={160}
              height={160}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#4bf3c8] rounded-full border-4 border-[#1f232e]" />
        </motion.div>

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#2c303b] bg-[#17191e] text-[#f2f6fa] text-sm font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-[#61dafb] inline-block" />
          DevOps · Cloud · AIOps
        </motion.div>

        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-[#f2f6fa] via-[#acafff] to-[#b845ed] bg-clip-text text-transparent leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {name}
        </h1>

        <p className="text-lg sm:text-xl text-[#acafff] mb-4 font-medium">{title}</p>

        <p className="text-[#858b98] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
          {summary.slice(0, 220)}...
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            onClick={() =>
              document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 rounded-full bg-[#ffffff] text-[#1f232e] font-semibold hover:shadow-lg hover:shadow-[#3245ff]/20 transition-all duration-300 hover:scale-105"
          >
            View Experience
          </button>
          <a
            href="/resume.pdf"
            download
            className="px-8 py-3 rounded-full border border-[#545864] text-[#bfc1c9] font-medium hover:border-[#acafff] hover:text-[#f2f6fa] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>

        {/* Social links */}
        <div className="flex gap-4">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#545864]/60 bg-[#17191e] flex items-center justify-center text-[#858b98] hover:border-[#54b9ff]/50 hover:text-[#54b9ff] transition-all"
          >
            <Globe size={18} />
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#545864]/60 bg-[#17191e] flex items-center justify-center text-[#858b98] hover:border-[#f2f6fa]/30 hover:text-[#f2f6fa] transition-all"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={24} className="text-[#545864]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
