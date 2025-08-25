'use client'

import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
}

function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Smooth transition of all content while we enter from one page to another */}
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        transition={{ type: 'decay', delay: 0.2, duration: 0.4 }}
      >
        {children}
      </motion.main>
    </>
  )
}

export default Template
