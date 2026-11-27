import { useState } from 'react';
import { FiBell, FiLock, FiGlobe, FiShield, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';

const Settings = () => {
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      orderUpdates: true,
      systemAlerts: true,
    },
    security: {
      twoFactor: false,
      sessionTimeout: '30',
      passwordExpiry: '90',
      newPassword: '',
      confirmPassword: '',
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'America/Los_Angeles',
      dateFormat: 'MM/DD/YYYY',
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      marketing: false,
    },
  });

  const handleToggle = (category, key) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  const handleChange = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordChange = () => {
    if (settings.security.newPassword !== settings.security.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (settings.security.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    alert('Password changed successfully!');
    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        newPassword: '',
        confirmPassword: '',
      },
    }));
  };

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      alert('Account deletion confirmed. This action cannot be undone.');
      // Add actual deletion logic here
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const SettingSection = ({ icon, title, description, children }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/10 p-6">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      </div>
      {description && <p className="text-sm text-slate-500 mb-6 ml-11">{description}</p>}
      {children}
    </div>
  );

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0">
      <div className="flex-1">
        <p className="font-semibold text-slate-800 mb-1">{label}</p>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-indigo-600' : 'bg-slate-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 max-md:gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4 max-md:gap-3">
        <div>
          <h2 className="text-3xl m-0 mb-2 max-md:text-2xl">Settings</h2>
          <p className="m-0 text-slate-500 max-md:text-sm">Configure your application preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-md:gap-4">
        {/* Notifications */}
        <SettingSection
          icon={<FiBell className="text-2xl text-indigo-600" />}
          title="Notifications"
          description="Manage how you receive alerts and updates."
        >
          <div className="space-y-0">
            <ToggleSwitch
              enabled={settings.notifications.email}
              onChange={() => handleToggle('notifications', 'email')}
              label="Email Notifications"
              description="Receive updates via email"
            />
            <ToggleSwitch
              enabled={settings.notifications.push}
              onChange={() => handleToggle('notifications', 'push')}
              label="Push Notifications"
              description="Get real-time browser notifications"
            />
            <ToggleSwitch
              enabled={settings.notifications.sms}
              onChange={() => handleToggle('notifications', 'sms')}
              label="SMS Notifications"
              description="Receive critical alerts via SMS"
            />
            <ToggleSwitch
              enabled={settings.notifications.orderUpdates}
              onChange={() => handleToggle('notifications', 'orderUpdates')}
              label="Order Updates"
              description="Get notified about order status changes"
            />
            <ToggleSwitch
              enabled={settings.notifications.systemAlerts}
              onChange={() => handleToggle('notifications', 'systemAlerts')}
              label="System Alerts"
              description="Important system notifications"
            />
          </div>
        </SettingSection>

        {/* Security */}
        <SettingSection
          icon={<FiShield className="text-2xl text-indigo-600" />}
          title="Security"
          description="Control access and protect your account."
        >
          <div className="space-y-5">
            <ToggleSwitch
              enabled={settings.security.twoFactor}
              onChange={() => handleToggle('security', 'twoFactor')}
              label="Two-Factor Authentication"
              description="Add an extra layer of security"
            />
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Session Timeout (minutes)</label>
              <select
                value={settings.security.sessionTimeout}
                onChange={(e) => handleChange('security', 'sessionTimeout', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password Expiry (days)</label>
              <select
                value={settings.security.passwordExpiry}
                onChange={(e) => handleChange('security', 'passwordExpiry', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <h4 className="text-sm font-bold text-slate-800 mb-4">Change Password</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.newPassword ? 'text' : 'password'}
                      value={settings.security.newPassword}
                      onChange={(e) => handleChange('security', 'newPassword', e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('newPassword')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword.newPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.confirmPassword ? 'text' : 'password'}
                      value={settings.security.confirmPassword}
                      onChange={(e) => handleChange('security', 'confirmPassword', e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword.confirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handlePasswordChange}
                  className="w-full px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </SettingSection>

        {/* Preferences */}
        <SettingSection
          icon={<FiGlobe className="text-2xl text-indigo-600" />}
          title="Preferences"
          description="Personalize your application experience."
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Theme</label>
              <select
                value={settings.preferences.theme}
                onChange={(e) => handleChange('preferences', 'theme', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Language</label>
              <select
                value={settings.preferences.language}
                onChange={(e) => handleChange('preferences', 'language', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              >
                <option value="en">English (US)</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Timezone</label>
              <select
                value={settings.preferences.timezone}
                onChange={(e) => handleChange('preferences', 'timezone', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              >
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Date Format</label>
              <select
                value={settings.preferences.dateFormat}
                onChange={(e) => handleChange('preferences', 'dateFormat', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </SettingSection>

        {/* Privacy */}
        <SettingSection
          icon={<FiLock className="text-2xl text-indigo-600" />}
          title="Privacy & Data"
          description="Manage your data and privacy settings."
        >
          <div className="space-y-0">
            <ToggleSwitch
              enabled={settings.privacy.dataSharing}
              onChange={() => handleToggle('privacy', 'dataSharing')}
              label="Enable Data Sharing"
              description="Allow sharing anonymized data for improvements"
            />
            <ToggleSwitch
              enabled={settings.privacy.analytics}
              onChange={() => handleToggle('privacy', 'analytics')}
              label="Allow Analytics Tracking"
              description="Help us improve by sharing usage analytics"
            />
            <ToggleSwitch
              enabled={settings.privacy.marketing}
              onChange={() => handleToggle('privacy', 'marketing')}
              label="Receive Marketing Communications"
              description="Receive promotional emails and updates"
            />
          </div>
        </SettingSection>
      </div>

      {/* Account Deletion */}
      <div className="bg-white rounded-2xl shadow-sm border border-red-200/50 p-6">
        <div className="flex items-center gap-3 mb-2">
          <FiTrash2 className="text-2xl text-red-600" />
          <h3 className="text-lg font-bold text-slate-800">Delete Admin Account</h3>
        </div>
        <p className="text-sm text-slate-500 mb-6 ml-11">
          Permanently delete your admin account. This action cannot be undone and will remove all your data.
        </p>
        {showDeleteConfirm ? (
          <div className="ml-11 space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-800 font-semibold mb-2">⚠️ Warning: This action is irreversible!</p>
              <p className="text-sm text-red-700">
                Deleting your account will permanently remove all your data, settings, and access to the system. Are you sure you want to proceed?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
              >
                Yes, Delete My Account
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="ml-11 px-6 py-3 rounded-xl border-2 border-red-300 text-red-600 font-semibold hover:bg-red-50 transition-all"
          >
            Delete Account
          </button>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button className="px-6 py-3 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-sm">
          Save All Settings
        </button>
        <button className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default Settings;
