import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Check, ArrowRight } from "lucide-react";

export default function ProductPage() {
    return (
        <div className="min-h-screen bg-[#FDF8F0] text-[#1A1A1A] font-sans selection:bg-[#FF8FAB] selection:text-white">
            <Navigation />

            <main className="pt-32 pb-16 px-4 container mx-auto max-w-[1400px]">
                {/* Hero Section */}
                <div className="text-center mb-24 max-w-4xl mx-auto pt-16">
                    <p className="uppercasetracking-wider text-sm md:text-base mb-6 font-medium text-[#1A1A1A]/80">
                        FOR DEVELOPERS & ENTERPRISES
                    </p>
                    <h1 className="font-serif text-6xl md:text-8xl mb-8 leading-[1.05] tracking-tight">
                        Power AI for your<br />business with InterLayer
                    </h1>
                    <p className="text-2xl md:text-3xl text-[#1A1A1A] font-serif leading-relaxed max-w-3xl mx-auto">
                        Build, scale, and customize lifelike AI Video agents for your products and workflows.
                    </p>
                </div>

                {/* Hero Split Section: Text + Form */}
                <div className="grid lg:grid-cols-2 gap-16 md:gap-24 mb-32">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <p className="text-lg leading-relaxed text-[#1A1A1A]/90">
                            Our enterprise team helps you build, integrate, and deploy human-like AI Video agents into products, services, and workflows. Whether you choose to build and embed with our APIs, partner with us for a full deployment, or find the balance in between, InterLayer offers flexible, scalable solutions designed to fit your workflow with managed, embedded, and white-labeled options built for scale.
                        </p>

                        <div className="pt-8">
                            <h3 className="text-2xl font-bold mb-6">See how leading companies build emotionally Intelligent AI agents</h3>
                            <ul className="space-y-3">
                                {[
                                    "White labeled APIs",
                                    "Lowest latency on market",
                                    "State of the art conversational and facial realism",
                                    "Perception that unlocks a new visual data layer",
                                    "AI humans that have agentic capabilities",
                                    "1000s of lifelike conversations, deployed at once",
                                    "Volume discounts"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-lg">
                                        <Check className="text-[#00C665] mt-1 shrink-0" size={20} strokeWidth={3} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="border-2 border-[#1A1A1A] p-8 md:p-12 bg-[#FDF8F0] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="block font-mono text-sm font-bold uppercase">Work Email</label>
                                <input type="email" placeholder="john.doe@interlayer.ai" className="w-full bg-[#F2EDE6] border border-[#1A1A1A]/20 rounded p-3 focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="block font-mono text-sm font-bold uppercase">First Name</label>
                                <input type="text" className="w-full bg-[#F2EDE6] border border-[#1A1A1A]/20 rounded p-3 focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="block font-mono text-sm font-bold uppercase">Last Name</label>
                                <input type="text" className="w-full bg-[#F2EDE6] border border-[#1A1A1A]/20 rounded p-3 focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="block font-mono text-sm font-bold uppercase">Company Name</label>
                                <input type="text" className="w-full bg-[#F2EDE6] border border-[#1A1A1A]/20 rounded p-3 focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                            </div>
                            <div className="pt-4">
                                <button type="button" className="bg-[#FF9EB5] px-8 py-3 font-bold text-sm uppercase tracking-wide flex items-center gap-2 hover:translate-y-[-2px] hover:shadow-lg transition-all border border-transparent">
                                    Submit <span className="text-[10px]">↵</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Offerings Section */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-5xl md:text-6xl mb-4">Full-stack offerings</h2>
                        <p className="text-xl text-[#1A1A1A]/70">Build it, embed it, or let us handle the whole thing.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Solution 1: Orange */}
                        <div className="border-2 border-[#1A1A1A] flex flex-col h-full bg-[#FFBC58]">
                            <div className="border-b-2 border-[#1A1A1A] p-4 text-xs font-mono">SOLUTION #1</div>
                            <div className="p-6 md:p-8 flex-1">
                                <h3 className="font-serif text-4xl mb-6">White-labeled APIs</h3>
                                <p className="text-sm leading-relaxed mb-8 font-medium">
                                    Use InterLayer technology under your own brand. Our APIs power enterprise-grade video agents with seamless conversation, voice, and video features behind the scenes.
                                </p>
                                {/* Mock Code Window */}
                                <div className="bg-[#FDF8F0] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 font-mono text-[10px] overflow-hidden relative">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-[#E5E5E5]"></div>
                                    <pre className="text-[#1A1A1A] overflow-x-hidden">
                                        <span className="text-red-500">curl</span> --request POST \<br />
                                        &nbsp;&nbsp;--url https://api.interlayer.ai/v2/conversations \<br />
                                        &nbsp;&nbsp;--header <span className="text-green-600">'Content-Type: application/json'</span> \<br />
                                        &nbsp;&nbsp;--header <span className="text-green-600">'x-api-key: &lt;api-key&gt;'</span> \<br />
                                        &nbsp;&nbsp;--data <span className="text-blue-600">'{"{"}</span><br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-600">"replica_id"</span>: <span className="text-green-600">"rfe42d8b9597"</span>,<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-600">"persona_id"</span>: <span className="text-green-600">"pdced22244b"</span><br />
                                        &nbsp;&nbsp;<span className="text-blue-600">{"}"}'</span>
                                    </pre>
                                </div>
                            </div>
                        </div>

                        {/* Solution 2: Purple */}
                        <div className="border-2 border-[#1A1A1A] flex flex-col h-full bg-[#E6D9FA]">
                            <div className="border-b-2 border-[#1A1A1A] p-4 text-xs font-mono">SOLUTION #2</div>
                            <div className="p-6 md:p-8 flex-1">
                                {/* Mock Embedded UI */}
                                <div className="bg-white border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] aspect-video mb-8 flex items-center justify-center p-2">
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                        <img src="/src/assets/ai_avatar_professional.png" className="absolute inset-0 w-full h-full object-cover opacity-90" alt="video preview" />
                                        <div className="bg-white p-2 rounded-full z-10 shadow-lg">
                                            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-black border-b-[8px] border-b-transparent ml-1"></div>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="font-serif text-4xl mb-6">Embedded solutions</h3>
                                <p className="text-sm leading-relaxed font-medium">
                                    Integrate InterLayer directly into your product. Add a human-like presence to your app or platform with a seamless, native experience.
                                </p>
                            </div>
                        </div>

                        {/* Solution 3: Green */}
                        <div className="border-2 border-[#1A1A1A] flex flex-col h-full bg-[#8EFFA0]">
                            <div className="border-b-2 border-[#1A1A1A] p-4 text-xs font-mono">SOLUTION #3</div>
                            <div className="p-6 md:p-8 flex-1">
                                <h3 className="font-serif text-4xl mb-6">Managed integrations</h3>
                                <p className="text-sm leading-relaxed mb-8 font-medium">
                                    We handle setup and optimization so your team can focus on results. Connect InterLayer to your existing tools and workflows with minimal effort and reliable performance.
                                </p>
                                {/* Mock Workflow UI */}
                                <div className="relative h-40 flex items-center justify-center">
                                    <div className="absolute bg-white border-2 border-black p-4 w-48 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-10 transform -translate-x-4 -translate-y-2">
                                        <div className="w-3 h-3 rounded-full bg-[#E5E5E5] mb-3"></div>
                                        <div className="space-y-2">
                                            <div className="h-2 w-full bg-[#E5E5E5]/40"></div>
                                            <div className="h-2 w-3/4 bg-[#E5E5E5]/40"></div>
                                        </div>
                                    </div>
                                    <div className="absolute bg-white border-2 border-black p-4 w-48 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-20 transform translate-x-4 translate-y-2">
                                        <div className="w-3 h-3 rounded-full bg-[#E5E5E5] mb-3"></div>
                                        <div className="space-y-2">
                                            <div className="h-2 w-full bg-[#E5E5E5]/40"></div>
                                            <div className="h-2 w-2/3 bg-[#E5E5E5]/40"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video Agent Section */}
                <div className="grid lg:grid-cols-2 gap-16 md:gap-32 mb-32 items-center">
                    <div>
                        <h2 className="font-serif text-6xl mb-8">What is a video agent?</h2>
                        <p className="text-xl mb-8">InterLayer video agents see, listen, and respond with real understanding. They can:</p>
                        <ul className="space-y-2 mb-10 text-lg">
                            <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0" /> Handle thousands of conversations simultaneously with consistent EQ</li>
                            <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0" /> Automate coaching, onboarding, and customer service with a human touch</li>
                            <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0" /> Operate 24/7 across time zones and languages with sub ~500ms latency</li>
                            <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0" /> Read visual cues and emotional tone to personalize responses in real-time</li>
                            <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0" /> Build trust and rapport, not just efficiency</li>
                        </ul>
                        <div className="flex gap-4">
                            <button className="bg-[#FF6B8B] px-6 py-3 border-2 border-black font-bold text-xs uppercase tracking-wider hover:bg-[#FF6B8B]/90 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onClick={() => window.open('https://calendly.com/atharvkaushik1910/new-meeting', '_blank')}>
                                LEARN MORE
                            </button>
                            <button className="bg-[#F2EDE6] px-6 py-3 border-2 border-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onClick={() => window.open('https://drive.google.com/file/d/1t-ggNKYqC1FZau8Yo8WntLAqMuUL04oH/view?usp=sharing', '_blank')}>
                                SEE DOCS
                            </button>
                        </div>
                    </div>

                    {/* Visuals - Layered Windows */}
                    <div className="relative h-[500px] w-full hidden md:block">
                        {/* Background Code Window */}
                        <div className="absolute top-0 right-0 w-3/4 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10">
                            <div className="border-b-2 border-black p-2 bg-[#F2EDE6] flex gap-2">
                                <div className="w-3 h-3 rounded-full border border-black bg-white"></div>
                                <div className="w-3 h-3 rounded-full border border-black bg-white"></div>
                            </div>
                            <div className="p-4 font-mono text-xs">
                                <span className="text-blue-600">curl</span> --request POST \<br />
                                <span className="text-gray-500">...</span>
                            </div>
                        </div>

                        {/* Middle Video Window */}
                        <div className="absolute top-20 right-12 w-3/4 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-20 aspect-video">
                            <div className="border-b-2 border-black p-2 bg-[#F2EDE6] flex gap-2">
                                <div className="w-3 h-3 rounded-full border border-black bg-white"></div>
                                <div className="w-3 h-3 rounded-full border border-black bg-white"></div>
                            </div>
                            <div className="w-full h-full bg-gray-800 relative">
                                <img src="/src/assets/ai_avatar_professional.png" className="w-full h-full object-cover opacity-90" alt="Avatar User" />
                            </div>
                        </div>

                        {/* Foreground Feature Window */}
                        <div className="absolute bottom-0 right-32 w-2/3 bg-[#545263] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-30 text-[#8EFFA0] font-mono text-xs p-1">
                            <div className="bg-white text-black text-[10px] inline-block px-1 mb-2 border border-black">FEATURE</div>
                            <div className="p-4 pt-2">
                                interLayer_Features {"{"}<br />
                                &nbsp;&nbsp;Langues: 30+<br />
                                &nbsp;&nbsp;RAG: On,<br />
                                &nbsp;&nbsp;Memory: On,<br />
                                &nbsp;&nbsp;Guardrails: On,<br />
                                &nbsp;&nbsp;Perception: On,<br />
                                &nbsp;&nbsp;Tool_Calling: On,<br />
                                &nbsp;&nbsp;Multimodal: On,<br />
                                &nbsp;&nbsp;Response_Time: 200ms,<br />
                                &nbsp;&nbsp;Turn_Taking: Adaptive<br />
                                &nbsp;&nbsp;Emotions: Detected<br />
                                {"}"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Section */}
                <div className="grid lg:grid-cols-2 gap-16 md:gap-32 mb-32 items-center">
                    <div className="order-2 lg:order-1 relative h-[400px] hidden md:block">
                        {/* Stacked Windows */}
                        {["PERCEPTION", "SPEECH RECOGNITION", "LLM", "TTS", "REAL-TIME AVATAR"].map((label, i) => (
                            <div
                                key={label}
                                className={`absolute left-0 right-0 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col`}
                                style={{
                                    top: `${i * 60}px`,
                                    width: '70%',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    zIndex: i,
                                    backgroundColor: ['#D4FFD6', '#FFE5D4', '#FFF4C4', '#F4E4FF', '#FFB7C5'][i]
                                }}
                            >
                                <div className="border-b-2 border-black h-4 bg-white"></div>
                                <div className="p-3 text-center font-mono font-bold text-sm tracking-widest">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="order-1 lg:order-2">
                        <h2 className="font-serif text-6xl mb-8 leading-tight">Performance and reliability</h2>
                        <p className="text-xl mb-8 leading-relaxed">
                            Best-in-class enterprise performance and reliability define every InterLayer video agent. Built for real-time video, voice, and perception, they deliver human-level intelligence with sub-second latency and enterprise uptime guarantees. Fully out of the box, yet customizable with your existing stack, each system includes built-in LLMs, speech, and vision capabilities. They're ready to scale on day one.
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-[#F2EDE6] px-6 py-3 border-2 border-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onClick={() => window.open('https://drive.google.com/file/d/1t-ggNKYqC1FZau8Yo8WntLAqMuUL04oH/view?usp=sharing', '_blank')}>
                                SEE DOCS
                            </button>
                            <button className="bg-[#FF6B8B] px-6 py-3 border-2 border-black font-bold text-xs uppercase tracking-wider hover:bg-[#FF6B8B]/90 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onClick={() => window.open('https://calendly.com/atharvkaushik1910/new-meeting', '_blank')}>
                                GET STARTED FOR FREE
                            </button>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
