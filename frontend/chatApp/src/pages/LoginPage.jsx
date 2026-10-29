import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, Mail, Lock, EyeOff, Eye, Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side */}
      <div className="relative flex flex-col justify-center items-center p-6 sm:p-12 pt-24 overflow-hidden">
        {/* soft ambient glow */}
        <div className="animate-blob absolute -top-24 -left-24 size-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative w-full max-w-md">
          <div className="rounded-3xl border border-base-300 bg-base-100/80 backdrop-blur-xl shadow-2xl shadow-primary/5 p-8 sm:p-10 space-y-8 animate-fade-up">
            {/* Logo */}
            <div className="text-center">
              <div className="flex flex-col items-center gap-2 group">
                <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                  <MessageSquare className="size-7 text-primary-content" />
                </div>
                <h1 className="text-3xl font-bold mt-3 tracking-tight">Welcome back</h1>
                <p className="text-base-content/60 text-sm">
                  Sign in to pick up where you left off
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-base-content/40 transition-colors group-focus-within:text-primary" />
                  <input
                    type="email"
                    className="input input-bordered w-full pl-11 rounded-xl bg-base-200/50 transition-all duration-300
                      focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 focus:bg-base-100"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-base-content/40 transition-colors group-focus-within:text-primary" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-11 pr-11 rounded-xl bg-base-200/50 transition-all duration-300
                      focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 focus:bg-base-100"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-base-content/40 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="group animate-fade-up btn w-full rounded-xl border-0 text-primary-content
                  bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/25
                  hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0
                  transition-all duration-300 disabled:opacity-70"
                style={{ animationDelay: "300ms" }}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center text-sm">
              <p className="text-base-content/60">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary hover:underline underline-offset-4"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <AuthImagePattern
        title={"Welcome back!"}
        subTitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>
  );
};

export default LoginPage;