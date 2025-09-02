import React from 'react'
import Image from 'next/image'

function Banner() {
  return (
    <section className="relative w-full sm:mt-28 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-full px-2">
        <div className="relative mt-2 w-full md:w-[48vw] h-[60vw] ipad-pro-portrait:h-[53.5vw] ipad-pro-landscape:h-[52.2vw] md:h-[63.8vw] lg:h-[54.5vw] ipad-air-landscape:h-[51.2vw] ipad-air-portrait:h-[56.1vw] xl:h-[49.5vw]">
          <Image
            src="/IMG_6642.png"
            alt="laptop"
            fill
            className="object-cover object-[28%] rounded-xl"
          />
        </div>

        <div className="flex flex-col h-full bg-black space-y-9">
          <div className="flex items-center justify-center mt-10">
            <p className="text-white text-center max-w-lg font-dmSerif font-[400] xl:text-[20px] lg:text-[18px] md:text-[14px] ipad-pro-landscape:text-[20px] text-[14px]">
              <span className="bg-black px-2 leading-10 sm:leading-7 xl:leading-10 inline-block">
                We are a marketing agency that connects brands with the right influencers to create
                meaningful and effective campaigns. With over 50 ad integrations every day, we
                combine smart targeting, creative ideas, and smooth execution to boost brand
                visibility and engagement.
              </span>
            </p>
          </div>

          <div className="relative w-full h-[16rem] md:h-[35.6vw] lg:h-[30.2vw] ipad-pro-portrait:h-[33.3vw] ipad-pro-landscape:h-[36.3vw] xl:h-[31.8vw]">
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
