export interface PlaceItem {
  id: string;
  name: string;
  category: 'Spiritual' | 'Lakes & Dams' | 'Nature & Ridge' | 'Heritage & History' | 'Adventure';
  tagline: string;
  description: string;
  location: string;
  experienceType: string;
  budgetLevel: 'Free' | 'Low' | 'Moderate';
  suitableFor: string[];
  bestTime: string;
  duration: string;
  highlights: string[];
  mapSearchQuery: string;
  image: string;
}

export interface FoodItem {
  id: string;
  name: string;
  type: 'Traditional Feast' | 'Street Delicacy' | 'Breakfast & Bread' | 'Sweet' | 'Curry & Dal';
  isVeg: boolean;
  tagline: string;
  description: string;
  ingredients: string;
  tasteProfile: string;
  whereToTry: string;
  priceEstimate: string;
  image?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'Handloom & Woolen' | 'Agri-Product' | 'Handicraft' | 'Culinary Preserves';
  tagline: string;
  description: string;
  artisanCommunity: string;
  whyUnique: string;
  priceRange: string;
  whereToBuy: string;
}

export interface LocalBusinessDemo {
  id: string;
  name: string;
  category: 'Local Food & Cafe' | 'Handicrafts & Souvenirs' | 'Adventure & Boating' | 'Farm & Honey';
  location: string;
  highlightOffer: string;
  description: string;
  priceTier: '₹' | '₹₹' | '₹₹₹';
  specialty: string;
  rating: number;
  contactSample: string;
}

