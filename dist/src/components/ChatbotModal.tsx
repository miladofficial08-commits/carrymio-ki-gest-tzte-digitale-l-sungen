import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface ChatbotModalProps {
  isOpen: boolean;
  title: string;
  embedUrl: string;
  onClose: () => void;
}

export const ChatbotModal = ({
  isOpen,
  title,
  embedUrl,
  onClose,
}: ChatbotModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === modalRef.current) onClose();
      }}
      ref={modalRef}
    >
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-card">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-lg"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Embed */}
        <div className="flex-1 overflow-hidden bg-background">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              title={title}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Chatbot ist nicht konfiguriert</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
