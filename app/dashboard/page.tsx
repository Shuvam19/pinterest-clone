"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import PinCard from "@/components/PinCard"

// Mock data for pins
const mockPins = [
  {
    id: "1",
    title: "Modern Kitchen Design",
    image: "/placeholder.svg?height=300&width=250",
    description: "Beautiful modern kitchen with clean lines",
    author: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    saves: 1234,
    isSponsored: false,
    isBusiness: false,
  },
  {
    id: "2",
    title: "Sponsored: New Fashion Collection",
    image: "/placeholder.svg?height=400&width=250",
    description: "Latest fashion trends for spring",
    author: { name: "Fashion Brand", avatar: "/placeholder.svg?height=32&width=32" },
    saves: 856,
    isSponsored: true,
    isBusiness: true,
  },
  {
    id: "3",
    title: "DIY Garden Ideas",
    image: "/placeholder.svg?height=350&width=250",
    description: "Transform your backyard with these ideas",
    author: { name: "Garden Guru", avatar: "/placeholder.svg?height=32&width=32" },
    saves: 2341,
    isSponsored: false,
    isBusiness: false,
  },
  {
    id: "4",
    title: "Business Showcase: Tech Startup",
    image: "/placeholder.svg?height=280&width=250",
    description: "Innovative solutions for modern problems",
    author: { name: "TechCorp", avatar: "/placeholder.svg?height=32&width=32" },
    saves: 567,
    isSponsored: false,
    isBusiness: true,
  },
  {
    id: "5",
    title: "Recipe: Chocolate Cake",
    image: "/placeholder.svg?height=320&width=250",
    description: "Delicious homemade chocolate cake recipe",
    author: { name: "Chef Maria", avatar: "/placeholder.svg?height=32&width=32" },
    saves: 3456,
    isSponsored: false,
    isBusiness: false,
  },
  {
    id: "6",
    title: "Travel Photography",
    image: "/placeholder.svg?height=450&width=250",
    description: "Stunning landscapes from around the world",
    author: { name: "Travel Photographer", avatar: "/placeholder.svg?height=32&width=32" },
    saves: 1789,
    isSponsored: false,
    isBusiness: false,
  },
]

export default function DashboardPage() {
  const [pins, setPins] = useState(mockPins)
  const [currentUser, setCurrentUser] = useState({
    name: "John Doe",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "john@example.com",
  })

  const handleSavePin = (pinId: string) => {
    setPins(pins.map((pin) => (pin.id === pinId ? { ...pin, saves: pin.saves + 1 } : pin)))
  }

  return (
    <div>
      <Navbar currentUser={currentUser} />

      <div className="container-fluid">
        <div className="masonry-grid">
          {pins.map((pin) => (
            <PinCard key={pin.id} pin={pin} onSave={handleSavePin} />
          ))}
        </div>
      </div>
    </div>
  )
}
