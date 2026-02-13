import { useState } from "react";
import { TavusButton } from "@/components/ui/tavus-button";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "PRODUCT", href: "/product", hasIndicator: true },
  { label: "ENTERPRISE", href: "/enterprise", hasIndicator: true },
  { label: "CONSUMER", href: "/consumer", hasIndicator: true },
  { label: "RESEARCH", href: "/research", hasIndicator: true },
  { label: "PRICING", href: "#pricing", hasIndicator: true },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 pointer-events-none">
      <div className="container mx-auto px-4 flex items-start justify-between pointer-events-none">

        {/* Segment 1 & 2 Combined: Logo + Desktop Navigation */}
        <div className="hidden lg:flex bg-card border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] divide-x-2 divide-foreground h-12 pointer-events-auto">
          {/* Logo Section */}
          <div className="flex items-center px-4 py-2 gap-2 h-full">
            <a href="/" className="flex items-center gap-2">
              <img
                src="/src/assets/interlayer-logo.png"
                alt="InterLayer"
                className="h-6 w-auto object-contain"
              />
              <span className="font-sans font-bold tracking-tight text-lg">InterLayer</span>
            </a>
          </div>

          {/* Nav Links Section */}
          <div className="flex items-center divide-x-2 divide-foreground h-full">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-6 text-sm font-bold hover:bg-muted transition-colors relative group h-full"
              >
                {item.badge && (
                  <span className="absolute top-1 right-1 bg-coral text-[8px] px-1 py-[1px] border border-foreground leading-none">
                    {item.badge}
                  </span>
                )}
                {item.hasIndicator && (
                  <span className="w-1.5 h-1.5 bg-foreground" />
                )}
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Logo separate for Mobile only */}
        <div className="lg:hidden bg-card border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center px-4 py-2 gap-2 h-12 pointer-events-auto">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/src/assets/interlayer-logo.png"
              alt="InterLayer"
              className="h-6 w-auto object-contain"
            />
            <span className="font-sans font-bold tracking-tight text-lg">InterLayer</span>
          </a>
        </div>

        {/* Segment 3: Auth Buttons */}
        <div className="hidden lg:flex bg-card border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] divide-x-2 divide-foreground h-12 pointer-events-auto">
          <button className="flex items-center gap-2 px-6 text-sm font-bold hover:bg-muted transition-colors h-full">
            <span className="w-1.5 h-1.5 bg-foreground" />
            LOGIN
          </button>
          <button className="flex items-center gap-2 px-6 text-sm font-bold bg-coral hover:bg-coral/90 transition-colors h-full text-foreground">
            <span className="w-1.5 h-1.5 bg-foreground" />
            GET STARTED
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden pointer-events-auto">
          <button
            className="bg-card border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-2 h-12 w-12 flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-20 left-4 right-4 bg-card border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col gap-2 lg:hidden">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.target}
              rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 px-4 py-3 text-sm font-bold border-2 border-transparent hover:border-foreground hover:bg-muted transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.hasIndicator && (
                <span className="w-1.5 h-1.5 bg-foreground" />
              )}
              {item.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t-2 border-foreground">
            <button className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold border-2 border-foreground hover:bg-muted transition-colors w-full">
              LOGIN
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold border-2 border-foreground bg-coral hover:bg-coral/90 transition-colors w-full">
              GET STARTED
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
