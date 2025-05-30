"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login API call
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h1 className="text-pinterest-red fw-bold mb-2">Pinterest</h1>
                  <h4 className="fw-bold mb-2">Welcome to Pinterest</h4>
                  <p className="text-muted">Find new ideas to try</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Password"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn pinterest-red btn-lg w-100 text-white fw-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Logging in...
                      </>
                    ) : (
                      "Log in"
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <Link href="/forgot-password" className="text-decoration-none">
                    Forgot your password?
                  </Link>
                </div>

                <hr className="my-4" />

                <div className="text-center">
                  <p className="mb-0">
                    Not on Pinterest yet?{" "}
                    <Link href="/register" className="text-pinterest-red text-decoration-none fw-semibold">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
