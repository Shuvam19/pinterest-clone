"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import PinCard from "@/components/PinCard"

const mockSearchResults = [
  {
    id: "1",
    title: "Modern Kitchen Design Ideas",
    image: "/placeholder.svg?height=300&width=250",
    description: "Beautiful modern kitchen with clean lines",
    author: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    saves: 1234,
    isSponsored: false,
    isBusiness: false,
  },
  {
    id: "2",
    title: "Kitchen Organization Tips",
    image: "/placeholder.svg?height=350&width=250",
    description: "Keep your kitchen organized and functional",
    author: { name: "Home Organizer", avatar: "/placeholder.svg?height=32&width=32" },
    saves: 856,
    isSponsored: true,
    isBusiness: true,
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState(mockSearchResults)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"pins" | "boards">("pins")

  const currentUser = {
    name: "John Doe",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "john@example.com",
  }

  useEffect(() => {
    // Simulate search API call
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [query])

  const handleSavePin = (pinId: string) => {
    setResults(results.map((pin) => (pin.id === pinId ? { ...pin, saves: pin.saves + 1 } : pin)))
  }

  return (
    <div>
      <Navbar currentUser={currentUser} />

      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h2 className="fw-bold mb-3">Search results for "{query}"</h2>

            <div className="d-flex gap-3 mb-4">
              <button
                className={`btn ${activeTab === "pins" ? "pinterest-red text-white" : "btn-outline-secondary"}`}
                onClick={() => setActiveTab("pins")}
              >
                Pins
              </button>
              <button
                className={`btn ${activeTab === "boards" ? "pinterest-red text-white" : "btn-outline-secondary"}`}
                onClick={() => setActiveTab("boards")}
              >
                Boards
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-pinterest-red" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {activeTab === "pins" && (
                  <div className="masonry-grid">
                    {results.map((pin) => (
                      <PinCard key={pin.id} pin={pin} onSave={handleSavePin} />
                    ))}
                  </div>
                )}

                {activeTab === "boards" && (
                  <div className="row">
                    <div className="col-md-4 mb-4">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body">
                          <h5 className="card-title">Kitchen Ideas</h5>
                          <p className="card-text text-muted">45 pins • Created by Sarah Johnson</p>
                          <div className="d-flex">
                            <img src="/placeholder.svg?height=60&width=60" alt="" className="rounded me-2" />
                            <img src="/placeholder.svg?height=60&width=60" alt="" className="rounded me-2" />
                            <img src="/placeholder.svg?height=60&width=60" alt="" className="rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
