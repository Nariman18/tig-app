// components/filtering-panel.tsx
'use client'
import { useState } from 'react'
import { Popover, PopoverContent } from './ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { ChevronDown } from 'lucide-react'

interface FilteringPanelProps {
  onFilterChange: (filterType: string, value: string) => void
  filterType: 'country' | 'socialMedia'
  currentFilter: string
  options: { value: string; label: string }[]
  placeholder?: string
  buttonText?: string
}

export function FilteringPanel({
  onFilterChange,
  filterType,
  currentFilter,
  options,
  placeholder,
  buttonText,
}: FilteringPanelProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (value: string) => {
    onFilterChange(filterType, value)
    setOpen(false)
  }

  const clearFilter = () => {
    onFilterChange(filterType, '')
  }

  // Default texts based on filterType
  const defaultButtonText = `Filter by ${filterType === 'country' ? 'Country' : 'Social Media'}`
  const defaultPlaceholder = `Search ${filterType === 'country' ? 'Countries' : 'Social Media'}...`
  const defaultEmptyText = `No ${filterType === 'country' ? 'Countries' : 'Social Media'} found.`

  const selectedLabel = currentFilter
    ? options.find((opt) => opt.value === currentFilter)?.label || currentFilter
    : buttonText || defaultButtonText
  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedLabel}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={placeholder || defaultPlaceholder} className="h-9" />
            <CommandList>
              <CommandEmpty>{defaultEmptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {currentFilter && (
        <Button variant="ghost" size="lg" onClick={clearFilter} className="h-8 px-2">
          ×
        </Button>
      )}
    </div>
  )
}
