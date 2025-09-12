import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-16 w-full bg-gradient-to-br from-base-200 via-base-300 to-base-100 flex items-center justify-center py-2 px-4 overflow-x-hidden">
      <div className="max-w-2xl w-full relative">
        {/* Profile Card */}
        <div
          className="relative z-10 bg-base-300/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 space-y-8 before:absolute before:inset-0 before:rounded-2xl before:p-[2px] before:bg-gradient-to-r 
          before:from-primary/50 before:via-secondary/50 before:to-pink-400/40 before:animate-[pulse_5s_infinite] 
          before:blur-sm before:-z-10"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Profile
            </h1>
            <p className="mt-2 text-base-content/70">
              Manage your profile information
            </p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-36 rounded-full object-cover border-3 border-white shadow-xl 
                          group-hover:scale-105 transition-transform duration-300"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-2 right-2 bg-gradient-to-r from-primary to-secondary p-3 rounded-full shadow-lg cursor-pointer transition-transform duration-300 group-hover:scale-110 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-white" />
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
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-300 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200/70 rounded-lg border border-white/10 shadow-inner">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200/70 rounded-lg border border-white/10 shadow-inner">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-6 bg-base-200/70 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-inner">
            <h2 className="text-lg font-semibold mb-4 text-base-content/90">
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <span className="text-base-content/70">Member Since</span>
                <span className="font-medium">
                  {authUser.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-base-content/70">Account Status</span>
                <span className="text-green-500 font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
