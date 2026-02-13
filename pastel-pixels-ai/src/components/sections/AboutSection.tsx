import { TavusButton } from "@/components/ui/tavus-button";
import aboutPerson from "@/assets/about-person-pixel.jpg";

export function AboutSection() {
  return (
    <section className="py-0 bg-cream border-t-2 border-foreground">
      <div className="grid lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square lg:aspect-auto">
          <img
            src={aboutPerson}
            alt="Human computing"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex items-center p-8 md:p-16">
          <div className="max-w-lg">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6">
              The human computing company
            </h2>
            <p className="text-lg leading-relaxed mb-8 text-foreground/80">
              InterLayer is an applied AI research & product lab pioneering human computing, teaching machines the art of being human. We build foundational models that let AI see, hear, respond and work like people do. We believe the day is not far when AI is truly able to replace humans even in the professions that traditionally require human touch. We're turning the promise of science fiction into reality, where computing feels instinctive and truly alive. Because the next intelligence is emotional.
            </p>
            <TavusButton variant="outline" size="default">
              OUR MANIFESTO
            </TavusButton>
          </div>
        </div>
      </div>
    </section>
  );
}
