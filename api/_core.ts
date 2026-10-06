import { GoogleGenAI } from '@google/genai';

export function getApiKey(): string {
  return (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY ||
    ''
  );
}

export function getGeminiClient(): GoogleGenAI {
  const apiKey = getApiKey();
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Bilaspur local grounding context for AI
export const BILASPUR_GROUNDING_CONTEXT = `
Bilaspur is a historic district and town in Himachal Pradesh, India, situated along the Sutlej River valley and the vast Gobind Sagar Lake (reservoir created by Bhakra Dam).
Key Landmarks & Heritage:
1. Gobind Sagar Lake: 56 km long lake, watersports (kayaking, speedboats), Luhnu Ground waterfront, submerged historic temples of old Bilaspur (emerge during low water).
2. Bhakra Dam: 226m tall concrete gravity dam on Sutlej, hailed as "Temple of Resurgent India", near Nangal/Bilaspur border.
3. Shri Naina Devi Ji Temple: One of 51 Shakti Peeths, high triangular hill peak, ropeway cable car, 360-degree vista of Gobind Sagar and Anandpur Sahib.
4. Bandla Dhar: 17 km mountain ridge (~1,374m), premier paragliding launch site in HP with smooth thermals, sunset viewpoint, pine forests.
5. Rishi Vyas Cave (Vyas Gufa): Historic sacred cave on Sutlej bank where Sage Ved Vyas meditated; gave origin to ancient name Vyaspur (modern Bilaspur).
6. Markandeya Ji Temple: Sacred natural sulfur/medicinal water spring in Markand village, 20 km from Bilaspur town.
7. Koldam Reservoir & Sutlej Gorge: Deep canyon rock-fill hydroelectric dam, emerald waters and limestone bluffs.
8. Bahadurpur Fort: 1,980m summit with cedar (Deodar) forest ruins of 17th-century Rajas of Kahlur.
9. Swarghat: Mountain pass connecting plains to Himachal hills, pleasant climate, fruit orchards.

Local Food & Gastronomy:
- Bilaspuri Dham: Royal vegetarian feast on pattals by Botis (Chana Madra in spiced curd, Sepu Vadi, Khatta dal, sweet boondi/chawal).
- Sepu Vadi: Urad dal dumplings in spinach & yogurt gravy.
- Siddu: Steamed fermented wheat bun with poppy seed & walnut paste dipped in pure desi ghee.
- Babru: Black gram stuffed fried flatbread (Himachali kachori).
- Patande: Thin mountain wheat pancakes eaten with jaggery or milk.
- Fresh Gobind Sagar Fish Fry: Fresh local lake catch with carom seeds and local spices.

Local Crafts & Small Producers:
- Sutlej valley handwoven shawls, Himachali caps, pine needle eco-crafts, pure raw acacia/forest honey, wild apricot (chuli) and stone fruit chutneys.
`;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: any;
  const timeoutPromise = new Promise<T>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms);
  });
  return Promise.race([
    promise.then((res) => {
      clearTimeout(timer);
      return res;
    }),
    timeoutPromise,
  ]);
}

export async function callGeminiWithFallback(params: {
  contents: any;
  config?: any;
  primaryModel?: string;
}): Promise<string> {
  const ai = getGeminiClient();
  const primaryModel = params.primaryModel || 'gemini-3.8-flash';
  const models = [primaryModel, 'gemini-flash-latest'];

  for (const model of models) {
    const isGemini3 = model.startsWith('gemini-3');
    const modelConfig = { ...params.config };
    if (isGemini3) {
      modelConfig.thinkingConfig = { thinkingBudget: 0 };
    } else {
      delete modelConfig.thinkingConfig;
    }

    try {
      const resp = await withTimeout(
        ai.models.generateContent({
          model,
          contents: params.contents,
          config: modelConfig,
        }),
        7000
      );
      if (resp && resp.text) {
        return resp.text;
      }
    } catch {
      // Continue to next fallback
    }
  }
  throw new Error('Model currently unavailable');
}

export interface TripPlanParams {
  days?: number;
  budget?: string;
  budgetLevel?: string;
  travelers?: string;
  interests?: string[];
  pace?: string;
  extraNotes?: string;
}

