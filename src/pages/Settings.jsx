import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import PublicProfileTab from "../components/Settings/PublicProfileTab";
import AccountSettingsTab from "../components/Settings/AccountSettingsTab";
import Modal from "../components/Modal";
import Input from "../components/Input";
import { copyToClipboard } from "../utils/webUtils";
import { ErrorToast, SuccessToast } from "../utils/toast";
export default function Settings() {
  const { user, dbData, editProfile } = useAuthContext();
  const [showUuid, setShowUuid] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAccountSettings, setIsAccountSettings] = useState(false);
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
    try {
      await editProfile({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        photoURL: profilePic,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });
      SuccessToast({ text: "Saved your data" });
    } catch (err) {
      ErrorToast({ text: err.message || "Try again." });
    }
  };

  return (
    <>
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
                <Tab
                  className="ui-selected:text-primary ui-selected:border-b-2 ui-selected:border-primary text-sec hover:text-text focus:outline-none font-medium px-1 py-2"
                  onClick={() => setIsAccountSettings(false)}
                >
                  Public profile
                </Tab>
                <Tab
                  className="ui-selected:text-primary ui-selected:border-b-2 ui-selected:border-primary text-sec hover:text-text focus:outline-none font-medium px-1 py-2"
                  onClick={() => setIsAccountSettings(true)}
                >
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
                type="button"
                onClick={() => setIsFormOpen(true)}
                className="px-6 py-2 text-sm font-medium bg-primary rounded shadow-md hover:opacity-90 transition-opacity text-text"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="text-center">
            <p
              onClick={() => setShowUuid(!showUuid)}
              className=" text-sm text-text/30 mt-4 hover:text-text text-center inline-block"
            >
              {!showUuid ? "Show" : "Hide"} your uuid{" "}
            </p>
            <p
              onClick={async () => {
                try {
                  await copyToClipboard(user.uid);
                  SuccessToast({ text: "Copied to clipboard!" });
                } catch (err) {
                  ErrorToast({ text: "Try again or copy manually" });
                }
              }}
            >
              {showUuid && (
                <>
                  <br />

                  {user.uid}
                </>
              )}
            </p>
          </div>
          <Modal
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            title="Enter your password to confirm"
          >
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Enter your password to confirm
              </label>
              <Input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    handleSave(e);
                    setIsFormOpen(false);
                  }}
                  className="px-6 py-2 text-sm font-medium bg-primary text-background-sec rounded shadow-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}
