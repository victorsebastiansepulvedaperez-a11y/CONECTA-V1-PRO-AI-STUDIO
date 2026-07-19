import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Shield, BarChart2, Users, GraduationCap, Heart, UsersRound, 
  Settings, ChevronUp, ChevronDown 
} from "lucide-react";
import { ScreenId } from "../types";

interface RoleSwitcherProps {
  currentScreen: ScreenId;
  onNavigate: (target: ScreenId) => void;
}

export default function RoleSwitcher({ currentScreen, onNavigate }: RoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const screensList = [
    { id: ScreenId.ACCESO, name: "1. Acceso Conecta V2 Pro", icon: Shield, desc: "Seguridad & Login" },
    { id: ScreenId.DIRECTIVO, name: "2. Panel Directivo SLEP", icon: BarChart2, desc: "Administración Central" },
    { id: ScreenId.CLINICA, name: "3. Gestión Clínica", icon: Users, desc: "Dupla Psicosocial (Jessica)" },
    { id: ScreenId.DOCENTE, name: "4. Panel Docente v2", icon: GraduationCap, desc: "Prof. Omar Lobos Dashboard" },
    { id: ScreenId.ESTU_MOBILE, name: "5. Portal Estudiante", icon: Heart, desc: "Ánimo, Medallas & Bienestar" },
    { id: ScreenId.APODERADO, name: "6. Portal Apoderado", icon: UsersRound, desc: "Participación Víctor" },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 select-none">
      
      {/* Expanded Menu Drawer */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-[#201f24] border-2 border-[#cfbdff]/30 p-4 rounded-3xl w-72 mb-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-3 text-xs"
        >
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <div className="flex items-center gap-1.5 font-bold text-[#cfbdff] uppercase tracking-wider text-[10px]">
              <Settings className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Navegador de Prototipos</span>
            </div>
            <span className="text-[9px] bg-indigo-500 text-white font-bold px-1.5 py-0.5 rounded-full">6 Pantallas</span>
          </div>

          <div className="space-y-1">
            {screensList.map((scr) => {
              const Icon = scr.icon;
              const isActive = currentScreen === scr.id;
              return (
                <button
                  key={scr.id}
                  onClick={() => {
                    onNavigate(scr.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-2xl text-left transition-all group cursor-pointer ${
                    isActive 
                      ? "bg-[#6750a4]/30 border border-[#cfbdff]/40 text-white" 
                      : "bg-transparent border border-transparent hover:bg-zinc-800/60 text-[#cbc4d2] hover:text-white"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-colors ${
                    isActive 
                      ? "bg-[#6750a4] border-[#cfbdff]/40 text-white" 
                      : "bg-black/20 border-white/5 text-zinc-400 group-hover:text-white"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block leading-tight">{scr.name}</span>
                    <span className="text-[10px] text-zinc-500 block leading-none mt-0.5">{scr.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 px-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-full flex items-center gap-2.5 shadow-lg shadow-purple-950/50 hover:from-purple-500 hover:to-indigo-500 cursor-pointer active:scale-95 transition-all"
      >
        <Settings className="w-4 h-4" />
        <span className="text-xs">Selector de Perfil</span>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>

    </div>
  );
}
