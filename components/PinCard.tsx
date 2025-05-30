"use client"

interface Pin {
  id: string
  title: string
  image: string
  description?: string
  author: {
    name: string
    avatar: string
  }
  isSponsored?: boolean
  isBusiness?: boolean
  saves: number
}

interface PinCardProps {
  pin: Pin
  onSave?: (pinId: string) => void
}

export default function PinCard({ pin, onSave }: PinCardProps) {
  return (
    <div className="masonry-item position-relative">
      <div className="card border-0 shadow-sm">
        <div className="position-relative">
          <img
            src={pin.image || "/placeholder.svg"}
            alt={pin.title}
            className="card-img-top"
            style={{ height: "auto", width: "100%" }}
          />
          <div className="pin-overlay">
            <div className="d-flex justify-content-between align-items-end w-100">
              <div>
                {pin.isSponsored && <span className="sponsored-badge me-2">Sponsored</span>}
                {pin.isBusiness && <span className="business-badge">Business</span>}
              </div>
              <button className="btn btn-sm pinterest-red text-white" onClick={() => onSave?.(pin.id)}>
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="card-body p-3">
          <h6 className="card-title mb-2">{pin.title}</h6>
          {pin.description && <p className="card-text text-muted small">{pin.description}</p>}
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src={pin.author.avatar || "/placeholder.svg"}
                alt={pin.author.name}
                className="profile-avatar me-2"
              />
              <small className="text-muted">{pin.author.name}</small>
            </div>
            <small className="text-muted">{pin.saves} saves</small>
          </div>
        </div>
      </div>
    </div>
  )
}
