import React, { useContext, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

import "../css/AuthPage.css";
import { Navigate } from "react-router-dom";
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  const {
    callApiRegisterUserWithEmail,
    callApiLoginWithEmail,
    callApiResetPassowrd,
    isLoading,
    error,
    user,
  } = useAuthContext();
  if (user) return <Navigate to="/" replace={true} />;

  const handleSubmit = () => {
    isLogin
      ? callApiLoginWithEmail(email, password)
      : callApiRegisterUserWithEmail(
          email,
          password,
          firstName,
          lastName,
          userName,
        );
  };
  const handleResetPasswordLink = () => {
    callApiResetPassowrd(email);
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        {error && <div className="error-container">{error}</div>}

        {!resetPassword ? (
          <>
            {isLogin ? <h2>Log in</h2> : <h2>Register</h2>}
            <form onSubmit={(e) => e.preventDefault()} className="auth-form">
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              {!isLogin && (
                <>
                  <div className="input-group">
                    <label>First name</label>
                    <input
                      type="text"
                      placeholder="John"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                    />
                  </div>
                  <div className="input-group">
                    <label>Last name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    />
                  </div>
                  <div className="input-group">
                    <label>Your username</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      required
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                    />
                  </div>
                </>
              )}
              <div className="input-group">
                <div className="label-row">
                  <label>Password</label>

                  {isLogin && (
                    <a
                      href="#"
                      className="forgot-link"
                      onClick={() => setResetPassword((prev) => !prev)}
                    >
                      Forgot password ?
                    </a>
                  )}
                </div>

                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />

                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon-eye-closed"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon-eye-open"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                onClick={handleSubmit}
              >
                {isLogin ? <>Log in</> : <>Create an account</>}
              </button>
            </form>

            <div className="auth-switch">
              <button type="button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? (
                  <>Create an new account</>
                ) : (
                  <>Already have an account?</>
                )}
              </button>
            </div>
          </>
        ) : (
          <div>
            <h2>Reset password</h2>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <a
              href="#"
              className="forgot-link right"
              onClick={() => setResetPassword((prev) => !prev)}
            >
              I remembered password
            </a>
            <button
              type="submit"
              className="btn-primary"
              onClick={handleResetPasswordLink}
            >
              Send password reset link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
