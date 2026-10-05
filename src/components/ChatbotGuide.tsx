import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Users,
  RefreshCw, 
  Copy, 
  Check, 
  Compass, 
  MapPin, 
  Utensils, 
  Clock, 
  Coins, 
  ShoppingBag,
  HelpCircle,
  Trash2
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

Whether you're looking for serene boat rides on **Gobind Sagar Lake**, darshan at **Shri Naina Devi Ji**, tandem paragliding at **Bandla Dhar**, or tasting an authentic royal **Bilaspuri Dham** feast, ask me anything!

How can I help you plan your journey today?`,
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = [
    { text: 'Best places to visit with my family?', icon: Users },
    { text: 'What local food should I try?', icon: Utensils },
    { text: 'I have only 3 hours. What should I see?', icon: Clock },
    { text: 'Suggest a low-budget day trip.', icon: Coins },
    { text: 'Where can I find local products?', icon: ShoppingBag },
    { text: 'How do I reach Bandla Dhar for paragliding?', icon: Compass },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: 'bot-' + Date.now(),
        role: 'model',
        content: data.reply || 'Here is what you need to know about Bilaspur, Himachal Pradesh.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: 'bot-err-' + Date.now(),
        role: 'model',
        content: `I encountered an issue connecting to the AI guide service: ${err.message || 'Please try again'}. 

Meanwhile, popular immediate highlights in Bilaspur include:
- **Gobind Sagar Lake**: Waterfront promenades & boating at Luhnu ground
- **Shri Naina Devi Ji**: Sacred Shakti Peeth accessible by scenic ropeway
- **Vyas Gufa**: Ancient meditative cave by the Sutlej river bank`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
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
        content: `Conversation refreshed! What else would you like to know about Bilaspur, Himachal Pradesh?`,
        timestamp: 'Just now',
      },
    ]);
  };

  // Helper function to format basic bold and bullet markdown in chat
  const renderMessageContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Bold rendering
      let processed = line;
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs sm:text-sm my-0.5 leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line.slice(2)) }} />
          </li>
        );
      }
      return (
        <p key={idx} className="my-1 text-xs sm:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(processed) }} />
      );
    });
  };

  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  };

  return (
    <section className="py-16 bg-white border-t border-stone-200" id="ask-bilaspur-ai">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-xs font-semibold mb-2">
              <Bot className="w-3.5 h-3.5 text-emerald-700" />
              <span>Real-Time Bilaspur HP Context Guide</span>
            </div>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              Ask Bilaspur AI
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Ask questions about places, transport, Himachali cuisine, local shopping, or custom schedules.
            </p>
          </div>

          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors"
            title="Clear Chat Conversation"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>

        {/* Suggested Question Chips (as requested in prompt) */}
        <div className="mb-4">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Suggested Questions:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, idx) => {
              const Icon = q.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.text)}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 hover:border-emerald-300 rounded-lg text-xs font-medium transition-all group disabled:opacity-50"
                >
                  <Icon className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700" />
                  <span>{q.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Window Container */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl shadow-sm flex flex-col h-[520px] overflow-hidden">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((m) => {
              const isBot = m.role === 'model';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-left shadow-xs relative group ${
                      isBot
                        ? 'bg-white text-stone-800 border border-stone-200/90'
                        : 'bg-emerald-800 text-white'
                    }`}
                  >
                    <div className="prose prose-sm max-w-none">
                      {renderMessageContent(m.content)}
                    </div>

                    <div
                      className={`flex items-center justify-between mt-2 pt-2 border-t text-[10px] ${
                        isBot ? 'border-stone-100 text-stone-400' : 'border-emerald-700/50 text-emerald-200'
                      }`}
                    >
                      <span>{m.timestamp}</span>

                      {isBot && (
                        <button
                          onClick={() => handleCopy(m.id, m.content)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-stone-400 hover:text-stone-700 rounded"
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
                    <div className="w-8 h-8 rounded-lg bg-stone-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-xs animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl px-4 py-3 text-stone-500 text-xs flex items-center gap-2 shadow-xs">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                  <span>Bilaspur AI is analyzing local knowledge...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-stone-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about places, local Dham food, 3-hour layovers, or bus routes..."
                disabled={loading}
                className="flex-1 px-4 py-3 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="px-5 py-3 bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[11px] text-stone-400 mt-2 text-center">
              Bilaspur AI grounds answers in verified Bilaspur Himachal Pradesh geography, local culture, and seasonal travel advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
