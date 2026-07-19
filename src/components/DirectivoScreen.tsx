import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  BarChart2, ShieldAlert, HeartHandshake, UploadCloud, FileSpreadsheet, 
  Search, Bell, Settings, Send, CheckCircle2, Lock, ArrowRight, UserCircle, LogOut,
  Sparkles, HelpCircle
} from "lucide-react";
import { ScreenId, ChatMessage } from "../types";

interface DirectivoScreenProps {
  onNavigate: (target: ScreenId) => void;
}

export default function DirectivoScreen({ onNavigate }: DirectivoScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      senderName: "Asistente MCP",
      text: "Hola Director. He analizado las métricas de este mes para su distrito. ¿En qué puedo apoyarle hoy?",
      time: "Justo ahora"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    if (!textToSend) setInputText("");

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      senderName: "Director",
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
          systemInstruction: "Eres el Asistente MCP de Conecta V2 Pro para directores de Servicios Locales de Educación Pública (SLEP) en Chile. Das respuestas formales, directas y analíticas basadas en datos socioemocionales, convivencia escolar y cumplimiento regulatorio. Responde en español.",
          history: messages.slice(-5)
        })
      });
      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        senderName: "Asistente MCP",
        text: data.reply || "He procesado tu requerimiento con éxito. ¿Deseas generar un reporte formal?",
        time: new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadStatus("Procesando nómina...");
      setTimeout(() => {
        setUploadStatus(`Nómina "${file.name}" cargada y encriptada exitosamente (SHA-256).`);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#141318] text-[#e6e1e9] flex font-sans overflow-x-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#1c1b20] border-r border-[#494551]/30 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="mb-10">
            <h2 className="font-display font-extrabold text-2xl tracking-tight text-[#cfbdff]">Admin Central</h2>
            <p className="text-xs text-[#cbc4d2]/70 uppercase tracking-widest mt-1">Enterprise Tier • SLEP</p>
          </div>

          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#6750a4]/20 text-[#e0d2ff] rounded-xl font-semibold border border-[#6750a4]/40 text-left">
              <BarChart2 className="w-5 h-5 text-[#cfbdff]" />
              <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-[#cbc4d2] hover:text-[#e6e1e9] hover:bg-[#36343a]/50 rounded-xl font-medium text-left transition-all">
              <ShieldAlert className="w-5 h-5 opacity-70" />
              <span>Performance</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-[#cbc4d2] hover:text-[#e6e1e9] hover:bg-[#36343a]/50 rounded-xl font-medium text-left transition-all">
              <HeartHandshake className="w-5 h-5 opacity-70" />
              <span>Mood Metrics</span>
            </button>
          </nav>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-[#ffdad6]/5 border border-[#ffdad6]/20 rounded-2xl">
            <div className="flex items-center gap-2 text-[#ffb4ab] mb-1">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider">MCP PROTOCOL ACTIVE</span>
            </div>
            <p className="text-[11px] text-[#cbc4d2]/80 leading-relaxed">
              Cifrado de grado clínico activo para resguardo de registros sensibles escolares.
            </p>
          </div>

          <div className="border-t border-[#494551]/30 pt-4">
            <a 
              onClick={() => onNavigate(ScreenId.ACCESO)}
              className="flex items-center gap-3 px-4 py-3 text-[#ffb4ab] hover:text-red-400 rounded-xl font-medium transition-all cursor-pointer text-sm"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </a>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER BAR */}
        <header className="h-16 border-b border-[#494551]/30 px-6 md:px-12 flex items-center justify-between bg-[#141318]/90 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h1 className="font-display font-bold text-xl tracking-tight">Conecta V2 Pro</h1>
            <div className="hidden lg:flex items-center gap-6 ml-8 text-sm">
              <button className="text-[#cfbdff] border-b-2 border-[#cfbdff] pb-1 font-semibold">Dashboard</button>
              <button className="text-[#cbc4d2] hover:text-white transition-colors">Analytics</button>
              <button className="text-[#cbc4d2] hover:text-white transition-colors">Rosters</button>
              <button className="text-[#cbc4d2] hover:text-white transition-colors">Security</button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-1.5 bg-[#6750a4] text-white font-semibold text-xs rounded-full hover:bg-opacity-90 transition-all flex items-center gap-1.5 shadow-sm">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Upload CSV</span>
            </button>
            <button className="p-2 hover:bg-[#36343a] rounded-full text-[#cbc4d2] hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#141318]" />
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#cfbdff]/30">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&auto=format&fit=crop" alt="User profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* WORKSPACE CONTENT */}
        <div className="flex-1 p-6 md:p-10 grid grid-cols-12 gap-8 overflow-y-auto">
          
          {/* CENTRAL DASHBOARD */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* TOP METRICS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Clima Emocional */}
              <div className="bg-[#201f24] rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#cbc4d2]/70 font-semibold tracking-wider block uppercase">Clima Emocional Global</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-extrabold font-display text-white">84.2%</span>
                    <span className="text-xs text-[#4ade80] font-bold">+3.5% vs mes ant.</span>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="h-2 w-full bg-[#36343a] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: "84.2%" }} />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#cbc4d2]/50 mt-1.5 font-semibold">
                    <span>Mínimo 50%</span>
                    <span>Objetivo 85%</span>
                  </div>
                </div>
              </div>

              {/* Alertas Críticas */}
              <div className="bg-[#201f24] rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#cbc4d2]/70 font-semibold tracking-wider block uppercase">Alertas Críticas</span>
                  <div className="flex items-baseline mt-2">
                    <span className="text-4xl font-extrabold font-display text-red-400">12</span>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full py-2 bg-[#93000a]/20 border border-[#93000a]/50 text-[#ffb4ab] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#93000a]/30 transition-all">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Requiere atención</span>
                  </button>
                </div>
              </div>

              {/* Participación Kudos */}
              <div className="bg-[#201f24] rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#cbc4d2]/70 font-semibold tracking-wider block uppercase">Participación Kudos</span>
                  <div className="flex items-baseline mt-2">
                    <span className="text-4xl font-extrabold font-display text-emerald-400">92%</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    <span className="inline-block w-6 h-6 rounded-full bg-[#cfbdff] text-[#371e72] font-bold text-[9px] flex items-center justify-center border-2 border-[#201f24]">JD</span>
                    <span className="inline-block w-6 h-6 rounded-full bg-[#cdc0e8] text-[#342b4b] font-bold text-[9px] flex items-center justify-center border-2 border-[#201f24]">AL</span>
                    <span className="inline-block w-6 h-6 rounded-full bg-[#e7c365] text-[#3e2e00] font-bold text-[9px] flex items-center justify-center border-2 border-[#201f24]">MR</span>
                  </div>
                  <span className="text-[10px] text-[#cbc4d2]/60 font-bold uppercase tracking-wider">+124 alumnos</span>
                </div>
              </div>

            </div>

            {/* CARGA DE NÓMINAS */}
            <div className="bg-[#201f24] rounded-3xl p-8 border border-dashed border-[#494551] flex flex-col items-center justify-center text-center relative group">
              <div className="w-16 h-16 bg-[#6750a4]/10 rounded-full flex items-center justify-center text-[#cfbdff] mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-lg mb-1">Carga de Nóminas Institucionales</h3>
              <p className="text-xs text-[#cbc4d2]/70 max-w-md leading-relaxed mb-6">
                Actualiza masivamente los registros de alumnos, docentes y apoderados a través de archivos Excel o CSV. Los datos se cifran automáticamente.
              </p>
              
              <label className="px-6 py-2.5 bg-[#4d4465] hover:bg-[#6750a4] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer border border-[#cfbdff]/20">
                <span>Explorar archivos locales</span>
                <input type="file" accept=".csv,.xlsx" onChange={handleFileUpload} className="hidden" />
              </label>

              {uploadStatus && (
                <div className="mt-4 p-2 bg-[#cfbdff]/10 border border-[#cfbdff]/20 rounded-xl text-xs text-[#e0d2ff] animate-fade-in flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#cfbdff]" />
                  <span>{uploadStatus}</span>
                </div>
              )}
            </div>

            {/* AUDITORÍA CRIPTOGRÁFICA TABLE */}
            <div className="bg-[#1c1b20] rounded-3xl border border-white/5 overflow-hidden">
              <div className="px-6 py-5 border-b border-[#494551]/30 flex justify-between items-center bg-[#201f24]/50">
                <div>
                  <h3 className="font-display font-bold text-base flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#cfbdff]" />
                    <span>Auditoría Criptográfica de Registros</span>
                  </h3>
                  <p className="text-xs text-[#cbc4d2]/60 mt-0.5">Historial verificable bajo estándares SOC2</p>
                </div>
                <span className="text-[10px] bg-[#6750a4]/30 text-[#e0d2ff] border border-[#cfbdff]/20 font-bold px-2 py-0.5 rounded-full">SOC2 V4.2</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#494551]/30 text-[#cbc4d2]/50 font-bold uppercase tracking-wider bg-[#201f24]/20">
                      <th className="py-4 px-6">Fecha / Hora</th>
                      <th className="py-4 px-6">Usuario</th>
                      <th className="py-4 px-6">Acción</th>
                      <th className="py-4 px-6">Hash Verificación</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#494551]/20 font-sans">
                    <tr className="hover:bg-[#201f24]/40 transition-colors">
                      <td className="py-4 px-6 text-[#cbc4d2]">24 Oct 2023 14:22</td>
                      <td className="py-4 px-6 font-semibold text-white">Director_SLEP_01</td>
                      <td className="py-4 px-6">
                        <span className="bg-[#6750a4]/15 border border-[#cfbdff]/20 text-[#cfbdff] px-2.5 py-1 rounded-lg font-bold text-[10px]">
                          Acceso Expediente
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono text-[#cbc4d2]/70">SHA-256: 8a4b...e9c2</td>
                    </tr>
                    <tr className="hover:bg-[#201f24]/40 transition-colors">
                      <td className="py-4 px-6 text-[#cbc4d2]">24 Oct 2023 12:45</td>
                      <td className="py-4 px-6 font-semibold text-white">Admin_RBD_942</td>
                      <td className="py-4 px-6">
                        <span className="bg-[#e7c365]/10 border border-[#ffdf93]/20 text-[#ffdf93] px-2.5 py-1 rounded-lg font-bold text-[10px]">
                          Carga Nómina
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono text-[#cbc4d2]/70">SHA-256: 3d1f...77a1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR: ANALYTICS ASSISTANT */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            
            {/* CHAT CARD */}
            <div className="bg-[#201f24] rounded-3xl border border-white/10 overflow-hidden flex flex-col h-[520px]">
              {/* Header */}
              <div className="p-4 border-b border-[#494551]/30 bg-[#2b292f] flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold tracking-widest uppercase">Asistente MCP</span>
                </div>
                <span className="text-[10px] bg-[#6750a4] text-[#e0d2ff] px-2 py-0.5 rounded-full font-bold">ANÁLISIS PREDICTIVO ON</span>
              </div>

              {/* Chat messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-zinc-800">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "ml-auto items-end" : "items-start"}`}
                  >
                    <div 
                      className={`p-3.5 rounded-2xl ${
                        msg.sender === "user" 
                          ? "bg-[#6750a4] text-white rounded-tr-none" 
                          : "bg-[#2b292f] text-[#e6e1e9] rounded-tl-none border border-white/5"
                      }`}
                    >
                      <p className="text-xs leading-relaxed">{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-[#cbc4d2]/50 mt-1 px-1">{msg.senderName} • {msg.time}</span>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-1.5 p-2 bg-[#2b292f]/50 rounded-xl text-[11px] text-zinc-400 w-32 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Analizando...</span>
                  </div>
                )}
              </div>

              {/* Quick Suggestion Chips */}
              <div className="px-4 py-2 border-t border-[#494551]/20 flex flex-wrap gap-1.5 bg-[#141318]/40">
                <button 
                  onClick={() => handleSend("¿Alertas emocionales por curso?")}
                  className="text-[10px] font-bold text-[#cfbdff] bg-[#6750a4]/10 hover:bg-[#6750a4]/25 border border-[#cfbdff]/20 px-2.5 py-1 rounded-full transition-all"
                >
                  ¿Alertas emocionales por curso?
                </button>
                <button 
                  onClick={() => handleSend("Impacto talleres convivencia")}
                  className="text-[10px] font-bold text-[#cfbdff] bg-[#6750a4]/10 hover:bg-[#6750a4]/25 border border-[#cfbdff]/20 px-2.5 py-1 rounded-full transition-all"
                >
                  Impacto talleres convivencia
                </button>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-[#494551]/30 bg-[#2b292f]/80">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Haz una pregunta analítica" 
                    className="flex-1 bg-[#141318] border border-[#494551]/60 rounded-xl px-4 py-2.5 text-xs text-[#e6e1e9] placeholder-[#cbc4d2]/30 outline-none focus:ring-1 focus:ring-[#cfbdff]/50 transition-all"
                  />
                  <button 
                    onClick={() => handleSend()}
                    className="w-10 h-10 bg-[#6750a4] hover:bg-[#cfbdff] hover:text-black text-white flex items-center justify-center rounded-xl transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[9px] text-[#cbc4d2]/40 block mt-2 text-center">Cumple con la normativa chilena de privacidad estudiantil.</span>
              </div>
            </div>

            {/* CUMPLIMIENTO SOC2 CARD */}
            <div className="bg-[#201f24] rounded-3xl p-6 border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold tracking-wider uppercase text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Cumplimiento SOC2</span>
                </h4>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">Vigente</span>
              </div>
              
              <div className="h-2 bg-[#36343a] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: "100%" }} />
              </div>
              <p className="text-[11px] text-[#cbc4d2]/70 leading-relaxed">
                Gobernanza de datos activa. Todas las interacciones escolares y logs clínicos se encuentran encriptados de extremo a extremo bajo el estándar nacional SLEP.
              </p>
            </div>

          </div>

        </div>

        {/* BOTTOM BRAND FOOTER */}
        <footer className="h-12 border-t border-[#494551]/20 px-12 flex items-center justify-between text-[11px] text-[#cbc4d2]/40 bg-[#1c1b20]/30">
          <span>© 2026 Conecta V2 Pro. Protocolo Audit Log v4.2</span>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">SOC2 Compliance</span>
            <span className="hover:text-white cursor-pointer">Data Governance</span>
          </div>
        </footer>

      </main>

    </div>
  );
}
