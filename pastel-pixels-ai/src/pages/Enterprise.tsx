import React from 'react';
import { Navigation } from "@/components/layout/Navigation";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { WindowCard } from "@/components/ui/window-card";
import { InterLayerButton } from "@/components/ui/interlayer-button";
import { Helmet } from "react-helmet-async";
import { Check, ArrowRight, Play, Users, BarChart3, Shield, Monitor, MessageSquare, Zap } from "lucide-react";

export default function Enterprise() {
    return (
        <div className="min-h-screen bg-cream font-sans text-foreground selection:bg-coral/30">
            <Helmet>
                <title>InterLayer Enterprise | Autonomous Agents for Revenue & Ops</title>
                <meta name="description" content="Deploy autonomous AI agents across your entire enterprise stack. InterLayer scales sales, onboaring, support, and execution." />
                <link rel="canonical" href="https://interlayer.ai/enterprise" />
            </Helmet>

            <Navigation />

            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <div className="container mx-auto px-4 mb-20 text-center">
                    <p className="text-sm font-bold tracking-widest text-coral mb-4">ENTERPRISE — INTERLAYER</p>
                    <h1 className="font-serif text-5xl md:text-7xl mb-6 max-w-5xl mx-auto leading-tight">
                        Autonomous agents across the<br />entire enterprise stack
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        From first intent to execution — across sales, onboarding,support, and operations. InterLayer is deployed wherever enterprise workflows are complex, repetitive, and expensive to scale with humans.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <InterLayerButton size="lg" variant="coral" onClick={() => window.open('https://calendly.com/atharvkaushik1910/new-meeting', '_blank')}>
                            REQUEST ENTERPRISE DEMO
                        </InterLayerButton>
                        <InterLayerButton size="lg" variant="outline" onClick={() => window.open('https://calendly.com/atharvkaushik1910/new-meeting', '_blank')}>
                            TALK TO SALES
                        </InterLayerButton>
                    </div>
                </div>

                {/* 4. Use Cases Grid */}
                <div className="container mx-auto px-4 mb-24">
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-3xl md:text-4xl">Enterprise Use Cases</h2>
                        <p className="text-muted-foreground mt-2">Where InterLayer drives value</p>
                    </div>

                    <div className="grid gap-12">
                        {/* 4.1 Pre-Sales */}
                        <UseCaseSection
                            title="Pre-Sales: Adaptive Enterprise Demos"
                            category="REVENUE"
                            icon={<Play className="w-6 h-6" />}
                            problemPoints={[
                                "Prospects don’t want generic demos",
                                "Sales engineers become a bottleneck",
                                "Complex and technical workflows are hard to explain verbally",
                                "Early-stage confusion kills deals before human contact"
                            ]}
                            solutionPoints={[
                                "Greets prospects as soon as they land on the site",
                                "Asks why they are here and what problem they’re evaluating",
                                "Runs live, adaptive demos inside a real product environment",
                                "Answers objections by executing workflows visually, not slides",
                                "Adjusts demo paths based on industry, role, and questions"
                            ]}
                            outcomePoints={[
                                "Shorter sales cycles",
                                "Higher demo-to-close conversion",
                                "Reduced dependency on sales engineers",
                                "24/7 pre-sales coverage without headcount"
                            ]}
                        />

                        {/* 4.2 Sales Enablement */}
                        <UseCaseSection
                            title="Sales Enablement: Assisting Live Deals"
                            category="SALES"
                            icon={<Users className="w-6 h-6" />}
                            problemPoints={[
                                "Sales calls stall on technical details",
                                "Demos don’t adapt mid-conversation",
                                "Post-demo follow-ups are manual and slow"
                            ]}
                            solutionPoints={[
                                "Joins live sales calls as a visual agent",
                                "Executes workflows in real time based on prospect questions",
                                "Handles technical walkthroughs while sales focuses on the relationship",
                                "Generates follow-up demo flows and enablement assets automatically"
                            ]}
                            outcomePoints={[
                                "Sales reps close more complex deals",
                                "Consistent technical accuracy",
                                "Faster enterprise approvals"
                            ]}
                        />

                        {/* 4.3 Customer Support */}
                        <UseCaseSection
                            title="Customer Support Automation"
                            category="POST-SALES"
                            icon={<MessageSquare className="w-6 h-6" />}
                            problemPoints={[
                                "High ticket volume from UI confusion",
                                "Support agents repeat the same steps daily",
                                "Chatbots fail on real workflows"
                            ]}
                            solutionPoints={[
                                "Guides users visually inside the product and clicks buttons, navigates the platform autonomously upon request",
                                "Executes fixes autonomously when permitted",
                                "Escalates with full context when human help is needed"
                            ]}
                            outcomePoints={[
                                "Ticket deflection",
                                "Lower support cost",
                                "Faster resolution times"
                            ]}
                        />

                        {/* 4.4 Onboarding */}
                        <UseCaseSection
                            title="Onboarding & Training"
                            category="ADOPTION"
                            icon={<Shield className="w-6 h-6" />}
                            problemPoints={[
                                "Enterprise software is hard to learn",
                                "Documentation is ignored",
                                "Training is expensive and slow"
                            ]}
                            solutionPoints={[
                                "Walks users through live systems step-by-step",
                                "Explains actions in context",
                                "Learns company-specific workflows",
                                "Reduces dependency on senior staff"
                            ]}
                            outcomePoints={[
                                "Faster ramp-up",
                                "Higher adoption",
                                "Lower training cost"
                            ]}
                        />

                        {/* 4.5 Internal Ops */}
                        <UseCaseSection
                            title="Internal Operations & Workflow Execution"
                            category="OPERATIONS"
                            icon={<Zap className="w-6 h-6" />}
                            problemPoints={[
                                "Legacy tools without APIs",
                                "Manual internal processes",
                                "Operational errors and delays"
                            ]}
                            solutionPoints={[
                                "Learns how employees operate systems",
                                "Executes tasks autonomously",
                                "Works directly on existing UIs"
                            ]}
                            outcomePoints={[
                                "Operational leverage",
                                "Reduced human error",
                                "No need to rebuild platforms"
                            ]}
                        />
                    </div>
                </div>

                {/* 5. Comparison Table */}
                <div className="container mx-auto px-4 mb-24">
                    <WindowCard title="Why InterLayer for Sales-Led Enterprises" indicator="green">
                        <div className="p-8">
                            <h3 className="font-serif text-2xl mb-2">Not just CX. Revenue infrastructure.</h3>
                            <p className="text-muted-foreground mb-8">InterLayer is not only a support tool — it is a revenue and execution layer.</p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-foreground/10">
                                            <th className="py-4 font-bold text-sm uppercase tracking-wider">Function</th>
                                            <th className="py-4 font-bold text-sm uppercase tracking-wider text-muted-foreground">Traditional</th>
                                            <th className="py-4 font-bold text-sm uppercase tracking-wider text-coral">InterLayer</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-foreground/10">
                                        {[
                                            { func: "Pre-sales", trad: "Static demos", inter: "Adaptive live execution" },
                                            { func: "Sales", trad: "Human-only", inter: "Human + agent" },
                                            { func: "Support", trad: "Chat + tickets", inter: "Action-based resolution" },
                                            { func: "Onboarding", trad: "Docs & videos", inter: "Learn-by-doing" },
                                            { func: "Ops", trad: "Manual", inter: "Autonomous" }
                                        ].map((row, i) => (
                                            <tr key={i}>
                                                <td className="py-4 font-medium">{row.func}</td>
                                                <td className="py-4 text-muted-foreground">{row.trad}</td>
                                                <td className="py-4 font-medium">{row.inter}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </WindowCard>
                </div>

                {/* 7. Enterprise Impact */}
                <div className="container mx-auto px-4 mb-24 text-center">
                    <h2 className="font-serif text-4xl mb-12">Measured business outcomes</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            "Higher conversion from first visit",
                            "Fewer stalled deals",
                            "Lower sales engineering load",
                            "Reduced support tickets",
                            "Faster customer activation",
                            "Lower operational cost"
                        ].map((outcome, i) => (
                            <div key={i} className="bg-amber/20 border-2 border-foreground p-6 flex items-center justify-center min-h-[120px]">
                                <p className="font-medium text-lg">{outcome}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xl mt-12 font-serif italic">
                        "InterLayer replaces human repetition and judgement with AI."
                    </p>
                </div>

                {/* 8. Closing Statement */}
                <div className="container mx-auto px-4 text-center mb-12">
                    <p className="text-lg mb-6 text-muted-foreground">Enterprise growth no longer scales with headcount.</p>
                    <h2 className="font-serif text-3xl md:text-5xl mb-8">
                        InterLayer scales:<br />
                        Sales conversations, Demos, Support, Execution.<br />
                        <span className="text-coral">All through a single agentic layer.</span>
                    </h2>
                </div>

            </main>

            <FooterCTA />
        </div>
    );
}

function UseCaseSection({ title, category, icon, problemPoints, solutionPoints, outcomePoints }: {
    title: string, category: string, icon: React.ReactNode, problemPoints: string[], solutionPoints: string[], outcomePoints: string[]
}) {
    return (
        <div className="grid lg:grid-cols-12 gap-8 border-2 border-foreground bg-white p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {icon}
            </div>

            {/* Use Case Header */}
            <div className="lg:col-span-3">
                <span className="text-xs font-bold tracking-widest text-coral uppercase mb-2 block">{category}</span>
                <h3 className="font-serif text-2xl mb-4 leading-tight">{title}</h3>
                <div className="w-12 h-1 bg-foreground mb-4"></div>
            </div>

            {/* Problems */}
            <div className="lg:col-span-3 border-l-2 border-foreground/10 pl-6">
                <h4 className="font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 bg-red-400 rounded-full"></div> The Problem</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    {problemPoints.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
            </div>

            {/* What InterLayer Does */}
            <div className="lg:col-span-3 border-l-2 border-foreground/10 pl-6 bg-amber/5 -my-8 py-8">
                <h4 className="font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 bg-amber-400 rounded-full"></div> What InterLayer Does</h4>
                <ul className="space-y-2 text-sm">
                    {solutionPoints.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
            </div>

            {/* Outcome */}
            <div className="lg:col-span-3 border-l-2 border-foreground/10 pl-6">
                <h4 className="font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full"></div> Enterprise Outcome</h4>
                <ul className="space-y-2 text-sm font-medium">
                    {outcomePoints.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
            </div>
        </div>
    )
}
