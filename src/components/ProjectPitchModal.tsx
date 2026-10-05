import React from 'react';
import { X, GraduationCap, CheckCircle2, ArrowRight, Lightbulb, Target, Cpu, TrendingUp } from 'lucide-react';

interface ProjectPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunDemoPreset: () => void;
}

export const ProjectPitchModal: React.FC<ProjectPitchModalProps> = ({
  isOpen,
  onClose,
  onRunDemoPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 text-left relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <GraduationCap className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            College Project Presentation Mode
          </span>
        </div>

        <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
          Locality Problem &amp; AI Solution Brief
        </h3>
        <p className="text-xs text-stone-500 mt-1">
          Topic: &ldquo;Identify a problem in your locality and create an AI solution.&rdquo;
        </p>

        <div className="mt-5 space-y-4 text-xs text-stone-600">
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
            <p className="font-bold text-stone-900 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-rose-600" />
              <span>1. The Localized Problem Identified (Bilaspur, HP):</span>
            </p>
            <p className="leading-relaxed">
              Bilaspur is historically blessed with Gobind Sagar lake, Bhakra Dam, Bandla ridge, and royal Bilaspuri Dham culinary traditions. Yet, 80%+ of tourists pass straight through to Kullu/Manali because information is scattered, uncurated, and lacks personalized scheduling. Small-scale local honey farmers, weavers, and boatmen remain invisible.
            </p>
          </div>

          <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
            <p className="font-bold text-emerald-950 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-700" />
              <span>2. The AI Engineering Solution:</span>
            </p>
            <p className="text-emerald-900 leading-relaxed">
              We developed a multi-constraint AI trip planner and local guide chatbot powered by Google Gemini. The system ingests user budget, travel companion count, available hours, and interest tags, cross-referencing with Bilaspur&apos;s geographic routes and cultural heritage to produce actionable, day-by-day schedules with direct Google Maps routes.
            </p>
          </div>

          <div className="p-3.5 bg-teal-50/70 rounded-xl border border-teal-200 space-y-1">
            <p className="font-bold text-teal-950 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-teal-700" />
              <span>3. Socioeconomic &amp; Academic Value:</span>
            </p>
            <p className="text-teal-900 leading-relaxed">
              Demonstrates real-world AI utility rather than a simple static site. Promotes grassroots micro-enterprises and gives visiting tourists a tailored, transparent itinerary with estimated expenditure.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] text-stone-400 font-mono">
            Tech: React 19 · TypeScript · Express · Gemini SDK
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onRunDemoPreset();
              }}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Test Demo Trip Scenario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
