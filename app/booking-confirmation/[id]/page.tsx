"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, Users, MapPin, Mail, Phone } from "lucide-react"
import { bookings, properties } from "@/lib/data"

export default function BookingConfirmationPage() {
  const params = useParams()
  const booking = bookings.find((b) => b.id === params.id)
  const property = booking ? properties.find((p) => p.id === booking.propertyId) : null

  if (!booking || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Booking not found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const checkInDate = new Date(booking.checkIn).toLocaleDateString()
  const checkOutDate = new Date(booking.checkOut).toLocaleDateString()

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

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-lg text-gray-600">
              Your reservation has been successfully confirmed. We've sent a confirmation email to {booking.guestEmail}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Booking ID</h3>
                  <p className="text-gray-600">{booking.id}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Guest Name</h3>
                  <p className="text-gray-600">{booking.guestName}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Check-in</h3>
                  <p className="text-gray-600">{checkInDate}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Check-out</h3>
                  <p className="text-gray-600">{checkOutDate}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Guests</h3>
                  <p className="text-gray-600 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Status</h3>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {booking.status}
                  </Badge>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-gray-900 mb-2">Total Amount</h3>
                  <p className="text-2xl font-bold text-gray-900">${booking.totalPrice}</p>
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Image
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{property.title}</h3>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {property.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{property.bedrooms} bedrooms</span>
                    <span>{property.bathrooms} bathrooms</span>
                    <span>Up to {property.maxGuests} guests</span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Host</h4>
                    <p className="text-gray-600">{property.host.name}</p>
                    {property.host.superhost && (
                      <Badge variant="secondary" className="mt-1">
                        Superhost
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Mail className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Check Your Email</h3>
                  <p className="text-sm text-gray-600">We've sent you a confirmation email with all the details</p>
                </div>

                <div className="text-center">
                  <Phone className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Contact Host</h3>
                  <p className="text-sm text-gray-600">Reach out to your host for any special requests</p>
                </div>

                <div className="text-center">
                  <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Prepare for Your Trip</h3>
                  <p className="text-sm text-gray-600">Check-in instructions will be sent 24 hours before arrival</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                Back to Home
              </Button>
            </Link>
            <Link href="/search">
              <Button className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600">Book Another Stay</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
