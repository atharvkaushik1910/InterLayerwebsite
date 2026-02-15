import { InterLayerButton } from "@/components/ui/interlayer-button";

export function FooterCTA() {
  return (
    <section className="py-24 bg-background dither-pattern border-t-2 border-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
          Think Different. Customer Experiences, Reimagined.
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Transform your enterprise with AI that can truly replace humans.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <InterLayerButton variant="coral" size="lg" onClick={() => window.open('https://calendly.com/atharvkaushik1910/new-meeting', '_blank')}>
            JOIN THE QUEUE
          </InterLayerButton>
          <InterLayerButton variant="outline" size="lg" onClick={() => window.open('https://calendly.com/atharvkaushik1910/new-meeting', '_blank')}>
            CONTACT SALES
          </InterLayerButton>
        </div>
      </div>
    </section>
  );
}
