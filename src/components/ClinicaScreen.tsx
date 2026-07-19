import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, AlertTriangle, MessageCircle, Heart, PhoneCall, Copy, Send, 
  ChevronRight, ArrowLeft, ShieldAlert, Check, Sparkles, User, HelpCircle, 
  Activity, BookOpen, LogOut, RefreshCw
} from "lucide-react";
import { ScreenId, ChatMessage } from "../types";

interface ClinicaScreenProps {
  onNavigate: (target: ScreenId) => void;
}

export default function ClinicaScreen({ onNavigate }: ClinicaScreenProps) {
  const [activeTab, setActiveTab] = useState<"jessica" | "kevin">("jessica");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      senderName: "Asistente Clínico",
      text: "Estimada colega de la Dupla Psicosocial. He estructurado los puntos críticos del caso de Jessica Muñoz. ¿En qué plantilla de respuesta o análisis de derivación te puedo apoyar?",
      time: "Justo ahora"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    if (!textToSend) setInputText("");

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      senderName: "Psicóloga",
      text: query,
      time: new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          systemInstruction: "Eres el Asistente Empático de Conecta V2 Pro para la Dupla Psicosocial de un colegio en Chile. Redactas respuestas terapéuticas de contención, correos para apoderados, o informes clínicos sobre ideación suicida, bullying o crisis emocional escolar. Sé extremadamente profesional, cautelosa, empática y respetuosa. Responde en español.",
          history: messages.slice(-5)
        })
      });
      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        senderName: "Asistente Clínico",
        text: data.reply || "He procesado tu requerimiento con éxito.",
        time: new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyTemplate = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const templates = [
    {
      id: "t1",
      title: "Contención Jessica",
      text: "Hola Jessica, me he quedado pensando en nuestra conversación y quiero recordarte que en el liceo habemos personas que nos importas mucho y estamos aquí para escucharte sin juzgarte. Si te sientes abrumada en cualquier momento, recuerda que puedes venir a la sala psicosocial de inmediato. No estás sola."
    },
    {
      id: "t2",
      title: "Citación Madre",
      text: "Estimada Sra. Carolina Muñoz. Junto con saludarle cordialmente, le escribo de parte de la Dupla Psicosocial del Liceo. Solicitamos citación presencial de carácter urgente para mañana a las 09:00 hrs para abordar la situación de acompañamiento socioemocional de su hija Jessica. Agradecemos su confirmación."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121115] text-[#e6e1e9] flex font-sans overflow-x-hidden">
      
      {/* LEFT SIDEBAR: ACTIVE CLINICAL CASES */}
      <aside className="w-80 bg-[#1a191e] border-r border-[#49454f]/30 p-5 flex flex-col justify-between hidden md:flex">
        <div className="space-y-6">
          <div>
            <h2 className="font-display font-extrabold text-xl text-[#d0bcff] flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Dupla Psicosocial</span>
            </h2>
            <p className="text-[11px] text-[#cbc4d2]/60 uppercase tracking-wider mt-1">Gestión de Casos Clínicos</p>
          </div>

          {/* Cases list */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-[#cbc4d2]/40 tracking-widest uppercase">Casos Críticos Activos</h3>
            
            <button 
              onClick={() => setActiveTab("jessica")}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                activeTab === "jessica" 
                  ? "bg-[#6750a4]/15 border-[#d0bcff]/40 text-[#e8def8]" 
                  : "bg-transparent border-transparent text-[#cbc4d2] hover:bg-[#323035]/40"
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="font-bold text-xs">Jessica Muñoz</span>
                <span className="text-[8px] bg-red-500/20 text-red-300 font-bold px-1.5 py-0.5 rounded border border-red-500/40">RIESGO ROJO</span>
              </div>
              <div className="text-[11px] text-[#cbc4d2]/70 mt-1">7° Año Básico A</div>
              <div className="text-[10px] text-red-300 mt-2 flex items-center gap-1 font-semibold">
                <ShieldAlert className="w-3 h-3 text-red-400" />
                <span>Ideación suicida latente</span>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab("kevin")}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                activeTab === "kevin" 
                  ? "bg-[#6750a4]/15 border-[#d0bcff]/40 text-[#e8def8]" 
                  : "bg-transparent border-transparent text-[#cbc4d2] hover:bg-[#323035]/40"
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="font-bold text-xs">Kevin Soto</span>
                <span className="text-[8px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-500/40">RIESGO AMARILLO</span>
              </div>
              <div className="text-[11px] text-[#cbc4d2]/70 mt-1">2° Medio B</div>
              <div className="text-[10px] text-amber-300 mt-2 flex items-center gap-1 font-semibold">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span>Bullying severo / Aislamiento</span>
              </div>
            </button>
          </div>
        </div>

        {/* Global links in Sidebar bottom */}
        <div className="space-y-4 border-t border-[#49454f]/20 pt-4">
          <div className="p-3 bg-[#6750a4]/10 rounded-xl border border-[#d0bcff]/10 text-[11px] text-[#cbc4d2] leading-relaxed">
            <span className="font-bold block text-[#d0bcff] mb-1">PROTOCOLO DE CONTENCIÓN</span>
            Utilice plantillas clínicas para formalizar bitácoras y agilizar el contacto institucional.
          </div>

          <a 
            onClick={() => onNavigate(ScreenId.ACCESO)}
            className="flex items-center gap-3 px-4 py-2.5 text-[#ffb4ab] hover:text-red-400 rounded-xl font-medium transition-all cursor-pointer text-xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </a>
        </div>
      </aside>

      {/* CASE CONTENT WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* TOP STATUS BAR WITH SPECIFIED XPATH-READY ELEMENTS */}
        <header className="h-16 border-b border-[#49454f]/30 px-6 flex items-center justify-between bg-[#121115]/95 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h1 className="font-display font-bold text-sm md:text-base tracking-tight text-white">
              {activeTab === "jessica" 
                ? "Caso #IM-2024-0012: Jessica Muñoz (7° Año Básico A)" 
                : "Caso #IM-2024-0015: Kevin Soto (2° Medio B)"}
            </h1>
          </div>

          {/* CRITICAL: Navigation Links as specified in Prototype Navigation Spec */}
          <div className="flex items-center gap-2 md:gap-4 text-xs font-semibold">
            {/* a tag containing 'Dashboard' -> Panel Docente (none transition) */}
            <a 
              onClick={() => onNavigate(ScreenId.DOCENTE)}
              className="text-[#cbc4d2] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
            >
              Dashboard
            </a>

            {/* button containing 'Cambiar Perfil' -> Student Portal (push transition) */}
            <button 
              onClick={() => onNavigate(ScreenId.ESTU_MOBILE)}
              className="px-3 py-1.5 bg-[#4d4465] text-white rounded-lg hover:bg-[#6750a4] transition-all cursor-pointer border border-[#d0bcff]/20"
            >
              Cambiar Perfil
            </button>

            {/* a tag containing 'Cerrar Sesión' -> Acceso Screen (push_back transition) */}
            <a 
              onClick={() => onNavigate(ScreenId.ACCESO)}
              className="text-[#ffb4ab] hover:text-red-400 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
            >
              Cerrar Sesión
            </a>
          </div>
        </header>

        {/* WORKSPACE CENTRAL WORK AREA */}
        <div className="flex-1 p-5 md:p-8 grid grid-cols-12 gap-6 overflow-y-auto">
          
          {/* LEFT INNER COLUMN: RISK GRID & DIALOG LOGS */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* MATRIZ DE RIESGO DE JESSICA */}
            <div className="bg-[#1a191e] rounded-3xl p-6 border border-white/5">
              <h3 className="font-display font-bold text-sm text-[#cbc4d2] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#d0bcff]" />
                <span>Matriz Socioemocional de Diagnóstico</span>
              </h3>

              {activeTab === "jessica" ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Autoesteem */}
                  <div className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
                    <span className="text-[10px] text-[#cbc4d2]/60 uppercase font-bold tracking-widest">Autoestima</span>
                    <div className="text-sm font-extrabold text-white mt-1">Bajo</div>
                    <span className="text-[9px] text-[#cbc4d2]/40 block mt-1">Autoimagen crítica</span>
                  </div>

                  {/* Anxiety */}
                  <div className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
                    <span className="text-[10px] text-[#cbc4d2]/60 uppercase font-bold tracking-widest">Ansiedad</span>
                    <div className="text-sm font-extrabold text-[#ffb4ab] mt-1">Crítico</div>
                    <span className="text-[9px] text-[#cbc4d2]/40 block mt-1">Episodios de pánico</span>
                  </div>

                  {/* Bullying */}
                  <div className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
                    <span className="text-[10px] text-[#cbc4d2]/60 uppercase font-bold tracking-widest">Bullying</span>
                    <div className="text-sm font-extrabold text-[#e7c365] mt-1">Alto</div>
                    <span className="text-[9px] text-[#cbc4d2]/40 block mt-1">Acoso virtual grupal</span>
                  </div>

                  {/* Riesgo Vital (RED ALERT WITH PULSE HIGHLIGHT) */}
                  <div className="bg-red-500/10 p-4 rounded-2xl border border-red-500/30 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/5 pulse-ring-active pointer-events-none" />
                    <span className="text-[10px] text-red-300 uppercase font-bold tracking-widest relative z-10">Riesgo Vital</span>
                    <div className="text-xs font-black text-red-400 mt-1 tracking-tight uppercase relative z-10">ALERTA ROJA</div>
                    <span className="text-[9px] text-red-200/50 block mt-1 relative z-10">Protocolo Mineduc</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
                    <span className="text-[10px] text-[#cbc4d2]/60 uppercase font-bold tracking-widest">Autoestima</span>
                    <div className="text-sm font-extrabold text-[#cbc4d2] mt-1">Moderado</div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
                    <span className="text-[10px] text-[#cbc4d2]/60 uppercase font-bold tracking-widest">Ansiedad</span>
                    <div className="text-sm font-extrabold text-[#e7c365] mt-1">Moderado</div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
                    <span className="text-[10px] text-[#cbc4d2]/60 uppercase font-bold tracking-widest">Bullying</span>
                    <div className="text-sm font-extrabold text-red-400 mt-1">Alto</div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
                    <span className="text-[10px] text-[#cbc4d2]/60 uppercase font-bold tracking-widest">Riesgo Vital</span>
                    <div className="text-sm font-extrabold text-white mt-1">Bajo</div>
                  </div>
                </div>
              )}
            </div>

            {/* HISTORIAL CHAT ESTRELLA #CHAT-4922 */}
            <div className="bg-[#1a191e] rounded-3xl border border-white/5 overflow-hidden flex flex-col h-[400px]">
              <div className="p-4 bg-black/20 border-b border-[#49454f]/20 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#d0bcff]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Historial Chat Estrella #CHAT-4922</span>
                </div>
                <span className="text-[10px] bg-red-500/20 text-red-300 font-bold px-2 py-0.5 rounded border border-red-500/30">MONITOREO IA CRÍTICO</span>
              </div>

              {/* Chat script between Jessica and wellness assistant */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto text-xs scrollbar-thin scrollbar-thumb-zinc-800">
                {activeTab === "jessica" ? (
                  <>
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#6750a4]/30 border border-[#d0bcff]/20 flex items-center justify-center flex-shrink-0 font-bold text-[10px] text-[#d0bcff]">E</div>
                      <div className="bg-[#242329] p-3 rounded-2xl rounded-tl-none max-w-[80%] leading-relaxed border border-white/5">
                        <span className="font-bold text-[#d0bcff] block mb-1 text-[10px]">Estrella AI</span>
                        Hola Jessica, ¿cómo te has sentido hoy con los trabajos grupales?
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <div className="bg-[#322f37] p-3 rounded-2xl rounded-tr-none max-w-[80%] leading-relaxed">
                        <span className="font-bold text-[#e6e1e9] block mb-1 text-[10px]">Jessica Muñoz</span>
                        Un poco sola... a veces siento que a nadie le importa si estoy o no
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#cbc4d2] flex items-center justify-center flex-shrink-0 font-bold text-[10px] text-[#121115]">JM</div>
                    </div>

                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#6750a4]/30 border border-[#d0bcff]/20 flex items-center justify-center flex-shrink-0 font-bold text-[10px] text-[#d0bcff]">E</div>
                      <div className="bg-[#242329] p-3 rounded-2xl rounded-tl-none max-w-[80%] leading-relaxed border border-white/5">
                        <span className="font-bold text-[#d0bcff] block mb-1 text-[10px]">Estrella AI</span>
                        Lamento mucho escuchar eso Jessica. Tu presencia sí es muy valiosa para tus compañeros y tus profesores. Aquí en el colegio cuentas con nosotros. ¿Hay algo específico que te haya hecho sentir así hoy?
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#6750a4]/30 flex items-center justify-center flex-shrink-0 font-bold text-[10px] text-[#d0bcff]">E</div>
                      <div className="bg-[#242329] p-3 rounded-2xl rounded-tl-none max-w-[80%] leading-relaxed">
                        <span className="font-bold text-[#d0bcff] block mb-1 text-[10px]">Estrella AI</span>
                        Hola Kevin, ¿has logrado conversar con el orientador escolar esta mañana?
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <div className="bg-[#322f37] p-3 rounded-2xl rounded-tr-none max-w-[80%] leading-relaxed">
                        <span className="font-bold text-[#e6e1e9] block mb-1 text-[10px]">Kevin Soto</span>
                        No... no quiero ir a clases. En el patio me molestan por el corte de pelo.
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#cbc4d2] flex items-center justify-center flex-shrink-0 font-bold text-[10px] text-[#121115]">KS</div>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT INNER COLUMN: ASISTENTE EMPÁTICO & RED DE APOYO */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* EMPATHIC AI PROMPTER / COPY PRESETS */}
            <div className="bg-[#1a191e] rounded-3xl p-5 border border-[#d0bcff]/10 space-y-4">
              <div className="flex items-center gap-1.5 text-white">
                <Sparkles className="w-5 h-5 text-[#d0bcff]" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Asistente Empático de Redacción</h4>
              </div>
              
              <p className="text-[11px] text-[#cbc4d2]/70 leading-relaxed">
                Genera borradores rápidos de contención para el alumno o convocatorias de urgencia para el apoderado.
              </p>

              {/* Preset buttons */}
              <div className="space-y-2">
                {templates.map((tpl) => (
                  <div key={tpl.id} className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#d0bcff]">{tpl.title}</span>
                      <button 
                        onClick={() => handleCopyTemplate(tpl.text, tpl.id)}
                        className="text-[10px] hover:text-[#d0bcff] transition-colors flex items-center gap-1 font-semibold text-[#cbc4d2]"
                      >
                        {copiedText === tpl.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[10px] text-[#cbc4d2]/70 leading-normal line-clamp-2 italic">
                      "{tpl.text}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Chat Input interface */}
              <div className="border-t border-[#49454f]/20 pt-4 space-y-3">
                <div className="h-32 overflow-y-auto space-y-2 p-2 bg-black/20 rounded-xl text-[11px] text-[#cbc4d2]">
                  {messages.map((m) => (
                    <div key={m.id} className={m.sender === "user" ? "text-right text-[#d0bcff]" : "text-left"}>
                      <span className="font-bold">{m.senderName}:</span> {m.text}
                    </div>
                  ))}
                  {isTyping && <span className="text-[#d0bcff]/50 block animate-pulse">Escribiendo derivación...</span>}
                </div>
                
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Escribe para redactar con IA" 
                    className="flex-1 bg-black/40 border border-[#49454f]/50 rounded-lg px-3 py-2 text-xs text-white outline-none focus:ring-1 focus:ring-[#d0bcff]/60"
                  />
                  <button 
                    onClick={() => handleSend()}
                    className="w-9 h-9 bg-[#6750a4] hover:bg-[#d0bcff] hover:text-black text-white flex items-center justify-center rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* RED DE APOYO ESTUDIANTIL */}
            <div className="bg-[#1a191e] rounded-3xl p-5 border border-white/5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#cbc4d2] flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Red de Apoyo de Jessica</span>
              </h4>

              <div className="space-y-3 text-xs">
                {/* Mother Card */}
                <div className="p-3 bg-black/30 rounded-xl border border-white/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-white/50 block font-bold">Madre / Apoderada Titular</span>
                    <span className="font-bold text-white block mt-0.5">Carolina Muñoz</span>
                  </div>
                  <div className="mt-2.5 flex justify-between items-center">
                    <span className="text-[#cbc4d2]/70 font-mono">+56 9 8472 9221</span>
                    <span className="text-[9px] bg-emerald-500/15 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30">ACTIVO</span>
                  </div>
                </div>

                {/* Extern Psychologist */}
                <div className="p-3 bg-black/30 rounded-xl border border-white/5">
                  <span className="text-[10px] text-white/50 block font-bold">Psicóloga Externa CESFAM</span>
                  <span className="font-bold text-white block mt-0.5">Dra. Ana Arancibia</span>
                  <span className="text-[10px] text-[#cbc4d2]/70 block mt-1">Derivación en curso (22 Oct 2023)</span>
                </div>

                {/* Emergency button *4141 */}
                <a 
                  href="tel:4141" 
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-red-950/40 transition-all text-xs"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Fono Emergencia Mineduc *4141</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
