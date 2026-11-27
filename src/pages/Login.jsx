import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLocalLaundryService } from 'react-icons/md';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: '', password: '', remember: true });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
    navigate('/');
  };

  return (
    <div className="min-h-screen grid place-items-center p-8 relative max-md:p-5">
      <motion.div
        className="relative w-full max-w-[420px] bg-white/85 rounded-[26px] p-10 shadow-2xl backdrop-blur-xl flex flex-col gap-6 max-md:p-8 max-md:px-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="text-center flex flex-col gap-3">
          <span className="w-[60px] h-[60px] grid place-items-center m-auto rounded-2xl text-3xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-sm">
            <MdOutlineLocalLaundryService />
          </span>
          <h1 className="m-0 text-2xl">LaundryLink Admin</h1>
          <p className="m-0 text-slate-500">Control the entire laundry ecosystem from a single dashboard.</p>
        </div>

        <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
          <label className="font-semibold text-sm text-slate-500" htmlFor="email">
            Email
          </label>
          <input
            className="py-3 px-4 rounded-xl border border-slate-200/20 bg-white/90 transition-all focus:outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/18"
            id="email"
            name="email"
            type="email"
            placeholder="admin@laundrylink.io"
            value={formValues.email}
            onChange={handleChange}
            required
          />

          <label className="font-semibold text-sm text-slate-500" htmlFor="password">
            Password
          </label>
          <input
            className="py-3 px-4 rounded-xl border border-slate-200/20 bg-white/90 transition-all focus:outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/18"
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={formValues.password}
            onChange={handleChange}
            required
          />

          <div className="flex items-center justify-between gap-3 mt-2">
            <label htmlFor="remember" className="inline-flex items-center gap-2 text-xs text-slate-500">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={formValues.remember}
                onChange={handleChange}
                className="w-4 h-4"
              />
              Remember me
            </label>
            <button type="button" className="bg-transparent text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              Forgot password?
            </button>
          </div>

          <motion.button
            type="submit"
            className="mt-3 py-3.5 rounded-xl font-bold bg-gradient-to-br from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 transition-colors"
            whileTap={{ scale: 0.98 }}
            whileHover={{ translateY: -2 }}
          >
            Login
          </motion.button>
        </form>
      </motion.div>
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/16 via-transparent to-teal-500/18 z-[-1]"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(140% 140% at 90% 10%, rgba(77, 108, 250, 0.16), transparent 60%), radial-gradient(120% 120% at 16% 20%, rgba(0, 196, 159, 0.18), transparent 70%), linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
        }}
      />
    </div>
  );
};

export default Login;
