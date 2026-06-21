import React from "react";
import Input from "../Input";
import { Mail, Lock } from "lucide-react";

export default function AccountSettingsTab({ formData, handleInputChange }) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-base font-medium mb-4 text-text">
          Account Security
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-sec mb-1 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative flex items-center w-full hover:-translate-y-1 transition-transform">
              <Mail className="absolute left-3 w-5 h-5 text-primary pointer-events-none" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required={true}
                className="text-sm text-text transition-colors pl-10 pr-3 py-2"
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="border-sec/10" />

      <section>
        <h2 className="text-base font-medium mb-4 text-text">
          Change Password
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-sec mb-1 uppercase tracking-wider">
                New Password
              </label>
              <div className="relative flex items-center w-full hover:-translate-y-1 transition-transform">
                <Lock className="absolute left-3 w-5 h-5 text-primary pointer-events-none" />
                <Input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required={false}
                  className="text-sm text-text transition-colors pl-10 pr-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-sec mb-1 uppercase tracking-wider">
                Confirm New Password
              </label>
              <div className="relative flex items-center w-full hover:-translate-y-1 transition-transform">
                <Lock className="absolute left-3 w-5 h-5 text-primary pointer-events-none" />
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={false}
                  className="text-sm text-text transition-colors pl-10 pr-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
