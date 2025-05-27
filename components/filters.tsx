"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FiltersProps {
  onFiltersChange: (filters: any) => void
}

export default function Filters({ onFiltersChange }: FiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [propertyType, setPropertyType] = useState("any")
  const [amenities, setAmenities] = useState<string[]>([])

  const amenityOptions = [
    "WiFi",
    "Pool",
    "Kitchen",
    "Parking",
    "Air Conditioning",
    "Hot Tub",
    "Fireplace",
    "Gym",
    "Beach Access",
    "Mountain View",
  ]

  const propertyTypes = ["Villa", "Cabin", "Loft", "Cottage", "Penthouse", "Apartment"]

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const newAmenities = checked ? [...amenities, amenity] : amenities.filter((a) => a !== amenity)
    setAmenities(newAmenities)
  }

  const applyFilters = () => {
    onFiltersChange({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      propertyType: propertyType || undefined,
      amenities: amenities.length > 0 ? amenities : undefined,
    })
  }

  const clearFilters = () => {
    setPriceRange([0, 1000])
    setPropertyType("any")
    setAmenities([])
    onFiltersChange({})
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-3 block">Price Range</Label>
          <Slider value={priceRange} onValueChange={setPriceRange} max={1000} min={0} step={10} className="mb-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">Property Type</Label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any type</SelectItem>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">Amenities</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {amenityOptions.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={amenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <Label htmlFor={amenity} className="text-sm">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={applyFilters} className="flex-1">
            Apply Filters
          </Button>
          <Button onClick={clearFilters} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
