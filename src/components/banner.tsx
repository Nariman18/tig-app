import React from 'react'
import Image from 'next/image'

function Banner() {
  return (
    <div className="relative flex items-center justify-center sm:mt-28 mt-24">
      {/* Desktop/Large Screens */}
      <div className="relative w-full h-[50vw] dark:shadow-[0px_22px_40px_-20px_#00bbf0] shadow-[0_5px_40px_#e4cba1] hidden md:block">
        {/* Dark mode desktop image */}
        <Image
          src="/IMG_5947.PNG"
          alt="banner"
          fill
          className="object-cover dark:block hidden"
          priority
        />

        {/* Light mode desktop image */}
        <Image
          src="/IMG_3354.png"
          alt="banner"
          fill
          className="object-cover dark:hidden block"
          priority
        />
      </div>

      {/* Mobile/Small Screens */}
      <div className="relative w-full h-[100vw] md:hidden">
        {/* Dark mode mobile image */}
        <Image
          src="/IMG_2714.PNG"
          alt="banner"
          fill
          className="object-cover dark:block hidden"
          priority
        />

        {/* Light mode mobile image */}
        <Image
          src="/IMG_3360.png"
          alt="banner"
          fill
          className="object-cover dark:hidden block"
          priority
        />
      </div>
    </div>
  )
}

export default Banner
