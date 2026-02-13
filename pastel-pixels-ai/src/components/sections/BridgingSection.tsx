import { useState, useEffect } from "react";
import { WindowCard } from "@/components/ui/window-card";
// @ts-ignore
import Video2Ascii from "video2ascii";
import videoSrc from "@/assets/AI_Startup_Animation_Hands_of_Creation.mp4";

export function BridgingSection() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(150);

  const toRotate = [
    "Pre Sales Agent",
    "Sales Agent",
    "Onboarding Agent",
    "Training Agent",
    "Customer Support Agent",
    "Fashion Designer",
    "Personal Companion"
  ];
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
    <section className="relative py-24 border-t-2 border-foreground overflow-hidden">
      {/* Dark Background with Blur */}
      <div className="absolute inset-0 bg-zinc-900 blur-[2px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
            What if your computer could talk<br />
            to you like a <span className="text-coral">{text}</span>
            <span className="animate-pulse text-white">|</span>?
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <WindowCard title="BRIDGING THE HUMAN-MACHINE DIVIDE" indicator="amber">
            <div className="w-full bg-black overflow-hidden relative aspect-video">
              <Video2Ascii
                src={videoSrc}
                numColumns={120}
                colored={true}
                brightness={1.0}
                audioEffect={0}
                enableMouse={true}
                enableRipple={true}
                charset="detailed"
                isPlaying={true}
                autoPlay={true}
                muted={true}
              />
              <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-10">
                <p className="font-serif italic text-white/90 text-xl md:text-2xl tracking-wide drop-shadow-md">
                  Human Computing Layer
                </p>
              </div>
            </div>
          </WindowCard>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-white/80">
            The hyper-realistic, real-time & emotional AI that can see, hear, understand computer interface, perform workflows and explain autonomously.
          </p>
        </div>
      </div>
    </section>
  );
}
