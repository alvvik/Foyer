import React from "react";
import { getInitials } from "../../utils/userUtils";
import Input from "../Input";
import { UserRound, AtSign } from "lucide-react";

export default function PublicProfileTab({
  formData,
  handleInputChange,
  profilePic,
  handleFileChange,
  removeProfilePic,
}) {
  return (
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
                {getInitials(formData.firstName, formData.lastName)}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="text-xs font-medium bg-background px-4 py-2.5 rounded text-text border border-sec/30 hover:border-primary transition-colors cursor-not-allowed">
              Upload New Picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled
              />
            </label>
            {profilePic && (
              <button
                type="button"
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
            <div className="relative flex items-center w-full hover:-translate-y-1 transition-transform">
              <UserRound className="absolute left-3 w-5 h-5 text-primary pointer-events-none" />
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required={false}
                className="text-sm text-text transition-colors pl-10 pr-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-sec mb-1 uppercase tracking-wider">
              Last Name
            </label>
            <div className="relative flex items-center w-full hover:-translate-y-1 transition-transform">
              <UserRound className="absolute left-3 w-5 h-5 text-primary pointer-events-none" />
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required={false}
                className="text-sm text-text transition-colors pl-10 pr-3 py-2"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-sec mb-1 uppercase tracking-wider">
              Username
            </label>
            <div className="relative flex items-center w-full hover:-translate-y-1 transition-transform">
              <AtSign className="absolute left-3 w-5 h-5 text-primary pointer-events-none" />
              <Input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                required={true}
                className="text-sm text-text transition-colors pl-10 pr-3 py-2"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
