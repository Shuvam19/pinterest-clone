"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration API call
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", formData.email)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold">
                      Create a password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Create a password"
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-6">
                      <label htmlFor="firstName" className="form-label fw-semibold">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="First name"
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="lastName" className="form-label fw-semibold">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="age" className="form-label fw-semibold">
                      Age
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      placeholder="Age"
                      min="13"
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
                        Creating account...
                      </>
                    ) : (
                      "Continue"
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    By continuing, you agree to Pinterest's Terms of Service and Privacy Policy.
                  </small>
                </div>

                <hr className="my-4" />

                <div className="text-center">
                  <p className="mb-0">
                    Already a member?{" "}
                    <Link href="/login" className="text-pinterest-red text-decoration-none fw-semibold">
                      Log in
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
