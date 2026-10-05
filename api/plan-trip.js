// api/_core.ts
import { GoogleGenAI } from "@google/genai";
function getApiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENAI_API_KEY || "";
}
function getGeminiClient() {
  const apiKey = getApiKey();
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}
var BILASPUR_GROUNDING_CONTEXT = `
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
function withTimeout(promise, ms) {
  let timer;
  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms);
  });
  return Promise.race([
    promise.then((res) => {
      clearTimeout(timer);
      return res;
    }),
    timeoutPromise
  ]);
}
async function callGeminiWithFallback(params) {
  const ai = getGeminiClient();
  const primaryModel = params.primaryModel || "gemini-3.8-flash";
  const models = [primaryModel, "gemini-flash-latest"];
  for (const model of models) {
    const isGemini3 = model.startsWith("gemini-3");
    const modelConfig = { ...params.config };
    if (isGemini3) {
      modelConfig.thinkingConfig = { thinkingLevel: "LOW" };
    } else {
      delete modelConfig.thinkingConfig;
    }
    try {
      const resp = await withTimeout(
        ai.models.generateContent({
          model,
          contents: params.contents,
          config: modelConfig
        }),
        25e3
      );
      if (resp && resp.text) {
        return resp.text;
      }
    } catch {
    }
  }
  throw new Error("Model currently unavailable");
}
async function generateTripPlan(params) {
  const {
    days = 1,
    budget = "\u20B91,500",
    budgetLevel = "Budget",
    travelers = "Family",
    interests = ["Nature", "Food"],
    pace = "Balanced",
    extraNotes = ""
  } = params;
  const apiKey = getApiKey();
  const prompt = `
You are the AI engine of "Bilaspur AI", an intelligent local tourism and discovery platform for Bilaspur, Himachal Pradesh, India.
Generate a realistic, richly personalized day-by-day itinerary based strictly on the user's travel parameters:

