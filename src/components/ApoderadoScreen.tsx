import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Heart, Award, Calendar, PhoneCall, BookOpen, User, Smile, 
  HelpCircle, LogOut, CheckCircle2, ChevronRight, Bell, Settings, ArrowRight, Activity
} from "lucide-react";
import { ScreenId } from "../types";

interface ApoderadoScreenProps {
  onNavigate: (target: ScreenId) => void;
}

export default function ApoderadoScreen({ onNavigate }: ApoderadoScreenProps) {
  const [meetingStatus1, setMeetingStatus1] = useState<"pendiente" | "confirmado">("pendiente");
  const [meetingStatus2, setMeetingStatus2] = useState<"pendiente" | "confirmado">("pendiente");
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const parentName = "Víctor Sepúlveda";
  const studentName = "Sofía Carvajal";
  const schoolName = "Liceo Chileno Norte";

  return (
    <div className="min-h-screen bg-[#131216] text-[#e6e1e9] flex font-sans overflow-x-hidden">
      
      {/* LEFT SIDEBAR: PARENT NAVIGATION */}
      <aside className="w-72 bg-[#1b1a1f] border-r border-[#49454f]/30 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-6">
          <div>
            <h2 className="font-display font-extrabold text-xl text-[#d0bcff] flex items-center gap-1.5">
              <User className="w-5 h-5" />
              <span>Portal Apoderado</span>
            </h2>
            <p className="text-[11px] text-[#cbc4d2]/60 uppercase tracking-widest mt-1">Conecta V2 Pro</p>
          </div>

          <nav className="space-y-1">
            {/* CRITICAL XPATH NAVIGATION TARGET: a tag contains 'Dashboard' */}
            <a 
              onClick={() => onNavigate(ScreenId.APODERADO)}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#6750a4]/20 text-[#e0d2ff] rounded-xl font-bold border border-[#6750a4]/40 text-left transition-all cursor-pointer text-xs"
            >
              <Smile className="w-4 h-4 text-[#cfbdff]" />
              <span>Dashboard</span>
            </a>

            <button className="w-full flex items-center gap-3 px-4 py-3 text-[#cbc4d2] hover:text-[#e6e1e9] hover:bg-[#323035]/40 rounded-xl font-medium text-left text-xs transition-all">
              <Award className="w-4 h-4 opacity-70" />
              <span>Anotaciones Positivas</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-[#cbc4d2] hover:text-[#e6e1e9] hover:bg-[#323035]/40 rounded-xl font-medium text-left text-xs transition-all">
              <BookOpen className="w-4 h-4 opacity-70" />
              <span>Recetario Familiar</span>
            </button>
          </nav>
        </div>

        <div className="space-y-4">
          {/* Emergency Button *4141 in sidebar */}
          <a 
            href="tel:*4141"
            className="p-3.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-2xl flex flex-col gap-1 text-left cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2 text-red-400">
              <PhoneCall className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">APOYO CRISIS ESTUDIANTIL</span>
            </div>
            <p className="text-[10px] text-[#cbc4d2]/80 leading-normal">
              ¿Tu pupilo necesita ayuda psicológica inmediata? Haz clic para llamar gratis al *4141.
            </p>
          </a>

          <div className="border-t border-[#49454f]/20 pt-4">
            {/* a tag contains Cerrar Sesión -> goes to login screen */}
            <a 
              onClick={() => onNavigate(ScreenId.ACCESO)}
              className="flex items-center gap-3 px-4 py-2.5 text-[#ffb4ab] hover:text-red-400 rounded-xl font-medium transition-all cursor-pointer text-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </a>
          </div>
        </div>
      </aside>

      {/* APODERADO CONTENT WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER */}
        <header className="h-16 border-b border-[#49454f]/30 px-6 md:px-12 flex items-center justify-between bg-[#131216]/95 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h1 className="font-display font-bold text-base tracking-tight text-white hidden md:block">Conecta V2 Pro</h1>
            <div className="flex items-center gap-5 text-xs font-semibold">
              <a 
                onClick={() => onNavigate(ScreenId.APODERADO)}
                className="text-[#cfbdff] border-b-2 border-[#cfbdff] pb-1 font-bold cursor-pointer transition-all"
              >
                Dashboard
              </a>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400 font-medium">Sofía Carvajal</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-zinc-800 rounded-full text-[#cbc4d2] relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#d0bcff]/30">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" alt="Parent Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* MAIN BODY SCROLL */}
        <div className="flex-1 p-6 md:p-10 max-w-6xl w-full mx-auto grid grid-cols-12 gap-8 overflow-y-auto">
          
          {/* WELCOME BLOCK */}
          <div className="col-span-12 p-6 md:p-8 bg-[#1b1a1f] rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#cfbdff]">PORTAL APODERADO</span>
              <h2 className="font-display font-black text-2xl md:text-3xl text-white mt-2 leading-none">
                Hola, {parentName}.
              </h2>
              <p className="text-xs text-[#cbc4d2]/70 mt-3 font-medium">
                Bienvenido al portal escolar y de acompañamiento socioemocional de su pupila, <strong>{studentName}</strong>.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5 flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#d0bcff]/30">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop" alt="Student Sofia" className="w-full h-full object-cover" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">{studentName}</span>
                <span className="text-zinc-400 block mt-0.5">7° Año Básico A • {schoolName}</span>
              </div>
            </div>
          </div>

          {/* LEFT SUB-COLUMN: METRICS AND MEETINGS */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            
            {/* MOOD & METRICS OVERVIEW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Asistencia */}
              <div className="bg-[#1b1a1f] p-5 rounded-3xl border border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#cbc4d2]/60 uppercase tracking-wider font-bold">Asistencia Escolar</span>
                  <div className="text-3xl font-black text-white mt-1.5">98.2%</div>
                </div>
                <p className="text-[11px] text-emerald-400 font-bold mt-4 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Nivel Óptimo Sobresaliente</span>
                </p>
              </div>

              {/* Convivencia / Kudos */}
              <div className="bg-[#1b1a1f] p-5 rounded-3xl border border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#cbc4d2]/60 uppercase tracking-wider font-bold">Reconocimientos Docentes</span>
                  <div className="text-3xl font-black text-[#cfbdff] mt-1.5">3 Medallas</div>
                </div>
                <p className="text-[11px] text-zinc-400 mt-4">
                  Sofía destaca por su liderazgo empático en el aula.
                </p>
              </div>
            </div>

            {/* HISTORIAL DE REUNIONES Y ACTIVIDADES */}
            <div className="bg-[#1b1a1f] p-6 rounded-3xl border border-white/5 space-y-4">
              <div>
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#d0bcff]" />
                  <span>Citaciones y Reuniones de Aula</span>
                </h3>
                <p className="text-xs text-[#cbc4d2]/60 mt-0.5">Confirma tu asistencia de forma digital para coordinar el aforo.</p>
              </div>

              <div className="space-y-3.5">
                {/* Reunion 1 */}
                <div className="p-4 bg-black/30 rounded-2xl border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] text-amber-300 font-bold uppercase block">Reunión Ordinaria de Apoderados</span>
                    <span className="font-bold text-white text-xs block mt-1">Reunión Presencial 7° Básico A</span>
                    <span className="text-[11px] text-[#cbc4d2]/70 block mt-0.5">28 Oct 2026 • 18:30 Hrs • Liceo Chileno Norte</span>
                  </div>

                  <button 
                    onClick={() => setMeetingStatus1(meetingStatus1 === "confirmado" ? "pendiente" : "confirmado")}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all w-full sm:w-auto cursor-pointer ${
                      meetingStatus1 === "confirmado" 
                        ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300" 
                        : "bg-[#6750a4] hover:bg-indigo-500 text-white"
                    }`}
                  >
                    {meetingStatus1 === "confirmado" ? "✓ Asistiré" : "Confirmar Asistiré"}
                  </button>
                </div>

                {/* Reunion 2 */}
                <div className="p-4 bg-black/30 rounded-2xl border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] text-[#cfbdff] font-bold uppercase block">Taller Formativo Comunitario</span>
                    <span className="font-bold text-white text-xs block mt-1">Taller Convivencia Digital y Cuidado en el Hogar</span>
                    <span className="text-[11px] text-[#cbc4d2]/70 block mt-0.5">05 Nov 2026 • 19:00 Hrs • Vía Meet Virtual</span>
                  </div>

                  <button 
                    onClick={() => setMeetingStatus2(meetingStatus2 === "confirmado" ? "pendiente" : "confirmado")}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all w-full sm:w-auto cursor-pointer ${
                      meetingStatus2 === "confirmado" 
                        ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300" 
                        : "bg-[#6750a4] hover:bg-indigo-500 text-white"
                    }`}
                  >
                    {meetingStatus2 === "confirmado" ? "✓ Asistiré" : "Confirmar Asistiré"}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SUB-COLUMN: RECETARIO FAMILIAR TIPS */}
          <div className="col-span-12 lg:col-span-5 space-y-8">
            
            {/* LOGROS DE SOFÍA */}
            <div className="bg-[#1b1a1f] p-6 rounded-3xl border border-white/5 space-y-4">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Logros y Kudos de Sofía</span>
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="p-3 bg-black/30 rounded-2xl border border-white/5 flex items-center gap-3">
                  <span className="text-2xl flex-shrink-0">⭐</span>
                  <div>
                    <span className="font-bold text-white block">Medalla de Liderazgo Social</span>
                    <p className="text-[11px] text-[#cbc4d2]/70 mt-0.5 leading-relaxed">
                      Otorgado por el Prof. Omar Lobos al destacar su compañerismo proactivo para guiar dinámicas de contención grupal.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-black/30 rounded-2xl border border-white/5 flex items-center gap-3">
                  <span className="text-2xl flex-shrink-0">🤝</span>
                  <div>
                    <span className="font-bold text-white block">Medalla de Empatía Digital</span>
                    <p className="text-[11px] text-[#cbc4d2]/70 mt-0.5 leading-relaxed">
                      Otorgado tras resolver constructivamente un desacuerdo virtual de grupo de estudio, mediando de forma pacífica.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RECETARIO FAMILIAR: RECURSOS DE CRIANZA */}
            <div className="bg-[#1b1a1f] p-6 rounded-3xl border border-white/5 space-y-4">
              <div>
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#d0bcff]" />
                  <span>Recetario Familiar: Herramientas en el Hogar</span>
                </h3>
                <p className="text-xs text-[#cbc4d2]/60 mt-0.5">Recursos oficiales y consejos clínicos de crianza y convivencia escolar.</p>
              </div>

              <div className="space-y-3.5 text-xs">
                {[
                  {
                    id: "ciberacoso",
                    title: "Conversar sobre ciberacoso en casa",
                    tip: "Busque momentos cotidianos y relajados, pregúntele qué aplicaciones usan sus amigos de forma habitual y guíela a identificar comportamientos digitales agresivos. Refuerce que nunca la juzgará por contar un problema en internet."
                  },
                  {
                    id: "refuerzo",
                    title: "El impacto del refuerzo positivo frente al logro",
                    tip: "En lugar de felicitar únicamente el resultado cuantitativo (la nota), celebre el esfuerzo sostenido y el compañerismo. Esto fomenta una mentalidad de crecimiento, reduciendo la ansiedad clínica escolar significativamente."
                  }
                ].map((item) => (
                  <div key={item.id} className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-2">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedTip(expandedTip === item.id ? null : item.id)}>
                      <span className="font-bold text-[#e6e1e9] hover:text-[#d0bcff] transition-colors">{item.title}</span>
                      <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform ${expandedTip === item.id ? "rotate-90 text-[#d0bcff]" : ""}`} />
                    </div>
                    {expandedTip === item.id && (
                      <p className="text-[11px] text-[#cbc4d2]/80 leading-relaxed pt-1 border-t border-white/5 animate-fade-in">
                        {item.tip}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