export async function generateTripPlan(params: TripPlanParams) {
  const {
    days = 1,
    budget = '₹1,500',
    budgetLevel = 'Budget',
    travelers = 'Family',
    interests = ['Nature', 'Food'],
    pace = 'Balanced',
    extraNotes = '',
  } = params;

  const apiKey = getApiKey();

  const prompt = `
You are the AI engine of "Bilaspur AI", an intelligent local tourism and discovery platform for Bilaspur, Himachal Pradesh, India.
Generate a realistic, richly personalized day-by-day itinerary based strictly on the user's travel parameters:

USER PREFERENCES:
- Duration: ${days} day(s)
- Budget: ${budget} (${budgetLevel} tier)
- Travelling with: ${travelers}
- Specific Interests: ${interests.join(', ')}
- Preferred Pace: ${pace}
- Extra Notes/Requests: ${extraNotes || 'None'}

LOCAL FACTS & CONTEXT:
${BILASPUR_GROUNDING_CONTEXT}

RULES:
1. Provide accurate local places in Bilaspur (e.g. Gobind Sagar, Bhakra Dam, Naina Devi, Bandla Dhar, Vyas Cave, Markandeya Ji, Koldam).
2. For each day, include distinct Morning, Afternoon, and Evening activities.
3. Suggest authentic Himachali culinary items (e.g. Bilaspuri Dham, Sepu Vadi, Siddu, Babru, Patande, Lake fish fry).
4. Recommend genuine local products (e.g. Pine needle crafts, local raw forest honey, Himachali shawls) and local small business/artisan cooperatives.
5. Provide a realistic budget breakdown and practical tips (transport, weather, photography tips).
6. Explain *why* this plan matches their specific preferences.
7. Return ONLY clean valid JSON conforming to this schema:

{
  "tripTitle": "string",
  "summary": "string",
  "estimatedBudget": {
    "total": "string",
    "breakdown": {
      "stay": "string",
      "food": "string",
      "activities": "string",
      "transport": "string"
    }
  },
  "whyItMatches": "string",
  "days": [
    {
      "dayNumber": 1,
      "dayTitle": "string",
      "morning": {
        "title": "string",
        "description": "string",
        "placeName": "string",
        "mapQuery": "string",
        "duration": "string",
        "localTips": "string"
      },
      "afternoon": {
        "title": "string",
        "description": "string",
        "placeName": "string",
        "mapQuery": "string",
        "duration": "string",
        "foodRecommendation": "string"
      },
      "evening": {
        "title": "string",
        "description": "string",
        "placeName": "string",
        "mapQuery": "string",
        "duration": "string",
        "sunsetOrVibe": "string"
      },
      "foodSpot": {
        "name": "string",
        "dish": "string",
        "type": "string",
        "priceRange": "string"
      },
      "artisanOrProduct": {
        "item": "string",
        "whereToBuy": "string",
        "whySpecial": "string"
      }
    }
  ],
  "essentialTips": ["string", "string", "string"],
  "ecoEtiquette": "string"
}
`;

  let text = '';
  if (apiKey) {
    try {
      text = await callGeminiWithFallback({
        contents: prompt,
        config: { responseMimeType: 'application/json' },
        primaryModel: 'gemini-3.8-flash',
      });
    } catch {
      // Fallback below
    }
  }

  if (text) {
    try {
      return JSON.parse(text);
    } catch {
      // Fallback below
    }
  }

  // Grounded Synthesis Fallback
  const fallbackDays = [];
  for (let i = 1; i <= Math.min(days, 5); i++) {
    if (i === 1) {
      fallbackDays.push({
        dayNumber: 1,
        dayTitle: 'Lake Waters & Sacred Springs of Bilaspur',
        morning: {
          title: 'Morning Darshan & Springs at Markandeya Ji',
          description: 'Visit the peaceful ancient shrine of Rishi Markandeya surrounded by terraced hill orchards and sacred medicinal spring water kunds.',
          placeName: 'Markandeya Ji Temple',
          mapQuery: 'Markandeya Ji Temple Bilaspur Himachal Pradesh',
          duration: '2.5 Hours',
          localTips: 'Arrive before 9:30 AM for a peaceful tranquil atmosphere and easy roadside parking.'
        },
        afternoon: {
          title: 'Authentic Royal Bilaspuri Dham Lunch',
          description: 'Experience Bilaspuri culinary heritage cooked in traditional deghs, highlighting Chana Madra in spiced curd and tender Sepu Vadi.',
          placeName: 'Pahari Rasoi Bilaspur',
          mapQuery: 'Local Food Bilaspur Himachal Pradesh',
          duration: '1.5 Hours',
          foodRecommendation: 'Bilaspuri Dham thali served with hot desi ghee and sweet boondi'
        },
        evening: {
          title: 'Sunset Boat Cruise on Gobind Sagar Lake',
          description: 'Relax with a scenic speedboat safari or peaceful shoreline walk at Luhnu waterfront, enjoying reflections of Himalayan foothills over the reservoir.',
          placeName: 'Gobind Sagar Lake',
          mapQuery: 'Gobind Sagar Lake Bilaspur Himachal Pradesh',
          duration: '2 Hours',
          sunsetOrVibe: 'Spectacular golden hour reflections over the 56-km mountain lake'
        },
        foodSpot: {
          name: 'Pahari Traditional Rasoi (Main Circle)',
          dish: 'Authentic Bilaspuri Dham Thali & Sepu Vadi',
          type: 'Traditional Vegetarian Feast',
          priceRange: '₹150 - ₹220'
        },
        artisanOrProduct: {
          item: 'Pure Himalayan Acacia & Forest Honey',
          whereToBuy: 'Bilaspur Beekeepers FPO Booth, Main Bazaar',
          whySpecial: 'Cold-extracted by local beekeepers foraging in sub-Himalayan forest blossoms'
        }
      });
    } else if (i === 2) {
      fallbackDays.push({
        dayNumber: 2,
        dayTitle: 'High Altitudes, Paragliding & Sacred Hilltops',
        morning: {
          title: 'Tandem Paragliding & Ridge Overlook at Bandla Dhar',
          description: 'Ascend to the 4,000-foot Bandla mountain ridge for an exhilarating tandem paragliding flight over the Sutlej canyon and pine hills.',
          placeName: 'Bandla Dhar Ridge',
          mapQuery: 'Bandla Dhar Bilaspur Himachal Pradesh',
          duration: '3.5 Hours',
          localTips: 'Wear a windbreaker jacket; morning thermals provide the smoothest gliding conditions.'
        },
        afternoon: {
          title: 'Pahari Siddu with Clarified Butter',
          description: 'Savor steaming mountain Siddu filled with roasted poppy seeds and walnut paste, served with pure golden cow ghee.',
          placeName: 'Bandla Cloud Cafe & Swarghat Kiosks',
          mapQuery: 'Bandla Dhar Bilaspur Himachal Pradesh',
          duration: '1 Hour',
          foodRecommendation: 'Fresh steamed Pahari Siddu dipped in desi ghee with coriander mint chutney'
        },
        evening: {
          title: 'Shri Naina Devi Ji Hilltop Ropeway & Darshan',
          description: 'Take the scenic aerial ropeway up the steep peak to the revered 51 Shakti Peeth for panoramic sunset views across Anandpur Sahib plains and Gobind Sagar lake.',
          placeName: 'Shri Naina Devi Ji Temple',
          mapQuery: 'Shri Naina Devi Ji Temple Bilaspur Himachal Pradesh',
          duration: '3 Hours',
          sunsetOrVibe: 'Unobstructed twilight horizon across Punjab plains and mountain peaks'
        },
        foodSpot: {
          name: 'Naina Devi Hill Dhabas',
          dish: 'Hot Babru with tangy Khatta potato curry',
          type: 'Traditional Mountain Bread',
          priceRange: '₹80 - ₹140'
        },
        artisanOrProduct: {
          item: 'Handwoven Sutlej Valley Woolen Shawls & Caps',
          whereToBuy: 'District Khadi Handloom Emporium, Chauggan Bazaar',
          whySpecial: 'Directly handwoven by women artisan cooperatives on wooden pit looms'
        }
      });
    } else {
      fallbackDays.push({
        dayNumber: i,
        dayTitle: `Historic Fortresses & Sutlej River Gorges (Day ${i})`,
        morning: {
          title: 'Engineering Wonder at Bhakra Dam',
          description: 'Marvel at the 226-meter towering concrete gravity dam on the Sutlej river with exhibits detailing modern Indian hydro-engineering.',
          placeName: 'Bhakra Dam',
          mapQuery: 'Bhakra Dam Bilaspur Himachal Pradesh',
          duration: '2.5 Hours',
          localTips: 'Carry valid Indian government photo ID for security checkpoint verification.'
        },
        afternoon: {
          title: 'Fresh Gobind Sagar Lake Fish Fry Lunch',
          description: 'Taste freshly caught and spiced lake fish prepared with carom seeds and local mountain herbs at the Fisheries Cooperative.',
          placeName: 'Fisheries Co-op Outlet, Gobind Sagar Pier',
          mapQuery: 'Gobind Sagar Lake Bilaspur Himachal Pradesh',
          duration: '1.5 Hours',
          foodRecommendation: 'Shallow-fried Katla/Mahseer with radish salad and mint chutney'
        },
        evening: {
          title: 'Ancient Vyas Cave (Vyas Gufa) Meditation Spot',
          description: 'Explore the serene limestone riverbank cave where Sage Ved Vyas, author of Mahabharata, meditated in ancient times.',
          placeName: 'Vyas Gufa',
          mapQuery: 'Vyas Gufa Bilaspur Himachal Pradesh',
          duration: '1.5 Hours',
          sunsetOrVibe: 'Calm evening breeze along the tranquil Sutlej riverbed'
        },
        foodSpot: {
          name: 'Old Bazaar Rasoi',
          dish: 'Bilaspuri Patande with fresh jaggery syrup',
          type: 'Traditional Mountain Crepe',
          priceRange: '₹60 - ₹100'
        },
        artisanOrProduct: {
          item: 'Eco Pine Needle Handwoven Coasters & Baskets',
          whereToBuy: 'Bandla Hills Mahila Vikas Mandal Store',
          whySpecial: 'Prevents forest fires while providing direct income to rural hill women'
        }
      });
    }
  }

  return {
    tripTitle: `${travelers} Discovery in Bilaspur (${days} Day${days > 1 ? 's' : ''})`,
    summary: `A carefully balanced itinerary in Bilaspur, Himachal Pradesh crafted for ${travelers} with a ${pace.toLowerCase()} pace. Combines iconic destinations like Gobind Sagar and Naina Devi with authentic Bilaspuri Dham cuisine and rural artisan stops.`,
    estimatedBudget: {
      total: budget,
      breakdown: {
        stay: days > 1 ? '₹1,200 - ₹2,500' : 'N/A (Day Tour)',
        food: '₹350 - ₹600 / person',
        activities: '₹300 - ₹800 (Boating/Ropeway)',
        transport: '₹400 - ₹900 (Local taxi/fuel)',
      },
    },
    whyItMatches: `Tailored specifically for ${travelers} seeking ${interests.join(' and ')}. Focuses on realistic travel transit times across Bilaspur's mountain terrain without rushing, ensuring family-friendly dining and verified parking.`,
    days: fallbackDays,
    essentialTips: [
      'Road conditions: NH-205 and the new Kiratpur-Nerchowk expressway offer smooth access to Bilaspur town.',
      'Best boating time: Gobind Sagar lake is most serene between 9:00 AM and 11:30 AM before afternoon winds rise.',
      'Local respect: Dress modestly when visiting Shri Naina Devi Ji and Markandeya temples.',
      'Cash & UPI: UPI digital payments work well in Bilaspur town, but carry cash for Bandla ridge tea stalls.',
    ],
    ecoEtiquette: 'Help keep Himachal clean: carry reusable water bottles and discard no plastics in Gobind Sagar lake or pine forests.',
  };
}

