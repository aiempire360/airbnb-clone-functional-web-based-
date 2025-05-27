"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import SearchBar from "@/components/search-bar"
import PropertyCard from "@/components/property-card"
import Filters from "@/components/filters"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { properties } from "@/lib/data"
import type { Property } from "@/lib/types"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties)
  const [sortBy, setSortBy] = useState("relevance")
  const [filters, setFilters] = useState<any>({})

  useEffect(() => {
    let filtered = [...properties]

    // Apply search filters
    const location = searchParams.get("location")
    const checkIn = searchParams.get("checkIn")
    const checkOut = searchParams.get("checkOut")
    const guests = searchParams.get("guests")

    if (location) {
      filtered = filtered.filter(
        (property) =>
          property.location.toLowerCase().includes(location.toLowerCase()) ||
          property.title.toLowerCase().includes(location.toLowerCase()),
      )
    }

    if (guests) {
      const guestCount = Number.parseInt(guests)
      filtered = filtered.filter((property) => property.maxGuests >= guestCount)
    }

    // Apply additional filters
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((property) => property.price >= filters.minPrice)
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((property) => property.price <= filters.maxPrice)
    }

    if (filters.propertyType) {
      filtered = filtered.filter((property) => property.propertyType === filters.propertyType)
    }

    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter((property) =>
        filters.amenities.every((amenity: string) => property.amenities.includes(amenity)),
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
    }

    setFilteredProperties(filtered)
  }, [searchParams, filters, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-rose-500">airbnb</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/search" className="text-gray-600 hover:text-gray-900">
                Search
              </Link>
              <Button variant="outline">Sign In</Button>
              <Button className="bg-rose-500 hover:bg-rose-600">Sign Up</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <SearchBar />
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Filters onFiltersChange={setFilters} />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">{filteredProperties.length} stays found</h1>
                <p className="text-gray-600">{searchParams.get("location") && `in ${searchParams.get("location")}`}</p>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                <Link href="/">
                  <Button>Back to Home</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
