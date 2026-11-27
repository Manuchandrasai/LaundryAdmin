import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiChevronDown, FiLogOut, FiMenu, FiSearch } from 'react-icons/fi';

const Header = ({ onToggleSidebar, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    { id: 1, text: '3 new orders placed' },
    { id: 2, text: 'Delivery agent Rahul completed a trip' },
    { id: 3, text: 'Payout processed for Laundry Lounge' },
  ];

  return (
    <header className="h-[78px] flex items-center justify-between px-8 bg-white/88 backdrop-blur-xl border-b border-slate-200/18 sticky top-0 z-20 max-md:px-4 max-md:h-auto max-md:py-3">
      <div className="flex items-center gap-4 max-md:gap-2">
        <button
          className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-xl bg-indigo-100 text-indigo-600 text-lg hover:bg-indigo-200/80 transition-colors max-md:w-9 max-md:h-9"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <FiMenu />
        </button>
        <div className="flex items-baseline gap-2.5 text-lg font-bold text-slate-800 tracking-wide max-md:text-base">
          <span className="max-md:hidden">LaundryLink Admin</span>
          <span className="hidden max-md:inline">Admin</span>
        </div>
      </div>

      <div className="relative w-full max-w-[360px] max-md:hidden">
        <FiSearch className="absolute top-2.5 left-4 text-slate-500" />
        <input
          className="w-full py-2.5 px-3.5 pl-10 rounded-xl border border-slate-200/18 bg-slate-50/90 text-slate-800 transition-all focus:outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-200/18"
          type="text"
          placeholder="Search orders, partners, customers..."
        />
      </div>

      <div className="flex items-center gap-4 max-md:gap-2.5">
        <div className="relative">
          <button
            className="bg-indigo-100 text-indigo-600 w-[38px] h-[38px] rounded-xl grid place-items-center transition-colors hover:bg-indigo-200/80"
            type="button"
            aria-label="Notifications"
            onClick={() => {
              setShowNotifications((s) => !s);
              setShowProfile(false);
            }}
          >
            <FiBell />
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-[340px] max-md:w-[calc(100vw-2rem)] max-md:right-0 max-md:left-auto rounded-xl border border-slate-200 bg-white shadow-2xl z-50 p-4">
              <strong className="text-slate-800">Notifications</strong>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-slate-800">
                {notifications.map((n) => (
                  <li key={n.id}>{n.text}</li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-3 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-600 font-semibold hover:bg-indigo-200/80"
                onClick={() => setShowNotifications(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-3.5 py-1.5 bg-slate-50/86 rounded-2xl border border-slate-200/14 relative cursor-pointer max-md:hidden">
          <div
            className="w-[38px] h-[38px] rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white grid place-items-center text-base font-semibold"
            onClick={() => {
              setShowProfile((s) => !s);
              setShowNotifications(false);
            }}
          >
            AR
          </div>
          <div
            className="flex flex-col leading-tight"
            onClick={() => {
              setShowProfile((s) => !s);
              setShowNotifications(false);
            }}
          >
            <span className="font-semibold text-sm">Alex Rivera</span>
            <span className="text-xs text-slate-500">Super Admin</span>
          </div>
          <FiChevronDown
            className="text-slate-500 text-base"
            onClick={() => {
              setShowProfile((s) => !s);
              setShowNotifications(false);
            }}
          />
          {showProfile && (
            <div className="absolute right-0 top-full mt-2 min-w-[220px] max-md:min-w-[180px] rounded-xl border border-slate-200 bg-white shadow-xl z-50 p-3">
              <button
                type="button"
                className="w-full text-left px-3 py-2 rounded-lg bg-indigo-50 text-slate-800 font-semibold hover:bg-indigo-100"
                onClick={() => {
                  navigate('/profile');
                  setShowProfile(false);
                }}
              >
                View Profile
              </button>
              <button
                type="button"
                className="w-full text-left px-3 py-2 mt-2 rounded-lg bg-indigo-50 text-slate-800 font-semibold hover:bg-indigo-100"
                onClick={() => {
                  navigate('/settings');
                  setShowProfile(false);
                }}
              >
                Settings
              </button>
            </div>
          )}
        </div>

        <button
          className="bg-indigo-100 text-indigo-600 w-[38px] h-[38px] rounded-xl grid place-items-center transition-colors hover:bg-indigo-200/80"
          type="button"
          onClick={onLogout}
          aria-label="Logout"
        >
          <FiLogOut />
        </button>
      </div>
    </header>
  );
};

export default Header;
