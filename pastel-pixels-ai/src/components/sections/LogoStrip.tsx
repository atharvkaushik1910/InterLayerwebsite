export function LogoStrip() {
  return (
    <section className="py-12 bg-cream border-b-2 border-foreground">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Backed by the best in AI
        </p>
        <div className="flex items-center justify-center gap-6 md:gap-8">
          <img
            src="/ef-logo.png"
            alt="Entrepreneur First Logo"
            className="h-20 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
}
