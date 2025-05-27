export interface Property {
  id: string
  title: string
  description: string
  location: string
  price: number
  rating: number
  reviewCount: number
  images: string[]
  amenities: string[]
  propertyType: string
  bedrooms: number
  bathrooms: number
  maxGuests: number
  host: {
    name: string
    avatar: string
    superhost: boolean
  }
  coordinates: {
    lat: number
    lng: number
  }
}

export interface Booking {
  id: string
  propertyId: string
  guestName: string
  guestEmail: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: "confirmed" | "pending" | "cancelled"
  createdAt: string
}

export interface SearchFilters {
  location: string
  checkIn: string
  checkOut: string
  guests: number
  minPrice?: number
  maxPrice?: number
  propertyType?: string
  amenities?: string[]
}
