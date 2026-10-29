import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, Mail, CalendarDays, ShieldCheck } from "lucide-react";

const ProfilePage = () => {
  const { updateProfile, isUpdatingProfile, authUser } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const memberSince = authUser?.createdAt
    ? new Date(authUser.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const details = [
    { icon: User, label: "Full name", value: authUser?.fullName },
    { icon: Mail, label: "Email address", value: authUser?.email },
  ];

  return (
    <div className="min-h-screen pt-20 bg-base-200/50">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="animate-fade-up rounded-3xl border border-base-300 bg-base-100 shadow-2xl shadow-primary/5 overflow-hidden">
          {/* Banner */}
          <div className="relative h-32 bg-gradient-to-r from-primary via-secondary to-accent">
            <div className="animate-blob absolute -top-10 right-10 size-40 rounded-full bg-white/20 blur-2xl" />
            <div
              className="animate-blob absolute -bottom-12 left-10 size-40 rounded-full bg-white/10 blur-2xl"
              style={{ animationDelay: "-4s" }}
            />
          </div>

          <div className="px-6 sm:px-10 pb-10">
            {/* Avatar overlapping the banner */}
            <div className="flex flex-col items-center -mt-16">
              <div className="relative group">
                <img
                  src={selectedImage || authUser?.profilePic || "/avatar.png"}
                  alt="Profile"
                  className={`size-32 rounded-full object-cover border-4 border-base-100 shadow-xl
                    transition-all duration-500 group-hover:scale-105
                    ${isUpdatingProfile ? "opacity-60" : ""}`}
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-1 right-1 p-2.5 rounded-full cursor-pointer
                    bg-gradient-to-br from-primary to-secondary text-primary-content shadow-lg
                    hover:scale-110 hover:rotate-6 transition-all duration-300
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
                >
                  <Camera className="size-5" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-tight">
                {authUser?.fullName}
              </h1>
              <p className="text-sm text-base-content/60">
                {isUpdatingProfile
                  ? "Uploading your photo..."
                  : "Click the camera icon to update your photo"}
              </p>
            </div>

            {/* Profile details */}
            <div className="mt-8 space-y-4">
              {details.map(({ icon: Icon, label, value }, i) => (
                <div
                  key={label}
                  className="animate-fade-up group flex items-center gap-4 p-4 rounded-2xl border border-base-300 bg-base-200/40
                    hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ animationDelay: `${150 + i * 100}ms` }}
                >
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-primary-content">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-base-content/50">
                      {label}
                    </p>
                    <p className="font-medium truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Account info */}
            <div
              className="animate-fade-up mt-8 rounded-2xl border border-base-300 p-6"
              style={{ animationDelay: "400ms" }}
            >
              <h2 className="text-lg font-semibold mb-4">Account information</h2>
              <div className="space-y-1 text-sm">
                <div className="flex items-center justify-between py-3 border-b border-base-300">
                  <span className="flex items-center gap-2 text-base-content/70">
                    <CalendarDays className="size-4" />
                    Member since
                  </span>
                  <span className="font-medium">{memberSince}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="flex items-center gap-2 text-base-content/70">
                    <ShieldCheck className="size-4" />
                    Account status
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success font-medium">
                    <span className="relative flex size-2">
                      <span className="animate-ping absolute inline-flex size-full rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-success" />
                    </span>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;