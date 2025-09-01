'use client'

import Link from 'next/link'
import Image from 'next/image'
import { RiTelegramFill, RiInstagramFill, RiWhatsappFill, RiMailFill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'

const socials = [
  { id: 1, link: '', icon: <RiInstagramFill /> },
  { id: 2, link: 'mailto:agency@trendinfluencegroup.com', icon: <RiMailFill /> },
  { id: 3, link: '', icon: <RiWhatsappFill /> },
  { id: 4, link: 'https://t.me/TrendInfluenceGroup', icon: <RiTelegramFill /> },
]

function Header() {
  const [isLoaded, setIsLoaded] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    // Prevent scrollbar layout shifts by reserving space
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (headerRef.current && scrollbarWidth > 0) {
      headerRef.current.style.paddingRight = `${scrollbarWidth}px`
    }

    setIsLoaded(true)
  }, [])

  return (
    <div className="absolute top-0 left-0 right-0 z-50 px-2">
      <header
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
          <Link href="/" className="block">
            {isLoaded && (
              <motion.div
                className="relative sm:w-20 sm:h-20 w-16 h-16 ml-0 sm:ml-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 400,
                  damping: 17,
                }}
              >
                <Image
                  src="/IMG_3358.png"
                  alt="Logo"
                  fill
                  className="md:object-contain object-cover dark:hidden"
                  sizes="(max-width: 768px) 64px, 80px"
                />
                <Image
                  src="/IMG_3359.png"
                  alt="Logo"
                  fill
                  className="md:object-contain object-cover hidden dark:block"
                  priority
                  sizes="(max-width: 768px) 64px, 80px"
                />
              </motion.div>
            )}
          </Link>

          <div className="ml-auto flex items-center sm:space-x-6 space-x-4 sm:pr-6 pr-2">
            <div className="relative w-full">
              {isLoaded && (
                <div className="flex gap-4">
                  {socials.map((social, index) => (
                    <motion.div
                      key={social.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.15,
                        duration: 0.5,
                        type: 'tween',
                        ease: 'easeOut',
                      }}
                      style={{ willChange: 'transform, opacity' }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <Link href={social.link} className="transition-colors duration-300 block">
                          <div className="sm:text-[27px] text-[23px] hover:text-red-600">
                            {social.icon}
                          </div>
                        </Link>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