export const BILASPUR_PLACES: PlaceItem[] = [
  {
    id: 'gobind-sagar',
    name: 'Gobind Sagar Lake',
    category: 'Lakes & Dams',
    tagline: 'Expansive emerald reservoir on the Sutlej river',
    description: 'A massive 56-km long artificial lake formed by Bhakra Dam. Renowned for scenic boat safaris, water sports (kayaking, speedboats), migratory bird watching in winter, and submerged ruins of old Bilaspur town during low-water months.',
    location: 'Bilaspur Town & Bhakra Basin, HP',
    experienceType: 'Scenic Boating, Watersports & Birding',
    budgetLevel: 'Low',
    suitableFor: ['Family', 'Couples', 'Photographers', 'Nature Lovers'],
    bestTime: 'October to May',
    duration: '2 - 4 hours',
    highlights: ['Speedboat rides & kayaking', 'Submerged temple spires visible in summer', 'Stunning mountain reflection sunsets'],
    mapSearchQuery: 'Gobind Sagar Lake Bilaspur Himachal Pradesh',
    image: '/images/destinations/gobind-sagar.jpg',
  },
  {
    id: 'bhakra-dam',
    name: 'Bhakra Dam',
    category: 'Lakes & Dams',
    tagline: 'One of the highest concrete gravity dams in the world',
    description: 'An architectural marvel standing 226 meters tall on the Sutlej river, hailed by Jawaharlal Nehru as a "Temple of Resurgent India". Offers panoramic views of the water cascade and hydro-engineering exhibits.',
    location: 'Bhakra, Bilaspur Border, HP',
    experienceType: 'Engineering Marvel & Panoramic Views',
    budgetLevel: 'Free',
    suitableFor: ['Family', 'History & Tech Buffs', 'Solo Travelers'],
    bestTime: 'Year-round (Entry permits required at checkpost)',
    duration: '2 - 3 hours',
    highlights: ['226m soaring height', 'Bhakra Power House viewpoint', 'Educational exhibits on modern Indian engineering'],
    mapSearchQuery: 'Bhakra Dam Bilaspur Himachal Pradesh',
    image: '/images/destinations/bhakra-dam.jpg',
  },
  {
    id: 'naina-devi',
    name: 'Shri Naina Devi Ji Temple',
    category: 'Spiritual',
    tagline: 'Venerated 51 Shakti Peeth atop triangular hill peak',
    description: 'Perched at 3,535 feet atop a triangular hill overlooking Gobind Sagar Lake, this revered shrine marks where Goddess Sati\'s eyes are believed to have fallen. Reachable by road or an exciting ropeway cable car.',
    location: 'Naina Devi Hill, Bilaspur District, HP',
    experienceType: 'Pilgrimage, Panoramic Ridge & Ropeway',
    budgetLevel: 'Low',
    suitableFor: ['Family', 'Devotees', 'Spiritual Seekers', 'Couples'],
    bestTime: 'Year-round, vibrant during Navratri',
    duration: '3 - 5 hours',
    highlights: ['Scenic aerial ropeway ride', '360° views of Anandpur Sahib & Gobind Sagar Lake', 'Deep spiritual tranquility and ancient rituals'],
    mapSearchQuery: 'Shri Naina Devi Ji Temple Bilaspur Himachal Pradesh',
    image: '/images/destinations/naina-devi.jpg',
  },
  {
    id: 'bandla-dhar',
    name: 'Bandla Dhar (Paragliding Ridge)',
    category: 'Adventure',
    tagline: 'High-altitude pine ridge and top paragliding launch',
    description: 'A 17-km long mountain ridge rising over 4,000 feet directly above Bilaspur town. Known as an emerging aero-sports haven for paragliding with smooth thermal currents and magnificent vistas of the Sutlej loop.',
    location: 'Bandla Ridge, 8 km from Bilaspur town',
    experienceType: 'Tandem Paragliding, Trekking & Sunset Overlook',
    budgetLevel: 'Moderate',
    suitableFor: ['Adventure Seekers', 'Photographers', 'Youth & Friends'],
    bestTime: 'October to April (clear thermal weather)',
    duration: '3 - 4 hours',
    highlights: ['Tandem paragliding joyflights', 'Crisp pine forest fragrance & camping points', 'Unobstructed sunset horizon over lower Himalayas'],
    mapSearchQuery: 'Bandla Dhar Bilaspur Himachal Pradesh',
    image: '/images/destinations/bandla-dhar.jpg',
  },
  {
    id: 'vyas-gufa',
    name: 'Vyas Cave (Vyas Gufa)',
    category: 'Heritage & History',
    tagline: 'Ancient meditative cave of Sage Ved Vyas',
    description: 'Located on the banks of the Sutlej river between the old and new Bilaspur towns. Ancient tradition holds that Sage Vyas, the author of the epic Mahabharata, meditated here, bestowing the historic name Vyaspur (modern Bilaspur).',
    location: 'Near Old Bus Stand, Bilaspur Town',
    experienceType: 'Ancient Cave Shrine & Historical Meditation Site',
    budgetLevel: 'Free',
    suitableFor: ['History Enthusiasts', 'Spiritual Seekers', 'Curious Travelers'],
    bestTime: 'Year-round',
    duration: '1 hour',
    highlights: ['Natural limestone cave alcove', 'Riverbank walking path', 'Origin story of the name Bilaspur / Vyaspur'],
    mapSearchQuery: 'Vyas Gufa Bilaspur Himachal Pradesh',
    image: '/images/destinations/vyas-gufa.jpg',
  },
  {
    id: 'markandeya-temple',
    name: 'Markandeya Ji Temple',
    category: 'Spiritual',
    tagline: 'Sacred natural water spring & Sage Markandeya ashram',
    description: 'Situated 20 km from Bilaspur town, this picturesque temple is named after Rishi Markandeya. A perennial sacred water spring flows through the shrine, where believers bathe for spiritual and therapeutic purification.',
    location: 'Markand Village, Bilaspur, HP',
    experienceType: 'Natural Spring Bath, Peaceful Forest Valley',
    budgetLevel: 'Free',
    suitableFor: ['Families', 'Senior Travelers', 'Culture Lovers'],
    bestTime: 'March to November, auspicious on Baisakhi',
    duration: '2 hours',
    highlights: ['Perennial medicinal spring Kund', 'Lush terraced valley setting', 'Rich Vedic lore and local community fair'],
    mapSearchQuery: 'Markandeya Ji Temple Bilaspur Himachal Pradesh',
    image: '/images/destinations/markandeya-temple.jpg',
  },
  {
    id: 'koldam-reservoir',
    name: 'Koldam & Sutlej Gorge',
    category: 'Nature & Ridge',
    tagline: 'Dramatic river gorge and clean energy reservoir',
    description: 'A major hydroelectric rock-fill dam built across the Sutlej River near Barmana. The reservoir is surrounded by steep limestone cliffs and pine hills, creating an awe-inspiring fjord-like canyon landscape.',
    location: 'Barmana / Koldam, Bilaspur District, HP',
    experienceType: 'Fjord-like Valley Views & Road Trip Scenery',
    budgetLevel: 'Free',
    suitableFor: ['Road Trippers', 'Photographers', 'Solo Explorers'],
    bestTime: 'September to April',
    duration: '2 hours',
    highlights: ['Steep limestone mountain gorge', 'Vibrant turquoise-green river water', 'Peaceful scenic drive away from highway crowds'],
    mapSearchQuery: 'Koldam Dam Bilaspur Himachal Pradesh',
    image: '/images/destinations/koldam.jpg',
  },
  {
    id: 'bahadurpur-fort',
    name: 'Bahadurpur Fort & Forest Ridge',
    category: 'Heritage & History',
    tagline: 'Highest peak of Bilaspur with historic fortress ruins',
    description: 'Resting at 6,500 feet atop Bahadurpur Dhar amidst towering Himalayan cedar (Deodar) and chir pine trees. Built by Raja Keshav Chand in the 17th century, it was the summer sanctuary of the Bilaspur princely rulers.',
    location: 'Bahadurpur Dhar, 40 km from Bilaspur town',
    experienceType: 'Cool Cedar Forest Hike & Heritage Exploration',
    budgetLevel: 'Free',
    suitableFor: ['Trekkers', 'Nature Lovers', 'Couples', 'History Buffs'],
    bestTime: 'March to June, September to November',
    duration: '4 - 5 hours (half day trip)',
    highlights: ['Cool microclimate with deodar groves', 'Panoramic sight of Shimla hills and Ropar plains', 'Ancient stone ramparts from the 1620s'],
    mapSearchQuery: 'Bahadurpur Fort Bilaspur Himachal Pradesh',
    image: '/images/destinations/bahadurpur-fort.jpg',
  }
];

