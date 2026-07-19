import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Smile, Activity, Gift, Award, LogOut, ArrowRight, Video, 
  HelpCircle, CheckCircle2, UserCircle2, Bell, MessageSquare, 
  Settings, ChevronRight, User, AlertCircle, PlayCircle, BookOpen, PlusCircle
} from "lucide-react";
import { ScreenId } from "../types";

interface DocenteScreenProps {
  onNavigate: (target: ScreenId) => void;
}

export default function DocenteScreen({ onNavigate }: DocenteScreenProps) {
  const [showKudosModal, setShowKudosModal] = useState(false);
  const [kudosRecipient, setKudosRecipient] = useState("");
  const [kudosType, setKudosType] = useState("Liderazgo");
  const [kudosCount, setKudosCount] = useState(24);
  const [showNotification, setShowNotification] = useState(false);

  const handleGiveKudos = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kudosRecipient) return;
    setKudosCount(prev => prev + 1);
    setShowKudosModal(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#121115] text-[#e6e1e9] flex flex-col font-sans">
      
      {/* GLOBAL HEADER BAR */}
      <header className="h-16 border-b border-[#49454f]/30 px-6 md:px-12 flex items-center justify-between bg-[#121115]/95 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-400/30">
            <Smile className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="font-display font-extrabold text-lg text-white tracking-tight">Conecta V2 Pro</span>
        </div>

        {/* Action controls in Header */}
        <div className="flex items-center gap-3 md:gap-5">
          
          {/* button containing 'Cambiar Perfil' -> Student Portal (push transition) */}
          <button 
            onClick={() => onNavigate(ScreenId.ESTU_MOBILE)}
            className="px-3.5 py-1.5 bg-[#4d4465] text-white hover:bg-[#6750a4] font-semibold rounded-xl text-xs transition-all cursor-pointer border border-[#d0bcff]/20"
          >
            Cambiar Perfil
          </button>

          {/* a tag containing 'Cerrar Sesión' -> Acceso Screen (push_back transition) */}
          <a 
            onClick={() => onNavigate(ScreenId.ACCESO)}
            className="text-xs font-bold text-[#ffb4ab] hover:text-red-400 transition-colors cursor-pointer"
          >
            Cerrar Sesión
          </a>

          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#d0bcff]/30">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop" 
              alt="Teacher Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* WORKSPACE AREA */}
      <div className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto grid grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: MAIN STATS & ACTIONS */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* WELCOME BANNER */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-[#201f24] to-[#252329] rounded-[2rem] border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight leading-none">
                Hola, Prof. Omar Lobos
              </h2>
              <p className="text-xs md:text-sm text-[#cbc4d2]/70 mt-2 font-medium">
                Profesor Jefe 7° Año Básico A • Liceo Chileno Norte
              </p>
            </div>

            <button 
              onClick={() => setShowKudosModal(true)}
              className="px-5 py-3 bg-[#6750a4] hover:bg-indigo-500 font-bold text-xs text-white rounded-2xl flex items-center gap-2 transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Entregar Kudos</span>
            </button>
          </div>

          {/* KEY METRICS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-[#1c1b20] p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-[10px] text-[#cbc4d2]/60 uppercase tracking-wider font-bold">Check-ins Hoy</span>
              <div className="text-2xl font-black text-white mt-1">23 <span className="text-xs text-[#cbc4d2]/50 font-normal">/ 30</span></div>
              <span className="text-[9px] text-[#4ade80] font-bold block mt-1">+2 vs ayer</span>
            </div>

            <div className="bg-[#1c1b20] p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-[10px] text-[#cbc4d2]/60 uppercase tracking-wider font-bold">Clima Positivo</span>
              <div className="text-2xl font-black text-white mt-1">74%</div>
              <span className="text-[9px] text-[#4ade80] font-bold block mt-1">+5% esta sem.</span>
            </div>

            <div className="bg-[#1c1b20] p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-[10px] text-[#cbc4d2]/60 uppercase tracking-wider font-bold">Asistencia Sem.</span>
              <div className="text-2xl font-black text-white mt-1">98%</div>
              <span className="text-[9px] text-[#cfbdff] font-bold block mt-1">Objetivo superado</span>
            </div>

            <div className="bg-[#1c1b20] p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-[10px] text-[#cbc4d2]/60 uppercase tracking-wider font-bold">Medallas Dadas</span>
              <div className="text-2xl font-black text-white mt-1">{kudosCount}</div>
              <span className="text-[9px] text-[#cfbdff] font-bold block mt-1">Kudos del mes</span>
            </div>

          </div>

          {/* DYNAMIC EMOTION CHART */}
          <div className="bg-[#1c1b20] p-6 rounded-3xl border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-display font-bold text-base text-white">Resumen Mensual Emocional (7°A)</h3>
                <p className="text-xs text-[#cbc4d2]/60 mt-0.5">Distribución de check-ins afectivos matutinos</p>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#cfbdff] tracking-widest bg-[#6750a4]/20 border border-[#cfbdff]/25 px-2.5 py-1 rounded-full">Actualizado</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {/* Alegría / Entusiasmo */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className="text-emerald-400">😊 Alegría & Entusiasmo</span>
                  <span className="text-white">45%</span>
                </div>
                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>

              {/* Tranquilidad */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className="text-blue-400">😌 Tranquilidad & Calma</span>
                  <span className="text-white">29%</span>
                </div>
                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: "29%" }} />
                </div>
              </div>

              {/* Ansiedad / Estrés */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className="text-amber-400">😰 Ansiedad o Agobio</span>
                  <span className="text-white">18%</span>
                </div>
                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: "18%" }} />
                </div>
              </div>

              {/* Frustración */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className="text-red-400">😡 Molestia o Frustración</span>
                  <span className="text-white">8%</span>
                </div>
                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: "8%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* VIDEOS & COEXISTENCE SECTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Levanta el Ánimo Section */}
            <div className="bg-[#1c1b20] p-5 rounded-3xl border border-white/5 space-y-4">
              <h4 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                <Video className="w-4 h-4 text-[#d0bcff]" />
                <span>Levanta el Ánimo: Pausas de Aula</span>
              </h4>
              <p className="text-xs text-[#cbc4d2]/70 leading-relaxed">
                Dinámicas lúdicas interactivas en video para romper la inercia post-almuerzo y potenciar la oxigenación.
              </p>
              
              <div className="space-y-2 text-xs">
                <a 
                  href="https://www.youtube.com/watch?v=ScTfG2hHIsA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-black/30 rounded-xl hover:bg-black/50 border border-white/5 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-red-400" />
                    <span className="font-semibold text-white">Respiración Guiada de 3 Minutos</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">Mineduc</span>
                </a>

                <a 
                  href="https://www.youtube.com/watch?vScTfG2hHIsA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-black/30 rounded-xl hover:bg-black/50 border border-white/5 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-white">Estiramiento Corto de Convivencia</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">Dupla</span>
                </a>
              </div>
            </div>

            {/* Recetario Convivencia Escolar MINEDUC */}
            <div className="bg-[#1c1b20] p-5 rounded-3xl border border-white/5 space-y-4">
              <h4 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#d0bcff]" />
                <span>Recetario Convivencia Digital</span>
              </h4>
              <p className="text-xs text-[#cbc4d2]/70 leading-relaxed">
                Instructivos nacionales del Ministerio de Educación de Chile para mediar ciberacoso y promover entornos de diálogo saludable.
              </p>

              <div className="p-3 bg-indigo-500/10 rounded-xl border border-[#d0bcff]/20 text-xs text-[#cbc4d2] flex items-center justify-between">
                <span>Guía Rápida Anti-Bullying Virtual</span>
                <span className="text-[10px] bg-indigo-500 text-white font-bold px-2 py-0.5 rounded-full">PDF</span>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: CRITICAL ALERTS & PEDAGOGICAL ADVICE */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          
          {/* CRITICAL ALERTS BLOCK */}
          <div className="bg-[#1c1b20] p-6 rounded-3xl border border-white/5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[#ffb4ab] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span>Casos Críticos Activos</span>
              </h3>
              <span className="text-[9px] bg-red-500/20 text-red-300 font-bold px-2 py-0.5 rounded-full uppercase">1 Alerta</span>
            </div>

            {/* CRITICAL ACTIONABLE BLOCK: Jessica Muñoz Alert (XPATH HOOK SPECIFIED) */}
            {/* The spec asks for a div containing 'bg-error-container/10' inside of which is a span with 'Jessica Muñoz' inside of parent/parent */}
            <div 
              onClick={() => onNavigate(ScreenId.CLINICA)}
              className="bg-error-container/10 p-4 rounded-2xl cursor-pointer hover:bg-error-container/20 border border-red-500/30 transition-all space-y-1.5"
            >
              <div className="flex justify-between items-center">
                <span className="text-red-400 font-bold text-sm">Jessica Muñoz</span>
                <span className="text-[9px] bg-red-500/30 text-red-200 font-bold px-1.5 py-0.5 rounded">Riesgo Vital</span>
              </div>
              <p className="text-[11px] text-red-200/80 leading-normal">
                Detección automática de ideación suicida latente en su bitácora. Haga clic para derivar a Dupla Psicosocial de inmediato.
              </p>
            </div>
          </div>

          {/* PEDAGOGICAL RECOMMENDATIONS BASED ON DATA */}
          <div className="bg-[#1c1b20] p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[#cbc4d2] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Consejo Socioemocional de Aula</span>
            </h3>

            <div className="space-y-3.5 text-xs text-[#cbc4d2]">
              <div className="p-3.5 bg-black/30 rounded-2xl border border-white/5 space-y-1">
                <span className="font-bold text-white text-[11px] block">Pausa de Actividad</span>
                <p className="leading-relaxed text-[#cbc4d2]/80">
                  El 7° Básico A muestra baja energía post-almuerzo. Intenta realizar pausas activas de 3 minutos usando técnicas de respiración.
                </p>
              </div>

              <div className="p-3.5 bg-black/30 rounded-2xl border border-white/5 space-y-1">
                <span className="font-bold text-white text-[11px] block">Refuerzo a Sofia Carvajal</span>
                <p className="leading-relaxed text-[#cbc4d2]/80">
                  Sofía ha sido nominada por 3 profesores por su gran empatía. Considere otorgarle una medalla de Kudos hoy para destacar su liderazgo social.
                </p>
              </div>
            </div>
          </div>

          {/* ACTIVE ALUMNI BOARD */}
          <div className="bg-[#1c1b20] p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[#cbc4d2] flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#d0bcff]" />
              <span>Kudos y Destacados de la Semana</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-black/20 rounded-xl">
                <span className="font-semibold text-white">Sofía Carvajal</span>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/20">Liderazgo (Kudos)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-black/20 rounded-xl">
                <span className="font-semibold text-white">Kevin Soto</span>
                <span className="text-[10px] bg-[#6750a4]/20 text-[#d0bcff] font-bold px-2 py-0.5 rounded border border-[#d0bcff]/20">Soporte Mutuo (Kudos)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* GIVING KUDOS DIALOG MODAL */}
      {showKudosModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#201f24] border border-[#d0bcff]/30 p-6 md:p-8 rounded-[2.5rem] max-w-md w-full space-y-6 shadow-2xl relative">
            <div>
              <h3 className="font-display font-black text-xl text-white">Entregar Medalla de Kudos</h3>
              <p className="text-xs text-[#cbc4d2]/70 mt-1">Reconoce públicamente el buen compañerismo de tus alumnos.</p>
            </div>

            <form onSubmit={handleGiveKudos} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-wider">Estudiante Destacado</label>
                <select 
                  value={kudosRecipient} 
                  onChange={(e) => setKudosRecipient(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:ring-1 focus:ring-indigo-400"
                  required
                >
                  <option value="" disabled>Seleccione estudiante...</option>
                  <option value="Sofía Carvajal">Sofía Carvajal</option>
                  <option value="Kevin Soto">Kevin Soto</option>
                  <option value="Jessica Muñoz">Jessica Muñoz</option>
                  <option value="Lucas Contreras">Lucas Contreras</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-wider">Categoría</label>
                <select 
                  value={kudosType} 
                  onChange={(e) => setKudosType(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:ring-1 focus:ring-indigo-400"
                >
                  <option value="Liderazgo">Liderazgo & Empatía</option>
                  <option value="Compañerismo">Buen Compañerismo</option>
                  <option value="Resiliencia">Superación & Resiliencia</option>
                  <option value="Creatividad">Creatividad Digital</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowKudosModal(false)}
                  className="flex-1 py-3 bg-black/30 hover:bg-black/50 text-xs font-bold rounded-xl transition-all border border-white/10 text-white"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-[#6750a4] hover:bg-indigo-500 text-xs font-bold rounded-xl transition-all text-white"
                >
                  Confirmar Kudos
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FLOAT NOTIFICATION HUD */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3 shadow-xl z-50 max-w-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <div className="text-xs">
            <span className="font-bold text-white block">Kudos entregado con éxito</span>
            <span className="text-[#cbc4d2]/70">Notificación enviada al portal del apoderado.</span>
          </div>
        </div>
      )}

    </div>
  );
}
