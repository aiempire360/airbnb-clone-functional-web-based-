"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Star, Heart } from "lucide-react"
import type { Property } from "@/lib/types"
import { useState } from "react"

interface PropertyCardProps {
  property: Property
  showGuestFavorite?: boolean
}

export default function PropertyCard({ property, showGuestFavorite = false }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <div className="group cursor-pointer">
      <Link href={`/property/${property.id}`}>
        <div className="relative mb-3">
          <Image
            src={property.images[0] || "/placeholder.svg"}
            alt={property.title}
            width={400}
            height={300}
            className="w-full h-64 object-cover rounded-xl"
            priority={false}
            loading="lazy"
          />

          {/* Heart Icon */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorited(!isFavorited)
            }}
            className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-6 h-6 ${isFavorited ? "fill-rose-500 text-rose-500" : "fill-black/50 text-white stroke-2"}`}
            />
          </button>

          {/* Guest Favorite Badge */}
          {showGuestFavorite && (
            <Badge className="absolute top-3 left-3 bg-white text-gray-900 text-xs font-medium px-2 py-1">
              Guest favorite
            </Badge>
          )}
        </div>
      </Link>

      <Link href={`/property/${property.id}`}>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 truncate">{property.title}</h3>
            <div className="flex items-center gap-1 ml-2">
              <Star className="w-4 h-4 fill-current text-gray-900" />
              <span className="text-sm text-gray-900">{property.rating}</span>
            </div>
          </div>

          <p className="text-sm text-gray-600">${property.price} for 2 nights</p>
        </div>
      </Link>
    </div>
  )
}
