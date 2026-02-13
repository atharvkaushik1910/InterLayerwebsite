import { TavusButton } from "@/components/ui/tavus-button";
import modelsSeasonal from "@/assets/models-seasonal.jpg";

const models = [
  {
    category: "COMPUTER-USE",
    name: "Autumn [1]",
    description: "Autumn-1, a policy-constrained computer-use agent model developed to execute complex enterprise workflows through visual interface interaction, is designed for high-reliability operation across regulated and high-friction software environments.",
  },
  {
    category: "PERCEPTION & EMOTIONAL UNDERSTANDING",
    name: "Winter [1]",
    description: "Winter-1, a novel multimodal perception and intent to action model designed to unify object recognition, emotion detection, and adaptive attention within a single contextual framework. It is designed to translate natural language goals into adaptive navigation and task completion within live consumer interfaces, unifies real-time perception, reasoning, and execution in D2C systems.",
  },
  {
    category: "MEMORY",
    name: "Summer [1]",
    description: "Summer-1, a transformer-based memory driven proactive dialogue model that captures conversational timing, responsiveness, and humanlike interaction flow using multimodal alignment techniques. It is built to infer user intent across time and context, captures long-horizon behavioral patterns and executes actions autonomously across digital environments using contextual alignment techniques.",
  },
];

export function ModelsSection() {
  return (
    <section className="relative border-t-2 border-foreground overflow-hidden">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
        style={{ backgroundImage: "url('/models-background.jpg')" }}
      />
      {/* Header */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-wider mb-4">RESEARCH</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Models
            </h2>
            <p className="text-lg mb-8 max-w-lg">
              We build models that teach machines perception, empathy, and expression so AI can finally understand the world as we do.
            </p>
            <TavusButton variant="coral" size="default">
              OUR RESEARCH
            </TavusButton>
          </div>
          <div>
            <img
              src={modelsSeasonal}
              alt="Seasonal models - Autumn, Winter, Summer"
              className="w-full aspect-video object-cover border-2 border-foreground"
            />
          </div>
        </div>
      </div>

      {/* Models Grid */}
      <div className="border-t-2 border-foreground relative z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 divide-x-0 md:divide-x-2 divide-y-2 md:divide-y-0 divide-foreground">
            {models.map((model, index) => (
              <div key={index} className="p-8">
                <p className="text-xs uppercase tracking-wider text-foreground/60 mb-4">
                  {model.category}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl mb-4">
                  {model.name}
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