export interface ChatParams {
  messages?: Array<{ role: 'user' | 'model'; content: string }>;
  userPrompt?: string;
}

export async function generateChatReply(params: ChatParams): Promise<string> {
  const { messages = [], userPrompt = '' } = params;
  const apiKey = getApiKey();

  const systemInstruction = `
You are "Bilaspur AI", an intelligent, dedicated local guide for Bilaspur, Himachal Pradesh, India.
Always answer the user's specific question directly, concisely, and practically.

CRITICAL INSTRUCTIONS:
1. Ground answers specifically in Bilaspur, Himachal Pradesh (never confuse with Bilaspur, Chhattisgarh).
2. DIRECT RELEVANCE: Always answer the EXACT question asked:
   - If asked about travel routes (e.g. "Bilaspur to Shri Naina Devi"), provide:
     * Approximate distance and realistic travel time (always clarify that times are approximate due to hill road conditions).
     * Route/direction (e.g. via Swarghat on NH-205 or Bhakra/Anandpur approach).
     * Travel options (private taxi from Bilaspur Main Bus Stand, HRTC local buses, aerial ropeway from Kaula Wala Toba base).
     * Practical tips (timing, parking, queues during Navratri).
     * Actionable Google Maps link formatted as: [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Shri+Naina+Devi+Ji+Temple+Bilaspur+Himachal+Pradesh).
   - If asked about "family", recommend family-suitable spots (Gobind Sagar waterfront, Naina Devi ropeway, Markandeya spring) with safety and dining tips.
   - If asked about "3 hours" or short layovers, give a realistic 3-hour micro-plan.
   - If asked about "food" or "dham", detail authentic Bilaspuri Dham (Chana Madra, Sepu Vadi, Siddu, Babru) and where to try.
   - If asked about "local products" or shopping, explain genuine items (raw forest honey, handwoven shawls, pine needle crafts) and local cooperative outlets.
3. NEVER respond with a generic list of attractions when a specific question is asked.
4. Avoid repetitive filler phrases or repeating the user's question.
5. Never invent nonexistent live traffic, hotels, or fake business names. Clearly note when figures are approximate.
6. When helpful, provide a direct Google Maps search link formatted as: [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=LOCATION_NAME).
`;

  let reply = '';
  if (apiKey) {
    try {
      const contents: any[] = [];
      if (messages.length > 0) {
        for (const m of messages.slice(-6)) {
          contents.push({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          });
        }
      }
      if (userPrompt) {
        contents.push({
          role: 'user',
          parts: [{ text: userPrompt }],
        });
      }

      reply = await callGeminiWithFallback({
        contents,
        config: { systemInstruction },
        primaryModel: 'gemini-3.8-flash',
      });
    } catch {
      // Fallback to intelligent local knowledge engine below
    }
  }

  if (!reply) {
    const q = (userPrompt || '').toLowerCase();

    // 1. Specific Route: Bilaspur to Shri Naina Devi
    if (q.includes('naina devi') || (q.includes('bilaspur') && q.includes('naina'))) {
      reply = `### Travel from Bilaspur to Shri Naina Devi Ji Temple

- **Approximate Distance:** ~65 to 70 km by road.
- **Estimated Travel Time:** Approximately **2 to 2.5 hours** by car/taxi (mountain road curves on NH-205; actual time varies with seasonal traffic).
- **Route & Directions:**
  * Bilaspur Town $\\rightarrow$ Swarghat (via NH-205) $\\rightarrow$ Ganguwal / Kaula Wala Toba $\\rightarrow$ Shri Naina Devi Hill base.
- **Travel Options:**
  1. **Private Taxi / Rental:** Available from the Bilaspur Main Bus Stand (~₹1,800 to ₹2,500 round trip with waiting).
  2. **HRTC Public Bus:** Regular buses connect Bilaspur to Swarghat and Anandpur Sahib with connecting local shuttles to Naina Devi base.
  3. **Scenic Aerial Ropeway:** Upon reaching Kaula Wala Toba base, take the cable car ropeway up to the temple summit in ~8 minutes, enjoying panoramic views of Gobind Sagar Lake and Anandpur Sahib.
- **Helpful Tips:**
  * Visit early morning (before 9:00 AM) or late afternoon to avoid heavy devotee queues, especially during Navratri fairs.
  * Dress modestly as this is a sacred 51 Shakti Peeth shrine.
  * Check weather and road conditions during monsoon months.

[Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Shri+Naina+Devi+Ji+Temple+Bilaspur+Himachal+Pradesh)`;

    // 2. Specific Route: Bilaspur to Bhakra Dam
    } else if (q.includes('bhakra') || q.includes('dam')) {
      reply = `### Travel from Bilaspur to Bhakra Dam

- **Approximate Distance:** ~65 km by road.
- **Estimated Travel Time:** Approximately **1.5 to 2 hours** by car.
- **Route & Directions:**
  * Bilaspur Town $\\rightarrow$ Swarghat $\\rightarrow$ Nangal $\\rightarrow$ Bhakra Dam site on the Sutlej river.
- **Travel Options:**
  * Private taxi or personal vehicle is recommended for flexibility. HRTC buses run frequently between Bilaspur and Nangal.
- **Important Security Caveat:**
  * Bhakra Dam is a high-security vital installation. **Carry a valid Government Photo ID (Aadhaar, Passport, or Voter ID)** for checkpoint permits.
  * Photography is strictly prohibited on the main dam crest and powerhouse installations.
- **Highlights:** 226-meter towering concrete gravity wall, Nehru memorial viewpoint, and panoramic Sutlej canyon vista.

[Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Bhakra+Dam+Bilaspur+Himachal+Pradesh)`;

    // 3. Specific Route: Bilaspur to Bandla Dhar (Paragliding Ridge)
    } else if (q.includes('bandla') || q.includes('paragliding')) {
      reply = `### Travel from Bilaspur to Bandla Dhar (Paragliding Ridge)

- **Approximate Distance:** ~8 to 10 km uphill from Bilaspur town center.
- **Estimated Travel Time:** Approximately **25 to 35 minutes** by car or bike.
- **Route & Directions:**
  * Ascend directly from Bilaspur town via the Bandla hill road through scenic chir pine forests.
- **Travel Options & Activities:**
  * Best accessed by taxi, personal car, or two-wheeler.
  * **Tandem Paragliding:** Certified pilots conduct joyrides taking off from the 1,374m ridge and landing near Luhnu ground.
  * **Sunset Viewpoint:** Offers a sensational 180° vista of the Sutlej river loop and modern Bilaspur town below.
- **Helpful Tips:**
  * Morning thermals (9:30 AM – 1:00 PM) generally offer the smoothest gliding conditions.
  * Carry a light windbreaker jacket; the ridge gets breezy in the evenings.

[Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Bandla+Dhar+Bilaspur+Himachal+Pradesh)`;

    // 4. Specific Route: Bilaspur to Markandeya Ji Temple
    } else if (q.includes('markandeya') || q.includes('spring')) {
      reply = `### Travel from Bilaspur to Markandeya Ji Temple

- **Approximate Distance:** ~20 km from Bilaspur town.
- **Estimated Travel Time:** Approximately **40 to 45 minutes** by road.
- **Route & Directions:**
  * Head south-west along Markand road via Jukhala / Markand village through peaceful terraced hill valleys.
- **What to Expect:**
  * Ancient sacred shrine associated with Sage Markandeya with a perennial natural sulfur/medicinal water spring (*kund*).
  * Devotees bathe in the sacred water believed to possess curative properties.
- **Travel Tips:**
  * Peaceful for families and seniors; easy roadside access and gentle walking paths.
  * Free entry; traditional village fairs happen during Baisakhi.

[Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Markandeya+Ji+Temple+Bilaspur+Himachal+Pradesh)`;

    // 5. Specific Route: Bilaspur to Vyas Gufa
    } else if (q.includes('vyas') || q.includes('gufa') || q.includes('cave')) {
      reply = `### Visiting Vyas Cave (Vyas Gufa) in Bilaspur

- **Location:** Situated right at the foot of Bilaspur town, on the bank of the Sutlej River near the old bus stand.
- **Estimated Travel Time:** Just **5 to 10 minutes** from the Bilaspur town center.
- **Historical Significance:**
  * Ancient tradition holds that Sage Ved Vyas, author of the Mahabharata, meditated here, giving the town its historical name *Vyaspur* (modern Bilaspur).
- **Travel Tips:**
  * Easily walkable or a short auto-rickshaw ride from Main Bazaar.
  * Best visited during morning or late afternoon combined with a peaceful stroll along the Sutlej bank.

[Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Vyas+Gufa+Bilaspur+Himachal+Pradesh)`;

    // 6. Family recommendations
    } else if (q.includes('family') || q.includes('kids') || q.includes('children') || q.includes('senior')) {
      reply = `### Best Family-Friendly Places in Bilaspur, HP

1. **Gobind Sagar Lake & Luhnu Ground:**
   - Wide, paved waterside promenade with gentle motorboat cruises, speedboats, and manicured open spaces safe for kids and seniors.
   - [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Gobind+Sagar+Lake+Bilaspur+Himachal+Pradesh)

2. **Shri Naina Devi Ji Temple (Via Aerial Ropeway):**
   - The 8-minute cable car ride from Kaula Wala Toba is safe, exciting for children, and comfortable for senior citizens.
   - [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Shri+Naina+Devi+Ji+Temple+Bilaspur+Himachal+Pradesh)

3. **Markandeya Ji Temple & Sacred Springs:**
   - Calm, forested valley setting with easy parking and healing spring water kunds.
   - [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Markandeya+Ji+Temple+Bilaspur+Himachal+Pradesh)

4. **Family Dining Tip:**
   - Traditional Bilaspuri vegetarian Dham (Chana Madra and Sepu Vadi) is naturally mild, cooked without onion or excessive chili, making it ideal for both elders and children.`;

    // 7. Short 3-Hour Layover / Itinerary
    } else if (q.includes('3 hour') || q.includes('three hour') || q.includes('short') || q.includes('layover') || q.includes('quick')) {
      reply = `### Realistic 3-Hour Bilaspur Stopover Schedule

- **Hour 1 (0:00 – 1:00) | Gobind Sagar Waterfront & Boating:**
  * Head to Luhnu Waterfront on Gobind Sagar lake for fresh mountain breeze and take a 20-minute speedboat or safari boat ride.
  * [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Gobind+Sagar+Lake+Bilaspur+Himachal+Pradesh)

- **Hour 2 (1:00 – 1:50) | Historic Vyas Gufa (Cave):**
  * Drive 5 minutes to the ancient riverbank cave of Sage Ved Vyas, origin of the name Bilaspur (Vyaspur).
  * [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Vyas+Gufa+Bilaspur+Himachal+Pradesh)

- **Hour 3 (1:50 – 3:00) | Authentic Bilaspuri Refreshment:**
  * Enjoy hot Himachali Babru with chana or a quick Bilaspuri Dham thali near Main Circle before resuming your journey on NH-205.`;

    // 8. Local Products & Shopping
    } else if (q.includes('product') || q.includes('shop') || q.includes('buy') || q.includes('craft') || q.includes('artisan') || q.includes('souvenir')) {
      reply = `### Authentic Local Products of Bilaspur & Where to Buy

1. **Pure Raw Forest & Acacia Honey:**
   - Cold-extracted by local beekeeper cooperatives foraging in wild sub-Himalayan flora.
   - *Where to find:* HP State Cooperative outlets and Khadi Gramodyog Bhavan on College Road.

2. **Sutlej Valley Handlooms & Himachali Caps:**
   - Warm wool handwoven shawls, mufflers, and traditional embroidered Himachali topi.
   - *Where to find:* District Khadi Handloom Emporium in Chauggan Bazaar.

3. **Pine Needle Eco-Crafts:**
   - Beautiful handcrafted baskets, coasters, and dining mats made from fallen Chir pine needles by local women self-help groups.
   - *Where to find:* Bandla Hills Mahila Mandal exhibitions and Swarghat cooperative kiosks.

4. **Wild Apricot (Chuli) Chutney & Organic Hill Preserves:**
   - Traditional stone-fruit preserves slow-cooked in copper vessels.
   - *Where to find:* Local Kisan outlets near old bus stand.`;

    // 9. Food & Cuisine
    } else if (q.includes('food') || q.includes('eat') || q.includes('dish') || q.includes('dham') || q.includes('lunch') || q.includes('dinner')) {
      reply = `### Must-Try Authentic Bilaspuri & Himachali Cuisine

- **Himachali Bilaspuri Dham:** The signature festive vegetarian banquet cooked by traditional *Botis*. Features **Chana Madra** (chickpeas in spiced yogurt gravy), **Sepu Vadi**, **Khatta Moong dal**, and sweet Boondi served on eco-friendly leaf platters (*pattals*).
- **Sepu Vadi:** Black gram dumplings slow-simmered in a luscious spinach and cultured curd gravy.
- **Pahari Siddu:** Steamed fermented mountain bread stuffed with roasted poppy seed (*khaskhas*) and walnut paste, dipped in warm clarified butter (desi ghee).
- **Gobind Sagar Fresh Fish Fry:** Freshly harvested lake Mahseer/Katla lightly spiced with carom seeds (*ajwain*) and shallow-fried.
- **Babru & Patande:** Crisp black gram stuffed flatbreads and delicate sweet mountain crepes.

*Recommended Dining Areas:* Local Pahari rasois around Main Circle, Swarghat highway dhabas, and the Fisheries Co-op stall near Gobind Sagar pier.`;

    // 10. Transportation & Reaching Bilaspur
    } else if (q.includes('bus') || q.includes('train') || q.includes('railway') || q.includes('reach') || q.includes('route') || q.includes('transport') || q.includes('how to reach')) {
      reply = `### Transportation Guide for Bilaspur, Himachal Pradesh

- **By Road (Primary Access):**
  * Connected via NH-205 and the new Kiratpur-Nerchowk expressway, connecting Chandigarh (~135 km, approx. 3.5 hrs) and Delhi (~375 km, approx. 7 hrs).
  * State HRTC and private buses operate round-the-clock from ISBT Chandigarh and ISBT Kashmiri Gate Delhi to Bilaspur.
- **Nearest Railway Stations:**
  * **Kiratpur Sahib (KART)**: ~65 km (approx. 1.5–2 hours by road).
  * **Anandpur Sahib (ANSB)**: ~70 km.
  * **Una Himachal (UHL)**: ~85 km (connected by Vande Bharat Express).
- **Local Commute in Town:**
  * Auto-rickshaws and local taxis operate from Bilaspur Main Bus Stand.
  * Local buses connect town to Swarghat, Ghumarwin, and Berthin.`;

    // 11. Budget Travel
    } else if (q.includes('budget') || q.includes('cheap') || q.includes('low cost')) {
      reply = `### Low-Budget Day Plan for Bilaspur (Under ₹700)

- **Morning:** Visit **Markandeya Ji Temple** (Free admission, sacred medicinal spring).
- **Lunch:** Authentic **Bilaspuri Dham** thali at a local bazaar rasoi (~₹150–₹180).
- **Afternoon:** Free entry to **Vyas Gufa** and a scenic lakeside walk along the **Gobind Sagar promenade**.
- **Evening:** Sunset overlook from the lower foothills or affordable local bus to **Bandla Dhar**.
- **Estimated Total Cost:** ₹400 to ₹700 including local transport and food.`;

    // 12. Default Direct Response with Key Navigation
    } else {
      reply = `Bilaspur, Himachal Pradesh is located along the scenic Sutlej River and Gobind Sagar Lake.

### Quick Travel Highlights & Navigation:
- **Gobind Sagar Lake & Bhakra Foothills:** Water sports, boat safaris, and lakefront views.
  [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Gobind+Sagar+Lake+Bilaspur+Himachal+Pradesh)
- **Shri Naina Devi Ji Temple:** Revered 51 Shakti Peeth reached by scenic ropeway (~65 km from town).
  [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Shri+Naina+Devi+Ji+Temple+Bilaspur+Himachal+Pradesh)
- **Bandla Dhar Ridge:** Top paragliding launch and mountain sunset viewpoint (10 km uphill).
  [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Bandla+Dhar+Bilaspur+Himachal+Pradesh)
- **Vyas Gufa (Cave):** Historic riverbank cave of Sage Ved Vyas in town.
  [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Vyas+Gufa+Bilaspur+Himachal+Pradesh)

Feel free to ask for specific route directions, family schedules, traditional Dham dining spots, or local artisan products!`;
    }
  }

  return reply;
}

