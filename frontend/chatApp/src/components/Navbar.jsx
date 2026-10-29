import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { MessageSquare, LogOut, Settings, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Add a stronger shadow / blur once the user scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLink = (to) =>
    `nav-link group relative btn btn-sm gap-2 border-0 bg-transparent shadow-none
     hover:bg-primary/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300
     ${pathname === to ? "text-primary bg-primary/10" : ""}`;

  return (
    <>
      {/* Custom keyframes (no extra dependencies needed) */}
      <style>{`
        @keyframes nav-slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        @keyframes nav-fade-in {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nav-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-3px) rotate(-6deg); }
        }
        @keyframes nav-glow {
          0%, 100% { box-shadow: 0 0 0 0 oklch(var(--p) / 0.45); }
          50%      { box-shadow: 0 0 0 8px oklch(var(--p) / 0); }
        }
        @keyframes nav-gradient {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .nav-enter   { animation: nav-slide-down .6s cubic-bezier(.22,1,.36,1) both; }
        .nav-item-1  { animation: nav-fade-in .5s .15s ease-out both; }
        .nav-item-2  { animation: nav-fade-in .5s .25s ease-out both; }
        .nav-item-3  { animation: nav-fade-in .5s .35s ease-out both; }
        .nav-item-4  { animation: nav-fade-in .5s .45s ease-out both; }
        .logo-icon   { animation: nav-float 3.5s ease-in-out infinite, nav-glow 2.5s ease-in-out infinite; }
        .logo-text {
          background-image: linear-gradient(90deg,
            oklch(var(--p)), oklch(var(--s)), oklch(var(--a)), oklch(var(--p)));
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: nav-gradient 5s linear infinite;
        }
        /* Sliding underline */
        .nav-link::after {
          content: "";
          position: absolute;
          left: 50%; bottom: 2px;
          height: 2px; width: 0;
          border-radius: 9999px;
          background: linear-gradient(90deg, oklch(var(--p)), oklch(var(--s)));
          transform: translateX(-50%);
          transition: width .3s ease;
        }
        .nav-link:hover::after,
        .nav-link[data-active="true"]::after { width: 60%; }
        @media (prefers-reduced-motion: reduce) {
          .nav-enter, .nav-item-1, .nav-item-2, .nav-item-3, .nav-item-4,
          .logo-icon, .logo-text { animation: none !important; }
        }
      `}</style>

      <header
        className={`nav-enter fixed top-0 z-40 w-full border-b transition-all duration-300
          backdrop-blur-xl
          ${
            scrolled
              ? "bg-base-100/90 border-base-300 shadow-lg shadow-primary/5"
              : "bg-base-100/60 border-transparent"
          }`}
      >
        {/* Gradient accent line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="nav-item-1 group flex items-center gap-2.5 transition-transform duration-300 hover:scale-105"
              >
                <div className="logo-icon size-9 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-primary/30 flex items-center justify-center group-hover:from-primary group-hover:to-secondary transition-colors duration-300">
                  <MessageSquare className="w-5 h-5 text-primary group-hover:text-primary-content transition-colors duration-300" />
                </div>
                <h1 className="logo-text text-xl font-extrabold tracking-tight">
                  Chatty
                </h1>
              </Link>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                to="/settings"
                data-active={pathname === "/settings"}
                className={`${navLink("/settings")} nav-item-2`}
              >
                <Settings className="size-4 transition-transform duration-500 group-hover:rotate-180" />
                <span className="hidden sm:inline">Settings</span>
              </Link>

              {authUser && (
                <>
                  <Link
                    to="/profile"
                    data-active={pathname === "/profile"}
                    className={`${navLink("/profile")} nav-item-3`}
                  >
                    {authUser.profilePic ? (
                      <img
                        src={authUser.profilePic}
                        alt="Profile"
                        className="size-5 rounded-full object-cover ring-2 ring-primary/40 transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <User className="size-4 transition-transform duration-300 group-hover:scale-110" />
                    )}
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button
                    onClick={logout}
                    className="nav-item-4 group btn btn-sm gap-2 border-0 bg-transparent shadow-none
                      hover:bg-error/10 hover:text-error hover:-translate-y-0.5 active:translate-y-0
                      transition-all duration-300"
                  >
                    <LogOut className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;