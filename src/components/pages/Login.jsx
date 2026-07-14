import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { api } from '../../api';
import { LoginContext } from '../../context/LoginContext';

function Login() {
  const { register, handleSubmit } = useForm();
  const {login}=useContext(LoginContext);

  const onSubmit = async (data) => {

    console.log("Fetched Data",data);
    
    try {
      const response = await api.post("/auth/login", data);
      console.log(response);
      login(response.data.token, response.data.userDto);
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <main className="auth-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="auth-shell">
              <div className="auth-panel auth-panel-visual">
                <span className="section-kicker">Welcome back</span>
                <h1 className="auth-hero-title mt-3">Login to your account</h1>
                <p className="auth-hero-copy mt-3">
                  Sign in to manage orders, track deliveries, and continue shopping without
                  missing your saved wishlist.
                </p>
                <div className="auth-points mt-4">
                  <div className="auth-point">
                    <strong>Quick access</strong>
                    <span>One-click checkout and saved addresses.</span>
                  </div>
                  <div className="auth-point">
                    <strong>Order tracking</strong>
                    <span>See shipping updates and purchase history.</span>
                  </div>
                </div>
              </div>

              <div className="auth-panel">
                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label auth-label" htmlFor="loginEmail">
                      Email address
                    </label>
                    <input
                      id="loginEmail"
                      type="email"
                      className="form-control auth-input"
                      placeholder="you@example.com"
                      {...register("email")}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label auth-label" htmlFor="loginPassword">
                      Password
                    </label>
                    <input
                      id="loginPassword"
                      type="password"
                      className="form-control auth-input"
                      placeholder="Enter your password"
                      {...register("password")}
                    />
                  </div>

                  <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label auth-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a className="auth-link" href="#forgot-password">
                      Forgot password?
                    </a>
                  </div>

                  <button className="btn hero-primary-btn w-100" type="submit">
                    Login
                  </button>
                </form>

                <p className="auth-switch mt-4 mb-0">
                  New here? <Link to="/register">Create an account</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login