export const BILASPUR_FOOD: FoodItem[] = [
  {
    id: 'himachali-dham',
    name: 'Himachali Bilaspuri Dham',
    type: 'Traditional Feast',
    isVeg: true,
    tagline: 'Royal festive multi-course vegetarian feast served on pattals',
    description: 'The pinnacle of Himachali hospitality prepared by traditional hereditary chefs (Botis). Bilaspuri Dham features Chana Madra cooked in spiced yogurt, Sepu Vadi, Khatta Moong dal, and sweet Boondi / Meethe Chawal.',
    ingredients: 'Pahari legumes, cultured yogurt, whole spices, mustard oil, dry ginger, fennel',
    tasteProfile: 'Warm, spiced, subtly sour (khatta) & sweet balance without onion/garlic',
    whereToTry: 'Speciality Himachali dhabas along NH-205 & local festival gatherings',
    priceEstimate: '₹150 - ₹250 per thali',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sepu-vadi',
    name: 'Sepu Vadi in Spinach Gravy',
    type: 'Curry & Dal',
    isVeg: true,
    tagline: 'Steamed urad dal dumplings slow-simmered in rich palak curd gravy',
    description: 'Golden fried lentil dumplings made from black gram (urad dal), tenderly simmered in a luscious gravy of garden-fresh spinach, whole coriander, and cultured curd. A staple of aristocratic Himachali dining.',
    ingredients: 'Urad dal, fresh spinach puree, mustard oil, curd, hing (asafoetida), cloves',
    tasteProfile: 'Earthy, herbaceous with silky texture and gentle tang',
    whereToTry: 'Local Bilaspur town rasoi dhabas and traditional family restaurants',
    priceEstimate: '₹120 - ₹180',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'siddu-ghee',
    name: 'Pahari Siddu with Desi Ghee',
    type: 'Breakfast & Bread',
    isVeg: true,
    tagline: 'Steamed fermented wheat bun stuffed with spiced walnut & poppy paste',
    description: 'A comforting mountain delicacy made of slow-fermented wheat dough stuffed with roasted poppy seeds (khaskhas), crushed walnuts, and hill herbs, steamed till fluffy and dipped generously in warm clarified butter.',
    ingredients: 'Wheat flour, yeast, poppy seeds, walnuts, coriander, pure mountain ghee',
    tasteProfile: 'Hearty, soft steamed texture, rich nutty and savory center',
    whereToTry: 'Roadside tea stalls around Swarghat, Bandla Dhar ridge kiosks',
    priceEstimate: '₹60 - ₹100 per piece',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'babru',
    name: 'Himachali Babru',
    type: 'Street Delicacy',
    isVeg: true,
    tagline: 'Deep-fried stuffed whole-wheat flatbread (Himachal\'s kachori)',
    description: 'Crispy yet tender puffed flatbread stuffed with a seasoned paste of soaked black gram dal. Typically eaten during mornings or rainy afternoons with tamarind chutney or sour potato curry.',
    ingredients: 'Whole wheat flour, black gram paste, cumin, red chili, mustard oil',
    tasteProfile: 'Crispy exterior, soft savory lentil interior, warm and satisfying',
    whereToTry: 'Old Bilaspur bazaar breakfast stalls & College road tea corners',
    priceEstimate: '₹40 - ₹70',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'patande',
    name: 'Bilaspuri Patande',
    type: 'Breakfast & Bread',
    isVeg: true,
    tagline: 'Paper-thin delicate mountain crepes served with jaggery syrup or kheer',
    description: 'Often called the "Pancake of the Hills", Patande is prepared from a smooth wheat batter poured thinly on a heated cast-iron tawa and folded into golden rolls. Relished with melted jaggery (gur) or homemade butter.',
    ingredients: 'Wheat flour, milk/water, cardamom, pure ghee',
    tasteProfile: 'Delicate, lightly sweet and comforting melt-in-mouth finish',
    whereToTry: 'Traditional homestays around Markand valley and local sweet makers',
    priceEstimate: '₹50 - ₹90',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sutlej-fish',
    name: 'Gobind Sagar Fresh Fish Fry',
    type: 'Street Delicacy',
    isVeg: false,
    tagline: 'Crispy spiced fresh water catch from Gobind Sagar Lake',
    description: 'Fresh Mahseer, Katla, and Silver Carp sustainably harvested by the Bilaspur Fishermen Co-operative Society from Gobind Sagar. Marinated in carom seeds (ajwain), ginger, and local spices, shallow-fried to perfection.',
    ingredients: 'Fresh lake fish, gram flour, carom seeds, turmeric, mustard oil',
    tasteProfile: 'Crispy skin, tender flaky fresh fish, zesty ajwain aroma',
    whereToTry: 'Fisheries Co-op stall near Gobind Sagar Ghat and NH-205 fish points',
    priceEstimate: '₹140 - ₹240',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
  }
];

