import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { AIAssistantAvatar } from "./AIAssistantAvatar";
import { AIAssistantVoicePanel } from "./AIAssistantVoicePanel";

export function AIAssistant() {
  const [visible, setVisible] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    return sessionStorage.getItem("tawano-ai-dismissed") === "1";
  });

  // Show after 3.5s delay (gives page time to load)
  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleAvatarClick = useCallback(() => {
    setVoiceOpen(true);
  }, []);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    setVisible(false);
    setVoiceOpen(false);
    sessionStorage.setItem("tawano-ai-dismissed", "1");
  }, []);

  const handleVoiceClose = useCallback(() => {
    setVoiceOpen(false);
  }, []);

  if (dismissed) return null;

  return (
    <>
      <AnimatePresence>
        {visible && !voiceOpen && (
          <AIAssistantAvatar
            onClick={handleAvatarClick}
            onDismiss={handleDismiss}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {voiceOpen && (
          <AIAssistantVoicePanel
            onClose={handleVoiceClose}
            onDismiss={handleDismiss}
          />
        )}
      </AnimatePresence>
    </>
  );
}
