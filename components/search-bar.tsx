"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch?: (filters: any) => void
  className?: string
}

export default function SearchBar({ onSearch, className }: SearchBarProps) {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("")

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      location,
      checkIn,
      checkOut,
      guests: guests.toString(),
    })

    if (onSearch) {
      onSearch({ location, checkIn, checkOut, guests })
    } else {
      router.push(`/search?${searchParams.toString()}`)
    }
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="bg-white border border-gray-300 rounded-full shadow-lg flex items-center max-w-4xl w-full">
        {/* Where */}
        <div className="flex-1 px-6 py-4 border-r border-gray-300">
          <div className="text-xs font-semibold text-gray-900 mb-1">Where</div>
          <input
            type="text"
            placeholder="Search destinations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
          />
        </div>

        {/* Check in */}
        <div className="flex-1 px-6 py-4 border-r border-gray-300">
          <div className="text-xs font-semibold text-gray-900 mb-1">Check in</div>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
            placeholder="Add dates"
          />
        </div>

        {/* Check out */}
        <div className="flex-1 px-6 py-4 border-r border-gray-300">
          <div className="text-xs font-semibold text-gray-900 mb-1">Check out</div>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
            placeholder="Add dates"
          />
        </div>

        {/* Who */}
        <div className="flex-1 px-6 py-4">
          <div className="text-xs font-semibold text-gray-900 mb-1">Who</div>
          <input
            type="text"
            placeholder="Add guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
          />
        </div>

        {/* Search Button */}
        <div className="px-2">
          <Button
            onClick={handleSearch}
            className="bg-rose-500 hover:bg-rose-600 text-white rounded-full p-4 w-12 h-12 flex items-center justify-center"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
