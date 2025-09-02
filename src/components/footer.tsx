'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { RiInstagramFill, RiMailFill, RiTelegramFill, RiWhatsappFill } from 'react-icons/ri'

const socials = [
  { id: 1, link: 'https://www.instagram.com/trend.influence.group_/', icon: <RiInstagramFill /> },
  {
    id: 2,
    link: 'agency@trendinfluencegroup.com',
    icon: <RiMailFill />,
    isMail: true,
  },
  { id: 3, link: '', icon: <RiWhatsappFill /> },
  { id: 4, link: 'https://t.me/TrendInfluenceGroup', icon: <RiTelegramFill /> },
]

function Footer() {
  const year = new Date().getFullYear()
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const handleCopyEmail = async (email: string, id: number) => {
    try {
      await navigator.clipboard.writeText(email)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <footer className="bg-black py-12 shadow-[0_5px_30px_#00bbf0] backdrop-blur-md">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center space-x-6 mb-6">
            {socials.map((social) => (
              <motion.div
                key={social.id}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 17 }}
                className="relative flex items-center"
              >
                {social.isMail ? (
                  <button
                    onClick={() => handleCopyEmail(social.link, social.id)}
                    className="transition-colors duration-300 text-white"
                  >
                    <div className="sm:text-[27px] text-[23px] hover:text-red-600">
                      {social.icon}
                    </div>
                    {copiedId === social.id && (
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded-md shadow-md">
                        Copied
                      </div>
                    )}
                  </button>
                ) : (
                  <Link
                    href={social.link}
                    rel={social.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    target={social.link.startsWith('http') ? '_blank' : '_self'}
                    className="transition-colors duration-300 text-white sm:text-[27px] text-[23px] hover:text-red-600"
                  >
                    {social.icon}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-white text-center sm:text-base text-xs">
            {year} Copyright &copy; All rights are reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
