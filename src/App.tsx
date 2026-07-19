import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ScreenId } from "./types";
import AccesoScreen from "./components/AccesoScreen";
import DirectivoScreen from "./components/DirectivoScreen";
import ClinicaScreen from "./components/ClinicaScreen";
import DocenteScreen from "./components/DocenteScreen";
import EstudianteScreen from "./components/EstudianteScreen";
import ApoderadoScreen from "./components/ApoderadoScreen";
import RoleSwitcher from "./components/RoleSwitcher";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(ScreenId.ACCESO);
  const [transitionDir, setTransitionDir] = useState<"push" | "push_back" | "none">("none");

  // Custom navigation callback that manages transition direction for motion animations
  const handleNavigate = (target: ScreenId) => {
    // Determine the direction style requested in the Spec
    let dir: "push" | "push_back" | "none" = "none";

    if (currentScreen === ScreenId.DOCENTE) {
      if (target === ScreenId.ACCESO) dir = "push_back";
      else if (target === ScreenId.ESTU_MOBILE) dir = "push";
    } else if (currentScreen === ScreenId.ACCESO) {
      if (target === ScreenId.DOCENTE) dir = "push";
    } else if (currentScreen === ScreenId.ESTU_MOBILE) {
      if (target === ScreenId.ACCESO) dir = "push_back";
      else if (target === ScreenId.DOCENTE) dir = "none";
    } else if (currentScreen === ScreenId.CLINICA) {
      if (target === ScreenId.DOCENTE) dir = "none";
      else if (target === ScreenId.ESTU_MOBILE) dir = "push";
      else if (target === ScreenId.ACCESO) dir = "push_back";
    } else if (currentScreen === ScreenId.DIRECTIVO) {
      if (target === ScreenId.ACCESO) dir = "push_back";
    } else if (currentScreen === ScreenId.APODERADO) {
      if (target === ScreenId.APODERADO) dir = "none";
      else if (target === ScreenId.ACCESO) dir = "push_back";
    }

    setTransitionDir(dir);
    setCurrentScreen(target);
  };

  // Set up motion animation variants based on transition type
  const getAnimationVariants = () => {
    if (transitionDir === "push") {
      return {
        initial: { opacity: 0, x: 200 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -200 }
      };
    } else if (transitionDir === "push_back") {
      return {
        initial: { opacity: 0, x: -200 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 200 }
      };
    } else {
      // none transition
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      };
    }
  };

  const variants = getAnimationVariants();

  return (
    <div className="relative min-h-screen bg-black text-white w-full select-none">
      
      {/* Screen container with page-transition animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="w-full min-h-screen"
        >
          {currentScreen === ScreenId.ACCESO && (
            <AccesoScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === ScreenId.DIRECTIVO && (
            <DirectivoScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === ScreenId.CLINICA && (
            <ClinicaScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === ScreenId.DOCENTE && (
            <DocenteScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === ScreenId.ESTU_MOBILE && (
            <EstudianteScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === ScreenId.APODERADO && (
            <ApoderadoScreen onNavigate={handleNavigate} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Floating global Switcher widget allowing seamless transitions during preview and test */}
      <RoleSwitcher currentScreen={currentScreen} onNavigate={handleNavigate} />

    </div>
  );
}
