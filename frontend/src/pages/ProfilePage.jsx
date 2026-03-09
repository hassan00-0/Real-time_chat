import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Camera } from "lucide-react";

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
            <h1>Profile</h1>
            <p>Your profile information</p>
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
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
