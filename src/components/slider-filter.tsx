'use client'

import { useEffect, useState } from 'react'
import { Slider } from './ui/slider'

interface SliderFilterProps {
  className?: string
  onFilterChange: (min: number, max: number) => void
  currentMin?: number
  currentMax?: number
}

export function SliderFilter({
  className = '',
  onFilterChange,
  currentMin,
  currentMax,
}: SliderFilterProps) {
  const [logValues, setLogValues] = useState([0, 100]) // 0-100 scale for UI
  const [actualValues, setActualValues] = useState([1000, 50000000])
  const [exactValues, setExactValues] = useState<{ min?: number; max?: number }>({})

  // Converting linear position (0-100) to actual value
  const logToValue = (logPosition: number): number => {
    const minLog = Math.log10(1000)
    const maxLog = Math.log10(50000000)
    const logRange = maxLog - minLog
    const value = Math.pow(10, minLog + (logPosition / 100) * logRange)
    return Math.round(value)
  }

  // Converting actual value to linear position (0-100)
  const valueToLog = (value: number): number => {
    const minLog = Math.log10(1000)
    const maxLog = Math.log10(50000000)
    const logRange = maxLog - minLog
    return ((Math.log10(value) - minLog) / logRange) * 100
  }

  useEffect(() => {
    if (currentMin !== undefined && currentMax !== undefined) {
      setLogValues([valueToLog(currentMin), valueToLog(currentMax)])
      setActualValues([currentMin, currentMax])
      setExactValues({ min: currentMin, max: currentMax })
    } else {
      setExactValues({})
    }
  }, [currentMin, currentMax])

  const handleValueChange = (newLogValues: number[]) => {
    setLogValues(newLogValues)
    const newMin = logToValue(newLogValues[0])
    const newMax = logToValue(newLogValues[1])
    setActualValues([newMin, newMax])
    setExactValues({}) // Clear exact values when user manually adjusts
  }

  const handleValueCommit = (newLogValues: number[]) => {
    const newMin = exactValues.min !== undefined ? exactValues.min : logToValue(newLogValues[0])
    const newMax = exactValues.max !== undefined ? exactValues.max : logToValue(newLogValues[1])

    onFilterChange(newMin, newMax)
  }

  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  // Display exact values when available, otherwise use calculated values
  const displayMin = exactValues.min !== undefined ? exactValues.min : actualValues[0]

  return (
    <div className={`w-64 ${className}`}>
      <div className="mb-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Followers Range - {formatFollowerCount(displayMin)}
        </label>
      </div>
      <Slider
        defaultValue={[valueToLog(1000), valueToLog(50000000)]}
        value={logValues}
        min={0}
        max={100}
        step={0.1}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>1K</span>
        <span>50M</span>
      </div>
    </div>
  )
}
