import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Check, 
  HelpCircle,
  Trash2,
  Compass,
  Utensils,
  ShoppingBag,
  Coins,
  Clock,
  Users,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export const ChatbotGuide: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content: `Namaste! I am **Bilaspur AI**, your dedicated local guide for Bilaspur, Himachal Pradesh.

Ask me anything about:
- **Routes & Travel:** "Bilaspur to Shri Naina Devi", "How to reach Bandla Dhar"
- **Itineraries:** "Best places for family?", "I have only 3 hours"
- **Heritage & Food:** "Authentic Bilaspuri Dham", "Vyas Gufa history"
- **Local Shopping:** "Where can I find wild forest honey or handwoven shawls?"`,
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = [
    { text: 'Bilaspur to Shri Naina Devi', icon: Compass },
    { text: 'Best places for family?', icon: Users },
    { text: 'What local food should I try?', icon: Utensils },
    { text: 'I have only 3 hours', icon: Clock },
    { text: 'Where can I find local products?', icon: ShoppingBag },
    { text: 'How do I reach Bandla Dhar for paragliding?', icon: Compass },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Local fallback response generator for specific questions
  const getDirectLocalAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('naina devi') || (q.includes('bilaspur') && q.includes('naina'))) {
      return `### Travel from Bilaspur to Shri Naina Devi Ji Temple

- **Approximate Distance:** ~65 to 70 km by road.
- **Estimated Travel Time:** Approximately **2 to 2.5 hours** by car/taxi (mountain road curves on NH-205; actual travel time varies with seasonal traffic).
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
    }

    if (q.includes('bhakra') || q.includes('dam')) {
      return `### Travel from Bilaspur to Bhakra Dam

- **Approximate Distance:** ~65 km by road.
- **Estimated Travel Time:** Approximately **1.5 to 2 hours** by car.
- **Route & Directions:**
  * Bilaspur Town $\\rightarrow$ Swarghat $\\rightarrow$ Nangal $\\rightarrow$ Bhakra Dam site on the Sutlej river.
- **Important Security Caveat:**
  * Bhakra Dam is a high-security vital installation. **Carry a valid Government Photo ID (Aadhaar, Passport, or Voter ID)** for checkpoint permits.
  * Photography is strictly prohibited on the main dam crest and powerhouse installations.
- **Highlights:** 226-meter towering concrete gravity wall, Nehru memorial viewpoint, and panoramic Sutlej canyon vista.

[Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Bhakra+Dam+Bilaspur+Himachal+Pradesh)`;
    }

    if (q.includes('bandla') || q.includes('paragliding')) {
      return `### Travel from Bilaspur to Bandla Dhar (Paragliding Ridge)

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
    }

    if (q.includes('markandeya') || q.includes('spring')) {
      return `### Travel from Bilaspur to Markandeya Ji Temple

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
    }

    if (q.includes('family') || q.includes('kids') || q.includes('children') || q.includes('senior')) {
      return `### Best Family-Friendly Places in Bilaspur, HP

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
    }

    if (q.includes('3 hour') || q.includes('three hour') || q.includes('short') || q.includes('layover') || q.includes('quick')) {
      return `### Realistic 3-Hour Bilaspur Stopover Schedule

- **Hour 1 (0:00 – 1:00) | Gobind Sagar Waterfront & Boating:**
  * Head to Luhnu Waterfront on Gobind Sagar lake for fresh mountain breeze and take a 20-minute speedboat or safari boat ride.
  * [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Gobind+Sagar+Lake+Bilaspur+Himachal+Pradesh)

- **Hour 2 (1:00 – 1:50) | Historic Vyas Gufa (Cave):**
  * Drive 5 minutes to the ancient riverbank cave of Sage Ved Vyas, origin of the name Bilaspur (Vyaspur).
  * [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Vyas+Gufa+Bilaspur+Himachal+Pradesh)

- **Hour 3 (1:50 – 3:00) | Authentic Bilaspuri Refreshment:**
  * Enjoy hot Himachali Babru with chana or a quick Bilaspuri Dham thali near Main Circle before resuming your journey on NH-205.`;
    }

    if (q.includes('product') || q.includes('shop') || q.includes('buy') || q.includes('craft') || q.includes('artisan') || q.includes('souvenir')) {
      return `### Authentic Local Products of Bilaspur & Where to Buy

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
    }

    if (q.includes('food') || q.includes('eat') || q.includes('dish') || q.includes('dham') || q.includes('lunch') || q.includes('dinner')) {
      return `### Must-Try Authentic Bilaspuri & Himachali Cuisine

- **Himachali Bilaspuri Dham:** The signature festive vegetarian banquet cooked by traditional *Botis*. Features **Chana Madra** (chickpeas in spiced yogurt gravy), **Sepu Vadi**, **Khatta Moong dal**, and sweet Boondi served on eco-friendly leaf platters (*pattals*).
- **Sepu Vadi:** Black gram dumplings slow-simmered in a luscious spinach and cultured curd gravy.
- **Pahari Siddu:** Steamed fermented mountain bread stuffed with roasted poppy seed (*khaskhas*) and walnut paste, dipped in warm clarified butter (desi ghee).
- **Gobind Sagar Fresh Fish Fry:** Freshly harvested lake Mahseer/Katla lightly spiced with carom seeds (*ajwain*) and shallow-fried.
- **Babru & Patande:** Crisp black gram stuffed flatbreads and delicate sweet mountain crepes.

*Recommended Dining Areas:* Local Pahari rasois around Main Circle, Swarghat highway dhabas, and the Fisheries Co-op stall near Gobind Sagar pier.`;
    }

    return `### Bilaspur, Himachal Pradesh Travel Information

- **Gobind Sagar Lake & Bhakra Foothills:** Water sports, boat safaris, and lakefront views.
  [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Gobind+Sagar+Lake+Bilaspur+Himachal+Pradesh)
- **Shri Naina Devi Ji Temple:** Revered 51 Shakti Peeth reached by scenic ropeway (~65 km from town).
  [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Shri+Naina+Devi+Ji+Temple+Bilaspur+Himachal+Pradesh)
- **Bandla Dhar Ridge:** Top paragliding launch and mountain sunset viewpoint (10 km uphill).
  [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Bandla+Dhar+Bilaspur+Himachal+Pradesh)
- **Vyas Gufa (Cave):** Historic riverbank cave of Sage Ved Vyas in town.
  [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Vyas+Gufa+Bilaspur+Himachal+Pradesh)

Feel free to ask for specific route directions, family schedules, traditional Dham dining spots, or local artisan products!`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          userPrompt: query,
        }),
      });

      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: 'bot-' + Date.now(),
        role: 'model',
        content: data.reply || getDirectLocalAnswer(query),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      // If server or network fails, synthesize directly tailored answer
      const localReply = getDirectLocalAnswer(query);
      const botMessage: ChatMessage = {
        id: 'bot-' + Date.now(),
        role: 'model',
        content: localReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content: `Conversation refreshed! What would you like to explore in Bilaspur, Himachal Pradesh?`,
        timestamp: 'Just now',
      },
    ]);
  };

  // Helper function to format rich markdown: links with Google Maps buttons, bold, italics, headings
  const renderMessageContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      // Heading 3
      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-bold text-stone-900 text-sm sm:text-base mt-2 mb-1">
            {trimmed.slice(4)}
          </h4>
        );
      }

      // Check if line contains a markdown link [Text](URL)
      const linkMatch = trimmed.match(/\[(.*?)\]\((https?:\/\/.*?)\)/);
      if (linkMatch) {
        const linkText = linkMatch[1];
        const linkUrl = linkMatch[2];
        const isGoogleMaps = linkUrl.includes('google.com/maps');

        return (
          <div key={idx} className="my-2">
            <a
              href={linkUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors ${
                isGoogleMaps
                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              {isGoogleMaps && <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
              <span>{linkText}</span>
              <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
            </a>
          </div>
        );
      }

      // Bullet points
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs sm:text-sm my-0.5 leading-relaxed text-stone-700">
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed.slice(2)) }} />
          </li>
        );
      }

      // Numbered items
      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <div key={idx} className="ml-1 my-1 text-xs sm:text-sm leading-relaxed text-stone-700 font-medium">
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }} />
          </div>
        );
      }

      // Standard text line
      if (!trimmed) {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p key={idx} className="my-1 text-xs sm:text-sm leading-relaxed text-stone-800" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }} />
      );
    });
  };

  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-stone-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-stone-700">$1</em>');
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-stone-200 w-full overflow-x-hidden" id="ask-bilaspur-ai">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-xs font-semibold mb-1.5">
              <Bot className="w-3.5 h-3.5 text-emerald-700" />
              <span>Real-Time Bilaspur HP Context Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Ask Bilaspur AI
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-0.5 sm:mt-1">
              Ask questions about places, transport, Himachali cuisine, local shopping, or custom schedules.
            </p>
          </div>

          <div className="self-end sm:self-auto">
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors cursor-pointer"
              title="Clear Chat Conversation"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Chat</span>
            </button>
          </div>
        </div>

        {/* Suggested Question Chips (Horizontally Scrollable on Mobile, Wrap on Desktop) */}
        <div className="mb-3 sm:mb-4">
          <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Suggested Questions:</span>
          </p>
          <div className="flex overflow-x-auto pb-1.5 gap-2 scrollbar-none sm:flex-wrap">
            {suggestedQuestions.map((q, idx) => {
              const Icon = q.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.text)}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-stone-50 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 hover:border-emerald-300 rounded-lg text-xs font-medium transition-all group disabled:opacity-50 shrink-0 cursor-pointer whitespace-nowrap"
                >
                  <Icon className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 shrink-0" />
                  <span>{q.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Window Container: Mobile-Optimized with Pinned Input */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl shadow-sm flex flex-col h-[520px] max-h-[80vh] sm:h-[580px] overflow-hidden relative">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-5 space-y-3.5">
            {messages.map((m) => {
              const isBot = m.role === 'model';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 sm:gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-3.5 sm:p-4 text-left shadow-xs relative group ${
                      isBot
                        ? 'bg-white text-stone-800 border border-stone-200/90'
                        : 'bg-emerald-800 text-white'
                    }`}
                  >
                    <div className="text-xs sm:text-sm">
                      {renderMessageContent(m.content)}
                    </div>

                    <div
                      className={`flex items-center justify-between mt-2 pt-1.5 border-t text-[10px] ${
                        isBot ? 'border-stone-100 text-stone-400' : 'border-emerald-700/50 text-emerald-200'
                      }`}
                    >
                      <span>{m.timestamp}</span>

                      {isBot && (
                        <button
                          onClick={() => handleCopy(m.id, m.content)}
                          className="opacity-75 sm:opacity-0 group-hover:opacity-100 transition-opacity p-1 text-stone-400 hover:text-stone-700 rounded cursor-pointer"
                          title="Copy Answer"
                        >
                          {copiedId === m.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {!isBot && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-stone-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-xs animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl px-3.5 py-2.5 text-stone-600 text-xs flex items-center gap-2 shadow-xs">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                  <span>Bilaspur AI is analyzing local knowledge...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Sticky/Fixed Chat Input Bar: Guaranteed Visible on Mobile */}
          <div className="p-2.5 sm:p-3.5 bg-white border-t border-stone-200 shrink-0 sticky bottom-0 z-10 shadow-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-1.5 sm:gap-2 w-full"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Naina Devi route, Dham, 3-hr layover..."
                disabled={loading}
                className="min-w-0 flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:bg-white transition-all placeholder:text-stone-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="px-3.5 sm:px-5 py-2 sm:py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-1 sm:gap-1.5 shrink-0 text-xs sm:text-sm cursor-pointer shadow-xs"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <p className="text-[10px] text-stone-400 mt-1.5 text-center hidden sm:block">
              Bilaspur AI grounds answers in verified Bilaspur Himachal Pradesh geography, local culture, and seasonal travel advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
