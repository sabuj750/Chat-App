import React, { useMemo, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import {
  MessageSquare,
  User,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

const STRENGTH_LABELS = ["Too short", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = [
  "bg-base-300",
  "bg-error",
  "bg-warning",
  "bg-info",
  "bg-success",
];

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  // Simple password strength score (0-4)
  const strength = useMemo(() => {
    const p = formData.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
    if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) score++;
    return Math.max(score, p.length > 0 ? 1 : 0);
  }, [formData.password]);

  const validateForm = () => {
    if (formData.userName.trim() === "") return toast.error("Full name is required!");
    if (formData.email.trim() === "") return toast.error("Email is required!");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format!");
    if (formData.password.trim() === "") return toast.error("Password is required!");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters!");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      signup(formData);
    }
  };

  const inputClass = `input input-bordered w-full pl-11 rounded-xl bg-base-200/50 transition-all duration-300
    focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 focus:bg-base-100`;
  const iconClass =
    "absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-base-content/40 transition-colors group-focus-within:text-primary";

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side */}
      <div className="relative flex flex-col justify-center items-center p-6 sm:p-12 pt-24 overflow-hidden">
        <div className="animate-blob absolute -top-24 -left-24 size-80 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative w-full max-w-md">
          <div className="rounded-3xl border border-base-300 bg-base-100/80 backdrop-blur-xl shadow-2xl shadow-primary/5 p-8 sm:p-10 space-y-7 animate-fade-up">
            {/* Logo */}
            <div className="text-center">
              <div className="flex flex-col items-center gap-2 group">
                <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                  <MessageSquare className="size-7 text-primary-content" />
                </div>
                <h1 className="text-3xl font-bold mt-3 tracking-tight">Create account</h1>
                <p className="text-base-content/60 text-sm">
                  Get started with your free account
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
                <label className="block text-sm font-medium mb-1.5">Full name</label>
                <div className="relative group">
                  <User className={iconClass} />
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="John Doe"
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  />
                </div>
              </div>

              <div className="animate-fade-up" style={{ animationDelay: "180ms" }}>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <div className="relative group">
                  <Mail className={iconClass} />
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="animate-fade-up" style={{ animationDelay: "260ms" }}>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <div className="relative group">
                  <Lock className={iconClass} />
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`${inputClass} pr-11`}
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

                {/* Strength meter */}
                {formData.password && (
                  <div className="mt-2.5 animate-fade-up">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                            i <= strength ? STRENGTH_COLORS[strength] : "bg-base-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-base-content/60">
                      {STRENGTH_LABELS[strength]}
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSigningUp}
                className="group animate-fade-up btn w-full rounded-xl border-0 text-primary-content
                  bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/25
                  hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0
                  transition-all duration-300 disabled:opacity-70"
                style={{ animationDelay: "340ms" }}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center text-sm">
              <p className="text-base-content/60">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:underline underline-offset-4"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <AuthImagePattern
        title="Join the Conversation"
        subTitle="Connect with friends and stay in touch with the world."
      />
    </div>
  );
};

export default SignUpPage;