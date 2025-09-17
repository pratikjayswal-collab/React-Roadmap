
import React, { useState } from "react";
import { useUser } from "./contexts/UserContext";

const UserDashboard = () => {
  const { user, setUser, t } = useUser();

  const [formState, setFormState] = useState(user);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formState.theme === "blue") {
      setError("❌ Blue theme is not available.");
      return;
    }

    if (formState.language === "French") {
      setError("❌ French language is not available.");
      return;
    }

    setUser(formState);
    alert("Changes Saved");
  };

  return (
    <div className="p-6 w-full flex bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <form action="" className="w-1/2" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          {t?.profileInformation || "Profile Information"}
        </h1>
        
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            {t.name}
          </label>
          <input
            type="text"
            name="userName"
            value={formState.userName}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 rounded p-2 mb-4 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            {t.addProfilePicture}
          </label>
          <input
            type="text"
            name="profilePic"
            value={formState.profilePic}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 rounded p-2 mb-4 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            {t.selectTheme}
          </label>
          <select
            name="theme"
            value={formState.theme}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 w-full px-2 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="blue">Blue</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            {t.selectLanguage}
          </label>
          <select
            name="language"
            value={formState.language}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 w-full px-2 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Gujarati">Gujarati</option>
            <option value="French">French</option>
          </select>
        </div>

        {error && (
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 mt-8 text-white px-4 py-2 rounded transition-colors duration-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          {t.saveChanges}
        </button>
      </form>
      
      <div className="w-1/2 flex items-center justify-center pb-64">
        <img
          className="w-[300px] h-[300px] rounded-full object-cover border-4 border-gray-200 dark:border-gray-600 shadow-lg"
          src={user.profilePic}
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default UserDashboard