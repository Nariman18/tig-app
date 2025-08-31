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
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = () => setIsReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    // Start animation with a slight delay to ensure DOM is ready
    const timer = setTimeout(() => setHasMounted(true), 50)

    return () => {
      clearTimeout(timer)
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-2">
      <motion.header
        initial={isReducedMotion ? false : { opacity: 0, y: -50, scale: 0.75 }}
        animate={
          hasMounted || isReducedMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: -50, scale: 0.75 }
        }
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          scale: {
            duration: 0.6,
            ease: 'easeOut',
          },
        }}
        style={{
          willChange: 'transform, opacity',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
        className="
          bg-[#000006]
          p-4
          w-full max-w-full mx-auto
          rounded-xl
          shadow-[0_5px_30px_#00bbf0]
          backdrop-blur-md
        "
      >
        <div className="flex w-full items-center px-0 xl:px-9">
          <Link href="/">
            <motion.div
              className="relative sm:w-20 sm:h-20 w-16 h-16 ml-0 sm:ml-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
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
            </motion.div>
          </Link>

          <div className="ml-auto flex items-center sm:space-x-6 space-x-4 sm:pr-6 pr-2">
            <div className="flex gap-4">
              {socials.map((social) => (
                <motion.div
                  key={social.id}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Link href={social.link} className="transition-colors duration-300">
                    <div className="sm:text-[27px] text-[23px] hover:text-red-600">
                      {social.icon}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.header>
    </div>
  )
}

export default Header
