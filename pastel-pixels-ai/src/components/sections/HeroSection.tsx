import { InterLayerButton } from "@/components/ui/interlayer-button";

import seamlessClouds from "@/assets/seamless_clouds.png";

import { Users } from "lucide-react";

import { useState, useEffect } from "react";

export function HeroSection() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(150);

  const toRotate = ["InterLayer", "The Human Computing Company"];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text, delta]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(150);
    } else {
      // Reset delta when typing
      if (!isDeleting && delta > 150) {
        setDelta(150);
      }
    }
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div
          className="flex w-[200%] h-full"
          style={{ animation: "marquee 150s linear infinite" }}
        >
          <div className="w-1/2 h-full">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${seamlessClouds})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
          <div className="w-1/2 h-full scale-x-[-1]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${seamlessClouds})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left Content */}
          <div className="max-w-xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 min-h-[160px]">
              {text}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-md">
              AI now has the human touch. Interlayer builds emotional & proactive AI agents that can see, hear, understand human intent and interfaces, and act, run workflows, and operate software end-to-end.
            </p>
            <InterLayerButton variant="coral" size="lg" onClick={() => window.open('https://calendly.com/atharvkaushik1910/new-meeting', '_blank')}>
              JOIN THE QUEUE
            </InterLayerButton>
          </div>

          {/* Right Content - Video Cards */}
          <div className="relative h-[500px] md:h-[600px]">
            {/* Main Video Card */}


            {/* Media Card */}

          </div>
        </div>
      </div>

      {/* Scrolling Marquee */}
      <div className="absolute bottom-0 left-0 right-0 bg-cream border-t-2 border-foreground py-3 overflow-hidden">
        <div className="flex marquee-scroll">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4 whitespace-nowrap">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users size={16} /> Pre Sales
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users size={16} /> Sales
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users size={16} /> Onboarding
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users size={16} /> Training
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users size={16} /> Customer Support
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users size={16} /> Customer Experience
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