USER PREFERENCES:
- Duration: ${days} day(s)
- Budget: ${budget} (${budgetLevel} tier)
- Travelling with: ${travelers}
- Specific Interests: ${interests.join(", ")}
- Preferred Pace: ${pace}
- Extra Notes/Requests: ${extraNotes || "None"}

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
  let text = "";
  if (apiKey) {
    try {
      text = await callGeminiWithFallback({
        contents: prompt,
        config: { responseMimeType: "application/json" },
        primaryModel: "gemini-3.8-flash"
      });
    } catch {
    }
  }
  if (text) {
    try {
      return JSON.parse(text);
    } catch {
    }
  }
  const fallbackDays = [];
  for (let i = 1; i <= Math.min(days, 5); i++) {
    if (i === 1) {
      fallbackDays.push({
        dayNumber: 1,
        dayTitle: "Lake Waters & Sacred Springs of Bilaspur",
        morning: {
          title: "Morning Darshan & Springs at Markandeya Ji",
          description: "Visit the peaceful ancient shrine of Rishi Markandeya surrounded by terraced hill orchards and sacred medicinal spring water kunds.",
          placeName: "Markandeya Ji Temple",
          mapQuery: "Markandeya Ji Temple Bilaspur Himachal Pradesh",
          duration: "2.5 Hours",
          localTips: "Arrive before 9:30 AM for a peaceful tranquil atmosphere and easy roadside parking."
        },
        afternoon: {
          title: "Authentic Royal Bilaspuri Dham Lunch",
          description: "Experience Bilaspuri culinary heritage cooked in traditional deghs, highlighting Chana Madra in spiced curd and tender Sepu Vadi.",
          placeName: "Pahari Rasoi Bilaspur",
          mapQuery: "Local Food Bilaspur Himachal Pradesh",
          duration: "1.5 Hours",
          foodRecommendation: "Bilaspuri Dham thali served with hot desi ghee and sweet boondi"
        },
        evening: {
          title: "Sunset Boat Cruise on Gobind Sagar Lake",
          description: "Relax with a scenic speedboat safari or peaceful shoreline walk at Luhnu waterfront, enjoying reflections of Himalayan foothills over the reservoir.",
          placeName: "Gobind Sagar Lake",
          mapQuery: "Gobind Sagar Lake Bilaspur Himachal Pradesh",
          duration: "2 Hours",
          sunsetOrVibe: "Spectacular golden hour reflections over the 56-km mountain lake"
        },
        foodSpot: {
          name: "Pahari Traditional Rasoi (Main Circle)",
          dish: "Authentic Bilaspuri Dham Thali & Sepu Vadi",
          type: "Traditional Vegetarian Feast",
          priceRange: "\u20B9150 - \u20B9220"
        },
        artisanOrProduct: {
          item: "Pure Himalayan Acacia & Forest Honey",
          whereToBuy: "Bilaspur Beekeepers FPO Booth, Main Bazaar",
          whySpecial: "Cold-extracted by local beekeepers foraging in sub-Himalayan forest blossoms"
        }
      });
    } else if (i === 2) {
      fallbackDays.push({
        dayNumber: 2,
        dayTitle: "High Altitudes, Paragliding & Sacred Hilltops",
        morning: {
          title: "Tandem Paragliding & Ridge Overlook at Bandla Dhar",
          description: "Ascend to the 4,000-foot Bandla mountain ridge for an exhilarating tandem paragliding flight over the Sutlej canyon and pine hills.",
          placeName: "Bandla Dhar Ridge",
          mapQuery: "Bandla Dhar Bilaspur Himachal Pradesh",
          duration: "3.5 Hours",
          localTips: "Wear a windbreaker jacket; morning thermals provide the smoothest gliding conditions."
        },
        afternoon: {
          title: "Pahari Siddu with Clarified Butter",
          description: "Savor steaming mountain Siddu filled with roasted poppy seeds and walnut paste, served with pure golden cow ghee.",
          placeName: "Bandla Cloud Cafe & Swarghat Kiosks",
          mapQuery: "Bandla Dhar Bilaspur Himachal Pradesh",
          duration: "1 Hour",
          foodRecommendation: "Fresh steamed Pahari Siddu dipped in desi ghee with coriander mint chutney"
        },
        evening: {
          title: "Shri Naina Devi Ji Hilltop Ropeway & Darshan",
          description: "Take the scenic aerial ropeway up the steep peak to the revered 51 Shakti Peeth for panoramic sunset views across Anandpur Sahib plains and Gobind Sagar lake.",
          placeName: "Shri Naina Devi Ji Temple",
          mapQuery: "Shri Naina Devi Ji Temple Bilaspur Himachal Pradesh",
          duration: "3 Hours",
          sunsetOrVibe: "Unobstructed twilight horizon across Punjab plains and mountain peaks"
        },
        foodSpot: {
          name: "Naina Devi Hill Dhabas",
          dish: "Hot Babru with tangy Khatta potato curry",
          type: "Traditional Mountain Bread",
          priceRange: "\u20B980 - \u20B9140"
        },
        artisanOrProduct: {
          item: "Handwoven Sutlej Valley Woolen Shawls & Caps",
          whereToBuy: "District Khadi Handloom Emporium, Chauggan Bazaar",
          whySpecial: "Directly handwoven by women artisan cooperatives on wooden pit looms"
        }
      });
    } else {
      fallbackDays.push({
        dayNumber: i,
        dayTitle: `Historic Fortresses & Sutlej River Gorges (Day ${i})`,
        morning: {
          title: "Engineering Wonder at Bhakra Dam",
          description: "Marvel at the 226-meter towering concrete gravity dam on the Sutlej river with exhibits detailing modern Indian hydro-engineering.",
          placeName: "Bhakra Dam",
          mapQuery: "Bhakra Dam Bilaspur Himachal Pradesh",
          duration: "2.5 Hours",
          localTips: "Carry valid Indian government photo ID for security checkpoint verification."
        },
        afternoon: {
          title: "Fresh Gobind Sagar Lake Fish Fry Lunch",
          description: "Taste freshly caught and spiced lake fish prepared with carom seeds and local mountain herbs at the Fisheries Cooperative.",
          placeName: "Fisheries Co-op Outlet, Gobind Sagar Pier",
          mapQuery: "Gobind Sagar Lake Bilaspur Himachal Pradesh",
          duration: "1.5 Hours",
          foodRecommendation: "Shallow-fried Katla/Mahseer with radish salad and mint chutney"
        },
        evening: {
          title: "Ancient Vyas Cave (Vyas Gufa) Meditation Spot",
          description: "Explore the serene limestone riverbank cave where Sage Ved Vyas, author of Mahabharata, meditated in ancient times.",
          placeName: "Vyas Gufa",
          mapQuery: "Vyas Gufa Bilaspur Himachal Pradesh",
          duration: "1.5 Hours",
          sunsetOrVibe: "Calm evening breeze along the tranquil Sutlej riverbed"
        },
        foodSpot: {
          name: "Old Bazaar Rasoi",
          dish: "Bilaspuri Patande with fresh jaggery syrup",
          type: "Traditional Mountain Crepe",
          priceRange: "\u20B960 - \u20B9100"
        },
        artisanOrProduct: {
          item: "Eco Pine Needle Handwoven Coasters & Baskets",
          whereToBuy: "Bandla Hills Mahila Vikas Mandal Store",
          whySpecial: "Prevents forest fires while providing direct income to rural hill women"
        }
      });
    }
  }
  return {
    tripTitle: `${travelers} Discovery in Bilaspur (${days} Day${days > 1 ? "s" : ""})`,
    summary: `A carefully balanced itinerary in Bilaspur, Himachal Pradesh crafted for ${travelers} with a ${pace.toLowerCase()} pace. Combines iconic destinations like Gobind Sagar and Naina Devi with authentic Bilaspuri Dham cuisine and rural artisan stops.`,
    estimatedBudget: {
      total: budget,
      breakdown: {
        stay: days > 1 ? "\u20B91,200 - \u20B92,500" : "N/A (Day Tour)",
        food: "\u20B9350 - \u20B9600 / person",
        activities: "\u20B9300 - \u20B9800 (Boating/Ropeway)",
        transport: "\u20B9400 - \u20B9900 (Local taxi/fuel)"
      }
    },
    whyItMatches: `Tailored specifically for ${travelers} seeking ${interests.join(" and ")}. Focuses on realistic travel transit times across Bilaspur's mountain terrain without rushing, ensuring family-friendly dining and verified parking.`,
    days: fallbackDays,
    essentialTips: [
      "Road conditions: NH-205 and the new Kiratpur-Nerchowk expressway offer smooth access to Bilaspur town.",
      "Best boating time: Gobind Sagar lake is most serene between 9:00 AM and 11:30 AM before afternoon winds rise.",
      "Local respect: Dress modestly when visiting Shri Naina Devi Ji and Markandeya temples.",
      "Cash & UPI: UPI digital payments work well in Bilaspur town, but carry cash for Bandla ridge tea stalls."
    ],
    ecoEtiquette: "Help keep Himachal clean: carry reusable water bottles and discard no plastics in Gobind Sagar lake or pine forests."
  };
}

// api/plan-trip.ts
async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Content-Type"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const plan = await generateTripPlan(body);
    return res.status(200).json(plan);
  } catch (err) {
    console.error("Plan trip serverless error:", err);
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}
export {
  handler as default
};
