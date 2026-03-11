import { Eye, EyeOff, Loader2, Lock, MessageSquare, User } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required!");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      return toast.error("Invalid email format");

    if (!formData.password.trim()) return toast.error("Password is required!");

    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) {
      login(formData);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 ">
      {/* left side */}
      <div className=" flex flex-col items-center justify-center h-full p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo section */}
          <div className=" flex flex-col justify-center items-center group">
            <div className="size-12 flex items-center justify-center bg-primary/10 rounded-2xl text-primary group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <div className="flex flex-col justify-center items-center m-4 gap-2">
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-base-content/60">Sign In to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            {/* email form-control */}
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 z-10 flex items-center justify-center pl-3">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
              </div>
            </div>

            {/* password form control */}
            <div className="form-control mt-4">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 z-10 flex items-center justify-center pl-3">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-0 inset-y-0 flex justify-center items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-8 w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="link link-primary">
              create account
            </Link>
          </p>
        </div>
      </div>

      {/* right side */}
      <div className="hidden lg:block bg-base-100 min-h-screen">
        <AuthImagePattern
          title="Welcome back!"
          subtitle="Sign in to continue your conversations and catch up with your messages."
        />
      </div>
    </div>
  );
};

export default LoginPage;
