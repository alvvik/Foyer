import React, { useContext, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { UserRound, AtSign, Lock, Eye, EyeOff } from "lucide-react";

import { Navigate } from "react-router-dom";
import Input from "../components/AuthPage/Input";
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
    if (resetPassword) {
      handleResetPasswordLink();
      return;
    }
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
    <div className="md:flex justify-center   md:items-center md:p-24  bg-background/90">
      <div
        className="bg-background  p-8 pb-12 md:p-12 md:rounded-2xl md:ring-1 ring-primary shadow-primary

 "
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center md:text-5xl ">
            Foyer <span className=" text-primary">.</span>
          </h1>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            handleSubmit();
          }}
        >
          <div className="flex justify-center flex-col gap-8">
            <div className="relative flex items-center w-full  hover:-translate-y-2 hover:transition-all active:transition-all ">
              <Input
                type="email"
                placeholder="Your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {/*  <input
                type="email"
                placeholder="Your email"
                required
                className="w-full pl-10 pr-10 py-3  focus:outline-0 ring-1 ring-primary focus:shadow-primary focus:ring-2 rounded  "
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />*/}
              <UserRound className="absolute left-3 text-primary pointer-events-none" />
            </div>
            {!resetPassword && !isLogin && (
              <>
                <>
                  <div className="relative flex items-center w-full hover:-translate-y-2 hover:transition-all active:transition-all">
                    <Input
                      placeholder="First name"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                    />

                    <UserRound className="absolute left-3 text-primary pointer-events-none" />
                  </div>

                  <div className="relative flex items-center w-full hover:-translate-y-2 hover:transition-all active:transition-all">
                    <Input
                      placeholder="Last name"
                      className="w-full pl-10 pr-10 py-3 focus:outline-0 ring-1 ring-primary focus:shadow-primary focus:ring-2 rounded"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    />

                    <UserRound className="absolute left-3 text-primary pointer-events-none" />
                  </div>

                  <div className="relative flex items-center w-full hover:-translate-y-2 hover:transition-all active:transition-all">
                    <Input
                      placeholder="Username"
                      className="w-full pl-10 pr-10 py-3 focus:outline-0 ring-1 ring-primary focus:shadow-primary focus:ring-2 rounded"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                    />

                    <AtSign className="absolute left-3 text-primary pointer-events-none" />
                  </div>
                </>
              </>
            )}

            {!resetPassword && (
              <div className="relative flex items-center w-full hover:-translate-y-2 hover:transition-all active:transition-all mb-2">
                <Lock className="absolute left-3 text-primary pointer-events-none" />

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  className="w-full pl-10 pr-10 py-3  focus:outline-0 ring-1 ring-primary focus:shadow-primary focus:ring-2  rounded  "
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sec hover:text-primary transition-colors focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="stroke-primary" />
                  ) : (
                    <EyeOff className="stroke-primary" />
                  )}
                </button>
              </div>
            )}
          </div>
          {isLogin && (
            <div className="text-right my-2">
              <button
                type="button"
                onClick={() => {
                  setResetPassword((prev) => !prev);
                }}
              >
                {!resetPassword ? "Forgot password?" : "I remember password"}
              </button>
            </div>
          )}
          <div className="flex justify-center">
            <input
              type="submit"
              className="px-8 py-2 bg-primary text-center w-3/4rounded-2xl font-bold my-2"
              value={
                resetPassword
                  ? "Send password reset link"
                  : isLogin
                    ? "Log in"
                    : "Register"
              }
            />
          </div>
        </form>
        <hr className="text-primary my-4" />
        <div className="text-center">
          {isLogin ? (
            <button
              type="button"
              onClick={() => {
                setIsLogin((prev) => !prev);
                setResetPassword(false);
              }}
            >
              You dont have account?{" "}
              <span className="text-primary underline underline-offset-2">
                Create a new one
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsLogin((prev) => !prev);
                setResetPassword(false);
              }}
            >
              You have an account?{" "}
              <span className="text-primary underline underline-offset-2">
                Log in
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
