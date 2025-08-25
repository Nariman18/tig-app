'use client'

import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function ThemeToggler() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === 'dark'
  if (!mounted) return null

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="cursor-pointer relative rounded-full"
      >
        {isDark ? (
          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
        ) : (
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90" />
        )}
      </Button>
    </div>
  )
}

export default ThemeToggler
