import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [imgError, setImgError] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionToSection = (id) => {
    if (isTransitioning || id === activeSection) return;
    setIsTransitioning(true);
    // Fade out nav first, then show content
    setShowNav(false);
    setTimeout(() => {
      setActiveSection(id);
      setIsTransitioning(false);
    }, 380);
  };

  const handleBack = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveSection('home');
    // Wait for content to exit, then fade nav back in
    setTimeout(() => {
      setShowNav(true);
      setIsTransitioning(false);
    }, 420);
  };

  const ease = [0.16, 1, 0.3, 1];

  const navContainer = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease, when: 'beforeChildren', staggerChildren: 0.06 }
    },
    exit: { opacity: 0, y: 16, transition: { duration: 0.35, ease } }
  };

  const navItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.28, ease } }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.55, ease, delay: 0.12 }}
            className="max-w-3xl text-[#a1a1a6]"
          >
            <p className="text-xl leading-relaxed md:leading-8">
              Hi, I'm <span className="text-[#f5f5f7] font-medium">Eshan Arni</span> — a passionate creator who believes in learning by building. I love exploring ideas, crafting interactive projects, and finding beauty in simplicity.
            </p>
          </motion.div>
        );

      case 'projects':
        return (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.55, ease, delay: 0.12 }}
            className="grid gap-8 md:grid-cols-2 mt-8"
          >
            {[
              { title: 'IB Calendar', desc: 'A smart academic planner with task tracking.' },
              { title: 'Portfolio Site', desc: 'A minimal personal website inspired by Apple design.' },
            ].map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="bg-[#1c1c1e] rounded-2xl p-7 shadow-md hover:shadow-lg border border-[#2c2c2e]"
              >
                <h3 className="text-2xl text-[#f5f5f7] font-semibold mb-2">{p.title}</h3>
                <p className="text-[#a1a1a6]">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        );

      case 'achievements':
        return (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.55, ease, delay: 0.12 }}
            className="max-w-3xl text-[#a1a1a6]"
          >
            <p className="text-xl leading-relaxed md:leading-8">
              My achievements gallery showcases milestones and moments that reflect my growth and journey — both in code and creativity.
            </p>
          </motion.div>
        );

      default:
        return (
          <motion.div layout
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col items-center justify-center space-y-14 -mt-6 md:-mt-12"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="text-5xl md:text-7xl font-semibold text-[#f5f5f7] tracking-tight"
            >
              Eshan Arni
            </motion.h1>

            <motion.div layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.9, ease }}
              className="flex flex-col items-center space-y-2"
            >
              <p className="text-xl md:text-2xl text-[#a1a1a6] italic">
                “The only way to do great work is to love what you do.”
              </p>
              <p className="text-sm text-[#6e6e73]">— Steve Jobs</p>
            </motion.div>

            <motion.div layout
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-52 h-52 md:w-56 md:h-56 bg-[#1c1c1e] border border-[#2c2c2e] rounded-full shadow-2xl overflow-hidden ring-1 ring-[#2c2c2e]"
            >
              <motion.img
                src={imgError ? `${import.meta.env.BASE_URL}fallback-avatar.svg` : `${import.meta.env.BASE_URL}eshan.jpg`}
                alt="Eshan Arni"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
                className="w-full h-full object-cover select-none"
                loading="eager"
                decoding="async"
                draggable={false}
                onError={() => setImgError(true)}
              />
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <div
      className="relative min-h-screen bg-black flex flex-col items-center justify-center text-center px-6 font-sans overflow-hidden"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif' }}
    >
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>

      {/* Buttons: show on home only, fade out on section select */}
      <AnimatePresence mode="wait">
        {activeSection === 'home' && showNav && (
          <motion.div
            key="nav-buttons"
            variants={navContainer}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col md:flex-row gap-5 mt-14 z-10"
          >
            {[{ id: 'about', label: 'About Me' }, { id: 'projects', label: 'Projects' }, { id: 'achievements', label: 'Achievements' }, { id: 'home', label: 'Home' }].map((btn) => (
              <motion.button
                key={btn.id}
                variants={navItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => transitionToSection(btn.id)}
                className={`px-9 py-3.5 rounded-xl transition-colors shadow-md ${
                  activeSection === btn.id ? 'bg-[#0071e3] text-white' : 'bg-[#1c1c1e] text-[#f5f5f7] hover:bg-[#2c2c2e]'
                }`}
              >
                {btn.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button: show on section screens */}
      <AnimatePresence>
        {activeSection !== 'home' && (
          <motion.div
            key="back-cta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.45, ease, delay: 0.08 }}
            className="mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBack}
              className="px-6 py-2.5 rounded-lg bg-[#1c1c1e] text-[#f5f5f7] border border-[#2c2c2e] shadow-md"
            >
              Back
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="absolute bottom-6 text-[#a1a1a6] text-sm z-10">
        © 2025 Eshan Arni — Designed with care
      </footer>
    </div>
  );
}
