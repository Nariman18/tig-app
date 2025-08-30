import React from 'react'
import Image from 'next/image'

function Banner() {
  const text =
    'We are a marketing agency that connects brands with the right influencers to create meaningful and effective campaigns. With over 50 ad integrations every day, we combine smart targeting, creative ideas, and smooth execution to boost brand visibility and engagement.'
  return (
    <section className="relative w-full sm:mt-28 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-full px-2">
        <div className="relative sm:w-[48vw] w-full h-[60vw] ipad-pro-portrait:h-[54.5vw] ipad-pro-landscape:h-[52.2vw] md:h-[63.8vw] lg:h-[54.5vw] ipad-air-landscape:h-[51.2vw] ipad-air-portrait:h-[56.1vw] xl:h-[50vw] px-2">
          <Image src="/IMG_3357.jpeg" alt="laptop" fill className="object-cover rounded-xl" />
        </div>

        <div className="flex flex-col h-full bg-black space-y-9">
          <div className="flex items-center justify-center mt-10">
            <p className="text-white max-w-lg font-dmSerif font-[400] xl:text-[20px] lg:text-[18px] md:text-[14px] ipad-pro-landscape:text-[20px] text-[14px]">
              {text.split(' ').map((word, i) => (
                <span key={i} className="bg-black px-1 mb-2 inline-block">
                  {word}
                </span>
              ))}
            </p>
          </div>

          <div className="relative w-full h-[16rem] md:h-60 lg:h-[30vw]">
            <Image
              src="/IMG_3356.jpeg"
              alt="girl with glasses"
              className="object-cover rounded-xl"
              fill
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
