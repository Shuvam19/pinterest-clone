"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"

interface Invitation {
  id: string
  type: "board_collaboration" | "follow_request"
  from: {
    name: string
    username: string
    avatar: string
    isBusiness?: boolean
  }
  boardName?: string
  message?: string
  timestamp: string
  status: "pending" | "accepted" | "declined"
}

const mockInvitations: Invitation[] = [
  {
    id: "1",
    type: "board_collaboration",
    from: {
      name: "Sarah Johnson",
      username: "@sarahj",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    boardName: "Kitchen Design Ideas",
    message: "Would you like to collaborate on my kitchen design board?",
    timestamp: "2 hours ago",
    status: "pending",
  },
  {
    id: "2",
    type: "follow_request",
    from: {
      name: "Design Studio Pro",
      username: "@designstudiopro",
      avatar: "/placeholder.svg?height=50&width=50",
      isBusiness: true,
    },
    message: "We'd love to connect and share design inspiration!",
    timestamp: "1 day ago",
    status: "pending",
  },
  {
    id: "3",
    type: "board_collaboration",
    from: {
      name: "Chef Maria",
      username: "@chefmaria",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    boardName: "Healthy Recipes",
    message: "Join me in creating a collection of healthy recipes!",
    timestamp: "3 days ago",
    status: "accepted",
  },
]

export default function InvitationsPage() {
  const [invitations, setInvitations] = useState(mockInvitations)
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "declined">("all")

  const currentUser = {
    name: "John Doe",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "john@example.com",
  }

  const handleInvitationAction = (invitationId: string, action: "accept" | "decline") => {
    setInvitations(
      invitations.map((invitation) =>
        invitation.id === invitationId
          ? { ...invitation, status: action === "accept" ? "accepted" : "declined" }
          : invitation,
      ),
    )
  }

  const filteredInvitations = invitations.filter((invitation) => filter === "all" || invitation.status === filter)

  const getInvitationIcon = (type: string) => {
    switch (type) {
      case "board_collaboration":
        return "bi-collection"
      case "follow_request":
        return "bi-person-plus"
      default:
        return "bi-envelope"
    }
  }

  const getInvitationTitle = (invitation: Invitation) => {
    switch (invitation.type) {
      case "board_collaboration":
        return `Board collaboration: ${invitation.boardName}`
      case "follow_request":
        return "Follow request"
      default:
        return "Invitation"
    }
  }

  return (
    <div>
      <Navbar currentUser={currentUser} />

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="fw-bold mb-4">Invitations</h2>

            <div className="d-flex gap-2 mb-4 flex-wrap">
              {(["all", "pending", "accepted", "declined"] as const).map((status) => (
                <button
                  key={status}
                  className={`btn ${filter === status ? "pinterest-red text-white" : "btn-outline-secondary"}`}
                  onClick={() => setFilter(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== "all" && (
                    <span className="ms-1">({invitations.filter((inv) => inv.status === status).length})</span>
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredInvitations.map((invitation) => (
                <div key={invitation.id} className="invitation-card p-4 mb-3">
                  <div className="d-flex align-items-start">
                    <div className="me-3">
                      <i className={`${getInvitationIcon(invitation.type)} fs-4 text-pinterest-red`}></i>
                    </div>

                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <img
                          src={invitation.from.avatar || "/placeholder.svg"}
                          alt={invitation.from.name}
                          className="rounded-circle"
                          style={{ width: "40px", height: "40px", objectFit: "cover" }}
                        />
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <h6 className="mb-0 fw-bold">{invitation.from.name}</h6>
                            {invitation.from.isBusiness && <span className="business-badge">Business</span>}
                          </div>
                          <small className="text-muted">{invitation.from.username}</small>
                        </div>
                      </div>

                      <h6 className="fw-semibold mb-2">{getInvitationTitle(invitation)}</h6>

                      {invitation.message && <p className="text-muted mb-2">{invitation.message}</p>}

                      <small className="text-muted">{invitation.timestamp}</small>

                      {invitation.status === "pending" && (
                        <div className="d-flex gap-2 mt-3">
                          <button
                            className="btn pinterest-red text-white btn-sm"
                            onClick={() => handleInvitationAction(invitation.id, "accept")}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleInvitationAction(invitation.id, "decline")}
                          >
                            Decline
                          </button>
                        </div>
                      )}

                      {invitation.status === "accepted" && (
                        <div className="mt-3">
                          <span className="badge bg-success">Accepted</span>
                        </div>
                      )}

                      {invitation.status === "declined" && (
                        <div className="mt-3">
                          <span className="badge bg-secondary">Declined</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredInvitations.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-envelope fs-1 text-muted mb-3 d-block"></i>
                <h5 className="text-muted">No invitations found</h5>
                <p className="text-muted">
                  {filter === "pending" ? "You don't have any pending invitations" : `No ${filter} invitations to show`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
