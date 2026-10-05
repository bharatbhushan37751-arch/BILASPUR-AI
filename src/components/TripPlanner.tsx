import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Wallet, 
  Users, 
  Heart, 
  Clock, 
  MapPin, 
  Utensils, 
  ShoppingBag, 
  Sun, 
  Sunset, 
  Moon, 
  Info, 
  Check, 
  RefreshCw, 
  ExternalLink, 
  Compass, 
  Printer, 
  Share2, 
  AlertCircle 
} from 'lucide-react';
import { DEMO_TRIP_PRESETS } from '../data/bilaspurData';

interface TripDayPlan {
  dayNumber: number;
  dayTitle: string;
  morning: {
    title: string;
    description: string;
    placeName: string;
    mapQuery: string;
    duration: string;
    localTips: string;
  };
  afternoon: {
    title: string;
    description: string;
    placeName: string;
    mapQuery: string;
    duration: string;
    foodRecommendation: string;
  };
  evening: {
    title: string;
    description: string;
    placeName: string;
    mapQuery: string;
    duration: string;
    sunsetOrVibe: string;
  };
  foodSpot?: {
    name: string;
    dish: string;
    type: string;
    priceRange: string;
  };
  artisanOrProduct?: {
    item: string;
    whereToBuy: string;
    whySpecial: string;
  };
}

interface GeneratedPlan {
  tripTitle: string;
  summary: string;
  estimatedBudget: {
    total: string;
    breakdown: {
      stay: string;
      food: string;
      activities: string;
      transport: string;
    };
  };
  whyItMatches: string;
  days: TripDayPlan[];
  essentialTips: string[];
  ecoEtiquette?: string;
}

