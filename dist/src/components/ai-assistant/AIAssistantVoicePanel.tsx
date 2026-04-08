import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, X, Loader2, Volume2 } from "lucide-react";

const CHAT_ENDPOINT =
  ((import.meta as unknown as { env: Record<string, string | undefined> }).env
    .VITE_CHAT_API_URL ?? "").trim() || "/.netlify/functions/chat";

const TTS_ENDPOINT =
  ((import.meta as unknown as { env: Record<string, string | undefined> }).env
    .VITE_TTS_API_URL ?? "").trim() || "/.netlify/functions/tts";

// ─── Types ───────────────────────────────────────────────────
type VoiceState = "idle" | "listening" | "processing" | "speaking";

interface ConversationEntry {
  role: "user" | "assistant";
  content: string;
}

// ─── SpeechRecognition type shim ─────────────────────────────
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
};

function getSpeechRecognition(): SpeechRecognitionInstance | null {
  const SR =
    (window as unknown as Record<string, unknown>).SpeechRecognition ||
    (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
  if (!SR) return null;
  return new (SR as new () => SpeechRecognitionInstance)();
}

// ─── Component ───────────────────────────────────────────────
interface AIAssistantVoicePanelProps {
  onClose: () => void;
  onDismiss: () => void;
}

export function AIAssistantVoicePanel({ onClose, onDismiss }: AIAssistantVoicePanelProps) {
  const [state, setState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [conversation, setConversation] = useState<ConversationEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [supported] = useState(() => !!getSpeechRecognition());

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const conversationRef = useRef<ConversationEntry[]>([]);
  const handleSendRef = useRef<(text: string) => void>(() => {});

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      audioRef.current?.pause();
      abortRef.current?.abort();
    };
  }, []);

  // ── Start listening ──────────────────────────────────────
  const startListening = useCallback(() => {
    setError(null);
    setTranscript("");
    const recognition = getSpeechRecognition();
    if (!recognition) {
      setError("Spracherkennung wird in diesem Browser nicht unterstützt.");
      return;
    }

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "de-DE";

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      let text = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        text += e.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (e.error !== "aborted" && e.error !== "no-speech") {
        setError("Fehler bei der Spracherkennung. Bitte versuchen Sie es erneut.");
      }
      setState("idle");
    };

    recognition.onend = () => {
      // Auto-send when speech ends
      setTranscript((prev) => {
        if (prev.trim()) {
          handleSendRef.current(prev.trim());
        } else {
          setState("idle");
        }
        return prev;
      });
    };

    recognitionRef.current = recognition;
    recognition.start();
    setState("listening");
  }, []);

  // ── Stop listening ───────────────────────────────────────
  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  // ── Send message to AI & get voice response ──────────────
  const handleSend = useCallback(
    async (text: string) => {
      setState("processing");
      setResponse("");

      const newConversation: ConversationEntry[] = [
        ...conversationRef.current,
        { role: "user", content: text },
      ];

      try {
        // Get text response from existing chat endpoint
        const abortController = new AbortController();
        abortRef.current = abortController;

        const chatRes = await fetch(CHAT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newConversation.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: abortController.signal,
        });

        if (!chatRes.ok) throw new Error("Chat request failed");
        const chatData = (await chatRes.json()) as { reply?: string };
        if (!chatData.reply) throw new Error("Empty reply");

        const reply = chatData.reply;
        setResponse(reply);
        const updated = [...newConversation, { role: "assistant" as const, content: reply }];
        setConversation(updated);
        conversationRef.current = updated;

        // Get TTS audio
        setState("speaking");
        try {
          const ttsRes = await fetch(TTS_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: reply }),
            signal: abortController.signal,
          });

          if (ttsRes.ok) {
            const blob = await ttsRes.blob();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audioRef.current = audio;
            audio.onended = () => {
              URL.revokeObjectURL(url);
              setState("idle");
            };
            audio.onerror = () => {
              URL.revokeObjectURL(url);
              setState("idle");
            };
            await audio.play();
          } else {
            // TTS not available — use browser synthesis as fallback
            fallbackSpeak(reply);
          }
        } catch {
          fallbackSpeak(reply);
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Verbindungsfehler. Bitte versuchen Sie es erneut.");
          setState("idle");
        }
      }
    },
    []
  );

  // Keep ref in sync
  useEffect(() => {
    handleSendRef.current = handleSend;
  }, [handleSend]);

  // ── Browser TTS fallback ─────────────────────────────────
  const fallbackSpeak = useCallback((text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = 1.0;
      utterance.onend = () => setState("idle");
      utterance.onerror = () => setState("idle");
      window.speechSynthesis.speak(utterance);
    } else {
      setState("idle");
    }
  }, []);

  // ── Stop speaking ────────────────────────────────────────
  const stopSpeaking = useCallback(() => {
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
    setState("idle");
  }, []);

  // ── Waveform bars for visual feedback ────────────────────
  const renderWaveform = () => (
    <div className="ai-voice-waveform">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="ai-voice-waveform-bar"
          animate={
            state === "listening"
              ? {
                  scaleY: [0.3, 1, 0.5, 0.8, 0.3],
                  transition: {
                    duration: 0.8,
                    delay: i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
              : state === "speaking"
                ? {
                    scaleY: [0.4, 0.9, 0.6, 1, 0.4],
                    transition: {
                      duration: 0.6,
                      delay: i * 0.08,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
                : { scaleY: 0.15 }
          }
        />
      ))}
    </div>
  );

  return (
    <motion.div
      className="ai-voice-panel"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="ai-voice-panel-header">
        <div className="ai-voice-panel-title">
          <div className="ai-voice-panel-indicator" />
          <span>Tawano Assistent</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onClose}
            className="ai-voice-panel-close"
            aria-label="Panel schließen"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="ai-voice-panel-content">
        {/* Status display */}
        <div className="ai-voice-status">
          {state === "idle" && !response && (
            <p className="ai-voice-status-text">
              {supported
                ? "Tippen Sie auf das Mikrofon und sprechen Sie."
                : "Spracherkennung wird in diesem Browser nicht unterstützt."}
            </p>
          )}
          {state === "listening" && (
            <p className="ai-voice-status-text ai-voice-status-listening">
              Ich höre zu...
            </p>
          )}
          {state === "processing" && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
              <p className="ai-voice-status-text">Verarbeite...</p>
            </div>
          )}
          {state === "speaking" && (
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-blue-400" />
              <p className="ai-voice-status-text">Antwort wird gesprochen...</p>
            </div>
          )}
        </div>

        {/* Transcript display */}
        <AnimatePresence mode="wait">
          {transcript && state === "listening" && (
            <motion.div
              className="ai-voice-transcript"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-sm text-white/60 mb-1">Sie:</p>
              <p className="text-sm text-white/90">{transcript}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Response display */}
        <AnimatePresence mode="wait">
          {response && (state === "speaking" || state === "idle") && (
            <motion.div
              className="ai-voice-response"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-sm text-blue-300/60 mb-1">Tawano:</p>
              <p className="text-sm text-white/90">{response}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error display */}
        {error && (
          <div className="ai-voice-error">
            <p className="text-xs text-red-300">{error}</p>
          </div>
        )}

        {/* Waveform visualization */}
        {renderWaveform()}
      </div>

      {/* Mic button */}
      <div className="ai-voice-panel-footer">
        {state === "speaking" ? (
          <button onClick={stopSpeaking} className="ai-voice-mic-btn ai-voice-mic-stop">
            <Volume2 size={20} />
          </button>
        ) : state === "listening" ? (
          <button onClick={stopListening} className="ai-voice-mic-btn ai-voice-mic-active">
            <div className="ai-voice-mic-pulse" />
            <MicOff size={20} />
          </button>
        ) : (
          <button
            onClick={startListening}
            disabled={state === "processing" || !supported}
            className="ai-voice-mic-btn ai-voice-mic-idle"
          >
            {state === "processing" ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Mic size={20} />
            )}
          </button>
        )}
      </div>

      {/* Full dismiss */}
      <button onClick={onDismiss} className="ai-voice-dismiss-full">
        Assistenten ausblenden
      </button>
    </motion.div>
  );
}
