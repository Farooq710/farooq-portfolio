"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = ["hero", "about", "experience", "projects", "skills", "education", "contact"];

export default function ScrollSpy() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-2">
      {sections.map((id) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
          className="group flex items-center gap-2 justify-end"
          aria-label={`Scroll to ${id}`}
        >
          <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity capitalize font-medium">
            {id}
          </span>
          <motion.div
            className={`rounded-full transition-all ${
              active === id
                ? "w-3 h-3 bg-indigo-500 shadow shadow-indigo-300/50"
                : "w-2 h-2 bg-gray-300 group-hover:bg-gray-400"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