export const BILASPUR_PRODUCTS: ProductItem[] = [
  {
    id: 'himachali-shawls',
    name: 'Handwoven Bilaspuri & Kullu Shawls',
    category: 'Handloom & Woolen',
    tagline: 'Warm pure wool shawls with traditional geometric borders',
    description: 'Artisanal shawls woven on pit looms by women weavers across the lower Sutlej valleys using Merino and local sheep wool, decorated with distinctive colorful temple motifs and borders.',
    artisanCommunity: 'Sutlej Valley Weavers Collective',
    whyUnique: 'Lightweight yet intensely warm with hand-inserted tapestry patterns',
    priceRange: '₹800 - ₹3,500',
    whereToBuy: 'Bilaspur Khadi Gramodyog Bhavan & District Handloom Emporium',
  },
  {
    id: 'sutlej-honey',
    name: 'Raw Himalayan Wild & Acacia Honey',
    category: 'Agri-Product',
    tagline: 'Unpasteurized monofloral honey from local apiaries',
    description: 'Pure amber honey gathered by indigenous Apis cerana bees foraging on wild acacia, wild apple, and sub-Himalayan forest blossoms around Barmana and Naina Devi foothills.',
    artisanCommunity: 'Bilaspur Beekeepers Farmer-Producer Organization',
    whyUnique: 'Cold-extracted without sugar syrup or heat degradation; rich in pollen',
    priceRange: '₹350 - ₹600 (500g)',
    whereToBuy: 'Local Agriculture Co-op booths, Swarghat organic stalls',
  },
  {
    id: 'pine-crafts',
    name: 'Pine Needle Eco-Baskets & Coasters',
    category: 'Handicraft',
    tagline: 'Zero-waste forest crafts woven from fallen Chir pine needles',
    description: 'Eco-conscious handicrafts hand-coiled from fallen dry pine needles gathered in Bandla pine forests. Prevents destructive forest fires while providing direct income to rural women self-help groups.',
    artisanCommunity: 'Bandla Hills Mahila Vikas Mandal',
    whyUnique: 'Biodegradable, fragrant with natural pine terpenes, durable spiral weave',
    priceRange: '₹120 - ₹650',
    whereToBuy: 'Bandla Viewpoint souvenir stall & District Handicrafts Fair',
  },
  {
    id: 'stone-fruit-preserves',
    name: 'Organic Plum & Apricot Chutneys',
    category: 'Culinary Preserves',
    tagline: 'Sun-cooked hill preserves made with wild herbs and raw jaggery',
    description: 'Farm-fresh preserves made from orchard-harvested stone fruits (chuli / wild apricot, plums, and galgal hill lemons) slow-cooked in copper vessels with whole spices and rock salt.',
    artisanCommunity: 'Swarghat Agro-Processing Self-Help Group',
    whyUnique: 'No artificial preservatives; traditional sun-drying fermentation recipe',
    priceRange: '₹150 - ₹300',
    whereToBuy: 'Bhakra Basin Farmers Mart & Swarghat highway outlets',
  }
];

