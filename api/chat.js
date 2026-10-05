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
async function generateChatReply(params) {
  const { messages = [], userPrompt = "" } = params;
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
  let reply = "";
  if (apiKey) {
    try {
      const contents = [];
      if (messages.length > 0) {
        for (const m of messages.slice(-6)) {
          contents.push({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }]
          });
        }
      }
      if (userPrompt) {
        contents.push({
          role: "user",
          parts: [{ text: userPrompt }]
        });
      }
      reply = await callGeminiWithFallback({
        contents,
        config: { systemInstruction },
        primaryModel: "gemini-3.8-flash"
      });
    } catch {
    }
  }
  if (!reply) {
    const q = (userPrompt || "").toLowerCase();
    if (q.includes("naina devi") || q.includes("bilaspur") && q.includes("naina")) {
      reply = `### Travel from Bilaspur to Shri Naina Devi Ji Temple

- **Approximate Distance:** ~65 to 70 km by road.
- **Estimated Travel Time:** Approximately **2 to 2.5 hours** by car/taxi (mountain road curves on NH-205; actual time varies with seasonal traffic).
- **Route & Directions:**
  * Bilaspur Town $\\rightarrow$ Swarghat (via NH-205) $\\rightarrow$ Ganguwal / Kaula Wala Toba $\\rightarrow$ Shri Naina Devi Hill base.
- **Travel Options:**
  1. **Private Taxi / Rental:** Available from the Bilaspur Main Bus Stand (~\u20B91,800 to \u20B92,500 round trip with waiting).
  2. **HRTC Public Bus:** Regular buses connect Bilaspur to Swarghat and Anandpur Sahib with connecting local shuttles to Naina Devi base.
  3. **Scenic Aerial Ropeway:** Upon reaching Kaula Wala Toba base, take the cable car ropeway up to the temple summit in ~8 minutes, enjoying panoramic views of Gobind Sagar Lake and Anandpur Sahib.
- **Helpful Tips:**
  * Visit early morning (before 9:00 AM) or late afternoon to avoid heavy devotee queues, especially during Navratri fairs.
  * Dress modestly as this is a sacred 51 Shakti Peeth shrine.
  * Check weather and road conditions during monsoon months.

[Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Shri+Naina+Devi+Ji+Temple+Bilaspur+Himachal+Pradesh)`;
    } else if (q.includes("bhakra") || q.includes("dam")) {
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
    } else if (q.includes("bandla") || q.includes("paragliding")) {
      reply = `### Travel from Bilaspur to Bandla Dhar (Paragliding Ridge)

- **Approximate Distance:** ~8 to 10 km uphill from Bilaspur town center.
- **Estimated Travel Time:** Approximately **25 to 35 minutes** by car or bike.
- **Route & Directions:**
  * Ascend directly from Bilaspur town via the Bandla hill road through scenic chir pine forests.
- **Travel Options & Activities:**
  * Best accessed by taxi, personal car, or two-wheeler.
  * **Tandem Paragliding:** Certified pilots conduct joyrides taking off from the 1,374m ridge and landing near Luhnu ground.
  * **Sunset Viewpoint:** Offers a sensational 180\xB0 vista of the Sutlej river loop and modern Bilaspur town below.
- **Helpful Tips:**
  * Morning thermals (9:30 AM \u2013 1:00 PM) generally offer the smoothest gliding conditions.
  * Carry a light windbreaker jacket; the ridge gets breezy in the evenings.

[Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Bandla+Dhar+Bilaspur+Himachal+Pradesh)`;
    } else if (q.includes("markandeya") || q.includes("spring")) {
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
    } else if (q.includes("vyas") || q.includes("gufa") || q.includes("cave")) {
      reply = `### Visiting Vyas Cave (Vyas Gufa) in Bilaspur

- **Location:** Situated right at the foot of Bilaspur town, on the bank of the Sutlej River near the old bus stand.
- **Estimated Travel Time:** Just **5 to 10 minutes** from the Bilaspur town center.
- **Historical Significance:**
  * Ancient tradition holds that Sage Ved Vyas, author of the Mahabharata, meditated here, giving the town its historical name *Vyaspur* (modern Bilaspur).
- **Travel Tips:**
  * Easily walkable or a short auto-rickshaw ride from Main Bazaar.
  * Best visited during morning or late afternoon combined with a peaceful stroll along the Sutlej bank.

[Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Vyas+Gufa+Bilaspur+Himachal+Pradesh)`;
    } else if (q.includes("family") || q.includes("kids") || q.includes("children") || q.includes("senior")) {
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
    } else if (q.includes("3 hour") || q.includes("three hour") || q.includes("short") || q.includes("layover") || q.includes("quick")) {
      reply = `### Realistic 3-Hour Bilaspur Stopover Schedule

- **Hour 1 (0:00 \u2013 1:00) | Gobind Sagar Waterfront & Boating:**
  * Head to Luhnu Waterfront on Gobind Sagar lake for fresh mountain breeze and take a 20-minute speedboat or safari boat ride.
  * [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Gobind+Sagar+Lake+Bilaspur+Himachal+Pradesh)

- **Hour 2 (1:00 \u2013 1:50) | Historic Vyas Gufa (Cave):**
  * Drive 5 minutes to the ancient riverbank cave of Sage Ved Vyas, origin of the name Bilaspur (Vyaspur).
  * [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Vyas+Gufa+Bilaspur+Himachal+Pradesh)

- **Hour 3 (1:50 \u2013 3:00) | Authentic Bilaspuri Refreshment:**
  * Enjoy hot Himachali Babru with chana or a quick Bilaspuri Dham thali near Main Circle before resuming your journey on NH-205.`;
    } else if (q.includes("product") || q.includes("shop") || q.includes("buy") || q.includes("craft") || q.includes("artisan") || q.includes("souvenir")) {
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
    } else if (q.includes("food") || q.includes("eat") || q.includes("dish") || q.includes("dham") || q.includes("lunch") || q.includes("dinner")) {
      reply = `### Must-Try Authentic Bilaspuri & Himachali Cuisine

- **Himachali Bilaspuri Dham:** The signature festive vegetarian banquet cooked by traditional *Botis*. Features **Chana Madra** (chickpeas in spiced yogurt gravy), **Sepu Vadi**, **Khatta Moong dal**, and sweet Boondi served on eco-friendly leaf platters (*pattals*).
- **Sepu Vadi:** Black gram dumplings slow-simmered in a luscious spinach and cultured curd gravy.
- **Pahari Siddu:** Steamed fermented mountain bread stuffed with roasted poppy seed (*khaskhas*) and walnut paste, dipped in warm clarified butter (desi ghee).
- **Gobind Sagar Fresh Fish Fry:** Freshly harvested lake Mahseer/Katla lightly spiced with carom seeds (*ajwain*) and shallow-fried.
- **Babru & Patande:** Crisp black gram stuffed flatbreads and delicate sweet mountain crepes.

*Recommended Dining Areas:* Local Pahari rasois around Main Circle, Swarghat highway dhabas, and the Fisheries Co-op stall near Gobind Sagar pier.`;
    } else if (q.includes("bus") || q.includes("train") || q.includes("railway") || q.includes("reach") || q.includes("route") || q.includes("transport") || q.includes("how to reach")) {
      reply = `### Transportation Guide for Bilaspur, Himachal Pradesh

- **By Road (Primary Access):**
  * Connected via NH-205 and the new Kiratpur-Nerchowk expressway, connecting Chandigarh (~135 km, approx. 3.5 hrs) and Delhi (~375 km, approx. 7 hrs).
  * State HRTC and private buses operate round-the-clock from ISBT Chandigarh and ISBT Kashmiri Gate Delhi to Bilaspur.
- **Nearest Railway Stations:**
  * **Kiratpur Sahib (KART)**: ~65 km (approx. 1.5\u20132 hours by road).
  * **Anandpur Sahib (ANSB)**: ~70 km.
  * **Una Himachal (UHL)**: ~85 km (connected by Vande Bharat Express).
- **Local Commute in Town:**
  * Auto-rickshaws and local taxis operate from Bilaspur Main Bus Stand.
  * Local buses connect town to Swarghat, Ghumarwin, and Berthin.`;
    } else if (q.includes("budget") || q.includes("cheap") || q.includes("low cost")) {
      reply = `### Low-Budget Day Plan for Bilaspur (Under \u20B9700)

- **Morning:** Visit **Markandeya Ji Temple** (Free admission, sacred medicinal spring).
- **Lunch:** Authentic **Bilaspuri Dham** thali at a local bazaar rasoi (~\u20B9150\u2013\u20B9180).
- **Afternoon:** Free entry to **Vyas Gufa** and a scenic lakeside walk along the **Gobind Sagar promenade**.
- **Evening:** Sunset overlook from the lower foothills or affordable local bus to **Bandla Dhar**.
- **Estimated Total Cost:** \u20B9400 to \u20B9700 including local transport and food.`;
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

// api/chat.ts
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
    const reply = await generateChatReply(body);
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat serverless error:", err);
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}
export {
  handler as default
};
