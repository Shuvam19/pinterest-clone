"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"

export default function CreatePinPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    board: "default",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const currentUser = {
    name: "John Doe",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "john@example.com",
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div>
      <Navbar currentUser={currentUser} />

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4">
                <h2 className="fw-bold mb-4">Create Pin</h2>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label className="form-label fw-semibold">Upload Image</label>
                        <div className="border-2 border-dashed rounded-3 p-4 text-center">
                          {imagePreview ? (
                            <div>
                              <img
                                src={imagePreview || "/placeholder.svg"}
                                alt="Preview"
                                className="img-fluid rounded-3 mb-3"
                                style={{ maxHeight: "300px" }}
                              />
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  onClick={() => document.getElementById("imageInput")?.click()}
                                >
                                  Change Image
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <i className="bi bi-cloud-upload fs-1 text-muted mb-3 d-block"></i>
                              <p className="text-muted mb-3">Drag and drop or click to upload</p>
                              <button
                                type="button"
                                className="btn pinterest-red text-white"
                                onClick={() => document.getElementById("imageInput")?.click()}
                              >
                                Choose File
                              </button>
                            </div>
                          )}
                          <input
                            id="imageInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="d-none"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label fw-semibold">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Add a title"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="description" className="form-label fw-semibold">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id="description"
                          name="description"
                          rows={4}
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Tell everyone what your Pin is about"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="link" className="form-label fw-semibold">
                          Link (optional)
                        </label>
                        <input
                          type="url"
                          className="form-control"
                          id="link"
                          name="link"
                          value={formData.link}
                          onChange={handleInputChange}
                          placeholder="Add a destination link"
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="board" className="form-label fw-semibold">
                          Board
                        </label>
                        <select
                          className="form-select"
                          id="board"
                          name="board"
                          value={formData.board}
                          onChange={handleInputChange}
                        >
                          <option value="default">Default Board</option>
                          <option value="recipes">Recipes</option>
                          <option value="home-decor">Home Decor</option>
                          <option value="fashion">Fashion</option>
                          <option value="travel">Travel</option>
                        </select>
                      </div>

                      <div className="d-flex gap-3">
                        <button
                          type="button"
                          className="btn btn-outline-secondary flex-fill"
                          onClick={() => router.back()}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn pinterest-red text-white flex-fill"
                          disabled={isLoading || !imageFile}
                        >
                          {isLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" />
                              Publishing...
                            </>
                          ) : (
                            "Publish"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
