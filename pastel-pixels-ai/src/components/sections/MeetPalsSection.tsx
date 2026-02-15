import { useState } from "react";
import { WindowCard } from "@/components/ui/window-card";
import { InterLayerButton } from "@/components/ui/interlayer-button";
import { MessageSquare, Video, Phone, Volume2 } from "lucide-react";
import palAshley from "@/assets/pal-ashley.png";

export function MeetPalsSection() {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Pink gradient overlay on right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-96 bg-gradient-to-l from-coral/30 to-transparent blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Chat bubbles */}
          <div className="space-y-4">
            {/* Faded chat bubble top */}
            <WindowCard title="CHAT" indicator="green" className="opacity-40 max-w-sm">
              <div className="p-4">
                <p className="text-sm">
                  <strong>PAL:</strong> Maybe let's jump on a call and you can screenshare?
                </p>
                <button className="mt-2 px-3 py-1 border border-foreground text-xs uppercase">
                  Talk to Chloe
                </button>
              </div>
            </WindowCard>

            {/* Main chat window */}
            <WindowCard title="CHAT" indicator="green" className="max-w-md">
              <div className="p-4 space-y-4">
                <p className="text-sm text-right bg-muted p-3">
                  I'm thinking of going on a bike trip in patagonia, could you price it out?
                </p>
                <p className="text-sm">
                  <strong>PAL:</strong> No prob. I did a bunch of research and priced out everything out in <a href="#" className="text-coral underline">this sheet</a>.
                </p>
                <div className="border-t border-muted pt-3">
                  <input
                    type="text"
                    placeholder="WRITE A RESPONSE..."
                    className="w-full bg-transparent text-sm placeholder:text-muted-foreground outline-none uppercase"
                  />
                </div>
              </div>
            </WindowCard>
          </div>

          {/* Right - Video + Voice */}
          <div className="relative">
            <WindowCard title="FACE-TO-FACE VIDEO" indicator="coral" className="max-w-lg">
              <div className="relative">
                <img
                  src={palAshley}
                  alt="Ashley - AI Assistant"
                  className="w-full aspect-[4/3] object-cover"
                />
                {/* Control buttons */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card border-2 border-foreground p-2">
                  <button className="w-10 h-10 flex items-center justify-center border border-foreground hover:bg-muted transition-colors">
                    <MessageSquare size={18} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center border border-foreground hover:bg-muted transition-colors">
                    <Video size={18} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center border border-foreground hover:bg-muted transition-colors">
                    <Phone size={18} />
                  </button>
                </div>
              </div>
            </WindowCard>

            {/* Voice card */}
            <WindowCard
              title="VOICE"
              indicator="amber"
              className="absolute -bottom-8 -right-4 w-56"
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Volume2 size={18} />
                  <div className="flex-1 h-1 bg-foreground" />
                  <InterLayerButton variant="green" size="sm">
                    <Phone size={14} />
                    LISTEN
                  </InterLayerButton>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-card/50 to-transparent" />
                  </div>
                </div>
                {/* Audio wave visualization */}
                <div className="flex items-center justify-center gap-0.5 mt-4 h-8">
                  {[...Array(40)].map((_, i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-muted-foreground"
                      style={{
                        height: `${Math.random() * 100}%`,
                        opacity: 0.5 + Math.random() * 0.5
                      }}
                    />
                  ))}
                </div>
              </div>
            </WindowCard>
          </div>
        </div>
      </div>
    </section>
  );
}
