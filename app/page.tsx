import Link from "next/link"
import SearchBar from "@/components/search-bar"
import PropertyCard from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Menu, Lightbulb, Home, ChefHat } from "lucide-react"
import { properties } from "@/lib/data"

export default function HomePage() {
  const lahoreProperties = properties.filter((p) => p.location === "Lahore")
  const islamabadProperties = properties.filter((p) => p.location === "Islamabad")

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <svg width="32" height="32" viewBox="0 0 32 32" className="text-rose-500">
                <path
                  fill="currentColor"
                  d="M16 1C7.163 1 0 8.163 0 17c0 8.836 7.163 16 16 16s16-7.164 16-16C32 8.163 24.837 1 16 1zm0 2c7.732 0 14 6.268 14 14 0 7.733-6.268 14-14 14S2 24.733 2 17C2 9.268 8.268 3 16 3z"
                />
                <path
                  fill="currentColor"
                  d="M16 6.5c-2.5 0-4.5 2-4.5 4.5 0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.5-2-4.5-4.5-4.5zm0 6.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                />
              </svg>
              <span className="ml-2 text-xl font-bold text-rose-500">airbnb</span>
            </Link>

            {/* Center Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100">
                <Home className="w-4 h-4" />
                <span className="font-medium">Homes</span>
              </Link>
              <Link
                href="/experiences"
                className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100 relative"
              >
                <Lightbulb className="w-4 h-4" />
                <span className="font-medium">Experiences</span>
                <Badge className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5">NEW</Badge>
              </Link>
              <Link
                href="/services"
                className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100 relative"
              >
                <ChefHat className="w-4 h-4" />
                <span className="font-medium">Services</span>
                <Badge className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5">NEW</Badge>
              </Link>
            </nav>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              <Link
                href="/host"
                className="hidden md:block text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded-full"
              >
                Become a host
              </Link>
              <Button variant="ghost" size="sm" className="p-2">
                <Globe className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative h-96 bg-gradient-to-r from-rose-500 to-pink-500 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=400&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative container mx-auto px-6 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Find your next adventure</h1>
            <p className="text-xl md:text-2xl mb-8">Discover amazing places to stay around the world</p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="container mx-auto px-6 -mt-8 relative z-10">
        <SearchBar />
      </section>

      {/* Popular homes in Lahore */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Popular homes in Lahore</h2>
          <Button variant="ghost" className="text-sm font-medium">
            Show all
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {lahoreProperties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={{
                ...property,
                title: index % 3 === 0 ? "Condo in Lahore" : index % 3 === 1 ? "Apartment in Lahore" : "Home in Lahore",
              }}
              showGuestFavorite
            />
          ))}
        </div>

        {/* Prices include all fees banner */}
        <div className="flex justify-center mt-8">
          <div className="bg-pink-50 border border-pink-200 rounded-lg px-4 py-2 flex items-center space-x-2">
            <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-900">Prices include all fees</span>
          </div>
        </div>
      </section>

      {/* Available next month in Islamabad */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Available next month in Islamabad</h2>
          <Button variant="ghost" className="text-sm font-medium">
            Show all
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {islamabadProperties.map((property, index) => (
            <PropertyCard
              key={`islamabad-${property.id}`}
              property={{
                ...property,
                title:
                  index % 3 === 0
                    ? "Condo in Islamabad"
                    : index % 3 === 1
                      ? "Apartment in Islamabad"
                      : "Home in Islamabad",
              }}
              showGuestFavorite
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-6 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold mb-8 text-center">Browse by Property Type</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              type: "Villa",
              image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200&h=200&fit=crop",
            },
            {
              type: "Cabin",
              image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop",
            },
            {
              type: "Loft",
              image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop",
            },
            {
              type: "Cottage",
              image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=200&h=200&fit=crop",
            },
          ].map((category) => (
            <Link key={category.type} href={`/search?propertyType=${category.type}`}>
              <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.type}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold">{category.type}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Safety Information
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Cancellation Options
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Community</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Airbnb.org
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Diversity & Belonging
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Against Discrimination
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Hosting</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Host Your Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Host an Experience
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Responsible Hosting
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Newsroom
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    New Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">© 2024 Airbnb Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
