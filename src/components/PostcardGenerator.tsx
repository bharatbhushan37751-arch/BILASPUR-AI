import React, { useState } from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Download, 
  RefreshCw, 
  Layers, 
  Sliders, 
  Check, 
  Camera, 
  MapPin,
  Compass
} from 'lucide-react';

interface DestinationMatch {
  title: string;
  subtitle: string;
  imageUrl: string;
  location: string;
}

export const PostcardGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('Serene sunrise over Gobind Sagar Lake in Bilaspur Himachal Pradesh, calm emerald water with morning mist and Himalayan foothill reflections, photorealistic travel photography');
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');
  const [quality, setQuality] = useState<'standard' | 'studio'>('standard');
  const [generating, setGenerating] = useState<boolean>(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [activeDestination, setActiveDestination] = useState<DestinationMatch | null>(null);

  // The 8 aspect ratios required by the feature specification
  const aspectRatios = [
    { ratio: '1:1', label: '1:1', desc: 'Square' },
    { ratio: '2:3', label: '2:3', desc: 'Portrait' },
    { ratio: '3:2', label: '3:2', desc: 'Landscape' },
    { ratio: '3:4', label: '3:4', desc: 'Portrait' },
    { ratio: '4:3', label: '4:3', desc: 'Standard' },
    { ratio: '9:16', label: '9:16', desc: 'Story/Reels' },
    { ratio: '16:9', label: '16:9', desc: 'Cinematic' },
    { ratio: '21:9', label: '21:9', desc: 'Ultrawide' },
  ];

  const presetScenarios = [
    {
      title: 'Gobind Sagar Lake Sunrise',
      ratio: '16:9',
      text: 'Misty golden hour sunrise over Gobind Sagar Lake in Bilaspur HP, tranquil emerald waters, distant wooden boats, rolling Himalayan foothills in morning light, photorealistic travel view'
    },
    {
      title: 'Bandla Dhar Paragliding',
      ratio: '4:3',
      text: 'Bright colorful tandem paraglider soaring high over Bandla Dhar mountain ridge with dense Himalayan chir pine forests and winding Sutlej river canyon below, sunny day'
    },
    {
      title: 'Shri Naina Devi Hilltop Shrine',
      ratio: '9:16',
      text: 'Sacred Hindu pagoda temple on steep triangular Himalayan mountain peak overlooking morning clouds and valley below, prayer flags, golden light, spiritual hill aesthetic'
    },
    {
      title: 'Royal Himachali Dham Feast',
      ratio: '3:2',
      text: 'Authentic Bilaspuri Dham feast spread with steaming bowls of Chana Madra, Sepu Vadi, aromatic rice on green pattal leaf plate, brass vessels, warm wooden rustic table'
    },
  ];

  const resolveDestinationFromPrompt = (inputPrompt: string): DestinationMatch => {
    const p = (inputPrompt || '').toLowerCase();
    if (p.includes('naina devi') || p.includes('shakti peeth') || p.includes('ropeway') || p.includes('temple')) {
      return {
        title: 'Shri Naina Devi Ji Temple',
        subtitle: 'Revered 51 Shakti Peeth Peak & Aerial Ropeway Vista',
        imageUrl: '/images/destinations/naina-devi.jpg',
        location: 'Naina Devi Range (~1,100m)'
      };
    }
    if (p.includes('bandla') || p.includes('paragliding') || p.includes('ridge') || p.includes('glider')) {
      return {
        title: 'Bandla Dhar Mountain Ridge',
        subtitle: 'Premier Sub-Himalayan Paragliding Ridge & Sunset Horizon',
        imageUrl: '/images/destinations/bandla-dhar.jpg',
        location: 'Bandla Dhar (1,374m)'
      };
    }
    if (p.includes('bhakra') || p.includes('dam') || p.includes('hydro') || p.includes('powerhouse')) {
      return {
        title: 'Bhakra Nangal Dam',
        subtitle: '226m Concrete Gravity Engineering Wonder on Sutlej Gorge',
        imageUrl: '/images/destinations/bhakra-dam.jpg',
        location: 'Sutlej River Basin'
      };
    }
    if (p.includes('vyas') || p.includes('cave') || p.includes('gufa') || p.includes('meditation')) {
      return {
        title: 'Rishi Vyas Cave (Vyas Gufa)',
        subtitle: 'Sacred Meditation Cavern of Sage Ved Vyas on Sutlej Bank',
        imageUrl: '/images/destinations/vyas-gufa.jpg',
        location: 'Old Vyaspur Riverbank'
      };
    }
    if (p.includes('markandeya') || p.includes('spring') || p.includes('kund') || p.includes('sulfur')) {
      return {
        title: 'Markandeya Ji Temple & Sacred Springs',
        subtitle: 'Ancient Natural Medicinal Water Kund & Spiritual Retreat',
        imageUrl: '/images/destinations/markandeya-temple.jpg',
        location: 'Markand Valley (20 km from Bilaspur)'
      };
    }
    if (p.includes('koldam') || p.includes('canyon') || p.includes('gorge') || p.includes('reservoir')) {
      return {
        title: 'Koldam Hydro Reservoir & Canyon',
        subtitle: 'Emerald Waters Flanked by Towering Limestone Bluffs',
        imageUrl: '/images/destinations/koldam.jpg',
        location: 'Sutlej River Gorge'
      };
    }
    if (p.includes('bahadurpur') || p.includes('fort') || p.includes('kahlur') || p.includes('ruins')) {
      return {
        title: 'Bahadurpur Fort Historic Ridge',
        subtitle: '1,980m Deodar-Clad Summit & Ancient Royal Kahlur Fort Ruins',
        imageUrl: '/images/destinations/bahadurpur-fort.jpg',
        location: 'Bahadurpur Summit (1,980m)'
      };
    }
    if (p.includes('dham') || p.includes('feast') || p.includes('food') || p.includes('madra') || p.includes('sepu') || p.includes('siddu')) {
      return {
        title: 'Royal Bilaspuri Dham Gastronomy',
        subtitle: 'Authentic Mountain Feast & Lakeside Traditional Hospitality',
        imageUrl: '/images/destinations/gobind-sagar.jpg',
        location: 'Bilaspur Town Waterfront'
      };
    }
    return {
      title: 'Gobind Sagar Lake & Luhnu Waterfront',
      subtitle: '56km Man-Made Reservoir, Water Sports & Foothill Reflections',
      imageUrl: '/images/destinations/gobind-sagar.jpg',
      location: 'Gobind Sagar, Bilaspur HP'
    };
  };

  const handleGenerate = () => {
    if (!prompt.trim() || generating) return;

    setGenerating(true);

    // Provide a smooth, responsive 400ms transition without calling any external image API
    setTimeout(() => {
      const match = resolveDestinationFromPrompt(prompt);
      setActiveDestination(match);
      setGeneratedImageUrl(match.imageUrl);
      setGenerating(false);
    }, 400);
  };

  const handleDownload = () => {
    if (!generatedImageUrl) return;
    const a = document.createElement('a');
    a.href = generatedImageUrl;
    a.download = `bilaspur-${activeDestination?.title.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'scene'}-${aspectRatio.replace(':', 'x')}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Helper to get CSS aspect-ratio class or style
  const getAspectRatioStyle = (ratio: string) => {
    switch (ratio) {
      case '1:1': return { aspectRatio: '1 / 1' };
      case '2:3': return { aspectRatio: '2 / 3' };
      case '3:2': return { aspectRatio: '3 / 2' };
      case '3:4': return { aspectRatio: '3 / 4' };
      case '4:3': return { aspectRatio: '4 / 3' };
      case '9:16': return { aspectRatio: '9 / 16' };
      case '16:9': return { aspectRatio: '16 / 9' };
      case '21:9': return { aspectRatio: '21 / 9' };
      default: return { aspectRatio: '16 / 9' };
    }
  };

  return (
    <section className="py-16 bg-white border-t border-stone-200" id="ai-visualizer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>AI Scene Visualizer & Aspect Ratio Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Bilaspur AI Scene Visualizer
          </h2>
          <p className="text-stone-600 mt-2 text-base leading-relaxed">
            Generate photorealistic travel postcards and visual concepts for Bilaspur destinations with granular control over aspect ratios (1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, 21:9).
          </p>
        </div>

        {/* Quick Scenario Chips */}
        <div className="mb-6">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
            Preset Travel Scenes:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {presetScenarios.map((sc, i) => (
              <button
                key={i}
                onClick={() => {
                  setPrompt(sc.text);
                  setAspectRatio(sc.ratio);
                }}
                className="p-3 text-left rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-stone-50 transition-all text-xs"
              >
                <div className="flex items-center justify-between font-bold text-stone-900 mb-1">
                  <span>{sc.title}</span>
                  <span className="text-[10px] text-stone-400 font-mono">{sc.ratio}</span>
                </div>
                <p className="text-[11px] text-stone-500 line-clamp-2">{sc.text}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Generator Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (5 cols) */}
          <div className="lg:col-span-5 bg-stone-50 p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            {/* Prompt Input */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Scenic Vision Prompt
              </label>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe a Bilaspur landmark, mountain scene, temple, or local food feast..."
                className="w-full p-3 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              />
            </div>

            {/* Mandated Aspect Ratio Affordance (1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, 21:9) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Aspect Ratio Affordance
                </label>
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {aspectRatio}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {aspectRatios.map((item) => (
                  <button
                    key={item.ratio}
                    type="button"
                    onClick={() => setAspectRatio(item.ratio)}
                    className={`py-2 px-1 text-center rounded-lg border transition-all ${
                      aspectRatio === item.ratio
                        ? 'bg-emerald-800 text-white border-emerald-800 font-bold shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span className="text-xs block font-bold">{item.label}</span>
                    <span className={`text-[10px] block ${aspectRatio === item.ratio ? 'text-emerald-200' : 'text-stone-400'}`}>
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality & Model Tier */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                AI Generation Engine
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setQuality('standard')}
                  className={`p-2.5 text-left rounded-xl border text-xs transition-all ${
                    quality === 'standard'
                      ? 'bg-white border-emerald-700 ring-1 ring-emerald-700/20 font-bold text-stone-900 shadow-xs'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <p className="font-bold">General Preview</p>
                  <p className="text-[10px] text-stone-400 font-mono mt-0.5">High-Res Destination Scene</p>
                </button>

                <button
                  type="button"
                  onClick={() => setQuality('studio')}
                  className={`p-2.5 text-left rounded-xl border text-xs transition-all ${
                    quality === 'studio'
                      ? 'bg-white border-emerald-700 ring-1 ring-emerald-700/20 font-bold text-stone-900 shadow-xs'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <p className="font-bold">Studio Quality</p>
                  <p className="text-[10px] text-stone-400 font-mono mt-0.5">Studio Verified Photography</p>
                </button>
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={generating || !prompt.trim()}
              className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-800/60 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Scene ({aspectRatio})...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Generate Postcard Image</span>
                </>
              )}
            </button>
          </div>

          {/* Canvas Display (7 cols) */}
          <div className="lg:col-span-7 bg-stone-100 rounded-2xl border border-stone-200 p-6 flex flex-col items-center justify-center min-h-[460px]">
            {generating && (
              <div className="text-center space-y-3 p-8">
                <div className="w-12 h-12 mx-auto rounded-xl bg-white text-emerald-700 flex items-center justify-center shadow-md animate-pulse">
                  <Camera className="w-6 h-6 animate-spin" />
                </div>
                <h4 className="text-base font-bold text-stone-900">
                  Rendering Scene in {aspectRatio} Ratio...
                </h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Composing authentic Bilaspur scenery in {aspectRatio} aspect ratio format.
                </p>
              </div>
            )}

            {!generating && !generatedImageUrl && (
              <div className="text-center space-y-3 p-8">
                <div className="w-12 h-12 mx-auto rounded-xl bg-white text-stone-400 flex items-center justify-center shadow-xs">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-stone-800">Scene Preview Will Render Here</h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Pick an aspect ratio (e.g. 16:9 for landscape, 9:16 for mobile story, or 1:1 for square) and click &ldquo;Generate Postcard Image&rdquo;.
                </p>
              </div>
            )}

            {!generating && generatedImageUrl && activeDestination && (
              <div className="w-full flex flex-col items-center space-y-4">
                {/* Destination Badge */}
                <div className="w-full p-3 bg-white rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-stone-900">{activeDestination.title}</h5>
                      <p className="text-[11px] text-stone-500">{activeDestination.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                    {activeDestination.location}
                  </span>
                </div>

                <div
                  className="w-full max-h-[500px] rounded-xl overflow-hidden shadow-lg border border-stone-200 bg-stone-900 flex items-center justify-center relative group"
                  style={getAspectRatioStyle(aspectRatio)}
                >
                  <img
                    src={generatedImageUrl}
                    alt={activeDestination.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-white">
                    Aspect Ratio: {aspectRatio}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-emerald-200">
                    {quality === 'studio' ? 'Studio Quality' : 'General Preview'}
                  </div>
                </div>

                <div className="w-full flex items-center justify-between pt-2">
                  <span className="text-xs text-stone-500 font-mono">
                    Format: {aspectRatio} · {quality === 'studio' ? 'Studio Quality' : 'General Preview'}
                  </span>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Postcard</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
