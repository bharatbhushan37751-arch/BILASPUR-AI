import React from 'react';
import { 
  GraduationCap, 
  HelpCircle, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  TrendingUp, 
  Code2, 
  HeartHandshake 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-16 bg-stone-50 border-t border-stone-200" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Academic Project Banner */}
        <div className="p-6 bg-emerald-900 text-white rounded-2xl shadow-md mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>College Project Demonstration · Locality AI Innovation</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              &ldquo;Identify a Problem in Your Locality and Create an AI Solution&rdquo;
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Designed specifically for Bilaspur, Himachal Pradesh to bridge the gap between visiting tourists and grassroots regional artisans, heritage sites, and authentic Pahari food.
            </p>
          </div>

          <div className="shrink-0 p-4 bg-emerald-800/80 rounded-xl border border-emerald-700/60 text-xs space-y-1">
            <p className="text-emerald-300 font-bold uppercase tracking-wider text-[10px]">Project Metrics</p>
            <p className="font-semibold text-white">Full-Stack AI Implementation</p>
            <p className="text-emerald-200 text-[11px]">Server-Side Gemini 3.8 Flash &amp; Image Engine</p>
          </div>
        </div>

        {/* 3 Core Pillars: Problem, Solution, Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* 1. Problem */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                01. The Local Problem
              </span>
              <h4 className="text-xl font-bold text-stone-900 mt-1 mb-3">
                Fragmented Sights &amp; Hidden Local Artisans
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed space-y-2">
                Tourists visiting or passing through Bilaspur on the Chandigarh-Manali expressway often struggle to find authentic local attractions, traditional Himachali food, or where to spend 3 hours versus 2 days. 
              </p>
              <p className="text-xs text-stone-600 leading-relaxed mt-2">
                Simultaneously, local cottage producers (pine needle artisans, wild honey beekeepers, women handloom weavers, and small dhabas) struggle for visibility among mainstream tourists.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-amber-900 font-medium">
              Challenge: Static web blogs do not personalize by budget or time.
            </div>
          </div>

          {/* 2. AI Solution */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-emerald-300 ring-1 ring-emerald-700/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                02. The AI Solution
              </span>
              <h4 className="text-xl font-bold text-stone-900 mt-1 mb-3">
                Context-Aware Multi-Constraint Synthesis
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Bilaspur AI takes a tourist&apos;s exact constraints — available days, budget (e.g. ₹1,500), traveling party (Family/Solo), interests, and pace — and dynamically generates feasible morning/afternoon/evening itineraries.
              </p>
              <p className="text-xs text-stone-600 leading-relaxed mt-2">
                It uses a local Bilaspur HP grounding dataset so the AI explicitly recommends local dishes like Bilaspuri Dham and Sepu Vadi, provides direct Google Maps search navigation, and explains why each spot was chosen.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-100 text-[11px] text-emerald-900 font-medium">
              Engine: Server-side Gemini LLM with structured output schemas.
            </div>
          </div>

          {/* 3. Impact */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
                03. The Real-World Impact
              </span>
              <h4 className="text-xl font-bold text-stone-900 mt-1 mb-3">
                Measurable Grassroots Socioeconomic Growth
              </h4>
              <ul className="space-y-2 text-xs text-stone-600 mt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Helps Tourists:</strong> Removes guesswork with tailored time &amp; budget itineraries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Promotes Local Businesses:</strong> Drives footfall to small dhabas, lake boatmen, and homestays.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Gives Visibility to Local Products:</strong> Highlights Bilaspuri handlooms and wild honey.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Supports Local Tourism:</strong> Promotes eco-friendly and distributed regional exploration.</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-teal-900 font-medium">
              Result: Sustainable, equitable tourism for Himachal Pradesh.
            </div>
          </div>
        </div>

        {/* Technical Architecture Overview (for Teachers & Examiners) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-emerald-700" />
            <h4 className="text-lg font-bold text-stone-900">
              Technical Architecture &amp; Implementation Details
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80">
              <span className="font-bold text-stone-800 block mb-1">Frontend Layer</span>
              <p className="text-stone-500">
                React 19 + TypeScript + Tailwind CSS with responsive visual schedule cards, aspect-ratio controls, and accessible tabs.
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80">
              <span className="font-bold text-stone-800 block mb-1">Backend Server</span>
              <p className="text-stone-500">
                Full-stack Express runtime with server-side proxy routes, preventing client-side API key exposure.
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80">
              <span className="font-bold text-stone-800 block mb-1">AI Reasoning Engine</span>
              <p className="text-stone-500">
                Google GenAI SDK (gemini-3.8-flash) executing multi-constraint planning with JSON schema enforcement.
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80">
              <span className="font-bold text-stone-800 block mb-1">Maps Integration</span>
              <p className="text-stone-500">
                Universal URL-based Google Maps search navigation for zero-cost, reliable mobile and desktop routing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
