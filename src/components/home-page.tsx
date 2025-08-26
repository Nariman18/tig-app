import React from 'react'
import Banner from './banner'

function HomePage() {
  const titleText = 'Trend Influence Group'
  const text =
    'We are a marketing agency that connects brands with the right influencers to create meaningful and effective campaigns. With over 50 ad integrations every day, we combine smart targeting, creative ideas, and smooth execution to boost brand visibility and engagement.'
  return (
    <div className="relative">
      <Banner />
      <div className="flex justify-center">
        <h1 className="dark:text-[#F0E6D8] absolute top-[12px] xl:pl-28 ipad-pro-landscape:pl-32 lg:pl-36 md:pl-36 text-black text-[29px] md:text-[28px] lg:text-[33px] xl:text-[38px] ipad-pro-landscape:text-[38px] font-[600] font-nataSans">
          {titleText.split(' ').map((word, i) => (
            <span key={i} className=" ml-1 px-1 space-x-3 rounded-[7px]">
              {word}
            </span>
          ))}
        </h1>
      </div>

      <div className="flex justify-center">
        <p className="dark:text-[#F0E6D8] text-white absolute w-[280px] sm:ml-0 ml-3 md:w-[300px] lg:w-[400px] font-dmSerif font-[400] top-[100px] xl:top-[200px] lg:top-[150px] md:top-[120px] md:left-10 ipad-pro-landscape:top-[200px] xl:left-20 lg:left-14 ipad-pro-landscape:left-24 xl:text-[20px] lg:text-[18px] md:text-[14px] ipad-pro-landscape:text-[20px] text-[14px]">
          {text.split(' ').map((word, i) => (
            <span key={i} className="bg-black dark:bg-transparent px-1 mb-2 inline-block">
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

export default HomePage
