import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Heart, Award, Sparkles, Send, Moon, Sun, ArrowLeft, LogOut, 
  HelpCircle, User, MessageCircle, AlertCircle, RefreshCw, Volume2, Smile
} from "lucide-react";
import { ScreenId, ChatMessage } from "../types";

interface EstudianteScreenProps {
  onNavigate: (target: ScreenId) => void;
}

export default function EstudianteScreen({ onNavigate }: EstudianteScreenProps) {
  const [level, setLevel] = useState<"parvulo" | "basica" | "media">("media");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      senderName: "Estrella AI",
      text: "¡Hola! Soy Estrella, tu asistente de bienestar. Aquí puedes contarme cómo va tu día, cómo te sientes, o pedirme un consejo para relajarte. Todo lo que digas aquí es confidencial.",
      time: "Ahora"
    }
  ]);
  const [isChatTyping, setIsChatTyping] = useState(false);
  const [breathState, setBreathState] = useState<"Inhala" | "Mantén" | "Exhala">("Inhala");
  const [breathScale, setBreathScale] = useState(1);

  // Simple automated breathing exercise logic
  React.useEffect(() => {
    let breathTimer: NodeJS.Timeout;
    const runBreathingCycle = () => {
      setBreathState("Inhala");
      setBreathScale(1.4);
      
      breathTimer = setTimeout(() => {
        setBreathState("Mantén");
        setBreathScale(1.4);
        
        breathTimer = setTimeout(() => {
          setBreathState("Exhala");
          setBreathScale(1.0);
        }, 3000);
      }, 4000);
    };

    runBreathingCycle();
    const interval = setInterval(runBreathingCycle, 11000);

    return () => {
      clearInterval(interval);
      clearTimeout(breathTimer);
    };
  }, []);

  const handleSendChat = async (presetText?: string) => {
    const text = presetText || chatInput;
    if (!text.trim()) return;

    if (!presetText) setChatInput("");

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      senderName: "Sofía",
      text: text,
      time: "Ahora"
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsChatTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          systemInstruction: "Eres Estrella AI, el asistente virtual de contención socioemocional escolar para un estudiante de Chile. Responde de forma muy amigable, empática, comprensiva, y dale ánimos. No emitas diagnósticos y mantén un lenguaje cálido y juvenil adaptado para alumnos escolares.",
          history: chatMessages.slice(-5)
        })
      });
      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        senderName: "Estrella AI",
        text: data.reply || "Estoy aquí para apoyarte en lo que necesites.",
        time: "Ahora"
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsChatTyping(false);
    }
  };

  // Determine styles dynamically based on chosen Nivel (Párvulo, Básica, Media)
  const getThemeStyles = () => {
    const baseBg = isDarkMode ? "bg-[#141318] text-[#e6e1e9]" : "bg-zinc-50 text-zinc-900";
    const headerBg = isDarkMode ? "bg-[#201f24]/90 border-zinc-800" : "bg-white/95 border-zinc-200";
    
    if (level === "parvulo") {
      // Playful theme (Dashed borders, pastel colors, pill shapes)
      return {
        container: `${baseBg} font-sans`,
        header: `border-b-4 border-dashed border-amber-400/50 ${headerBg}`,
        card: "bg-amber-400/10 border-4 border-dashed border-amber-400 rounded-[2rem] p-5 shadow-sm",
        button: "bg-amber-400 hover:bg-amber-300 text-black font-extrabold rounded-full px-5 py-3 transition-transform active:scale-95",
        badge: "bg-yellow-400/25 text-yellow-300 font-extrabold text-[10px] rounded-full px-3 py-1",
        heading: "font-display font-black text-amber-400 text-xl tracking-tight"
      };
    } else if (level === "basica") {
      // Neobrutalism (Thick borders, box offsets, flat styling)
      return {
        container: `${baseBg} font-mono`,
        header: `border-b-4 border-[#cfbdff] ${headerBg}`,
        card: "neobrutal-card p-5 rounded-2xl",
        button: "neobrutal-button text-white font-bold rounded-xl px-5 py-3 border-2 border-white/50",
        badge: "bg-[#cfbdff]/20 text-[#cfbdff] font-bold text-[10px] border border-[#cfbdff] rounded-lg px-2.5 py-1",
        heading: "font-display font-extrabold text-[#cfbdff] text-xl"
      };
    } else {
      // Media (Glassmorphism, thin lines, purple glow, elegant Inter typography)
      return {
        container: `${baseBg} font-sans`,
        header: `border-b border-white/10 backdrop-blur-lg ${headerBg}`,
        card: "glass-card p-5 rounded-[2rem] border border-white/10",
        button: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl px-4 py-2.5 transition-all",
        badge: "bg-purple-500/20 text-[#cfbdff] font-semibold text-[10px] border border-[#cfbdff]/30 rounded-full px-2.5 py-0.5",
        heading: "font-display font-bold text-white text-xl tracking-tight"
      };
    }
  };

  const theme = getThemeStyles();

  return (
    <div className={`min-h-screen ${theme.container} flex flex-col bg-[#0a0a0c]`}>
      
      {/* PROFESSIONAL PORTAL HEADER */}
      <header className={`${theme.header} sticky top-0 z-30 px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-md`}>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-2 bg-purple-600/20 rounded-xl border border-purple-500/30 flex-shrink-0">
            <Heart className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Conecta V2 Pro <span className="text-[10px] bg-indigo-500 text-white font-extrabold px-2 py-0.5 rounded-full">Portal Estudiante</span>
            </h1>
            <p className="text-xs text-zinc-400">Plataforma de Acompañamiento Socioemocional</p>
          </div>
        </div>

        {/* CONTROLS HEADER AREA */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          
          {/* LEVEL SELECTOR */}
          <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 p-1.5 rounded-xl text-xs">
            <span className="font-bold text-zinc-400 pl-1.5">Nivel:</span>
            <select 
              value={level} 
              onChange={(e) => setLevel(e.target.value as any)}
              className="bg-zinc-800 text-white border-none rounded-lg px-2 py-1 font-bold text-xs outline-none cursor-pointer hover:bg-zinc-700 transition-colors"
            >
              <option value="parvulo">Párvulo</option>
              <option value="basica">Básica</option>
              <option value="media">Media</option>
            </select>
          </div>

          {/* UTILITIES */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center"
              title="Alternar Modo Oscuro"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
            </button>

            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 py-1 pl-1 pr-3 rounded-xl">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop" alt="Sofia" className="w-7 h-7 rounded-lg object-cover" />
              <span className="text-xs font-bold text-white hidden sm:inline">Sofía Carvajal</span>
            </div>

            {/* DASHBOARD DIRECT TRANSITION */}
            <a 
              onClick={() => onNavigate(ScreenId.DOCENTE)}
              className="bg-primary-container px-3 py-2 rounded-xl text-center cursor-pointer text-xs font-bold text-white hover:opacity-90 transition-all shadow-sm flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a Docente</span>
            </a>

            {/* LOGOUT */}
            <button 
              onClick={() => onNavigate(ScreenId.ACCESO)}
              className="p-2 bg-red-950/20 hover:bg-red-900/30 border border-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              title="Cerrar Sesión"
            >
              <span className="hidden">Cerrar Sesión</span>
              <LogOut className="w-4 h-4" />
              <span className="text-xs font-bold hidden sm:inline">Salir</span>
            </button>
          </div>

        </div>
      </header>

      {/* MAIN SCREEN RESPONSIVE CONTENT AREA */}
      <main className="max-w-7xl mx-auto w-full p-4 md:p-8 space-y-6 flex-1">
        
        {/* BANNER DE BIENVENIDA */}
        <div className={`${theme.card} relative overflow-hidden p-6 md:p-8`}>
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl -z-10" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <span className={theme.badge}>Liceo Chileno Norte • 7° Básico A</span>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                ¡Hola, Sofía Carvajal! 🌸
              </h2>
              <p className="text-xs md:text-sm text-[#cbc4d2]/70 max-w-xl leading-relaxed">
                Este es tu espacio seguro y personal. Aquí puedes contarnos cómo va tu día, practicar ejercicios de respiración para relajarte, o conversar en privado con tu asistente de bienestar Estrella AI.
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-black/20 p-4 rounded-2xl border border-white/5 w-full md:w-auto">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-purple-500/30 flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop" alt="Sofia" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Estudiante Asignada</p>
                <p className="text-sm font-black text-white leading-tight">Sofía Carvajal</p>
                <p className="text-xs text-zinc-400 mt-0.5">7° Básico A • Jornada Mañana</p>
              </div>
            </div>
          </div>
        </div>

        {/* RESPONSIVE PORTAL COLUMNS AND GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* COLUMN 1: MOOD CHECK-IN & RECOGNITIONS */}
          <div className="space-y-6 flex flex-col justify-between">
            
            {/* CHECK-IN MOOD EMOTION */}
            <div className={`${theme.card} space-y-4 flex-1 flex flex-col justify-between p-6`}>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#cbc4d2]/60 block">REGISTRO DIARIO</span>
                <h3 className="text-lg font-black text-white mt-1">¿Cómo te sientes hoy?</h3>
                <p className="text-xs text-[#cbc4d2]/70 mt-1">Tu respuesta es totalmente confidencial y nos ayuda a cuidarte en el colegio.</p>
              </div>

              <div className="grid grid-cols-5 gap-1.5 my-4">
                {[
                  { face: "😊", label: "Feliz", key: "feliz" },
                  { face: "😌", label: "Tranquila", key: "calma" },
                  { face: "😰", label: "Ansiosa", key: "ansia" },
                  { face: "😡", label: "Molesta", key: "molesta" },
                  { face: "😢", label: "Triste", key: "triste" }
                ].map((mood) => (
                  <button
                    key={mood.key}
                    onClick={() => setSelectedMood(mood.key)}
                    className={`flex-1 flex flex-col items-center p-2.5 rounded-xl transition-all cursor-pointer ${
                      selectedMood === mood.key 
                        ? "bg-[#6750a4]/30 border border-[#cfbdff]/50 scale-105 shadow-[0_4px_12px_rgba(103,80,164,0.3)]" 
                        : "bg-black/20 hover:bg-zinc-800/40 border border-transparent"
                    }`}
                  >
                    <span className="text-2xl">{mood.face}</span>
                    <span className="text-[9px] font-bold text-[#cbc4d2] mt-1.5">{mood.label}</span>
                  </button>
                ))}
              </div>

              {selectedMood ? (
                <div className="p-3 bg-emerald-500/15 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 text-center font-bold">
                  ¡Gracias por registrar tu ánimo! Tu profesor Omar Lobos fue notificado positivamente para darte el mejor acompañamiento.
                </div>
              ) : (
                <div className="p-3 bg-zinc-900/50 border border-zinc-800/60 rounded-xl text-xs text-zinc-400 text-center">
                  Selecciona una emoción para registrar tu bitácora de bienestar escolar.
                </div>
              )}
            </div>

            {/* RECOGNITIONS AND BADGES */}
            <div className={`${theme.card} p-6 space-y-4`}>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#cbc4d2]/60 block">RECONOCIMIENTO</span>
                <h3 className="text-lg font-black text-white mt-1 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Mis Medallas (Kudos)</span>
                </h3>
                <p className="text-xs text-[#cbc4d2]/70 mt-1">Premios y felicitaciones de tus profesores</p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-black/30 rounded-xl border border-white/5 flex items-center justify-between hover:bg-zinc-800/20 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⭐</span>
                    <div>
                      <span className="text-xs font-bold text-white block">Liderazgo & Empatía</span>
                      <span className="text-[10px] text-zinc-400">Prof. Omar Lobos</span>
                    </div>
                  </div>
                  <span className="text-[9px] bg-amber-500/20 text-amber-300 font-bold px-2.5 py-1 rounded-full border border-amber-500/30">Lobo Jefe</span>
                </div>

                <div className="p-3 bg-black/30 rounded-xl border border-white/5 flex items-center justify-between hover:bg-zinc-800/20 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🤝</span>
                    <div>
                      <span className="text-xs font-bold text-white block">Buen Compañerismo</span>
                      <span className="text-[10px] text-zinc-400">Jessica (Dupla Psicosocial)</span>
                    </div>
                  </div>
                  <span className="text-[9px] bg-purple-500/20 text-purple-300 font-bold px-2.5 py-1 rounded-full border border-purple-500/30">Ayuda Amigo</span>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN 2: GUIDED BREATHING EXERCISE */}
          <div className={`${theme.card} flex flex-col justify-between p-6 space-y-6 min-h-[420px]`}>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#cbc4d2]/60 block">MINDFULNESS</span>
              <h3 className="text-lg font-black text-white mt-1 flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-indigo-400 animate-pulse" />
                <span>Ejercicios de Relajación Guiada</span>
              </h3>
              <p className="text-xs text-[#cbc4d2]/70 mt-1">Sigue el ritmo de este ejercicio interactivo para bajar la ansiedad y soltar tensiones.</p>
            </div>

            {/* Pulsing circle container */}
            <div className="flex-1 flex flex-col items-center justify-center py-6">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <motion.div 
                  animate={{ scale: breathScale }}
                  transition={{ duration: breathState === "Inhala" ? 4 : breathState === "Exhala" ? 4 : 3, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/15 to-indigo-500/25 border-2 border-indigo-400/30 shadow-[0_0_40px_rgba(103,80,164,0.2)]"
                />
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <span className="font-display font-black text-white text-lg tracking-tight uppercase">{breathState}</span>
                  <div className="w-20 h-px bg-white/10 my-1.5" />
                  <span className="text-[10px] text-zinc-300 font-bold max-w-[120px] text-center leading-normal">
                    {breathState === "Inhala" && "Toma aire por la nariz"}
                    {breathState === "Mantén" && "Sostén el aire..."}
                    {breathState === "Exhala" && "Suelta el aire despacio"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-xs text-[#cfbdff] text-center leading-relaxed">
              Respirar conscientemente ayuda a calmar el sistema nervioso. Tómate 2 minutos para realizar este ciclo.
            </div>
          </div>

          {/* COLUMN 3: INTERACTIVE CHAT (ESTRELLA AI) */}
          <div className={`${theme.card} flex flex-col h-[500px] lg:h-auto overflow-hidden p-6`}>
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <span className="text-xs font-bold text-white block">Estrella AI</span>
                  <span className="text-[9px] text-zinc-400 block leading-none">Contención Socioemocional Escolar</span>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            </div>

            {/* Chat list view */}
            <div className="flex-1 overflow-y-auto space-y-3.5 py-4 pr-1 text-xs scrollbar-thin scrollbar-thumb-zinc-800">
              {chatMessages.map((m) => (
                <div key={m.id} className={`flex flex-col max-w-[85%] ${m.sender === "user" ? "ml-auto items-end" : "items-start"}`}>
                  <div className={`p-3 rounded-2xl ${m.sender === "user" ? "bg-indigo-600 text-white rounded-tr-none shadow-md" : "bg-black/40 text-zinc-200 rounded-tl-none border border-white/5"}`}>
                    <p className="leading-relaxed text-[12px]">{m.text}</p>
                  </div>
                  <span className="text-[9px] text-zinc-500 mt-1 px-1 font-semibold">{m.senderName} • {m.time}</span>
                </div>
              ))}
              {isChatTyping && (
                <div className="text-[10px] text-purple-400 animate-pulse flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Estrella está escribiendo un consejo cálido...</span>
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="flex gap-1.5 py-2 overflow-x-auto whitespace-nowrap scrollbar-none border-t border-white/5">
              <button 
                onClick={() => handleSendChat("Tengo problemas en el aula")}
                className="text-[10px] bg-white/5 border border-white/10 text-[#cbc4d2] px-2.5 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                Tengo problemas en el aula
              </button>
              <button 
                onClick={() => handleSendChat("Me siento sola hoy")}
                className="text-[10px] bg-white/5 border border-white/10 text-[#cbc4d2] px-2.5 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                Me siento sola hoy
              </button>
              <button 
                onClick={() => handleSendChat("¿Cómo me organizo mejor?")}
                className="text-[10px] bg-white/5 border border-white/10 text-[#cbc4d2] px-2.5 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                ¿Cómo me organizo mejor?
              </button>
            </div>

            {/* Input area */}
            <div className="pt-3 border-t border-white/10">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                  placeholder="Cuéntame de tu día o de cómo te sientes..." 
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:ring-1 focus:ring-purple-500/50"
                />
                <button 
                  onClick={() => handleSendChat()}
                  className="w-9 h-9 bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center rounded-xl transition-all cursor-pointer active:scale-95 flex-shrink-0 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