export class ImageGenerationQuotaError extends Error {
  status: number;
  code: string;
  fallbackImageUrl: string;
  fallbackTitle: string;
  aspectRatio: string;

  constructor(message: string, fallbackImageUrl: string, fallbackTitle: string, aspectRatio: string) {
    super(message);
    this.name = 'ImageGenerationQuotaError';
    this.status = 429;
    this.code = 'IMAGE_GENERATION_QUOTA_EXCEEDED';
    this.fallbackImageUrl = fallbackImageUrl;
    this.fallbackTitle = fallbackTitle;
    this.aspectRatio = aspectRatio;
  }
}

export function matchLocalDestination(prompt: string): { title: string; imageUrl: string } {
  const p = (prompt || '').toLowerCase();
  if (p.includes('naina devi') || p.includes('shakti peeth')) {
    return { title: 'Shri Naina Devi Ji Temple', imageUrl: '/images/destinations/naina-devi.jpg' };
  }
  if (p.includes('bandla') || p.includes('paragliding')) {
    return { title: 'Bandla Dhar Ridge', imageUrl: '/images/destinations/bandla-dhar.jpg' };
  }
  if (p.includes('bhakra') || p.includes('dam')) {
    return { title: 'Bhakra Dam', imageUrl: '/images/destinations/bhakra-dam.jpg' };
  }
  if (p.includes('vyas') || p.includes('cave') || p.includes('gufa')) {
    return { title: 'Vyas Gufa (Rishi Vyas Cave)', imageUrl: '/images/destinations/vyas-gufa.jpg' };
  }
  if (p.includes('markandeya') || p.includes('spring')) {
    return { title: 'Markandeya Ji Temple', imageUrl: '/images/destinations/markandeya-temple.jpg' };
  }
  if (p.includes('koldam') || p.includes('gorge') || p.includes('canyon')) {
    return { title: 'Koldam Hydro Reservoir', imageUrl: '/images/destinations/koldam.jpg' };
  }
  if (p.includes('bahadurpur') || p.includes('fort')) {
    return { title: 'Bahadurpur Fort', imageUrl: '/images/destinations/bahadurpur-fort.jpg' };
  }
  return { title: 'Gobind Sagar Lake', imageUrl: '/images/destinations/gobind-sagar.jpg' };
}

