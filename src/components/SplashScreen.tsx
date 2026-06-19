"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + 2;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {progress <= 100 && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1f232e]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-8"
          >
            <div className="w-24 h-24 rounded-2xl border border-[#3245ff]/40 flex items-center justify-center bg-gradient-to-br from-[#3245ff] to-[#b845ed]">
              <span className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>FK</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[#858b98] text-sm mb-6 tracking-widest uppercase"
          >
            Loading Portfolio
          </motion.p>

          <div className="w-48 h-1 bg-[#17191e] rounded-full overflow-hidden border border-[#545864]/20">
            <motion.div
              className="h-full bg-gradient-to-r from-[#3245ff] via-[#b845ed] to-[#4bf3c8] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
