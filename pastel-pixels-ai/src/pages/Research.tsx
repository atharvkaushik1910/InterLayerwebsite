
import { Navigation } from "@/components/layout/Navigation";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { Helmet } from "react-helmet-async";
import { Separator } from "@/components/ui/separator";

export default function Research() {
    return (
        <div className="min-h-screen bg-cream font-sans text-foreground selection:bg-coral/30">
            <Helmet>
                <title>Manifesto & Research Overview - InterLayer</title>
                <meta name="description" content="Human computing is the next paradigm in our relationship with technology—one where machines don’t just process commands, but perceive, converse, and act with emotional intelligence." />
                <link rel="canonical" href="https://interlayer.ai/research" />
            </Helmet>

            <Navigation />

            <main className="pt-32 pb-16">
                {/* Header */}
                <div className="container mx-auto px-4 mb-16 text-center">
                    <p className="text-sm font-bold tracking-widest text-coral mb-4 uppercase">Manifesto & Research Overview</p>
                    <h1 className="font-serif text-5xl md:text-7xl mb-8 max-w-4xl mx-auto leading-tight">
                        From HCI to <br className="hidden md:block" /> Human Computing
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Machines don’t just process commands, but perceive, converse, and act with emotional intelligence.
                    </p>
                </div>

                <div className="container mx-auto px-4 max-w-4xl">

                    {/* Introduction */}
                    <div className="prose prose-lg prose-stone mx-auto mb-20 text-foreground/80 leading-relaxed">
                        <p className="font-serif text-2xl text-foreground mb-8 text-center italic">
                            "Instead of people adapting to rigid interfaces, technology now adapts to us."
                        </p>
                        <p>
                            This shift is rooted in decades of progress in human–computer interaction (HCI), which gave us usable interfaces and intuitive workflows. But where HCI focused on usability, human computing extends the vision to presence, empathy, and agency—making digital experiences feel unmistakably human.
                        </p>
                        <p>
                            For years, we optimized computing for efficiency and scale, but lost the presence and empathy that define real connection. The result was a “mechanical” era: fast, scalable, but cold and transactional. Human computing restores what was lost—emotional intelligence, perception, and trust—without sacrificing reach.
                        </p>
                        <p>
                            It’s about teaching machines to see, hear, understand us and act upon it as naturally as another person would. As outlined in recent research on human–computer collaboration trends, the field is rapidly evolving to prioritize collaboration, context, and emotional nuance.
                        </p>

                        <div className="bg-card border-l-4 border-coral p-6 my-8 not-prose">
                            <h3 className="font-bold text-lg mb-2">Key shifts include:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Human computing redefines interaction</strong> by removing the “translation layer”—no more learning machine syntax or adapting to rigid workflows.</li>
                                <li><strong>Technology now adapts to people</strong>, interpreting natural communication (voice, gesture, emotion) and acting with initiative and memory.</li>
                                <li><strong>This paradigm shift is not about avatars</strong> or chatbots with faces; it’s a full-stack approach to authentic, face-to-face digital presence.</li>
                            </ul>
                        </div>
                    </div>


                    <Separator className="my-16 bg-foreground/10" />

                    {/* What you'll learn */}
                    <section className="mb-20">
                        <h2 className="font-serif text-4xl mb-6">What you’ll learn in this guide</h2>
                        <p className="text-lg text-muted-foreground mb-6">
                            This guide is designed for product and engineering leaders, L&D and operations teams, and developers who want to pilot face-to-face AI experiences in days, not months. Whether you’re building customer-facing solutions or internal enablement tools, you’ll discover how human computing can transform engagement, trust, and retention.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 my-8">
                            <div className="bg-white p-6 border border-foreground/10 rounded-sm">
                                <h4 className="font-bold mb-2 text-coral">Core Principles</h4>
                                <p className="text-sm">Human UI, the InterLayer Turing Test, and how they set a new bar for digital empathy and agency.</p>
                            </div>
                            <div className="bg-white p-6 border border-foreground/10 rounded-sm">
                                <h4 className="font-bold mb-2 text-coral">Capabilities</h4>
                                <p className="text-sm">Perception, understanding, orchestration, and rendering—enabling machines to interact with true presence.</p>
                            </div>
                            <div className="bg-white p-6 border border-foreground/10 rounded-sm">
                                <h4 className="font-bold mb-2 text-coral">Model Stack</h4>
                                <p className="text-sm">Autumn-1 (contextual perception), Winter-1 (natural turn-taking), and Summer-1 (lifelike rendering).</p>
                            </div>
                            <div className="bg-white p-6 border border-foreground/10 rounded-sm">
                                <h4 className="font-bold mb-2 text-coral">Real-world Impact</h4>
                                <p className="text-sm">Use cases and outcomes, from immersive learning to emotionally intelligent customer support.</p>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground italic">
                            For a deeper dive into the evolution of authoritative sources and their impact on digital trust, see Stanford’s AI Index, which highlights the growing importance of emotionally intelligent AI in shaping user experience.
                        </p>
                    </section>

                    <Separator className="my-16 bg-foreground/10" />

                    {/* What human computing is */}
                    <section className="mb-20">
                        <div className="mb-12">
                            <span className="text-xs font-bold tracking-widest text-coral uppercase mb-2 block">Foundations</span>
                            <h2 className="font-serif text-4xl mb-6">What human computing is—and isn’t</h2>
                        </div>

                        <div className="space-y-8 text-lg text-foreground/80">
                            <div>
                                <h3 className="font-bold text-xl text-foreground mb-3">From HCI to Human Computing</h3>
                                <p className="mb-4">
                                    For decades, human–computer interaction (HCI) has focused on designing and evaluating interactive systems—making technology usable, efficient, and accessible. But HCI’s traditional approach relies on users translating their intent through menus, forms, and rigid workflows. The result? Technology that’s logical, but often cold and mechanical.
                                </p>
                                <p>
                                    Human computing marks a fundamental shift. Instead of forcing users to learn a system’s “language,” it gives machines the ability to perceive, remember, and act with agency—mirroring the way humans naturally communicate.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-xl text-foreground mb-3">The Human UI and the InterLayer Turing Test</h3>
                                <p className="mb-4">
                                    It’s important to clarify what human computing isn’t. This isn’t a gimmicky avatar or a chatbot with a friendly face. Human computing is a full-stack approach that enables authentic, lifelike interaction—where AI doesn’t just look human, but feels human in conversation, memory, and initiative.
                                </p>
                                <p className="mb-6">
                                    At the core is the <strong>Human UI</strong>: a universal interface that removes the translation layer and lets people communicate as they do with each other.
                                </p>

                                <div className="bg-amber-50 p-6 border-l-4 border-amber-400">
                                    <h4 className="font-bold mb-3">Core Principles of the Human UI:</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-sm">
                                        <li><strong>Remove the translation layer</strong>—no more menus or commands; just natural conversation.</li>
                                        <li><strong>Communicate using voice, video, and emotion</strong>, not just text.</li>
                                        <li><strong>Remember context across sessions</strong>, enabling continuity and personalization.</li>
                                        <li><strong>Act with initiative toward goals</strong>, not just react to prompts.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-foreground text-card p-8 rounded-sm mt-8">
                                <h3 className="font-serif text-2xl mb-4 text-coral">The InterLayer Turing Test</h3>
                                <p className="text-card-foreground/90">
                                    Unlike the classic Turing Test, which asks if a machine can pass as human, the InterLayer version asks: <strong>does the AI feel human?</strong> Success means building rapport, showing empathy, and taking initiative—progressing from a simple “shell” (face and voice), to a “basic brain” (personality and conversation), and finally to an autonomous entity that remembers, reasons, and acts independently.
                                </p>
                            </div>
                        </div>
                    </section>


                    <Separator className="my-16 bg-foreground/10" />

                    {/* Why it matters */}
                    <section className="mb-20">
                        <h2 className="font-serif text-4xl mb-6">Why it matters for teams and customers</h2>
                        <p className="text-lg mb-8">
                            Human computing isn’t just a technical leap—it’s a business advantage. Emotionally intelligent, face-to-face interactions drive measurable impact. Early adopters of conversational video AI will mark up to <strong>50% higher engagement</strong> and <strong>80% higher retention</strong> in customer and team experiences.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 border-2 border-foreground/5 bg-white">
                                <h4 className="font-bold text-lg mb-2">Accessibility and Scale</h4>
                                <p className="text-muted-foreground">Support for 30+ languages and global WebRTC infrastructure enables 24/7, high-touch experiences—without increasing headcount.</p>
                            </div>
                            <div className="p-6 border-2 border-foreground/5 bg-white">
                                <h4 className="font-bold text-lg mb-2">Competitive Advantage</h4>
                                <p className="text-muted-foreground">Deliver a user experience that goes beyond scripted chatbots and static videos, offering real-time, face-to-face help, education, and sales at scale.</p>
                            </div>
                        </div>
                    </section>

                    <Separator className="my-16 bg-foreground/10" />

                    {/* How it works */}
                    <section className="mb-20">
                        <div className="mb-12 text-center">
                            <span className="text-xs font-bold tracking-widest text-coral uppercase mb-2 block">Technology</span>
                            <h2 className="font-serif text-4xl mb-4">How it works: the InterLayer Stack</h2>
                            <p className="text-muted-foreground">Perception, understanding, orchestration, rendering</p>
                        </div>

                        <div className="space-y-12">
                            <div>
                                <p className="text-lg leading-relaxed mb-8">
                                    Human computing is powered by four core capabilities that together create lifelike, emotionally intelligent AI interactions. <strong>Perception</strong> is foundational: it enables systems to read micro-expressions, tone, and environmental cues. <strong>Understanding</strong> infers intent and context. This enables <strong>Orchestration</strong>, where AI plans and takes meaningful actions. Finally, <strong>Rendering</strong> brings it all to life with real-time voice and full-face expression.
                                </p>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-6">
                                <div className="border border-foreground p-6 bg-card relative overflow-hidden">
                                    <div className="w-12 h-1 bg-coral mb-4"></div>
                                    <h3 className="font-serif text-2xl mb-2">Autumn-1</h3>
                                    <p className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-widest">Contextual Perception</p>
                                    <p className="text-sm text-foreground/80">
                                        Interprets emotion, ambient awareness, key event callouts, and multi-channel inputs. Continuously detects presence and environmental changes.
                                    </p>
                                </div>
                                <div className="border border-foreground p-6 bg-card relative overflow-hidden">
                                    <div className="w-12 h-1 bg-blue-400 mb-4"></div>
                                    <h3 className="font-serif text-2xl mb-2">Winter-1</h3>
                                    <p className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-widest">Conversational Turn-taking</p>
                                    <p className="text-sm text-foreground/80">
                                        Manages dialogue with sub-600 ms response latency and adaptive pacing. Reduces awkward overlaps and pauses for fluid conversation.
                                    </p>
                                </div>
                                <div className="border border-foreground p-6 bg-card relative overflow-hidden">
                                    <div className="w-12 h-1 bg-green-400 mb-4"></div>
                                    <h3 className="font-serif text-2xl mb-2">Summer-1</h3>
                                    <p className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-widest">Lifelike Rendering</p>
                                    <p className="text-sm text-foreground/80">
                                        Renders HD, 1080p full-face micro-expressions with pristine identity preservation and pixel-perfect lip-sync, built on Gaussian diffusion.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-white p-6 border-t border-b border-foreground/10">
                            <h4 className="font-bold mb-4">Supporting Capabilities:</h4>
                            <ul className="grid sm:grid-cols-2 gap-4 text-sm">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-coral rounded-full"></div>Up to 15× faster RAG retrieval (~30 ms responses)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-coral rounded-full"></div>Support for 30+ languages</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-coral rounded-full"></div>Sub-second conversational latency</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-coral rounded-full"></div>HD video fidelity with emotion-driven animation</li>
                            </ul>
                        </div>
                    </section>

                    <Separator className="my-16 bg-foreground/10" />

                    {/* Use Cases */}
                    <section className="mb-20">
                        <h2 className="font-serif text-4xl mb-8">Where to apply it now</h2>

                        <div className="grid gap-12">
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-coral">Customer‐facing, Revenue‐driving</h3>
                                <p className="mb-6 text-foreground/80">
                                    By bringing emotional intelligence and real-time presence to digital interactions, businesses can deliver experiences that feel personal, responsive, and trustworthy—at scale.
                                </p>
                                <ul className="space-y-4">
                                    <li className="bg-white p-4 border-l-2 border-coral">
                                        <strong>Customer Service Agents:</strong> Adapt tone and guidance to user emotion to resolve issues faster.
                                    </li>
                                    <li className="bg-white p-4 border-l-2 border-coral">
                                        <strong>eCommerce Assistants:</strong> Guide shoppers through discovery and inquiries in real time.
                                    </li>
                                    <li className="bg-white p-4 border-l-2 border-coral">
                                        <strong>Onboarding Concierges:</strong> Deliver interactive walkthroughs reducing drop-off.
                                    </li>
                                    <li className="bg-white p-4 border-l-2 border-coral">
                                        <strong>Guided Product Demos:</strong> Adaptive demos that respond to user questions.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-coral">Internal Enablement & Training</h3>
                                <p className="mb-6 text-foreground/80">
                                    Lifelike AI personas enable scalable, consistent coaching and training across teams. Role-play scenarios for sales, support, and compliance become more engaging and effective.
                                </p>
                                <p className="font-medium italic">
                                    Organizations that use these tools will see up to 80% higher retention in conversational training compared to passive e-learning modules.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Conclusion */}
                    <div className="bg-card p-12 text-center border-t-4 border-coral mt-16">
                        <h2 className="font-serif text-3xl mb-4">Ready to build your human layer?</h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Join the shift to human computing with InterLayer.
                        </p>
                        <button className="bg-coral hover:bg-coral/90 text-white font-bold py-3 px-8 rounded-sm transition-colors uppercase tracking-widest text-sm" onClick={() => window.open('https://calendly.com/atharvkaushik1910/new-meeting', '_blank')}>
                            Get Started
                        </button>
                    </div>

                </div>
            </main>

            <FooterCTA />
        </div>
    );
}
