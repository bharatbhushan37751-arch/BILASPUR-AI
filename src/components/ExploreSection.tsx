import React, { useState } from 'react';
import { 
  MapPin, 
  ExternalLink, 
  Compass, 
  Utensils, 
  ShoppingBag, 
  Store, 
  Clock, 
  Wallet, 
  Star, 
  Search, 
  Info, 
  ShieldCheck, 
  HeartHandshake,
  Tag
} from 'lucide-react';
import { 
  BILASPUR_PLACES, 
  BILASPUR_FOOD, 
  BILASPUR_PRODUCTS, 
  BILASPUR_BUSINESSES,
  PlaceItem 
} from '../data/bilaspurData';

export const ExploreSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'places' | 'food' | 'products' | 'businesses'>('places');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [placeSubFilter, setPlaceSubFilter] = useState<string>('All');

  // Filter Places
  const filteredPlaces = BILASPUR_PLACES.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.experienceType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSub = placeSubFilter === 'All' || p.category === placeSubFilter;
    return matchesSearch && matchesSub;
  });

  // Filter Food
  const filteredFood = BILASPUR_FOOD.filter((f) => {
    return f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.tasteProfile.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Filter Products
  const filteredProducts = BILASPUR_PRODUCTS.filter((pr) => {
    return pr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pr.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pr.artisanCommunity.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Filter Businesses
  const filteredBusinesses = BILASPUR_BUSINESSES.filter((b) => {
    return b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.highlightOffer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <section className="py-16 bg-stone-50" id="explore">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-200/80 text-stone-800 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-emerald-800" />
            <span>Curated Directory · Bilaspur, Himachal Pradesh</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Explore Bilaspur
          </h2>
          <p className="text-stone-600 mt-2 text-base leading-relaxed">
            Discover historic mountain temples, tranquil emerald lakes, royal Himachali cuisine, and authentic crafts made by local artisans.
          </p>
        </div>

        {/* Category Navigation Bar & Search Input */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveCategory('places')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === 'places'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>Attractions & Sights ({BILASPUR_PLACES.length})</span>
            </button>

            <button
              onClick={() => setActiveCategory('food')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === 'food'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Utensils className="w-4 h-4 text-emerald-700" />
              <span>Himachali Food ({BILASPUR_FOOD.length})</span>
            </button>

            <button
              onClick={() => setActiveCategory('products')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === 'products'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              <span>Local Products ({BILASPUR_PRODUCTS.length})</span>
            </button>

            <button
              onClick={() => setActiveCategory('businesses')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === 'businesses'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Store className="w-4 h-4 text-emerald-700" />
              <span>Local Businesses ({BILASPUR_BUSINESSES.length})</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places, food, crafts..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
            />
          </div>
        </div>

        {/* 1. PLACES TAB */}
        {activeCategory === 'places' && (
          <div className="space-y-6">
            {/* Sub-filter chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-stone-400 text-xs uppercase font-bold tracking-wider mr-1">Filter:</span>
              {['All', 'Lakes & Dams', 'Spiritual', 'Adventure', 'Heritage & History', 'Nature & Ridge'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPlaceSubFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    placeSubFilter === cat
                      ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Places Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => (
                <div
                  key={place.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
                >
                  {/* Image container */}
                  <div className="relative h-48 bg-stone-900 overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-semibold tracking-wider text-emerald-900 bg-emerald-50/90 px-2 py-0.5 rounded shadow-xs">
                        {place.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs text-stone-300 font-medium">{place.location}</p>
                      <h4 className="text-lg font-bold leading-tight text-white">{place.name}</h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                    <div>
                      <p className="text-xs font-semibold text-emerald-800 mb-1">
                        {place.tagline}
                      </p>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {place.description}
                      </p>

                      {/* Highlights */}
                      <div className="mt-3 space-y-1">
                        {place.highlights.map((h, i) => (
                          <div key={i} className="text-[11px] text-stone-500 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metadata Specs & Maps Button */}
                    <div className="pt-3 border-t border-stone-100 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-stone-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>{place.duration}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Wallet className="w-3 h-3 text-stone-400" />
                          <span>{place.budgetLevel} Entry</span>
                        </span>
                      </div>

                      {/* Mandated Button: View on Google Maps */}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' Bilaspur Himachal Pradesh')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 px-3 bg-stone-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 group/btn"
                      >
                        <MapPin className="w-3.5 h-3.5 text-rose-400 group-hover/btn:scale-110 transition-transform" />
                        <span>View on Google Maps</span>
                        <ExternalLink className="w-3 h-3 text-stone-400" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. LOCAL FOOD TAB */}
        {activeCategory === 'food' && (
          <div className="space-y-6">
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
              <Utensils className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Authentic Himachali & Bilaspuri Gastronomy</p>
                <p className="mt-0.5 text-emerald-900">
                  Unlike standard restaurant menus, Bilaspur boasts centuries-old culinary traditions like royal vegetarian Dham served on leaf platters, aromatic Sepu Vadi, and fresh lake fish harvested from Gobind Sagar.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFood.map((food) => (
                <div
                  key={food.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
                >
                  {food.image && (
                    <div className="h-44 bg-stone-900 overflow-hidden relative">
                      <img
                        src={food.image}
                        alt={food.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs ${
                          food.isVeg ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                        }`}>
                          {food.isVeg ? '100% Vegetarian' : 'Fresh Catch / Non-Veg'}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-emerald-800">
                          {food.type}
                        </span>
                        <span className="text-xs font-bold text-stone-700">
                          {food.priceEstimate}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-stone-900 mt-1">
                        {food.name}
                      </h4>
                      <p className="text-xs text-stone-500 italic mt-0.5">
                        {food.tagline}
                      </p>
                      <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                        {food.description}
                      </p>

                      <div className="mt-3 p-2.5 bg-stone-50 rounded-lg border border-stone-200/80 text-[11px] text-stone-600 space-y-1">
                        <p><strong>Flavor Profile:</strong> {food.tasteProfile}</p>
                        <p><strong>Ingredients:</strong> {food.ingredients}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100">
                      <div className="text-[11px] text-stone-500">
                        <span className="font-semibold text-stone-700">Where to try:</span> {food.whereToTry}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. LOCAL PRODUCTS TAB */}
        {activeCategory === 'products' && (
          <div className="space-y-6">
            <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200 text-xs text-teal-950 flex items-start gap-2.5">
              <ShoppingBag className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Supporting Local Artisans & Rural Collectives</p>
                <p className="mt-0.5 text-teal-900">
                  Every product listed directly supports women handloom weavers, forest pine needle artisans, and local apiculturists in Bilaspur district.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:border-emerald-600/40 transition-colors text-left flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        {prod.category}
                      </span>
                      <span className="text-xs font-bold text-stone-800">
                        {prod.priceRange}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-stone-900">
                      {prod.name}
                    </h4>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {prod.description}
                    </p>

                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1.5 text-xs text-stone-600">
                      <p><strong>Producer Collective:</strong> {prod.artisanCommunity}</p>
                      <p><strong>Why It&apos;s Special:</strong> {prod.whyUnique}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500">
                      <strong>Where to buy:</strong> {prod.whereToBuy}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. LOCAL BUSINESSES (DEMO DIRECTORY) */}
        {activeCategory === 'businesses' && (
          <div className="space-y-6">
            <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-300 text-xs text-amber-950 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold uppercase tracking-wide">Sample Local Business Directory</p>
                <p className="mt-0.5 text-amber-900 leading-relaxed">
                  These realistic listings demonstrate how Bilaspur AI provides discovery and footfall for grassroots family businesses, water sports operators, and local weavers. Clearly labeled as sample demo entries.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((biz) => (
                <div
                  key={biz.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between text-left relative"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                        Demo Listing
                      </span>
                      <span className="text-xs font-semibold text-stone-500">
                        Tier: {biz.priceTier}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-stone-900 leading-snug">
                        {biz.name}
                      </h4>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span>{biz.location}</span>
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
                      <p className="text-[11px] font-bold text-emerald-950 uppercase tracking-wide">
                        Signature Offering
                      </p>
                      <p className="text-xs text-emerald-900 mt-0.5">
                        {biz.highlightOffer}
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {biz.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{biz.rating} (Simulated)</span>
                    </div>
                    <span className="text-[11px] text-stone-400 font-mono">
                      {biz.contactSample}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
