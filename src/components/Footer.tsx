import React from 'react';
import { Compass, Heart, MapPin, Sparkles, ExternalLink, GraduationCap } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenPitch: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPitch }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Bilaspur<span className="text-emerald-400">AI</span>
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An AI-powered local tourism and discovery platform for Bilaspur, Himachal Pradesh. Connecting travelers with authentic heritage, Himachali cuisine, and grassroots artisans.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] px-2.5 py-1 rounded bg-stone-800 border border-stone-700 text-stone-300 font-mono">
                Bilaspur, HP · PIN 174001
              </span>
              <button
                onClick={onOpenPitch}
                className="text-[11px] px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 hover:bg-emerald-900 transition-colors flex items-center gap-1"
              >
                <GraduationCap className="w-3 h-3" />
                <span>College Project Demo</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('planner')} className="hover:text-white transition-colors">
                  AI Trip Planner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-white transition-colors">
                  Explore Bilaspur
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guide')} className="hover:text-white transition-colors">
                  Ask Bilaspur AI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('visualizer')} className="hover:text-white transition-colors">
                  AI Scene Visualizer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About &amp; Problem Solution
                </button>
              </li>
            </ul>
          </div>

          {/* Key Bilaspur Attractions */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Key Attractions
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Gobind+Sagar+Lake+Bilaspur+Himachal+Pradesh"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Gobind Sagar Lake</span>
                  <ExternalLink className="w-2.5 h-2.5 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Bhakra+Dam+Bilaspur+Himachal+Pradesh"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Bhakra Dam</span>
                  <ExternalLink className="w-2.5 h-2.5 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Shri+Naina+Devi+Ji+Temple+Bilaspur+Himachal+Pradesh"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Shri Naina Devi Ji Temple</span>
                  <ExternalLink className="w-2.5 h-2.5 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Bandla+Dhar+Bilaspur+Himachal+Pradesh"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Bandla Dhar Paragliding</span>
                  <ExternalLink className="w-2.5 h-2.5 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Vyas+Gufa+Bilaspur+Himachal+Pradesh"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Vyas Cave (Vyas Gufa)</span>
                  <ExternalLink className="w-2.5 h-2.5 text-stone-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Local Heritage Note */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Heritage Note
            </h5>
            <p className="text-xs text-stone-400 leading-relaxed">
              Named after the legendary sage Rishi Ved Vyas (ancient <em>Vyaspur</em>), Bilaspur is a historic seat of culture on the banks of the mighty Sutlej.
            </p>
            <div className="mt-3 p-2.5 bg-stone-800/80 rounded-lg border border-stone-700/60 text-[11px] text-stone-400">
              Demo directory entries represent simulated community small business listings.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Bilaspur AI. Developed for Community AI Innovation in Himachal Pradesh.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> using Google GenAI &amp; React.
          </p>
        </div>
      </div>
    </footer>
  );
};
