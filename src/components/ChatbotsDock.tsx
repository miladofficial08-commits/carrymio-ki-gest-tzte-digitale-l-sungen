import { useEffect, useState } from "react";
import { CHATBOTS } from "@/config/chatbots";
import { ChatbotDeviceTeaser } from "./ChatbotDeviceTeaser";

export const ChatbotsDock = () => {
  const [aiVisible, setAiVisible] = useState(false);
  const [aiBubble, setAiBubble] = useState(false);

  // Timing constants (in milliseconds)
  const CYCLE_INTERVAL = 10000; // Cycle repeats every 10s
  const BUBBLE_DELAY_AFTER_SHOW = 400; // Wait before showing bubble
  const BUBBLE_DISPLAY_DURATION = 2500; // Bubble visible for 2.5s

  // AI Bot cycle
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const startAiCycle = () => {
      // Show icon
      setAiVisible(true);

      // Phase 2: Show bubble after 400ms
      const bubbleTimer = setTimeout(() => {
        setAiBubble(true);
      }, BUBBLE_DELAY_AFTER_SHOW);

      // Phase 3: Hide bubble after 2.5s
      const hideBubbleTimer = setTimeout(() => {
        setAiBubble(false);
      }, BUBBLE_DELAY_AFTER_SHOW + BUBBLE_DISPLAY_DURATION);

      // Phase 4: Animate out
      const animateOutTimer = setTimeout(() => {
        setAiVisible(false);
      }, BUBBLE_DELAY_AFTER_SHOW + BUBBLE_DISPLAY_DURATION + 300);

      // Schedule next cycle
      timeoutId = setTimeout(startAiCycle, CYCLE_INTERVAL);

      return () => {
        clearTimeout(bubbleTimer);
        clearTimeout(hideBubbleTimer);
        clearTimeout(animateOutTimer);
      };
    };

    startAiCycle();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {/* AI Bot - Right */}
      <ChatbotDeviceTeaser
        id={CHATBOTS.ai.id}
        title={CHATBOTS.ai.title}
        side={CHATBOTS.ai.side}
        short={CHATBOTS.ai.short}
        badge={CHATBOTS.ai.badge}
        embedUrl={CHATBOTS.ai.embedUrl}
        isVisible={aiVisible}
        showBubble={aiBubble}
        bubbleText="Willkommen bei Carrymio – wie können wir Ihnen helfen?"
      />
    </>
  );
};
