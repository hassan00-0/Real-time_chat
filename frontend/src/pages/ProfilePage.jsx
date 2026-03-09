import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
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
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto">
        <div className="bg-base-300 rounded-xl p-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="pt-2 pb-4 text-base-content/60">
              Your profile information
            </p>
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={selectedImage || authUser?.profilePic || "/avatar.png"}
                  className="size-32 rounded-full object-cover border-4 border-base-100"
                />

                <label
                  htmlFor="avatar-upload"
                  className={`absolute right-0 bottom-0 rounded-full bg-base-content p-2
                  cursor-pointer hover:scale-105 transition-all duration-200
                   ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
                >
                  <Camera className="size-5 text-base-200" />
                  <input
                    type="file"
                    className="hidden"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-zinc-400">
                {isUpdatingProfile ? "Uploading..." : ""}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* fullname field */}
            <div className="mt-17 space-y-1.5">
              <div className="flex items-center justify-start gap-2 text-zinc-400 text-sm">
                <User className="size-5" />
                Full Name
              </div>
              <p className="bg-base-200 rounded-lg border border-base-300 px-4 py-2.5">
                {authUser?.fullName}
              </p>
            </div>
            {/* email field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-start gap-2 text-zinc-400 text-sm">
                <Mail className="size-5" />
                Email
              </div>
              <p className="bg-base-200 rounded-lg border border-base-300 px-4 py-2.5">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
