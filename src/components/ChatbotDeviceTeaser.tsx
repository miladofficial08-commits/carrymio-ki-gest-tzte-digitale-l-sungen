import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatbotModal } from "./ChatbotModal";
import { cn } from "@/lib/utils";

interface ChatbotDeviceTeaserProps {
  id: string;
  title: string;
  side: "left" | "right";
  short: string;
  badge: string;
  embedUrl: string;
  isVisible: boolean;
  showBubble: boolean;
  bubbleText: string;
}

export const ChatbotDeviceTeaser = ({
  id,
  title,
  side,
  short,
  badge,
  embedUrl,
  isVisible,
  showBubble,
  bubbleText,
}: ChatbotDeviceTeaserProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isDisabled = !embedUrl;
  const badgeColor = badge === "FAQ" ? "text-blue-400" : "text-purple-400";
  const badgeBg = badge === "FAQ" ? "bg-blue-500/20" : "bg-purple-500/20";

  return (
    <>
      <ChatbotModal
        isOpen={isModalOpen}
        title={title}
        embedUrl={embedUrl}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Mini Bot Icon with Bubble - Always Minimized */}
      <div
        className={cn(
          "fixed bottom-24 z-40 transition-all duration-500",
          side === "left" ? "left-4" : "right-4",
          isVisible
            ? "opacity-100 translate-y-0"
            : side === "left"
              ? "-translate-x-32 opacity-0"
              : "translate-x-32 opacity-0"
        )}
      >
        <div className="relative">
          {/* Bubble - Above icon */}
          <div
            className={cn(
              "absolute bottom-full mb-2 transition-all duration-300",
              side === "left" ? "left-0" : "right-0",
              showBubble
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            )}
          >
            <div className="bg-white text-neutral-900 text-xs font-semibold px-3 py-2 rounded-xl shadow-lg whitespace-nowrap">
              {bubbleText}
            </div>
            {/* Pointer tail */}
            <div
              className="w-2 h-2 bg-white mx-auto -mt-1 shadow-lg"
              style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}
            />
          </div>

          {/* Mini Bot Face Icon */}
          <button
            onClick={() => !isDisabled && setIsModalOpen(true)}
            disabled={isDisabled}
            className={cn(
              "group relative w-16 h-16 rounded-xl",
              "bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/20",
              "shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
              "flex items-center justify-center",
              "backdrop-blur-sm hover:bg-neutral-800",
              !isDisabled && "cursor-pointer hover:border-white/40",
              isDisabled && "opacity-50 cursor-not-allowed"
            )}
            title={`${title} – ${short}`}
          >
            {/* Bot Face */}
            <div className="flex flex-col items-center gap-1">
              {/* Eyes - glowing LEDs */}
              <div className="flex gap-3 items-center">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]",
                    badgeColor
                  )}
                />
                <div
                  className={cn(
                    "w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]",
                    badgeColor
                  )}
                />
              </div>
              {/* Smile */}
              <div className={cn("text-xs", badgeColor)}>◡</div>
            </div>

            {/* Badge - Top right */}
            <span
              className={cn(
                "absolute -top-2 -right-2 w-5 h-5 rounded-full",
                "text-[10px] font-bold text-white flex items-center justify-center shadow-lg",
                badgeBg,
                "border border-white/30"
              )}
            >
              {badge.charAt(0)}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
