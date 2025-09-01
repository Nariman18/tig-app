'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'

const cards = [
  {
    id: 1,
    src: '/IMG_3357.jpeg',
    alt: 'card-1',
  },
  {
    id: 2,
    src: '/IMG_3362.jpeg',
    alt: 'card-2',
  },
  {
    id: 3,
    src: '/IMG_3361.jpeg',
    alt: 'card-3',
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
    <section className="relative w-full pt-10 px-16">
      <h1 className="font-nataSans font-[500] text-[60px] border-b-[1px] pb-10 border-white">
        About Us
      </h1>
      <div className="inline-block min-w-full relative mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div key={card.id} className="flex gap-x-2 flex-col items-center">
              {/* Container with full width and flexible height */}
              <div className="relative w-full max-w-[450px] h-[150px] xl:h-80">
                <Image src={card.src} alt={card.alt} fill className="object-cover rounded-xl" />
              </div>
              <div className="px-5 py-5 w-full max-w-[450px]">
                <div
                  className={`relative overflow-hidden ${expandCards[card.id] ? 'h-auto' : 'h-24'}`}
                >
                  <p className="text-center text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum itaque eligendi
                    atque voluptatibus. Odio sequi, magnam tenetur error voluptatum eius atque
                    blanditiis officia non itaque numquam veritatis mollitia nulla totam. Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Deserunt iure magni culpa
                    tempora suscipit praesentium inventore non laudantium deleniti. Accusamus nisi
                    earum corporis laboriosam rem, eaque hic quod nihil iusto.
                  </p>

                  {/* Gradient overlay when collapsed */}
                  {!expandCards[card.id] && (
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#000006] to-transparent" />
                  )}
                </div>

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
