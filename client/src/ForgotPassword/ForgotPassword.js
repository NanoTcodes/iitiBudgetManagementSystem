import React, { useState } from "react";
import { Link } from "react-router-dom";
import finImage from "../assets/images/finance.webp";
import logo from "../assets/images/iitindorelogo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");


  const handleSendOTP = async (e) => {
    e.preventDefault();
    setShowOtpInput(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  

  return (
    <>
      <section className="bg-light p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-11">
              <div className="card border-light-subtle shadow-sm">
                <div className="row g-0">
                  <div className="col-12 col-md-6">
                    <img
                      className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                      loading="lazy"
                      src={finImage}
                      alt="Finance Image"
                    />
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-10">
                      <div className="card-body p-3 p-md-4 p-xl-5">
                        <div className="row">
                          <div className="col-12">
                            <div className="mb-5">
                              <div className="text-center mb-4">
                                <Link to="/">
                                  <img
                                    src={logo}
                                    alt="IITI Logo"
                                    width="70"
                                  />
                                </Link>
                              </div>
                              <h4 className="text-center">Forgot Password?</h4>
                              <p className="text-center">
                                Enter your details to reset your password
                              </p>
                            </div>
                          </div>
                        </div>
                        <form onSubmit={showOtpInput ? handleSubmit : handleSendOTP}>
                          <div className="row gy-3 overflow-hidden">
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  className="form-control"
                                  name="username"
                                  id="username"
                                  placeholder="Username"
                                  onChange={(e) => setUsername(e.target.value)}
                                  value={username}
                                  required
                                />
                                <label
                                  htmlFor="username"
                                  className="form-label"
                                >
                                  Username
                                </label>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  className="form-control"
                                  name="email"
                                  id="email"
                                  placeholder="Email"
                                  onChange={(e) => setEmail(e.target.value)}
                                  value={email}
                                  required
                                />
                                <label
                                  htmlFor="email"
                                  className="form-label"
                                >
                                  Email
                                </label>
                              </div>
                            </div>
                            {!showOtpInput && (
                              <div className="col-12">
                                <div className="d-grid">
                                  <button
                                    className="btn btn-dark btn-lg"
                                    type="submit"
                                  >
                                    Send OTP
                                  </button>
                                </div>
                              </div>
                            )}
                            {showOtpInput && (
                              <>
                                <div className="col-12">
                                  <div className="form-floating mb-3">
                                    <input
                                      className="form-control"
                                      name="otp"
                                      id="otp"
                                      placeholder="OTP"
                                      onChange={(e) => setOtp(e.target.value)}
                                      value={otp}
                                      required
                                    />
                                    <label htmlFor="otp" className="form-label">
                                      OTP
                                    </label>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="d-grid">
                                    <button
                                      className="btn btn-dark btn-lg"
                                      type="submit"
                                    >
                                      Verify OTP
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;