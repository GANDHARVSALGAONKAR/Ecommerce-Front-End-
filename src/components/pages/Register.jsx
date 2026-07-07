import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { api } from "../../api";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  //Register user
  const onSubmit = async (data) => {
    console.log(data);
    try{
   const response= await api.post("/users",data);
   console.log(response);
   alert("Registration Completed")
    }catch(error)
    {
      alert("Something went wrong")
      console.log("Error",error);
      
    }
  };

  //Check email
  const emailExists = async (value) => {
    let exists;
    try{
   const response = await api.get(`/users/check-email?email=${value}`)
   console.log(response.data);
  exists = response.data

  return exists ? "Email Already Exists": true
    }catch(error){
      alert("Something went wrong")
    }
  };

  const password = watch("password");

  return (
    <main className="auth-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="auth-shell">
              <div className="auth-panel auth-panel-visual">
                <span className="section-kicker">Join the club</span>
                <h1 className="auth-hero-title mt-3">Create your account</h1>
                <p className="auth-hero-copy mt-3">
                  Register to unlock faster checkout, exclusive deals, and order
                  tracking from your personal dashboard.
                </p>
                <div className="auth-points mt-4">
                  <div className="auth-point">
                    <strong>Exclusive offers</strong>
                    <span>Get access to member-only prices and launches.</span>
                  </div>
                  <div className="auth-point">
                    <strong>Saved preferences</strong>
                    <span>
                      Store sizes, addresses, and payment options securely.
                    </span>
                  </div>
                </div>
              </div>

              <div className="auth-panel">
                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label
                        className="form-label auth-label"
                        htmlFor="firstName"
                      >
                        First name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        className="form-control auth-input"
                        placeholder="John"
                        {...register("firstName", {
                          required: "first Name is required",
                          minLength: {
                            value: 2,
                            message: "first name must be at least 2 characters",
                          },
                          maxLength: {
                            value: 60,
                            message: "maximum characters are 60",
                          },
                        })}
                      />

                      <small className="text-danger">
                        {errors.firstName && errors.firstName.message}
                      </small>
                    </div>
                    <div className="col-md-6">
                      <label
                        className="form-label auth-label"
                        htmlFor="lastName"
                      >
                        Last name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        className="form-control auth-input"
                        placeholder="Doe"
                        {...register("lastName", {
                          required: "last name is required",
                          minLength: {
                            value: 2,
                            message: "last name must be at least 2 characters",
                          },
                          maxLength: {
                            value: 60,
                            message: "maximum characters are 60",
                          },
                        })}
                      />

                      <small className="text-danger">
                        {errors.lastName && errors.lastName.message}
                      </small>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label
                      className="form-label auth-label"
                      htmlFor="registerEmail"
                    >
                      Email address
                    </label>
                    <input
                      id="registerEmail"
                      type="email"
                      className="form-control auth-input"
                      placeholder="you@example.com"
                      {...register("email", {
                        required: "email is required",
                        pattern: {
                          value:
                            /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                          message: "Please enter a valid email address",
                        },
                        validate:{emailExists},
                      })}
                    />
                    <small className="text-danger">
                      {errors.email && errors.email.message}
                    </small>
                  </div>

                  <div className="mt-3">
                    <label
                      className="form-label auth-label"
                      htmlFor="registerPassword"
                    >
                      Password
                    </label>
                    <input
                      id="registerPassword"
                      type="password"
                      className="form-control auth-input"
                      placeholder="Create a password"
                      {...register("password", {
                        required: "password is required",
                        pattern: {
                          value:
                            /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
                          message:
                            "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                        },
                      })}
                    />
                    <small className="text-danger">
                      {errors.password && errors.password.message}
                    </small>
                  </div>

                  <div className="mt-3">
                    <label
                      className="form-label auth-label"
                      htmlFor="confirmPassword"
                    >
                      Confirm password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      className="form-control auth-input"
                      placeholder="Repeat your password"
                      {...register("confirmPassword", {
                        required: "confirm password is required",
                        validate: (value) =>                          //validate is used for custom vaild
                          value == password ||
                          "password and confirm password is not same",
                      })}
                    />
                    <small className="text-danger">
                      {errors.confirmPassword && errors.confirmPassword.message}
                    </small>
                  </div>

                  <button
                    className="btn hero-primary-btn w-100 mt-4"
                    type="submit"
                  >
                    Register
                  </button>
                </form>

                <p className="auth-switch mt-4 mb-0">
                  Already have an account? <Link to="/login">Login here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