export const BILASPUR_BUSINESSES: LocalBusinessDemo[] = [
  {
    id: 'biz-1',
    name: 'Gobind Sagar Water Sports & Eco-Boating Hub',
    category: 'Adventure & Boating',
    location: 'Luhnu Ground Pier, Bilaspur',
    highlightOffer: 'Speedboat lake safari & guided sunset kayaking on Gobind Sagar',
    description: 'Community-run boating counter providing certified life-jacket water excursions, pedal boats, and historic submerged temple sightseeing trips.',
    priceTier: '₹₹',
    specialty: '30-minute lake safari with safety gear',
    rating: 4.8,
    contactSample: '+91 98160-XXXXX (Demo Listing)',
  },
  {
    id: 'biz-2',
    name: 'Pahari Rasoi Traditional Dham Bhojnalaya',
    category: 'Local Food & Cafe',
    location: 'Main Highway Circle, Near New Bus Stand',
    highlightOffer: 'Authentic Bilaspuri Dham thali prepared fresh daily in brass deghs',
    description: 'Family-operated eatery serving authentic multi-course vegetarian feast with warm ghee, Madra, and Sepu Vadi, bringing village wedding flavors to visiting tourists.',
    priceTier: '₹',
    specialty: 'Authentic Bilaspuri Dham thali',
    rating: 4.9,
    contactSample: '+91 94180-XXXXX (Demo Listing)',
  },
  {
    id: 'biz-3',
    name: 'Bandla Ridge Paragliding & Cloud Cafe',
    category: 'Adventure & Boating',
    location: 'Bandla Dhar Takeoff Point (Altitude 1,374m)',
    highlightOffer: 'Tandem flights with licensed pilots + hot Siddu with mountain views',
    description: 'Adventure tourism outfit with government-certified pilots, GoPro 4K aerial recordings, and an open-air cedarwood terrace cafe overlooking the Sutlej loop.',
    priceTier: '₹₹₹',
    specialty: '15-min tandem flight with 4K video recording',
    rating: 4.9,
    contactSample: '+91 98055-XXXXX (Demo Listing)',
  },
  {
    id: 'biz-4',
    name: 'Kahlur Valley Handloom & Artisan Emporium',
    category: 'Handicrafts & Souvenirs',
    location: 'Chauggan Bazaar, Bilaspur Town',
    highlightOffer: 'Direct-from-weaver Himachali caps, shawls, and pine needle crafts',
    description: 'A cooperative showroom directly supporting 45+ women weavers and artisans across rural Bilaspur district. Guaranteed fair price and authenticity certificates.',
    priceTier: '₹₹',
    specialty: 'Pure wool handwoven shawls with GI certification',
    rating: 4.7,
    contactSample: '+91 94590-XXXXX (Demo Listing)',
  },
  {
    id: 'biz-5',
    name: 'Sutlej Apiaries & Hill Honey Collective',
    category: 'Farm & Honey',
    location: 'Swarghat Toll Bypass, Bilaspur',
    highlightOffer: 'Live beekeeping tour & free raw Himalayan honey tasting session',
    description: 'Sustainable beekeeping farm welcoming visitors to view wooden box beehives, taste fresh honeycomb, and purchase unprocessed acacia and mustard honey jars.',
    priceTier: '₹',
    specialty: 'Pure unprocessed raw forest honey',
    rating: 4.8,
    contactSample: '+91 98170-XXXXX (Demo Listing)',
  }
];

