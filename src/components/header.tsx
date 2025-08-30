'use client'

import Link from 'next/link'
import Image from 'next/image'
import { RiTelegramFill, RiInstagramFill, RiWhatsappFill, RiMailFill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const socials = [
  {
    id: 1,
    link: '',
    icon: <RiInstagramFill />,
  },
  {
    id: 2,
    link: 'mailto:agency@trendinfluencegroup.com',
    icon: <RiMailFill />,
  },
  {
    id: 3,
    link: '',
    icon: <RiWhatsappFill />,
  },
  {
    id: 4,
    link: 'https://t.me/TrendInfluenceGroup',
    icon: <RiTelegramFill />,
  },
]

function Header() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={hasMounted ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="
        absolute top-0 left-0 right-0 z-50
        px-2 
      "
    >
      <header
        className="
          w-full mx-auto
          bg-[#000006]
          rounded-xl
          shadow-sm dark:shadow-[0_5px_30px_#00bbf0]
          backdrop-blur-md
          transition-shadow duration-500
          p-4
        "
      >
        <div className="flex w-full items-center px-0 xl:px-9">
          <Link href={'/'}>
            <div className="relative logo-animation sm:w-20 sm:h-20 w-16 h-16 ml-0 sm:ml-3">
              {/* Light theme logo */}
              <Image
                src="/IMG_3358.png"
                alt="Logo"
                fill
                className="md:object-contain object-cover dark:hidden"
                priority
              />
              {/* Dark theme logo */}
              <Image
                src="/IMG_3359.png"
                alt="Logo"
                fill
                className="md:object-contain object-cover hidden dark:block"
                priority
              />
            </div>
          </Link>

          <div className="ml-auto flex items-center sm:space-x-6 space-x-4 sm:pr-6 pr-2">
            <div className="flex gap-4">
              {socials.map((social) => (
                <Link href={social.link} className="social-button-animation" key={social.id}>
                  <div className="sm:text-[27px] text-[23px] hover:text-red-600">{social.icon}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
    </motion.div>
  )
}

export default Header

//shadow-[0_5px_40px_#F0E6D8]