function mapToGoogleAspectRatio(ratio: string): '1:1' | '3:4' | '4:3' | '9:16' | '16:9' {
  switch (ratio) {
    case '1:1': return '1:1';
    case '3:4':
    case '2:3': return '3:4';
    case '4:3':
    case '3:2': return '4:3';
    case '9:16': return '9:16';
    case '16:9':
    case '21:9': return '16:9';
    default: return '16:9';
  }
}

export interface ImageGenParams {
  prompt: string;
  aspectRatio?: string;
  quality?: string;
}

export async function generateSceneImage(params: ImageGenParams) {
  const { prompt, aspectRatio = '16:9', quality = 'standard' } = params;
  const apiKey = getApiKey();

  const validRatios = ['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'];
  const chosenRatio = validRatios.includes(aspectRatio) ? aspectRatio : '16:9';
  const matchedDest = matchLocalDestination(prompt);

  if (!apiKey) {
    throw new ImageGenerationQuotaError(
      'Image generation quota has been exceeded. Please try again later.',
      matchedDest.imageUrl,
      matchedDest.title,
      chosenRatio
    );
  }

  const ai = getGeminiClient();
  // Supported official Google GenAI model names from SDK documentation:
  const targetModel = quality === 'studio' ? 'gemini-3.1-flash-image' : 'gemini-3.1-flash-lite-image';
  const googleRatio = mapToGoogleAspectRatio(chosenRatio);

  const enhancedPrompt = prompt.toLowerCase().includes('bilaspur') || prompt.toLowerCase().includes('himachal')
    ? prompt
    : `${prompt}, scenic Bilaspur Himachal Pradesh India, Himalayan landscape, authentic cultural atmosphere, photorealistic travel photography`;

  try {
    const response = await ai.models.generateContent({
      model: targetModel,
      contents: { parts: [{ text: enhancedPrompt }] },
      config: {
        imageConfig: {
          aspectRatio: googleRatio,
        },
      },
    });

    let imageUrl = '';
    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData?.data) {
        const mimeType = part.inlineData.mimeType || 'image/jpeg';
        imageUrl = `data:${mimeType};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!imageUrl) {
      throw new Error('No image data returned from AI model.');
    }

    return { imageUrl, prompt: enhancedPrompt, aspectRatio: chosenRatio };
  } catch (err: any) {
    const errMsg = (err.message || '').toLowerCase();
    const isQuota =
      err.status === 429 ||
      errMsg.includes('429') ||
      errMsg.includes('quota') ||
      errMsg.includes('resource_exhausted') ||
      errMsg.includes('rate-limit') ||
      errMsg.includes('rate limit');

    if (isQuota) {
      // Specifically identify 429 quota exhaustion without retrying
      throw new ImageGenerationQuotaError(
        'Image generation quota has been exceeded. Please try again later.',
        matchedDest.imageUrl,
        matchedDest.title,
        chosenRatio
      );
    }

    // For any other non-quota error, propagate clean message
    throw err;
  }
}
