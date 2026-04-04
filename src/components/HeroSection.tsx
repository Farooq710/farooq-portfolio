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
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl shadow-indigo-200/50 ring-4 ring-indigo-100">
            <Image
              src="/photo.jpg"
              alt="Farooq Khan Pathan"
              width={160}
              height={160}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full border-4 border-white" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-indigo-600 text-sm tracking-widest uppercase mb-3 font-semibold"
        >
          DevOps • Cloud • AIOps
        </motion.p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent leading-tight">
          {name}
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 mb-4 font-medium">{title}</p>

        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
          {summary.slice(0, 220)}...
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            onClick={() =>
              document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-400/30 transition-all duration-300 hover:scale-105"
          >
            View Experience
          </button>
          <a
            href="/resume.pdf"
            download
            className="px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-medium hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2"
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
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-all"
          >
            <Globe size={18} />
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-800 hover:text-white transition-all"
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
          <ChevronDown size={24} className="text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
