"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in, redirect accordingly
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-border text-pinterest-red" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
