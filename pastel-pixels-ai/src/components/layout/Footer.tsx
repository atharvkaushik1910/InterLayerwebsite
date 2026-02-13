import { Twitter, Linkedin, Youtube, Instagram } from "lucide-react";

const footerLinks = {
  Product: ["PALs", "Enterprise", "APIs", "Pricing"],
  Research: ["Models", "Publications", "Open Source"],
  Company: ["About", "Careers", "Blog", "Press"],
  Legal: ["Privacy", "Terms", "Security"],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-card border-t-2 border-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img
                src="/src/assets/interlayer-logo.png"
                alt="InterLayer"
                className="h-8 w-auto object-contain invert"
              />
              <span className="font-bold text-lg">InterLayer</span>
            </div>
            <p className="text-sm text-card/60 mb-6">
              The human computing company
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-coral transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-coral transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-coral transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="hover:text-coral transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-card/60 hover:text-card transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-card/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-card/60">
            © 2025 InterLayer, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-card/60 hover:text-card transition-colors">
              Status
            </a>
            <a href="#" className="text-sm text-card/60 hover:text-card transition-colors">
              System
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
