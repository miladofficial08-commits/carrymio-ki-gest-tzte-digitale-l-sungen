import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatbotSidePanelProps {
  isOpen: boolean;
  title: string;
  embedUrl: string;
  onClose: () => void;
}

export const ChatbotSidePanel = ({
  isOpen,
  title,
  embedUrl,
  onClose,
}: ChatbotSidePanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - Optional dim */}
      <div
        ref={overlayRef}
        onClick={(e) => {
          if (e.target === overlayRef.current) onClose();
        }}
        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300"
      />

      {/* Side Panel */}
      <div
        ref={panelRef}
        className={cn(
          "fixed z-50 flex flex-col",
          "w-[400px] max-w-[92vw] h-[calc(100vh-2rem)] max-h-[95vh]",
          "right-4 bottom-4",
          "sm:right-4 sm:bottom-4",
          "rounded-2xl shadow-2xl border border-white/10",
          "bg-neutral-950/95 backdrop-blur-lg",
          "transition-all duration-300 ease-out",
          isOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white truncate pr-2">
            {title}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-lg hover:bg-white/10 text-white/70 hover:text-white flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Body - iframe Container */}
        <div className="flex-1 overflow-hidden rounded-b-2xl">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              title={title}
              allow="microphone"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white/50">
              <p className="text-sm">Chatbot ist nicht konfiguriert</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
