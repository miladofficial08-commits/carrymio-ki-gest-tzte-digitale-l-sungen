import { useEffect, useRef, useState } from "react";
import { CHATBOTS } from "@/config/chatbots";
import { ChatbotDeviceTeaser } from "./ChatbotDeviceTeaser";

export const ChatbotsDock = () => {
  const [faqVisible, setFaqVisible] = useState(false);
  const [aiVisible, setAiVisible] = useState(false);
  const [faqBubble, setFaqBubble] = useState(false);
  const [aiBubble, setAiBubble] = useState(false);

  // Timing constants (in milliseconds)
  const CYCLE_INTERVAL = 10000; // Cycle repeats every 10s
  const ANIMATION_IN_DURATION = 300; // Fade/slide in
  const BUBBLE_DELAY_AFTER_SHOW = 400; // Wait before showing bubble
  const BUBBLE_DISPLAY_DURATION = 2500; // Bubble visible for 2.5s
  const ANIMATION_OUT_DURATION = 300; // Fade/slide out
  const STAGGER_DELAY = 1200; // Right bot starts 1.2s after left

  // FAQ Bot cycle
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const startFaqCycle = () => {
      // Show icon
      setFaqVisible(true);

      // Phase 2: Show bubble after 400ms
      const bubbleTimer = setTimeout(() => {
        setFaqBubble(true);
      }, BUBBLE_DELAY_AFTER_SHOW);

      // Phase 3: Hide bubble after 2.5s
      const hideBubbleTimer = setTimeout(() => {
        setFaqBubble(false);
      }, BUBBLE_DELAY_AFTER_SHOW + BUBBLE_DISPLAY_DURATION);

      // Phase 4: Animate out
      const animateOutTimer = setTimeout(() => {
        setFaqVisible(false);
      }, BUBBLE_DELAY_AFTER_SHOW + BUBBLE_DISPLAY_DURATION + 300);

      // Schedule next cycle
      timeoutId = setTimeout(startFaqCycle, CYCLE_INTERVAL);

      return () => {
        clearTimeout(bubbleTimer);
        clearTimeout(hideBubbleTimer);
        clearTimeout(animateOutTimer);
      };
    };

  startFaqCycle();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // AI Bot cycle (staggered)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let initialTimeoutId: NodeJS.Timeout;

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

  // Delay initial AI cycle by 1.2s (stagger)
  initialTimeoutId = setTimeout(startAiCycle, STAGGER_DELAY);

    return () => {
      clearTimeout(initialTimeoutId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {/* FAQ Bot - Left */}
      <ChatbotDeviceTeaser
        id={CHATBOTS.faq.id}
        title={CHATBOTS.faq.title}
        side={CHATBOTS.faq.side}
        short={CHATBOTS.faq.short}
        badge={CHATBOTS.faq.badge}
        embedUrl={CHATBOTS.faq.embedUrl}
        isVisible={faqVisible}
        showBubble={faqBubble}
        bubbleText={`${CHATBOTS.faq.title} – ${CHATBOTS.faq.short}`}
      />

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
        bubbleText={`${CHATBOTS.ai.title} – ${CHATBOTS.ai.short}`}
      />
    </>
  );
};
