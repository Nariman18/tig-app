import React from 'react'
import Banner from './banner'
import AboutUsCards from './about-us-cards'
import AboutOurAgency from './about-our-agency'

function HomePage() {
  return (
    <div className="relative w-full">
      <Banner />

      <AboutUsCards />

      <AboutOurAgency />
    </div>
  )
}

export default HomePage
