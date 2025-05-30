"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import PinCard from "@/components/PinCard"

const mockUserPins = [
  {
    id: "1",
    title: "My Kitchen Renovation",
    image: "/placeholder.svg?height=300&width=250",
    description: "Before and after of my kitchen makeover",
    author: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
    saves: 234,
    isSponsored: false,
    isBusiness: false,
  },
  {
    id: "2",
    title: "Weekend DIY Project",
    image: "/placeholder.svg?height=350&width=250",
    description: "Simple DIY shelving unit",
    author: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
    saves: 156,
    isSponsored: false,
    isBusiness: false,
  },
]

const mockBoards = [
  {
    id: "1",
    name: "Home Decor",
    pinCount: 45,
    coverImages: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
  },
  {
    id: "2",
    name: "Recipes",
    pinCount: 23,
    coverImages: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"created" | "saved">("created")
  const [pins, setPins] = useState(mockUserPins)

  const currentUser = {
    name: "John Doe",
    avatar: "/placeholder.svg?height=120&width=120",
    email: "john@example.com",
  }

  const handleSavePin = (pinId: string) => {
    setPins(pins.map((pin) => (pin.id === pinId ? { ...pin, saves: pin.saves + 1 } : pin)))
  }

  return (
    <div>
      <Navbar currentUser={currentUser} />

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Profile Header */}
            <div className="text-center mb-5">
              <img
                src={currentUser.avatar || "/placeholder.svg"}
                alt={currentUser.name}
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <h2 className="fw-bold mb-2">{currentUser.name}</h2>
              <p className="text-muted mb-3">{currentUser.email}</p>
              <div className="d-flex justify-content-center gap-4 mb-4">
                <div className="text-center">
                  <div className="fw-bold fs-5">156</div>
                  <small className="text-muted">Followers</small>
                </div>
                <div className="text-center">
                  <div className="fw-bold fs-5">89</div>
                  <small className="text-muted">Following</small>
                </div>
                <div className="text-center">
                  <div className="fw-bold fs-5">{pins.length}</div>
                  <small className="text-muted">Pins</small>
                </div>
              </div>
              <button className="btn btn-outline-secondary">Edit Profile</button>
            </div>

            {/* Tabs */}
            <div className="d-flex justify-content-center gap-4 mb-4">
              <button
                className={`btn ${activeTab === "created" ? "pinterest-red text-white" : "btn-outline-secondary"}`}
                onClick={() => setActiveTab("created")}
              >
                Created
              </button>
              <button
                className={`btn ${activeTab === "saved" ? "pinterest-red text-white" : "btn-outline-secondary"}`}
                onClick={() => setActiveTab("saved")}
              >
                Saved
              </button>
            </div>

            {/* Content */}
            {activeTab === "created" && (
              <div className="masonry-grid">
                {pins.map((pin) => (
                  <PinCard key={pin.id} pin={pin} onSave={handleSavePin} />
                ))}
              </div>
            )}

            {activeTab === "saved" && (
              <div className="row">
                {mockBoards.map((board) => (
                  <div key={board.id} className="col-md-4 mb-4">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body">
                        <div className="d-flex mb-3">
                          {board.coverImages.map((image, index) => (
                            <img
                              key={index}
                              src={image || "/placeholder.svg"}
                              alt=""
                              className="rounded me-1"
                              style={{ width: "60px", height: "60px", objectFit: "cover" }}
                            />
                          ))}
                        </div>
                        <h6 className="fw-bold mb-1">{board.name}</h6>
                        <small className="text-muted">{board.pinCount} pins</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
