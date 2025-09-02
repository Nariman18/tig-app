'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const cards = [
  {
    id: 1,
    src: '/IMG_3357.jpeg',
    alt: 'card-1',
    text: 'TIG (Trend Influence Group) is a leading company specializing in promoting various brands through collaboration with influencers. Their approach to advertising and promotion is unique and effective, making them the best choice for your products seeking to actively develop and popularize their brands online.',
  },
  {
    id: 2,
    src: '/IMG_3362.jpeg',
    alt: 'card-2',
    text: 'The internet is a huge platform where competition between brands is growing every day. To stand out and attract customers, you need effective promotion strategies. TIG (Trend Influence Group) helps companies promote their products and services through influencers. Thanks to their audience and trust, you can increase your brand awareness and sales. We will select the best partners and organize successful campaigns for your brand. We work with any niche and promote any product. Translated with DeepL.com (free version)',
  },
  {
    id: 3,
    src: '/IMG_6637.jpeg',
    alt: 'card-3',
    text: 'More than 50 influencers publish advertising integrations every day from 40+ countries, 1000+ influencers already work with us. TIG (Trend Influence Group) helps brands promote any products and services through influencers. We select partners, develop strategies, and launch campaigns that increase brand awareness and sales worldwide.',
  },
]

type ExpandCardState = {
  [key: number]: boolean
}

function AboutUsCards() {
  const [expandCards, setExpandCards] = useState<ExpandCardState>({})

  const toggleExpand = (cardId: number) => {
    setExpandCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }))
  }
  return (
    <section className="relative w-full pt-10 px-8 md:px-10 lg:px-16">
      <h1 className="font-nataSans font-[500] text-[40px] md:text-[50px] lg:text-[60px] pb-10">
        About Us
      </h1>
      <motion.div
        initial={{
          opacity: 0,
          scaleX: 0,
          transformOrigin: 'right',
        }}
        whileInView={{
          opacity: 1,
          scaleX: 1,
          transformOrigin: 'left',
        }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
        className="w-full max-w-full border-white border-b-[1px]"
      />

      <div className="inline-block min-w-full relative mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div key={card.id} className="flex gap-x-2 flex-col items-center">
              {/* Container with full width and flexible height */}
              <div className="relative w-full max-w-[450px] h-[150px] xl:h-80">
                <Image src={card.src} alt={card.alt} fill className="object-cover rounded-xl" />
              </div>
              <div className="py-5 w-full max-w-[450px]">
                {/* Animated text container */}
                <AnimatePresence initial={false}>
                  <motion.div
                    key={card.id}
                    initial={{ height: 96 }}
                    animate={{
                      height: expandCards[card.id] ? 'auto' : 96,
                      transition: {
                        duration: 0.4,
                        ease: 'easeInOut',
                      },
                    }}
                    exit={{ height: 96 }}
                    className="relative overflow-hidden"
                  >
                    <p className="text-center font-dmSerif text-base text-white">{card.text}</p>

                    {/* Gradient overlay when collapsed */}
                    {!expandCards[card.id] && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#000006] to-transparent"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Expand/Collapse button */}
                <button
                  onClick={() => toggleExpand(card.id)}
                  className="flex items-center justify-center w-full mt-5"
                >
                  {expandCards[card.id] ? (
                    <>
                      <ChevronUp
                        size={25}
                        className="animate-bounce text-pink-400 hover:scale-110 transition-colors"
                      />
                    </>
                  ) : (
                    <>
                      <ChevronDown
                        size={25}
                        className="animate-bounce text-pink-400 hover:scale-110 transition-colors"
                      />
                    </>
                  )}
                </button>
              </div>
              <div className="w-full max-w-[450px] border-b border-gray-600 mt-2 pt-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutUsCards
