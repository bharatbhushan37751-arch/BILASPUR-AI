import React, { useState } from 'react';
import { 
  AlertCircle, 
  UserCheck, 
  Cpu, 
  Sparkles, 
  Store, 
  Smile, 
  ArrowDown, 
  CheckCircle2, 
  Layers,
  GraduationCap,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

export const AiProblemSolutionFlow: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(2);

  const steps = [
    {
      step: 1,
      name: "Tourist's Problem",
      icon: AlertCircle,
      accent: "text-amber-700 bg-amber-50 border-amber-200",
      pill: "The Challenge",
      headline: "Information Fragmentation & Lack of Local Visibility",
      description: "Visitors passing through Bilaspur don't know where to stop, what Himachali dishes are authentic, or how to allocate 3 hours vs 2 days. Meanwhile, rural weavers, beekeepers, and lake boatmen struggle to reach tourists.",
      metrics: "Over 80% of highway tourists rush past Bilaspur toward Manali without exploring local gems."
    },
    {
      step: 2,
      name: "User Preferences",
      icon: UserCheck,
      accent: "text-blue-700 bg-blue-50 border-blue-200",
      pill: "User Input",
      headline: "Multi-Constraint Intent Capture",
      description: "The tourist inputs available time (e.g., 1 day), realistic budget (e.g., ₹1500), travelling party (Family/Solo), interests (Spirituality, Watersports, Himachali Food), and preferred pace (Relaxed vs Packed).",
      metrics: "Customized to individual constraints instead of static blog lists."
    },
    {
      step: 3,
      name: "AI Analysis",
      icon: Cpu,
      accent: "text-emerald-800 bg-emerald-50 border-emerald-300",
      pill: "Gemini AI Engine",
      headline: "Contextual Synthesis & Geographic Routing",
      description: "Bilaspur AI's server-side LLM engine maps temporal feasibility, mountain road transit times (e.g. NH-205 & Bandla ridge), opening hours, and budget tiers against verified Bilaspur location data.",
      metrics: "Evaluates transit distances and eliminates unrealistic mountain travel."
    },
    {
      step: 4,
      name: "Personalized Recommendations",
      icon: Sparkles,
      accent: "text-teal-700 bg-teal-50 border-teal-200",
      pill: "Dynamic Generation",
      headline: "Context-Aware Actionable Schedules",
      description: "Generates visual morning, afternoon, and evening itineraries with estimated expenditure breakdowns, direct Google Maps search directions, and explicit explanations of why each item was selected.",
      metrics: "Delivers transparent reasoning: 'Why this matches your preferences'."
    },
    {
      step: 5,
      name: "Local Places + Food + Products + Businesses",
      icon: Store,
      accent: "text-indigo-700 bg-indigo-50 border-indigo-200",
      pill: "Grassroots Economy",
      headline: "Promoting Bilaspur's Artisans & Local Cuisine",
      description: "Directs travelers to local self-help groups, pure acacia honey apiaries, authentic Bilaspuri Dham rasois, and local speedboat cooperatives rather than commercial conglomerates.",
      metrics: "Direct economic boost for small cottage producers in Bilaspur district."
    },
    {
      step: 6,
      name: "Better Local Experience",
      icon: Smile,
      accent: "text-emerald-700 bg-emerald-50 border-emerald-300",
      pill: "Final Outcome",
      headline: "Enriched Travel & Sustainable Regional Tourism",
      description: "Tourists enjoy a seamless, culturally immersive visit with no guesswork. Local entrepreneurs gain dignified visibility. The community retains tourism revenues within Himachal Pradesh.",
      metrics: "Higher tourist satisfaction + grassroots economic empowerment."
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-stone-200" id="ai-solution-flow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-800" />
            <span>Academic Demonstration · Problem & Solution Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            How Bilaspur AI Solves the Problem
          </h2>
          <p className="text-base text-stone-600 mt-3 leading-relaxed">
            Bridging the gap between visiting tourists and Bilaspur’s local places, authentic food, and small businesses through conversational and generative artificial intelligence.
          </p>
        </div>

        {/* Step-by-Step Flow Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Vertical Flow Track */}
          <div className="lg:col-span-6 space-y-3">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedStep === index;
              return (
                <div key={item.step} className="relative">
                  <button
                    onClick={() => setSelectedStep(index)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'bg-stone-50 border-emerald-700 shadow-sm ring-1 ring-emerald-700/20'
                        : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg border ${item.accent} shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                          Step 0{item.step}
                        </span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-emerald-100 text-emerald-900' : 'bg-stone-100 text-stone-600'
                        }`}>
                          {item.pill}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-stone-900 mt-0.5">
                        {item.name}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                        {item.headline}
                      </p>
                    </div>

                    <div className="self-center">
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-emerald-700 translate-x-1' : 'text-stone-300'}`} />
                    </div>
                  </button>

                  {/* Flow Arrow (except last) */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center my-0.5" aria-hidden="true">
                      <ArrowDown className="w-3.5 h-3.5 text-stone-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-dive Detail Card for Selected Step */}
          <div className="lg:col-span-6 sticky top-24">
            {(() => {
              const current = steps[selectedStep];
              const CurrentIcon = current.icon;
              return (
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl border ${current.accent}`}>
                      <CurrentIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Detailed Stage Breakdown · Step 0{current.step}
                      </span>
                      <h3 className="text-2xl font-bold text-stone-900 tracking-tight">
                        {current.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-stone-200/80 mb-6">
                    <h4 className="text-sm font-bold text-stone-900 mb-1.5">
                      {current.headline}
                    </h4>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {current.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                          Key Measurable Value
                        </p>
                        <p className="text-xs text-emerald-900 mt-0.5">
                          {current.metrics}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200 text-xs text-stone-600 space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-stone-800">
                        <TrendingUp className="w-4 h-4 text-emerald-700" />
                        <span>Why Traditional Tourism Fails Here:</span>
                      </div>
                      <p>
                        Static tourism PDFs and generic blogs promote crowded spots outside Bilaspur and fail to respect a tourist&apos;s exact 3-hour layover, ₹1,500 budget, or preference for authentic Bilaspuri Dham cuisine. Bilaspur AI computes an optimal itinerary in real-time.
                      </p>
                    </div>
                  </div>

                  {/* Navigation dots between steps */}
                  <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between">
                    <span className="text-xs text-stone-500">
                      Step {selectedStep + 1} of {steps.length}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {steps.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedStep(i)}
                          className={`h-2 rounded-full transition-all ${
                            selectedStep === i ? 'w-6 bg-emerald-700' : 'w-2 bg-stone-300'
                          }`}
                          aria-label={`Go to step ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};
