import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Settings() {
  const { user } = useAuthContext();

  const [profilePic, setProfilePic] = useState("");
  const [theme, setTheme] = useState("dark");
  const [userData, setUser] = useState(user);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const removeProfilePic = () => {
    setProfilePic(null);
  };

  /* return (
    <div className="min-h-screen bg-background text-text p-6 md:p-12 font-sans antialiased">
      <div className="max-w-3xl mx-auto bg-background-sec rounded-lg border border-sec/10 p-6 md:p-8 shadow-xl">
        <header className="mb-8 border-b border-sec/10 pb-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Account Settings
          </h1>
          <p className="text-sec text-sm mt-1">
            Manage your personal information, security credentials, and
            application theme.
          </p>
        </header>

        <div className="space-y-8">
          <section>
            <h2 className="text-base font-medium mb-4 text-text">
              Profile Picture
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative w-20 h-20 bg-background border border-sec/30 rounded flex items-center justify-center overflow-hidden">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold text-sec">
                    {formData.firstName[0]}
                    {formData.lastName[0]}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                <label className="text-xs font-medium bg-background px-4 py-2.5 rounded text-text border border-sec/30 hover:border-primary cursor-pointer transition-colors">
                  Upload New Picture
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                {profilePic && (
                  <button
                    onClick={removeProfilePic}
                    className="text-xs font-medium bg-transparent px-4 py-2.5 rounded text-sec hover:text-text border border-transparent transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </section>

          <hr className="border-sec/10" />

          <section>
            <h2 className="text-base font-medium mb-4 text-text">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-sec mb-1 uppercase tracking-wider">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-background border border-sec/30 rounded px-3 py-2 text-sm text-text focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-sec mb-1 uppercase tracking-wider">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-background border border-sec/30 rounded px-3 py-2 text-sm text-text focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-sec mb-1 uppercase tracking-wider">
                  Display Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full bg-background border border-sec/30 rounded px-3 py-2 text-sm text-text focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-sec mb-1 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-background border border-sec/30 rounded px-3 py-2 text-sm text-text focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </section>

          <hr className="border-sec/10" />

          <section>
            <h2 className="text-base font-medium mb-4 text-text">
              Interface Theme
            </h2>
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <button
                onClick={() => setTheme("light")}
                className={`flex items-center justify-center space-x-2 p-3 rounded border text-sm font-medium transition-all ${theme === "light" ? "border-primary bg-background text-primary" : "border-sec/30 bg-background/40 text-sec hover:text-text"}`}
              >
                <span>Light Mode</span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center justify-center space-x-2 p-3 rounded border text-sm font-medium transition-all ${theme === "dark" ? "border-primary bg-background text-primary" : "border-sec/30 bg-background/40 text-sec hover:text-text"}`}
              >
                <span>Dark Mode</span>
              </button>
            </div>
          </section>

          <hr className="border-sec/10" />

          <section>
            <h2 className="text-base font-medium mb-4 text-text">
              Change Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-sec mb-1 uppercase tracking-wider">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full bg-background border border-sec/30 rounded px-3 py-2 text-sm text-text focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-sec mb-1 uppercase tracking-wider">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-sec/30 rounded px-3 py-2 text-sm text-text focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-sec mb-1 uppercase tracking-wider">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-sec/30 rounded px-3 py-2 text-sm text-text focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end space-x-4 pt-4 border-t border-sec/10">
            <button className="px-5 py-2 text-sm font-medium text-sec hover:text-text transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2 text-sm font-medium bg-primary text-background-sec rounded shadow-md hover:opacity-90 transition-opacity">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );*/
}
