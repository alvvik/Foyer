import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import PublicProfileTab from "../components/Settings/PublicProfileTab";
import AccountSettingsTab from "../components/Settings/AccountSettingsTab";

export default function Settings() {
  const { user, dbData, editProfile } = useAuthContext();

  const [profilePic, setProfilePic] = useState("");
  const [theme, setTheme] = useState("dark");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user || dbData) {
      setFormData((prev) => ({
        ...prev,
        firstName: dbData?.firstName || "",
        lastName: dbData?.lastName || "",
        userName: dbData?.userName || user?.displayName || "",
        email: user?.email || "",
      }));

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
    }
  };

  const removeProfilePic = () => {
    setProfilePic("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Zapisywanie danych:", formData);

    await editProfile({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      userName: formData.userName,
      photoURL: profilePic,
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
      currentTimestamp: new Date(),
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

        <form onSubmit={handleSave}>
          <TabGroup>
            <TabList className="flex justify-center items-center space-x-4 border-b border-sec/10 mb-6 pb-2">
              <Tab className="ui-selected:text-primary ui-selected:border-b-2 ui-selected:border-primary text-sec hover:text-text focus:outline-none font-medium px-1 py-2">
                Public profile
              </Tab>
              <Tab className="ui-selected:text-primary ui-selected:border-b-2 ui-selected:border-primary text-sec hover:text-text focus:outline-none font-medium px-1 py-2">
                Account settings
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <PublicProfileTab
                  formData={formData}
                  handleInputChange={handleInputChange}
                  profilePic={profilePic}
                  handleFileChange={handleFileChange}
                  removeProfilePic={removeProfilePic}
                />
              </TabPanel>

              <TabPanel>
                <AccountSettingsTab
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>

          <div className="flex justify-center space-x-4 pt-6 mt-8 border-t border-sec/10">
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
