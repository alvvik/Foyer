import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getInitials } from "../utils/userUtils";

export default function Settings() {
  // Pobieramy user oraz dbData z kontekstu autoryzacji
  const { user, dbData, editProfile } = useAuthContext();

  const [profilePic, setProfilePic] = useState("");
  const [theme, setTheme] = useState("dark");

  // Inicjalizujemy pusty stan formularza, żeby uniknąć błędów o "uncontrolled input"
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "", // Zmienione z displayName na userName, zgodnie z strukturą bazy
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Kiedy dane z kontekstu (Auth i Firestore) się załadują, aktualizujemy stan formularza
  useEffect(() => {
    if (user || dbData) {
      setFormData((prev) => ({
        ...prev,
        firstName: dbData?.firstName || "",
        lastName: dbData?.lastName || "",
        userName: dbData?.userName || user?.displayName || "", // Dopasowane do userName
        email: user?.email || "",
      }));

      // Jeśli użytkownik ma już zapisane zdjęcie w bazie, ustawiamy je w podglądzie
      if (dbData?.photoURL) {
        setProfilePic(dbData.photoURL);
      }
    }
  }, [user, dbData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
      // Wskazówka: W tym miejscu w przyszłości dodasz wysyłanie pliku do Firebase Storage,
      // a pobrany URL z serwera przypiszesz do stanu bazy danych.
    }
  };

  const removeProfilePic = () => {
    setProfilePic("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Zapisywanie danych:", formData);

    // POPRAWKA: Przekazujemy dane jako JEDEN OBIEKT {} wewnątrz funkcji
    // Zamieniliśmy też displayName na userName
    await editProfile({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      userName: formData.userName,
      photoURL: profilePic,
    });
  };

  return (
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

        <form onSubmit={handleSave} className="space-y-8">
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
                  Username
                </label>
                <input
                  type="text"
                  name="userName" // Zmieniono nazwę pola
                  value={formData.userName}
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
            <button
              type="button"
              className="px-5 py-2 text-sm font-medium text-sec hover:text-text transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium bg-primary text-background-sec rounded shadow-md hover:opacity-90 transition-opacity"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
