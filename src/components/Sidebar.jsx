import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  FiBarChart2,
  FiBox,
  FiLayers,
  FiMessageCircle,
  FiTruck,
  FiUsers,
} from 'react-icons/fi';
import { MdOutlineLocalLaundryService } from 'react-icons/md';
import { HiOutlineHome } from 'react-icons/hi';

const navItems = [
  { to: '/', label: 'Dashboard', icon: <HiOutlineHome /> },
  { to: '/orders', label: 'Orders', icon: <FiBox /> },
  { to: '/partners', label: 'Partners', icon: <FiLayers /> },
  { to: '/delivery', label: 'Delivery', icon: <FiTruck /> },
  { to: '/customers', label: 'Customers', icon: <FiUsers /> },
  { to: '/analytics', label: 'Analytics', icon: <FiBarChart2 /> },
  { to: '/communication', label: 'Communication', icon: <FiMessageCircle /> },
];

const Sidebar = ({ collapsed, onToggle, isMobileOpen, onMobileClose }) => {
  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen bg-white text-slate-800 py-7 px-4.5 flex flex-col gap-6 shadow-2xl transition-all duration-250 z-30 border-r border-slate-200 ${
          collapsed ? 'w-24' : 'w-[260px]'
        } max-md:fixed max-md:transform max-md:transition-transform max-md:duration-250 ${
          isMobileOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'
        } max-md:w-[240px]`}
      >
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 font-bold text-lg tracking-wide text-slate-800">
          <MdOutlineLocalLaundryService className="text-4xl text-indigo-600" />
          {!collapsed && <span className="text-slate-800">LaundryLink</span>}
        </div>
      </div>

      <nav className="flex flex-col gap-1.5 items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={() => {
              if (window.innerWidth < 768 && onMobileClose) {
                onMobileClose();
              }
            }}
            className={({ isActive }) =>
              `flex items-center ${collapsed ? 'justify-center' : 'justify-start'} gap-3.5 ${collapsed ? 'w-12' : 'w-full'} px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-br from-indigo-500/90 to-indigo-600/80 text-white shadow-lg shadow-indigo-500/35'
                  : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`
            }
          >
            <motion.span
              className="text-2xl grid place-items-center [&_svg]:text-current"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.96 }}
            >
              {item.icon}
            </motion.span>
            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
    </>
  );
};

export default Sidebar;
