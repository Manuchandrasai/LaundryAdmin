import { motion } from 'framer-motion';

const accentStyles = {
  'accent-blue': 'bg-gradient-to-br from-indigo-500 to-indigo-600',
  'accent-teal': 'bg-gradient-to-br from-teal-500 to-teal-600',
  'accent-purple': 'bg-gradient-to-br from-purple-500 to-purple-600',
  'accent-orange': 'bg-gradient-to-br from-orange-400 to-orange-500',
};

const SummaryCard = ({ title, value, subtitle, icon, accent = 'accent-blue' }) => {
  return (
    <motion.div
      className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-indigo-500/8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ translateY: -4 }}
    >
      <div className={`w-[52px] h-[52px] grid place-items-center rounded-2xl text-2xl text-white ${accentStyles[accent] || accentStyles['accent-blue']}`}>
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-slate-500 uppercase tracking-wide">{title}</span>
        <strong className="text-3xl font-bold">{value}</strong>
        {subtitle && <span className="text-xs text-slate-500">{subtitle}</span>}
      </div>
    </motion.div>
  );
};

export default SummaryCard;
