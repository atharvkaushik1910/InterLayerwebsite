import { WindowCard } from "@/components/ui/window-card";
import { Link } from "react-router-dom";
import { TavusButton } from "@/components/ui/tavus-button";
import retroComputer from "@/assets/retro-mac-sleek.png";

const products = [
  {
    indicator: "coral" as const,
    title: "PALS for you",
    icon: "👤",
    description: "Your new intern. Or friend. Or both. Perceptive and proactive across text, voice, email, and more.",
    cta: "JOIN THE QUEUE",
  },
  {
    indicator: "amber" as const,
    title: "PALS for enterprises",
    icon: "🏢",
    description: "Deploy AI Humans across your organization. Scalable, secure, and available in 30+ languages.",
    cta: "KNOW MORE",
  },
  {
    indicator: "green" as const,
    title: "APIs for developers & businesses",
    icon: "⚡",
    description: "Embed white-labeled, real-time, face-to-face AI into your app with one seamless API.",
    cta: "VIEW DOCS",
  },
];

export function ProductsSection() {
  return (
    <section className="py-24 bg-amber/30 relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground) / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground mb-4">OUR PRODUCTS</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl max-w-4xl mx-auto">
            From PALs to our APIs, we add perception, presence, and emotion
            <br />to how humans interact with AI.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left cards */}
          <div className="space-y-6">
            <WindowCard title={products[0].title} indicator={products[0].indicator}>
              <div className="p-6">
                <div className="w-12 h-12 bg-foreground mb-4 flex items-center justify-center dither-pattern">
                  <span className="text-xl">{products[0].icon}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {products[0].description}
                </p>
                <TavusButton variant="outline" size="sm">
                  {products[0].cta}
                </TavusButton>
              </div>
            </WindowCard>

            {/* Decorative lines */}
            <div className="h-16 flex items-center">
              <div className="w-full h-px bg-foreground" />
            </div>

            <WindowCard title={products[2].title} indicator={products[2].indicator}>
              <div className="p-6">
                <div className="w-12 h-12 bg-foreground mb-4 flex items-center justify-center dither-pattern">
                  <span className="text-xl">{products[2].icon}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {products[2].description}
                </p>
                <TavusButton variant="outline" size="sm">
                  {products[2].cta}
                </TavusButton>
              </div>
            </WindowCard>
          </div>

          {/* Center - Retro Computer */}
          <div className="flex items-center justify-center py-8">
            <img
              src={retroComputer}
              alt="Retro PALs Computer"
              className="w-full max-w-sm float-animation rounded-3xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Right card */}
          <div className="flex flex-col justify-center h-full">
            {/* Decorative lines */}
            <div className="h-24 flex items-center">
              <div className="w-full flex flex-col gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-px bg-foreground/30" />
                ))}
              </div>
            </div>

            <WindowCard title={products[1].title} indicator={products[1].indicator}>
              <div className="p-6">
                <div className="w-12 h-12 bg-foreground mb-4 flex items-center justify-center dither-pattern">
                  <span className="text-xl">{products[1].icon}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {products[1].description}
                </p>
                <Link to="/enterprise">
                  <TavusButton variant="outline" size="sm">
                    {products[1].cta}
                  </TavusButton>
                </Link>
              </div>
            </WindowCard>
          </div>
        </div>
      </div>
    </section>
  );
}