export const DEMO_TRIP_PRESETS = [
  {
    title: 'Family Day Trip',
    subtitle: 'Nature + Food + Scenic Calm',
    days: 1,
    budget: '₹1,500',
    budgetLevel: 'Budget',
    travelers: 'Family',
    pace: 'Relaxed',
    interests: ['Nature', 'Food', 'Spirituality'],
    description: 'A relaxing family itinerary starting with peaceful darshan at Markandeya temple, authentic Bilaspuri Dham lunch, and an afternoon boat ride on Gobind Sagar lake.'
  },
  {
    title: 'Adventure & Photography Weekend',
    subtitle: 'Ridge Heights & Water Sports',
    days: 2,
    budget: '₹4,000',
    budgetLevel: 'Moderate',
    travelers: 'Friends',
    pace: 'Balanced',
    interests: ['Adventure', 'Photography', 'Nature'],
    description: 'Action-packed 2-day circuit featuring tandem paragliding at Bandla Dhar, sunset photography over Sutlej loop, and Gobind Sagar speedboat safaris.'
  },
  {
    title: 'Spiritual & Heritage Pilgrimage',
    subtitle: 'Naina Devi & Ancient Vyas Gufa',
    days: 2,
    budget: '₹2,500',
    budgetLevel: 'Budget',
    travelers: 'Couple',
    pace: 'Relaxed',
    interests: ['Spirituality', 'Culture', 'Shopping'],
    description: 'Soulful exploration of Shri Naina Devi Ji Shakti Peeth with ropeway ride, historic Vyas Cave meditation spot, and visits to local weaver cooperatives.'
  }
];
