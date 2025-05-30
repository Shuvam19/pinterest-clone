"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface NavbarProps {
  currentUser?: {
    name: string
    avatar: string
    email: string
  }
}

export default function Navbar({ currentUser }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogout = () => {
    // Handle logout logic here
    router.push("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-pinterest sticky-top">
      <div className="container-fluid">
        <Link href="/dashboard" className="navbar-brand">
          <span className="text-pinterest-red fw-bold fs-3">Pinterest</span>
        </Link>

        <div className="d-flex align-items-center flex-grow-1 mx-4">
          <form onSubmit={handleSearch} className="flex-grow-1 me-3">
            <input
              type="text"
              className="form-control search-bar"
              placeholder="Search for ideas"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="d-flex align-items-center gap-3">
            <Link href="/dashboard" className="text-decoration-none text-dark">
              <i className="bi bi-house-fill fs-5"></i>
            </Link>
            <Link href="/create" className="text-decoration-none text-dark">
              <i className="bi bi-plus-circle fs-5"></i>
            </Link>
            <Link href="/followers" className="text-decoration-none text-dark">
              <i className="bi bi-people fs-5"></i>
            </Link>
            <Link href="/invitations" className="text-decoration-none text-dark">
              <i className="bi bi-envelope fs-5"></i>
            </Link>

            {currentUser && (
              <div className="dropdown">
                <button className="btn p-0 border-0" type="button" data-bs-toggle="dropdown">
                  <img
                    src={currentUser.avatar || "/placeholder.svg"}
                    alt={currentUser.name}
                    className="profile-avatar"
                  />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link href="/profile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings" className="dropdown-item">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
