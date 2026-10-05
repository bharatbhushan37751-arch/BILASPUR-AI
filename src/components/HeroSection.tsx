import React from 'react';
import { Sparkles, Bot, MapPin, Compass, ArrowRight, ShieldCheck, Waves, Mountain, Utensils } from 'lucide-react';

interface HeroSectionProps {
  onPlanTripClick: () => void;
  onAskAiClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPlanTripClick,
  onAskAiClick,
  onExploreClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-stone-50 to-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient decorative blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-teal-200/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Next-Gen Local Tourism Assistant · Bilaspur, Himachal Pradesh</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.12]">
              Discover Bilaspur. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-800 font-serif italic">
                Your Way.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed max-w-2xl">
              An AI-powered local guide that helps you discover places, food, local products and experiences across Bilaspur, Himachal Pradesh.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onPlanTripClick}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all text-base group"
              >
                <Sparkles className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
                <span>Plan My Trip</span>
                <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onAskAiClick}
                className="flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-stone-100 text-stone-800 font-semibold rounded-xl border border-stone-300 shadow-xs hover:shadow transition-all text-base"
              >
                <Bot className="w-4 h-4 text-emerald-700" />
                <span>Ask Bilaspur AI</span>
              </button>

              <button
                onClick={onExploreClick}
                className="text-stone-600 hover:text-stone-900 font-medium text-sm underline-offset-4 hover:underline px-2 py-2"
              >
                Explore Curated Attractions
              </button>
            </div>

            {/* Value Pillars */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-stone-200/80 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-sm">
                  <Mountain className="w-4 h-4" />
                  <span>Curated Gems</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">Gobind Sagar, Naina Devi, Bandla Dhar ridge</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-sm">
                  <Utensils className="w-4 h-4" />
                  <span>Himachali Flavors</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">Bilaspuri Dham, Sepu Vadi & fresh lake catches</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Local Impact</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">Promotes rural artisans & small businesses</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200/80 bg-stone-900 group">
              <img
                src="/src/assets/images/hero_bilaspur_lake_1791210560706.jpg"
                alt="Gobind Sagar Lake in Bilaspur Himachal Pradesh"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent" />

              <div className="absolute bottom-0 inset-x-0 p-6 text-white text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                    Featured Destination
                  </span>
                  <span className="text-stone-400">·</span>
                  <span className="text-xs text-stone-300">Sutlej Basin, Bilaspur</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Gobind Sagar Lake & Bhakra Foothills
                </h3>
                <p className="text-xs text-stone-300 mt-1.5 line-clamp-2">
                  A tranquil 56-km inland reservoir nestled in Himalayan slopes, offering speedboat safaris, submerged heritage views, and serene mountain vistas.
                </p>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/15 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-300">
                    <Waves className="w-3.5 h-3.5" />
                    <span>Boating & Watersports</span>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Gobind+Sagar+Lake+Bilaspur+Himachal+Pradesh"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-stone-200 hover:text-white underline underline-offset-2"
                  >
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <div className="hidden sm:flex items-center gap-3 absolute -bottom-6 -left-6 bg-white p-3.5 rounded-xl shadow-xl border border-stone-200 text-left max-w-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">100% Real-Time AI Itinerary</p>
                <p className="text-[11px] text-stone-500">Calculates time, travel pace, budget & authentic local food</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
