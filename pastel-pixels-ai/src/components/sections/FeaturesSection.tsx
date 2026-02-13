import iconMultimodal from "@/assets/icon-multimodal.png";
import iconProactive from "@/assets/icon-proactive.png";
import iconAdaptive from "@/assets/icon-adaptive.png";
import iconAgentic from "@/assets/icon-agentic.png";
import iconPerceptive from "@/assets/icon-perceptive.png";

const features = [
  {
    image: iconMultimodal,
    title: "Multimodal",
    subtitle: "Everywhere you are. One layer for all enterprise platforms",
    description: "Text, voice, screen, and UI context—one continuous interaction layer across tools, workflows, and platforms.",
  },
  {
    image: iconProactive,
    title: "Proactive",
    subtitle: "Anticipates intent and detects friction before escalation",
    description: "Detects signals before users ask. Steps in when friction appears. Prevents customer service tickets, not just answers them.",
  },
  {
    image: iconAdaptive,
    title: "Adaptive",
    subtitle: "Learns enterprise specific workflows and how you work",
    description: "Observes workflows, preferences, and constraints. Adapts to your company's unique workflows. Learns from every interaction. Evolves with your business.",
  },
  {
    image: iconAgentic,
    title: "Agentic",
    subtitle: "Executes, end-to-end",
    description: "Performs real actions—clicking, typing, navigating—directly within enterprise software. Runs workflows, automates tasks, and manages your tools. Integrates with ERPs, CRMs and every platform used by the user.",
  },
  {
    image: iconPerceptive,
    title: "Perceptive",
    subtitle: "Understands the user and the user interface",
    description: "Sees UI states, errors, and context. Acts on what’s actually on screen—not just what’s described. Reads your tone and body language. Understands what you mean, not just what you say.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-cream py-24 border-t-2 border-foreground">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col gap-6">
              <div className="w-16 h-16 relative">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-contain pixelated"
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-4xl leading-tight">
                  {feature.title}
                </h3>

                <div className="space-y-3">
                  <h4 className="font-bold text-lg md:text-xl">
                    {feature.subtitle}
                  </h4>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
