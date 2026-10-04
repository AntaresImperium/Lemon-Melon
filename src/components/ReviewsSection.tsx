import React from 'react';
import { Star, MessageSquareQuote, Sparkles, Send } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#FFFDF7] border-t border-[#F0E6CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#A37B00] bg-[#FFF4C2] px-3 py-1 rounded-full inline-block mb-2">
              Customer Tasting Notes
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1E2022]">
              The Sweet × Sour Buzz
            </h2>
            <p className="text-sm text-[#5C5542] mt-1">
              Honest feedback, tasting impressions, and reviews from our community.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#F0E4BE] shadow-xs shrink-0">
            <div className="flex text-[#FED729]">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div>
              <span className="font-mono tabular-nums text-sm font-bold text-[#1E2022]">
                Launch Stage
              </span>
              <span className="text-[10px] text-[#7A705A] block">
                Official notes open soon
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid or Empty State */}
        {REVIEWS.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#F0E6CA] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-[#FED729]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-medium text-[#7A705A]">
                      {rev.date}
                    </span>
                  </div>

                  <div className="text-[11px] font-semibold text-[#8B6A00] mb-2 flex items-center gap-1">
                    <span>Ordered:</span>
                    <span className="text-[#1E2022] underline decoration-[#FED729]">
                      {rev.item}
                    </span>
                  </div>

                  <p className="text-xs text-[#554E3C] leading-relaxed mb-4">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F4EAC8] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#1E2022]">{rev.name}</h4>
                    <span className="text-[10px] text-[#7A705A]">{rev.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F0E6CA] shadow-xs text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 bg-[#FFF9E6] text-[#D49800] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#FED729]">
              <MessageSquareQuote className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#1E2022] mb-2">
              Official Tasting Notes Opening Soon!
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5542] leading-relaxed mb-6">
              Edward and the team are preparing our inaugural food menu. 
              Our first batch of official tasters will be leaving their detailed impressions and ratings right here once the kitchen drops the first orders.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF4C2] rounded-xl text-xs font-bold text-[#8B6A00]">
              <Sparkles className="w-4 h-4 text-[#FF3F5E]" />
              <span>Want to be an official taste tester? Propose a recipe below!</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
