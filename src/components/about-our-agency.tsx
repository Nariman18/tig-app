'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const agencyAboutInfo = [
  {
    id: 1,
    title: 'Why us?',
    description:
      'Get access to exclusive offers starting today, including the best CPM rates in the industry, rapid campaign launch, and guaranteed KPI performance.',
    image: '/IMG_6643.jpeg',
  },
  {
    id: 2,
    title: 'Content marketing',
    description:
      'Our content marketing strategy helps increase your brand awareness and attract new customers.',
    image: '/IMG_6644.png',
  },
  {
    id: 3,
    title: 'Analytics and reporting',
    description:
      'Our goal is to ensure the successful development and sustainable growth of your business.',
    image: '/IMG_6645.jpeg',
  },
]

function AboutOurAgency() {
  return (
    <section className="relative w-full pt-10 px-6 md:px-10 lg:px-16 bg-black text-white">
      <h1 className="font-nataSans font-medium text-[34px] md:text-[50px] lg:text-[58px] pb-10">
        About our agency
      </h1>

      <motion.div
        initial={{ opacity: 0, scaleX: 0, transformOrigin: 'right' }}
        whileInView={{ opacity: 1, scaleX: 1, transformOrigin: 'left' }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full border-white border-b"
      />

      <div className="relative mt-12 flex flex-col gap-14 md:gap-20">
        {/* Vertical divider  line */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-white/20" />

        {agencyAboutInfo.map((item, id) => {
          const flip = id % 2 === 1

          return (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <div className={flip ? 'md:order-2' : 'md:order-1'}>
                <div className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
                  />

                  <motion.div
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 0 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute inset-0 bg-white/75"
                  />
                </div>
              </div>

              <div className={`pt-4 md:pt-0 ${flip ? 'md:order-1' : 'md:order-2'}`}>
                <h2 className="text-2xl sm:text-xl lg:text-2xl font-semibold mb-3">{item.title}</h2>
                <p className="text-sm sm:text-base lg:text-[17px] text-gray-300 pt-0 md:pt-16 w-[350px]">
                  {item.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default AboutOurAgency
