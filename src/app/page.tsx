"use client";

import { useState } from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import GameIntro from "../components/GameIntro";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import EducationSection from "../components/EducationSection";
import ContactSection from "../components/ContactSection";
import ScrollSpy from "../components/ScrollSpy";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <GameIntro onComplete={() => setLoaded(true)} />}
      <AnimatedBackground />
      {loaded && (
        <>
          <Navbar />
          <ScrollSpy />
          <main className="relative">
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <SkillsSection />
            <EducationSection />
            <ContactSection />
          </main>
        </>
      )}
    </>
  );
}
