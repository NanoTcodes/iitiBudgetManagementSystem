import React, { useState } from "react";
import { Link } from "react-router-dom";
import finImage from "../assets/images/finance.webp";
import logo from "../assets/images/iitindorelogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setShowOtpInput(true);
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    // Here you can handle the OTP verification process
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === newPassword);
  };

  const handleSubmitPasswordReset = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      // Passwords do not match
      return;
    }
    // Here you can handle the password reset process
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
                                  <img src={logo} alt="IITI Logo" width="70" />
                                </Link>
                              </div>
                              <h4 className="text-center">Forgot Password?</h4>
                              <p className="text-center">
                                Enter your details to reset your password
                              </p>
                            </div>
                          </div>
                        </div>
                        <form onSubmit={showOtpInput ? handleSubmitOTP : handleSendOTP}>
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
                                    className="btn btn-info btn-lg"
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
                                      className="btn btn-success btn-lg"
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
                        <form onSubmit={handleSubmitPasswordReset}>
                          <div className="row gy-3 overflow-hidden">
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type={showNewPassword ? "text" : "password"}
                                  className="form-control"
                                  name="newPassword"
                                  id="newPassword"
                                  placeholder="New Password"
                                  onChange={handleNewPasswordChange}
                                  value={newPassword}
                                  required
                                />
                                <label
                                  htmlFor="newPassword"
                                  className="form-label"
                                >
                                  New Password
                                </label>
                                <div
                                  className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                                  onClick={toggleNewPasswordVisibility}
                                >
                                  <FontAwesomeIcon
                                    icon={showNewPassword ? faEyeSlash : faEye}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="password"
                                  className="form-control"
                                  name="confirmPassword"
                                  id="confirmPassword"
                                  placeholder="Confirm Password"
                                  onChange={handleConfirmPasswordChange}
                                  value={confirmPassword}
                                  required
                                />
                                <label
                                  htmlFor="confirmPassword"
                                  className="form-label"
                                >
                                  Confirm Password
                                </label>
                              </div>
                              {!passwordsMatch && (
                                <p className="text-danger">
                                  Passwords do not match!
                                </p>
                              )}
                            </div>
                            <div className="col-12">
                              <div className="d-grid">
                                <button
                                  className="btn btn-dark btn-lg"
                                  type="submit"
                                  disabled={!passwordsMatch}
                                >
                                  Reset Password
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
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;



