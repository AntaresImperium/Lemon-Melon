import React, { useState } from 'react';
import { Sparkles, MapPin, Send, CheckCircle2, HeartHandshake, Leaf, Award } from 'lucide-react';
import { logoImg, BRAND_STORY } from '../data/products';

export const BrandStory: React.FC = () => {
  const [ideaName, setIdeaName] = useState('');
  const [ideaConcept, setIdeaConcept] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaConcept.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setIdeaName('');
      setIdeaConcept('');
      setSubmitted(false);
    }, 3500);
  };

  return (
    <section id="story" className="py-16 sm:py-24 bg-[#FFFDF7] relative overflow-hidden">
      {/* Decorative leaf motifs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Origin Hero Lockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-5 text-center flex flex-col items-center">
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-[#FED729]/30 rounded-full blur-2xl group-hover:bg-[#FF3F5E]/20 transition-colors" />
              <img
                src={logoImg}
                alt="Lemon and Melon brand mascot characters"
                referrerPolicy="no-referrer"
                className="relative w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-full shadow-lg border-4 border-white ring-8 ring-[#FFF4C2]"
              />
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-xs font-bold text-[#8B6A00] bg-[#FFF4C2] px-3 py-1 rounded-full uppercase tracking-wider">
                Official Mascots
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A37B00] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Sweet × Sour Story</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2022] mb-4">
              {BRAND_STORY.headline}
            </h2>

            <p className="text-base sm:text-lg text-[#554E3C] leading-relaxed mb-6 font-medium">
              {BRAND_STORY.lead}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Lemmy Card */}
              <div className="p-4 rounded-2xl bg-[#FFF9D2] border border-[#FED729]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-2xl">🍋</span>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#1E2022]">Lemmy The Optimist</h4>
                    <span className="text-[10px] text-[#8B6A00] font-semibold">Chief Sourness Officer</span>
                  </div>
                </div>
                <p className="text-xs text-[#554A25] leading-relaxed">
                  Always giving two enthusiastic thumbs up. Believes nothing wakes up the soul quite like organic Meyer lemon pulp.
                </p>
              </div>

              {/* Melly Card */}
              <div className="p-4 rounded-2xl bg-[#FFE8EC] border border-[#FF3F5E]/40">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-2xl">🍉</span>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#1E2022]">Melly The Cool Cruiser</h4>
                    <span className="text-[10px] text-[#FF3F5E] font-semibold">Master of Chill Sweetness</span>
                  </div>
                </div>
                <p className="text-xs text-[#5C3D43] leading-relaxed">
                  Never seen without custom black sunglasses. Balances the citric fire with crisp, icy melon hydration.
                </p>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="space-y-3">
              {BRAND_STORY.chapters.map((chap, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="font-display font-bold text-sm text-[#FF3F5E] pt-0.5">
                    0{idx + 1}.
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#1E2022]">{chap.title}</h4>
                    <p className="text-xs text-[#635B48] leading-relaxed mt-0.5">
                      {chap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Future Expansion & Idea Box (Directly supports user's plan to expand foods!) */}
        <div className="bg-gradient-to-r from-[#FFF9E6] to-[#FFE8EC] rounded-3xl p-6 sm:p-10 border border-[#F0E4BE] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF3F5E] bg-white px-3 py-1 rounded-full shadow-xs inline-block mb-2">
                Brand Roadmap & Community Lab
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1E2022]">
                What Food Should Lemon & Melon Create Next?
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5542] mt-2 leading-relaxed">
                As Lemon & Melon expands, we are testing new small-batch treats in our test kitchen: 
                sweet & sour fruit ice pops, citrus watermelon pastries, sparkling teas, and crunchy dried fruit crisps. 
                Have a dream combination? Let the team know!
              </p>

              <div className="flex flex-wrap gap-2 mt-4 text-xs font-semibold text-[#1E2022]">
                <span className="bg-white/80 border border-[#F0E4BE] px-3 py-1 rounded-lg">
                  🍧 Ice Popsicles (Testing)
                </span>
                <span className="bg-white/80 border border-[#F0E4BE] px-3 py-1 rounded-lg">
                  🥐 Citrus Brioche Pastries
                </span>
                <span className="bg-white/80 border border-[#F0E4BE] px-3 py-1 rounded-lg">
                  🍵 Sparkling Fruit Teas
                </span>
              </div>
            </div>

            {/* Interactive Suggestion Box */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-[#F0E6CA] shadow-sm">
              <form onSubmit={handleSubmitIdea} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7A705A]">
                    Propose a Next Food or Expansion Idea:
                  </span>
                  <span className="text-[11px] text-[#A37B00] font-medium">To Lemmy & Melly</span>
                </div>

                <input
                  type="text"
                  value={ideaName}
                  onChange={(e) => setIdeaName(e.target.value)}
                  placeholder="Your Name or Foodie Handle"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8DEC0] bg-[#FFFDF7] focus:outline-none focus:ring-2 focus:ring-[#FED729]"
                />

                <textarea
                  value={ideaConcept}
                  onChange={(e) => setIdeaConcept(e.target.value)}
                  required
                  rows={2}
                  placeholder="e.g., 'Lemon-Melon soft serve in a watermelon bowl' or 'Fizzy fruit boba tea'..."
                  className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8DEC0] bg-[#FFFDF7] focus:outline-none focus:ring-2 focus:ring-[#FED729] resize-none"
                />

                <button
                  type="submit"
                  disabled={submitted}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98 ${
                    submitted
                      ? 'bg-[#3BB35E] text-white'
                      : 'bg-[#1E2022] hover:bg-[#33373B] text-white'
                  }`}
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Idea Submitted to Kitchen! Lemmy & Melly are tasting!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Idea to Kitchen R&D</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
