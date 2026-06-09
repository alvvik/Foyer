import React, { useState } from "react";
import "../css/AuthPage.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login to your account" : "Create an account"}</h2>

        <form onSubmit={(e) => e.preventDefault()} className="auth-form">
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="email@example.com" required />
          </div>

          <div className="input-group">
            <div className="label-row">
              <label>Password</label>
              {isLogin && (
                <a href="#" className="forgot-link">
                  Forgot ?
                </a>
              )}
            </div>
            <div className="password-wrapper">
              <input
                type="password"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                aria-label="Toggle password visibility"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary">
            {isLogin ? "Login now" : "Create account"}
          </button>

          <button type="button" className="btn-google">
            <img
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="Google"
            />
            <span>Continue with Google</span>
          </button>
        </form>

        <div className="auth-switch">
          <span>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button type="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
