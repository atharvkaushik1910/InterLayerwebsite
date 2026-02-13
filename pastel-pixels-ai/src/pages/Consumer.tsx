import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Gamepad2 } from "lucide-react";

const Consumer = () => {
    return (
        <>
            <Helmet>
                <title>Consumer | InterLayer</title>
                <meta
                    name="description"
                    content="InterLayer Consumer Product - Launching Soon. Play our open-world game to explore our journey."
                />
            </Helmet>

            <div className="min-h-screen bg-background flex flex-col">
                <Navigation />

                <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-32">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                        <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-[100px]" />
                        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full blur-[100px]" />
                    </div>

                    <div className="container mx-auto px-4 z-10 relative">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <div className="inline-block border-2 border-foreground bg-card px-4 py-1 font-bold text-sm tracking-widest uppercase mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                Coming Soon
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold italic leading-tight">
                                Consumer Product <br />
                                <span className="text-primary not-italic">Launching Soon</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed text-balance">
                                We are crafting something extraordinary. Play the open world InterLayer game till then to enjoy and know more about our journey.
                            </p>

                            <div className="pt-8">
                                <a
                                    href="http://localhost:5173"
                                    className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-lg font-bold hover:bg-foreground/90 transition-all hover:-translate-y-1 hover:shadow-lg border-2 border-transparent group"
                                >
                                    <Gamepad2 className="w-6 h-6" />
                                    PLAY THE GAME
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Consumer;
