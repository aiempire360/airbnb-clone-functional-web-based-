"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Heart, Share, MapPin, Users, Bed, Bath, Wifi } from "lucide-react"
import { properties, addBooking } from "@/lib/data"

export default function PropertyPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [isBooking, setIsBooking] = useState(false)

  const property = properties.find((p) => p.id === params.id)

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const totalPrice = nights * property.price

  const handleBooking = async () => {
    if (!checkIn || !checkOut || !guestName || !guestEmail) {
      alert("Please fill in all required fields")
      return
    }

    setIsBooking(true)

    try {
      const booking = addBooking({
        propertyId: property.id,
        guestName,
        guestEmail,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        status: "confirmed",
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push(`/booking-confirmation/${booking.id}`)
    } catch (error) {
      alert("Booking failed. Please try again.")
    } finally {
      setIsBooking(false)
    }
  }

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

      <div className="container mx-auto px-4 py-8">
        {/* Property Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">{property.rating}</span>
              <span>({property.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="md:col-span-1">
            <Image
              src={property.images[selectedImageIndex] || "/placeholder.svg"}
              alt={property.title}
              width={600}
              height={400}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {property.images.slice(1, 5).map((image, index) => (
              <Image
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${property.title} ${index + 2}`}
                width={300}
                height={200}
                className="w-full h-44 object-cover rounded-lg cursor-pointer hover:opacity-80"
                onClick={() => setSelectedImageIndex(index + 1)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Hosted by {property.host.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {property.maxGuests} guests
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        {property.bedrooms} bedrooms
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        {property.bathrooms} bathrooms
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {property.host.superhost && <Badge variant="secondary">Superhost</Badge>}
                    <Avatar>
                      <AvatarImage src={property.host.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{property.host.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About this place</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>What this place offers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Wifi className="w-5 h-5 text-gray-600" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-current" />
                  {property.rating} • {property.reviewCount} reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32&text=U${review}`} />
                          <AvatarFallback>U{review}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Guest {review}</div>
                          <div className="text-sm text-gray-600">March 2024</div>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Amazing stay! The property was exactly as described and the host was very responsive.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${property.price}</span>
                  <span className="text-sm font-normal text-gray-600">per night</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="checkin">Check-in</Label>
                    <Input id="checkin" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="checkout">Check-out</Label>
                    <Input id="checkout" type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests">Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max={property.maxGuests}
                    value={guests}
                    onChange={(e) => setGuests(Number.parseInt(e.target.value) || 1)}
                  />
                </div>

                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                {nights > 0 && (
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between">
                      <span>
                        ${property.price} x {nights} nights
                      </span>
                      <span>${property.price * nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>${Math.round(totalPrice * 0.1)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>${totalPrice + Math.round(totalPrice * 0.1)}</span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleBooking}
                  disabled={isBooking || !checkIn || !checkOut || !guestName || !guestEmail}
                  className="w-full bg-rose-500 hover:bg-rose-600"
                >
                  {isBooking ? "Booking..." : "Reserve"}
                </Button>

                <p className="text-sm text-gray-600 text-center">You won't be charged yet</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
