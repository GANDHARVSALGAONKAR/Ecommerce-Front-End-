import React from 'react'
import { Link } from 'react-router-dom'

function Profile() {
  return (
    <main className="auth-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="auth-shell">
              <div className="auth-panel auth-panel-visual">
                <span className="section-kicker">My profile</span>
                <h1 className="auth-hero-title mt-3">Manage your account details</h1>
                <p className="auth-hero-copy mt-3">
                  Keep your shipping details, wishlist, and order history in one place.
                </p>
                <div className="auth-points mt-4">
                  <div className="auth-point">
                    <strong>Order history</strong>
                    <span>Review past purchases and track current deliveries.</span>
                  </div>
                  <div className="auth-point">
                    <strong>Wishlist</strong>
                    <span>Save products for later and pick up where you left off.</span>
                  </div>
                </div>
              </div>

              <div className="auth-panel">
                <div className="profile-summary">
                  <div className="profile-avatar">JS</div>
                  <div>
                    <h2 className="profile-name">John Smith</h2>
                    <p className="profile-email mb-0">john@example.com</p>
                  </div>
                </div>

                <div className="profile-grid mt-4">
                  <div className="profile-box">
                    <span>Member status</span>
                    <strong>Gold</strong>
                  </div>
                  <div className="profile-box">
                    <span>Orders</span>
                    <strong>18</strong>
                  </div>
                  <div className="profile-box">
                    <span>Wishlist</span>
                    <strong>9 items</strong>
                  </div>
                  <div className="profile-box">
                    <span>Saved addresses</span>
                    <strong>2</strong>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  <Link className="btn hero-primary-btn" to="/login">
                    Login
                  </Link>
                  <Link className="btn hero-secondary-btn" to="/register">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profile