export const TripPlanner: React.FC = () => {
  // Form States
  const [days, setDays] = useState<number>(1);
  const [budgetTier, setBudgetTier] = useState<string>('Budget');
  const [budgetAmount, setBudgetAmount] = useState<string>('₹1,500');
  const [travelers, setTravelers] = useState<string>('Family');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Nature', 'Food']);
  const [pace, setPace] = useState<string>('Relaxed');
  const [extraNotes, setExtraNotes] = useState<string>('');

  // Generation & Results State
  const [loading, setLoading] = useState<boolean>(false);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeDayTab, setActiveDayTab] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const interestOptions = [
    'Nature',
    'Adventure',
    'Culture',
    'Food',
    'Shopping',
    'Photography',
    'Spirituality',
  ];

  const travelWithPartyOptions = ['Solo', 'Couple', 'Family', 'Friends'];
  const paceOptions = ['Relaxed', 'Balanced', 'Packed'];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((i) => i !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const applyPreset = (preset: typeof DEMO_TRIP_PRESETS[0]) => {
    setDays(preset.days);
    setBudgetAmount(preset.budget);
    setBudgetTier(preset.budgetLevel);
    setTravelers(preset.travelers);
    setPace(preset.pace);
    setSelectedInterests(preset.interests);
    setExtraNotes(preset.description);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          days,
          budget: budgetAmount,
          budgetLevel: budgetTier,
          travelers,
          interests: selectedInterests,
          pace,
          extraNotes,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${response.status}`);
      }

      const data: GeneratedPlan = await response.json();
      setPlan(data);
      setActiveDayTab(1);
    } catch (err: any) {
      console.error('Trip plan generation error:', err);
      setError(err.message || 'Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section className="py-16 bg-stone-50" id="plan-trip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>AI Multi-Constraint Itinerary Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Plan My Trip to Bilaspur
          </h2>
          <p className="text-stone-600 mt-2 text-base leading-relaxed">
            Tell the AI your budget, companions, and pace. Bilaspur AI generates a personalized schedule prioritizing local sights, authentic food, and artisan heritage.
          </p>
        </div>

        {/* 1-Click Demo Presets Bar */}
        <div className="mb-10 p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                1-Click Quick Demo Presets
              </span>
              <span className="text-[11px] text-stone-500 font-normal">
                (Click to instantly prefill college test scenarios)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {DEMO_TRIP_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(preset)}
                className="p-3 text-left rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-800">
                    {preset.title}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {preset.budget}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1 line-clamp-1">{preset.subtitle}</p>
                <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-2">
                  <span>{preset.days} Day</span>
                  <span>·</span>
                  <span>{preset.travelers}</span>
                  <span>·</span>
                  <span>{preset.pace}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Planner Grid: Left Form, Right Result */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Card (5 cols on large) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-700" />
              <span>Trip Parameters</span>
            </h3>

            {/* 1. Duration (Number of Days) */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Number of Days: <span className="text-emerald-700 font-extrabold text-sm normal-case">{days} {days === 1 ? 'Day' : 'Days'}</span>
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDays(d)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      days === d
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {d} {d === 5 ? 'Days+' : d === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Budget & Tier */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Estimated Budget
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {['Budget', 'Moderate', 'Luxury'].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => {
                      setBudgetTier(tier);
                      if (tier === 'Budget') setBudgetAmount('₹1,500');
                      if (tier === 'Moderate') setBudgetAmount('₹4,000');
                      if (tier === 'Luxury') setBudgetAmount('₹9,000');
                    }}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      budgetTier === tier
                        ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
              <div className="relative mt-2">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400 text-xs">
                  <Wallet className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  placeholder="e.g. ₹1,500 or ₹3,000"
                  className="w-full pl-8 pr-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>
            </div>

            {/* 3. Travelling With */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Travelling With
              </label>
              <div className="grid grid-cols-4 gap-2">
                {travelWithPartyOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setTravelers(opt)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      travelers === opt
                        ? 'bg-emerald-800 text-white border-emerald-800 font-semibold'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Interests (Multi-select) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Interests ({selectedInterests.length} selected)
                </label>
                <span className="text-[11px] text-stone-400">Select all that apply</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => {
                  const active = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 ${
                        active
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-400 font-semibold'
                          : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {active && <Check className="w-3 h-3 text-emerald-700" />}
                      <span>{interest}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Preferred Pace */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Preferred Pace
              </label>
              <div className="grid grid-cols-3 gap-2">
                {paceOptions.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPace(p)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      pace === p
                        ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Extra Notes (Optional) */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Special Requests / Mobility / Kids (Optional)
              </label>
              <input
                type="text"
                value={extraNotes}
                onChange={(e) => setExtraNotes(e.target.value)}
                placeholder="e.g. Vegetarian food only, elderly traveler with us..."
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-800/60 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Generating Bilaspur Itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-emerald-200" />
                  <span>Generate My Bilaspur Plan</span>
                </>
              )}
            </button>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <div>
                  <p className="font-bold">Generation Notice</p>
                  <p className="mt-0.5">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Results Area (7 cols on large) */}
          <div className="lg:col-span-7">
            {loading && (
              <div className="bg-white p-12 rounded-2xl border border-stone-200 shadow-sm text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center animate-pulse">
                  <Compass className="w-7 h-7 animate-spin" />
                </div>
                <h4 className="text-xl font-bold text-stone-900">Synthesizing Your Bilaspur Itinerary</h4>
                <p className="text-sm text-stone-500 max-w-md mx-auto">
                  Computing mountain road routes, selecting authentic Himachali dining spots, and integrating local artisan stops matching your {days}-day plan...
                </p>
              </div>
            )}

            {!loading && !plan && (
              <div className="bg-white p-10 sm:p-12 rounded-2xl border border-dashed border-stone-300 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-xl bg-stone-100 text-stone-400 flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-stone-800">Your Custom Itinerary Appears Here</h4>
                <p className="text-sm text-stone-500 max-w-md mx-auto">
                  Configure your preferences on the left or click any 1-Click Quick Preset above to generate a day-by-day plan with direct Google Maps routes and culinary recommendations.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      applyPreset(DEMO_TRIP_PRESETS[0]);
                      setTimeout(handleGenerate, 100);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs rounded-lg border border-emerald-200 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run &ldquo;Family Day Trip&rdquo; Example</span>
                  </button>
                </div>
              </div>
            )}

            {!loading && plan && (
              <div className="space-y-6">
                {/* Header Summary Card */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4 mb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Generated Itinerary
                      </span>
                      <h3 className="text-2xl font-extrabold text-stone-900 mt-1">
                        {plan.tripTitle}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrint}
                        className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg border border-stone-200"
                        title="Print / Save Itinerary"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleShare}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg border border-stone-200"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {plan.summary}
                  </p>

                  {/* Why this matches callout */}
                  <div className="mt-4 p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs">
                    <p className="font-bold text-emerald-950 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      <span>Why this matches your preferences:</span>
                    </p>
                    <p className="text-emerald-900 mt-1 leading-relaxed">
                      {plan.whyItMatches}
                    </p>
                  </div>

                  {/* Estimated Budget Breakdown */}
                  {plan.estimatedBudget && (
                    <div className="mt-5 pt-4 border-t border-stone-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                          Estimated Budget Breakdown
                        </span>
                        <span className="text-sm font-extrabold text-emerald-800">
                          Total: {plan.estimatedBudget.total}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="p-2 bg-stone-50 rounded-lg border border-stone-200/80">
                          <span className="text-[10px] text-stone-500 block">Stay / Lodging</span>
                          <span className="font-bold text-stone-800">{plan.estimatedBudget.breakdown?.stay || 'N/A'}</span>
                        </div>
                        <div className="p-2 bg-stone-50 rounded-lg border border-stone-200/80">
                          <span className="text-[10px] text-stone-500 block">Food & Dining</span>
                          <span className="font-bold text-stone-800">{plan.estimatedBudget.breakdown?.food || 'N/A'}</span>
                        </div>
                        <div className="p-2 bg-stone-50 rounded-lg border border-stone-200/80">
                          <span className="text-[10px] text-stone-500 block">Boating / Sights</span>
                          <span className="font-bold text-stone-800">{plan.estimatedBudget.breakdown?.activities || 'N/A'}</span>
                        </div>
                        <div className="p-2 bg-stone-50 rounded-lg border border-stone-200/80">
                          <span className="text-[10px] text-stone-500 block">Local Transport</span>
                          <span className="font-bold text-stone-800">{plan.estimatedBudget.breakdown?.transport || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Day Tabs (if multiple days) */}
                {plan.days.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {plan.days.map((d) => (
                      <button
                        key={d.dayNumber}
                        onClick={() => setActiveDayTab(d.dayNumber)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                          activeDayTab === d.dayNumber
                            ? 'bg-emerald-800 text-white shadow-sm'
                            : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                        }`}
                      >
                        Day {d.dayNumber}: {d.dayTitle.length > 20 ? d.dayTitle.slice(0, 20) + '...' : d.dayTitle}
                      </button>
                    ))}
                  </div>
                )}

                {/* Active Day Detail Schedule Cards */}
                {(() => {
                  const currentDay = plan.days.find((d) => d.dayNumber === activeDayTab) || plan.days[0];
                  if (!currentDay) return null;

                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-stone-900">
                          Day {currentDay.dayNumber}: {currentDay.dayTitle}
                        </h4>
                        <span className="text-xs text-stone-500">
                          Morning · Afternoon · Evening Schedule
                        </span>
                      </div>

                      {/* 1. Morning Card */}
                      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-600/40 transition-colors">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                              <Sun className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                                Morning Schedule · {currentDay.morning.duration}
                              </span>
                              <h5 className="text-base font-bold text-stone-900">
                                {currentDay.morning.title}
                              </h5>
                            </div>
                          </div>

                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((currentDay.morning.mapQuery || currentDay.morning.placeName) + ' Bilaspur Himachal Pradesh')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors shrink-0"
                          >
                            <MapPin className="w-3 h-3 text-rose-500" />
                            <span>Maps</span>
                            <ExternalLink className="w-3 h-3 text-stone-400" />
                          </a>
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed pl-10">
                          {currentDay.morning.description}
                        </p>

                        {currentDay.morning.localTips && (
                          <div className="mt-3 ml-10 p-2.5 bg-stone-50 rounded-lg border border-stone-200/80 text-[11px] text-stone-600 flex items-start gap-2">
                            <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                            <span><strong>Tip:</strong> {currentDay.morning.localTips}</span>
                          </div>
                        )}
                      </div>

                      {/* 2. Afternoon Card */}
                      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-600/40 transition-colors">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                              <Utensils className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                                Afternoon & Lunch · {currentDay.afternoon.duration}
                              </span>
                              <h5 className="text-base font-bold text-stone-900">
                                {currentDay.afternoon.title}
                              </h5>
                            </div>
                          </div>

                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((currentDay.afternoon.mapQuery || currentDay.afternoon.placeName) + ' Bilaspur Himachal Pradesh')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors shrink-0"
                          >
                            <MapPin className="w-3 h-3 text-rose-500" />
                            <span>Maps</span>
                            <ExternalLink className="w-3 h-3 text-stone-400" />
                          </a>
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed pl-10">
                          {currentDay.afternoon.description}
                        </p>

                        {currentDay.afternoon.foodRecommendation && (
                          <div className="mt-3 ml-10 p-2.5 bg-amber-50/70 border border-amber-200 rounded-lg text-[11px] text-amber-900 flex items-start gap-2">
                            <Utensils className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                            <span><strong>Recommended Dining:</strong> {currentDay.afternoon.foodRecommendation}</span>
                          </div>
                        )}
                      </div>

                      {/* 3. Evening Card */}
                      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-600/40 transition-colors">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                              <Sunset className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800">
                                Evening Sunset & Stroll · {currentDay.evening.duration}
                              </span>
                              <h5 className="text-base font-bold text-stone-900">
                                {currentDay.evening.title}
                              </h5>
                            </div>
                          </div>

                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((currentDay.evening.mapQuery || currentDay.evening.placeName) + ' Bilaspur Himachal Pradesh')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors shrink-0"
                          >
                            <MapPin className="w-3 h-3 text-rose-500" />
                            <span>Maps</span>
                            <ExternalLink className="w-3 h-3 text-stone-400" />
                          </a>
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed pl-10">
                          {currentDay.evening.description}
                        </p>

                        {currentDay.evening.sunsetOrVibe && (
                          <div className="mt-3 ml-10 p-2.5 bg-stone-50 rounded-lg border border-stone-200/80 text-[11px] text-stone-600 flex items-start gap-2">
                            <Moon className="w-3.5 h-3.5 text-indigo-700 shrink-0 mt-0.5" />
                            <span><strong>Atmosphere & Sunset:</strong> {currentDay.evening.sunsetOrVibe}</span>
                          </div>
                        )}
                      </div>

                      {/* Day Highlights: Recommended Food Spot & Artisan Product */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {currentDay.foodSpot && (
                          <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
                            <div className="flex items-center gap-2 mb-1">
                              <Utensils className="w-4 h-4 text-emerald-800" />
                              <span className="text-xs font-bold text-emerald-950">
                                Day Food Highlight: {currentDay.foodSpot.dish}
                              </span>
                            </div>
                            <p className="text-xs text-stone-700">
                              <strong>At:</strong> {currentDay.foodSpot.name}
                            </p>
                            <p className="text-[11px] text-stone-500 mt-1">
                              {currentDay.foodSpot.type} · Range: {currentDay.foodSpot.priceRange}
                            </p>
                          </div>
                        )}

                        {currentDay.artisanOrProduct && (
                          <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-200">
                            <div className="flex items-center gap-2 mb-1">
                              <ShoppingBag className="w-4 h-4 text-teal-800" />
                              <span className="text-xs font-bold text-teal-950">
                                Local Craft / Product: {currentDay.artisanOrProduct.item}
                              </span>
                            </div>
                            <p className="text-xs text-stone-700">
                              <strong>Where:</strong> {currentDay.artisanOrProduct.whereToBuy}
                            </p>
                            <p className="text-[11px] text-stone-500 mt-1">
                              {currentDay.artisanOrProduct.whySpecial}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Practical Tips Callout */}
                {plan.essentialTips && plan.essentialTips.length > 0 && (
                  <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-emerald-700" />
                      <span>Essential Bilaspur Travel Tips</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {plan.essentialTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
