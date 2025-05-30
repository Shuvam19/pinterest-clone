"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"

interface User {
  id: string
  name: string
  username: string
  avatar: string
  followers: number
  isFollowing: boolean
  isBusiness?: boolean
}

const mockFollowers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    username: "@sarahj",
    avatar: "/placeholder.svg?height=60&width=60",
    followers: 1234,
    isFollowing: true,
  },
  {
    id: "2",
    name: "Design Studio",
    username: "@designstudio",
    avatar: "/placeholder.svg?height=60&width=60",
    followers: 5678,
    isFollowing: false,
    isBusiness: true,
  },
]

const mockFollowing: User[] = [
  {
    id: "3",
    name: "Chef Maria",
    username: "@chefmaria",
    avatar: "/placeholder.svg?height=60&width=60",
    followers: 9876,
    isFollowing: true,
  },
  {
    id: "4",
    name: "Travel Blog",
    username: "@travelblog",
    avatar: "/placeholder.svg?height=60&width=60",
    followers: 3456,
    isFollowing: true,
    isBusiness: true,
  },
]

export default function FollowersPage() {
  const [activeTab, setActiveTab] = useState<"followers" | "following">("followers")
  const [followers, setFollowers] = useState(mockFollowers)
  const [following, setFollowing] = useState(mockFollowing)

  const currentUser = {
    name: "John Doe",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "john@example.com",
  }

  const handleFollowToggle = (userId: string, isCurrentlyFollowing: boolean) => {
    if (activeTab === "followers") {
      setFollowers(
        followers.map((user) => (user.id === userId ? { ...user, isFollowing: !isCurrentlyFollowing } : user)),
      )
    } else {
      setFollowing(
        following.map((user) => (user.id === userId ? { ...user, isFollowing: !isCurrentlyFollowing } : user)),
      )
    }
  }

  const currentList = activeTab === "followers" ? followers : following

  return (
    <div>
      <Navbar currentUser={currentUser} />

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="fw-bold mb-4">Connections</h2>

            <div className="d-flex gap-3 mb-4">
              <button
                className={`btn ${activeTab === "followers" ? "pinterest-red text-white" : "btn-outline-secondary"}`}
                onClick={() => setActiveTab("followers")}
              >
                Followers ({followers.length})
              </button>
              <button
                className={`btn ${activeTab === "following" ? "pinterest-red text-white" : "btn-outline-secondary"}`}
                onClick={() => setActiveTab("following")}
              >
                Following ({following.length})
              </button>
            </div>

            <div className="row">
              {currentList.map((user) => (
                <div key={user.id} className="col-md-6 mb-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body d-flex align-items-center">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="rounded-circle me-3"
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <h6 className="mb-0 fw-bold">{user.name}</h6>
                          {user.isBusiness && <span className="business-badge">Business</span>}
                        </div>
                        <p className="text-muted mb-1">{user.username}</p>
                        <small className="text-muted">{user.followers.toLocaleString()} followers</small>
                      </div>
                      <button
                        className={`btn ${user.isFollowing ? "btn-outline-secondary" : "pinterest-red text-white"}`}
                        onClick={() => handleFollowToggle(user.id, user.isFollowing)}
                      >
                        {user.isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {currentList.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-people fs-1 text-muted mb-3 d-block"></i>
                <h5 className="text-muted">
                  {activeTab === "followers" ? "No followers yet" : "Not following anyone yet"}
                </h5>
                <p className="text-muted">
                  {activeTab === "followers"
                    ? "When people follow you, they'll appear here"
                    : "Discover and follow people to see their content"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
