'use client'

import Link from 'next/link'
import ThemeToggler from './ThemeToggler'
import Image from 'next/image'
import { RiTelegramFill, RiInstagramFill, RiWhatsappFill, RiMailFill } from 'react-icons/ri'
import { motion } from 'framer-motion'

const socials = [
  {
    id: 1,
    link: '',
    icon: <RiInstagramFill />,
  },
  {
    id: 2,
    link: '',
    icon: <RiMailFill />,
  },
  {
    id: 3,
    link: '',
    icon: <RiWhatsappFill />,
  },
  {
    id: 4,
    link: '',
    icon: <RiTelegramFill />,
  },
]

function Header() {
  return (
    <motion.header
      initial={{
        opacity: 0,
        x: -50,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1.05,
        x: '-50%',
      }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
      }}
      className="absolute 
        top-0 left-1/2 -translate-x-1/2
        2xl:w-[calc(100%-6rem)] xl:w-[calc(100%-5rem)] lg:w-[calc(100%-4rem)] ipad-pro-portrait:w-[calc(100%-4rem)] ipad-pro-landscape:w-[calc(100%-4.5rem)] md:w-[calc(100%-3rem)] w-[calc(100%-1.6rem)]
        max-w-full        
        rounded-xl border border-gray-600 
        z-10 shadow-[0_5px_30px_#e4cba1] dark:shadow-[0_5px_30px_#00bbf0] 
        bg-[#ffff] dark:bg-[#000006]
        p-4"
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

          <div>
            <ThemeToggler />
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header

//shadow-[0_5px_40px_#F0E6D8]
