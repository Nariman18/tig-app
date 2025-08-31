'use client'

import Link from 'next/link'
import Image from 'next/image'
import { RiTelegramFill, RiInstagramFill, RiWhatsappFill, RiMailFill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const socials = [
  { id: 1, link: '', icon: <RiInstagramFill /> },
  { id: 2, link: 'mailto:agency@trendinfluencegroup.com', icon: <RiMailFill /> },
  { id: 3, link: '', icon: <RiWhatsappFill /> },
  { id: 4, link: 'https://t.me/TrendInfluenceGroup', icon: <RiTelegramFill /> },
]

function Header() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setHasMounted(true), 200)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      className="
        absolute top-0 left-0 right-0 z-50 px-2
      "
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.75, y: -10 }}
        animate={hasMounted ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-full mx-auto"
      >
        <header
          style={{
            borderRadius: '0.75rem',
            boxShadow: '0 5px 30px #00bbf0',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          className="
            bg-[#000006]
            transition-shadow duration-500
            p-4
            will-change-transform origin-top
          "
        >
          <div className="flex w-full items-center px-0 xl:px-9">
            <Link href="/">
              <div className="relative logo-animation sm:w-20 sm:h-20 w-16 h-16 ml-0 sm:ml-3">
                <Image
                  src="/IMG_3358.png"
                  alt="Logo"
                  fill
                  className="md:object-contain object-cover dark:hidden"
                  priority
                />
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
                    <div className="sm:text-[27px] text-[23px] hover:text-red-600">
                      {social.icon}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </header>
      </motion.div>
    </div>
  )
}

export default Header
