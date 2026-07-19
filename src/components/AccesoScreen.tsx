import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Key, Lock, School, Shield, User, Sparkles, CheckCircle } from "lucide-react";
import { ScreenId } from "../types";

interface AccesoScreenProps {
  onNavigate: (target: ScreenId) => void;
}

export default function AccesoScreen({ onNavigate }: AccesoScreenProps) {
  const [school, setSchool] = useState("16466-K");
  const [identifier, setIdentifier] = useState("vsepulveda@colegiochilenorte.cl");
  const [password, setPassword] = useState("••••••••");
  const [stars, setStars] = useState<{ id: number; size: number; left: number; top: number; duration: number; delay: number }[]>([]);

  // Generate background stars
  useEffect(() => {
    const generatedStars = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 5,
    }));
    setStars(generatedStars);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate(ScreenId.DOCENTE); // Navigates to Panel Docente as per spec
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden p-4 select-none">
      {/* Background image & overlay layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-[8px] scale-[1.1] opacity-40 z-0 pointer-events-none"
        style={{
          backgroundImage: `url("https://lh3.googleusercontent.com/aida/AP1WRLthbjbpVGTMKeAC_72qBABEbttmiUQhmYMgacHfxZxemab0hHnwipBG4TePknwLOLWhSha-BFTqYbUVyiYejB25r8NIXCeSUoBipZthf1M50OFUPor9Tg7TfIFIiF1-rX1sM5-lABwiGB6n99DbFhcGXFVjnrLFIIQpB4n1O3mgPsV3SIseiDh4E-RH25e9Q5BglcX3Gw02sQI9q1jVB9-QNinYKduNH0C1F6CVzEy50bI4H6uJoG0b9cc9")`
        }}
      />
      <div className="absolute inset-0 bg-[rgba(5,7,10,0.65)] z-0 pointer-events-none" />

      {/* Star Field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full opacity-0"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}vw`,
              top: `${star.top}vh`,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
      `}</style>

      {/* Main Card Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-full max-w-[460px] glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/10"
      >
        {/* Header Section */}
        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 flex-shrink-0 bg-primary-container/20 rounded-2xl flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(103,80,164,0.3)]">
            <img 
              alt="Conecta Logo" 
              className="w-12 h-12 object-contain" 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-display font-extrabold text-white tracking-tight leading-none text-3xl">
              CONECTA <span className="text-primary text-sm font-semibold tracking-wider ml-1">V2 PRO</span>
            </h1>
            <p className="text-xs text-on-surface-variant font-sans mt-1">
              Seguridad Institucional & <br />
              Inteligencia Emocional en el Aula
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* RBD o Nombre Colegio */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.1em]" htmlFor="school">
              RBD O NOMBRE COLEGIO
            </label>
            <div className="relative flex items-center bg-black/40 border border-white/15 focus-within:border-primary/60 rounded-xl overflow-hidden transition-all duration-300">
              <School className="absolute left-4 w-5 h-5 text-white/40" />
              <input 
                id="school"
                type="text" 
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Ej: 12345-6 o Colegio San José"
                className="w-full h-12 pl-12 pr-4 bg-transparent border-none text-white placeholder:text-white/20 focus:ring-0 outline-none text-[15px]"
                required
              />
            </div>
          </div>

          {/* Identifier Input */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.1em]" htmlFor="identifier">
              RUT O CORREO ELECTRÓNICO
            </label>
            <div className="relative flex items-center bg-black/40 border border-white/15 focus-within:border-primary/60 rounded-xl overflow-hidden transition-all duration-300">
              <User className="absolute left-4 w-5 h-5 text-white/40" />
              <input 
                id="identifier"
                type="text" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="24.374.599-3 o correo"
                className="w-full h-12 pl-12 pr-4 bg-transparent border-none text-white placeholder:text-white/20 focus:ring-0 outline-none text-[15px]"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.1em]" htmlFor="password">
              CONTRASEÑA O LLAVE DE ACCESO
            </label>
            <div className="relative flex items-center bg-black/40 border border-white/15 focus-within:border-primary/60 rounded-xl overflow-hidden transition-all duration-300">
              <Lock className="absolute left-4 w-5 h-5 text-white/40" />
              <input 
                id="password"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="........."
                className="w-full h-12 pl-12 pr-4 bg-transparent border-none text-white placeholder:text-white/20 focus:ring-0 outline-none text-[15px]"
                required
              />
            </div>
          </div>

          {/* Submit Button (Triggers navigation to Panel Docente as requested by spec) */}
          <button 
            type="submit"
            className="w-full h-14 font-sans font-bold text-white text-base rounded-xl flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.98] shadow-lg shadow-purple-900/40 transition-all duration-300 cursor-pointer"
          >
            <Key className="w-5 h-5" />
            <span>Ingresar al Panel</span>
          </button>
        </form>

        {/* Security protocol notices */}
        <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
          <h3 className="font-bold text-[10px] text-center uppercase tracking-[0.2em] text-white/50">
            PROTOCOLOS DE SEGURIDAD ACTIVOS
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-white/70">
              <Shield className="w-5 h-5 text-white/40 flex-shrink-0" />
              <span className="text-xs">Encriptación de Grado Clínico (AES-256)</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Sparkles className="w-5 h-5 text-white/40 flex-shrink-0" />
              <span className="text-xs">Monitoreo Socioemocional por IA Proactiva</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <CheckCircle className="w-5 h-5 text-white/40 flex-shrink-0" />
              <span className="text-xs">Cumplimiento SOC2 Type II & Privacidad UTF Chile</span>
            </div>
          </div>
        </div>

        {/* Brand footer */}
        <div className="mt-8 flex items-center justify-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-bold tracking-widest uppercase text-white/70">POWERED BY</span>
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-white">Google AI</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
