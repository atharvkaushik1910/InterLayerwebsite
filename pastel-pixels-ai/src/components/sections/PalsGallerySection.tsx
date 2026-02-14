import { useState } from "react";
import { WindowCard } from "@/components/ui/window-card";
import { TavusButton } from "@/components/ui/tavus-button";
import { Home } from "lucide-react";
import palNoah from "@/assets/pal-noah.png";
import palDominic from "@/assets/pal-dominic.png";
import palAshley from "@/assets/pal-ashley.png";
import palCharlie from "@/assets/pal-charlie.png";
import palChloe from "@/assets/pal-chloe.png";

const pals = [
  { id: "chloe", name: "Chloe", subtitle: "Agentic Conversational AI", image: palChloe },
];

export function PalsGallerySection() {
  const [activePal, setActivePal] = useState(pals[0]);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center dither-pattern blur-sm scale-110"
        style={{ backgroundImage: "url('/pals-background-blue.jpg')" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            Watch Agents Replace Humans
          </h2>
          <p className="text-lg text-muted-foreground">
            Pick one. Get to know them. They'll get to know you too.
          </p>
        </div>

        <WindowCard title="SAY HI" indicator="coral" className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 border-b-2 md:border-b-0 md:border-r-2 border-foreground p-4">
              {/* Logo */}
              <div className="flex items-center gap-2 mb-6">
                <img
                  src="/src/assets/interlayer-logo.png"
                  alt="InterLayer"
                  className="h-6 w-auto object-contain"
                />
                <span className="font-bold text-sm">InterLayer</span>
              </div>

              {/* Home button */}
              <button className="w-full flex items-center justify-center py-2 border border-foreground mb-6 hover:bg-muted transition-colors">
                <Home size={18} />
              </button>

              {/* PAL list */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                  AI AGENTS
                </p>
                {pals.map((pal) => (
                  <button
                    key={pal.id}
                    onClick={() => setActivePal(pal)}
                    className={`w-full flex items-center gap-3 p-2 text-left transition-colors ${activePal.id === pal.id
                      ? "bg-muted border border-foreground"
                      : "hover:bg-muted/50"
                      }`}
                  >
                    <img
                      src={pal.image}
                      alt={pal.name}
                      className="w-10 h-10 object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{pal.name}</p>
                      <p className="text-xs text-coral">{pal.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 relative">
              <img
                src={activePal.image}
                alt={activePal.name}
                className="w-full aspect-video md:aspect-[16/10] object-cover"
              />
              <div className="absolute top-4 left-4">
                <h3 className="font-serif text-3xl md:text-4xl text-card drop-shadow-lg">
                  Meet {activePal.name}
                </h3>
              </div>
              <div className="absolute bottom-4 right-4">
                <a href={import.meta.env.VITE_SERVER_URL || "http://localhost:8000"} target="_blank" rel="noopener noreferrer">
                  <TavusButton variant="coral" size="default">
                    TRY INTERLAYER AGENT
                  </TavusButton>
                </a>
              </div>
            </div>
          </div>
        </WindowCard>
      </div>
    </section>
  );
}
