import { useState } from 'react';
import { FiCamera, FiMail, FiUser, FiShield, FiCalendar, FiPhone } from 'react-icons/fi';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@laundrylink.io',
    role: 'Super Admin',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 15, 2024',
    department: 'Administration',
    location: 'San Francisco, CA',
    bio: 'Experienced administrator managing the LaundryLink platform operations and ensuring smooth service delivery across all partners.',
  });

  const handleChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col gap-6 max-md:gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4 max-md:gap-3">
        <div>
          <h2 className="text-3xl m-0 mb-2 max-md:text-2xl">My Profile</h2>
          <p className="m-0 text-slate-500 max-md:text-sm">View and manage your account information.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-md:gap-4">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/10 p-6 max-md:p-4">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white grid place-items-center text-4xl font-bold shadow-lg">
                  AR
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-indigo-600 text-white grid place-items-center shadow-md hover:bg-indigo-700 transition-colors">
                  <FiCamera className="text-lg" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">{profileData.name}</h3>
              <p className="text-sm text-slate-500 mb-2">{profileData.role}</p>
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                Active
              </span>
            </div>

            <div className="border-t border-slate-200 pt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <FiMail className="text-slate-400" />
                <span className="text-slate-600">{profileData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FiPhone className="text-slate-400" />
                <span className="text-slate-600">{profileData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FiCalendar className="text-slate-400" />
                <span className="text-slate-600">Joined {profileData.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/10 p-6 max-md:p-4">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Personal Information</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <FiUser className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <FiMail className="inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-md:gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <FiPhone className="inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <FiShield className="inline mr-2" />
                    Department
                  </label>
                  <input
                    type="text"
                    value={profileData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button className="px-6 py-3 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-sm">
                  Save Changes
                </button>
                <button className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
