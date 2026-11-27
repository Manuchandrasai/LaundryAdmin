import { motion } from 'framer-motion';
import { FiSend, FiMessageSquare, FiVolume2 } from 'react-icons/fi';

const templates = [
  {
    id: 'offer-alert',
    title: 'Offer Alert',
    description: 'Broadcast new partner promotions or discount codes to customers.',
    icon: <FiVolume2 />,
    gradient: 'from-orange-400 to-orange-500',
  },
  {
    id: 'system-notice',
    title: 'System Notice',
    description: 'Inform stakeholders about downtime, updates, or new feature releases.',
    icon: <FiMessageSquare />,
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'ops-update',
    title: 'Operations Update',
    description: 'Share operational updates, delivery zone changes, or partner onboarding steps.',
    icon: <FiSend />,
    gradient: 'from-teal-500 to-teal-600',
  },
];

const Communication = () => {
  return (
    <div className="flex flex-col gap-6 max-md:gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4 max-md:gap-3">
        <div>
          <h2 className="text-3xl m-0 mb-2 max-md:text-2xl">Communication Center</h2>
          <p className="m-0 text-slate-500 max-md:text-sm">Coordinate with partners and delivery agents through curated announcements.</p>
        </div>
        <button
          type="button"
          className="px-5 py-3 rounded-full font-semibold bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-sm hover:from-indigo-600 hover:to-indigo-700 transition-colors max-md:px-4 max-md:py-2 max-md:text-sm"
        >
          Compose Announcement
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 max-md:grid-cols-1 max-md:gap-4">
        {templates.map((template, index) => (
          <motion.article
            key={template.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-500/14 flex flex-col gap-3 min-h-[200px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ translateY: -4 }}
          >
            <div className={`text-3xl rounded-2xl w-14 h-14 grid place-items-center text-white bg-gradient-to-br ${template.gradient}`}>
              {template.icon}
            </div>
            <h3 className="m-0 text-lg">{template.title}</h3>
            <p className="m-0 text-slate-500 text-sm">{template.description}</p>
            <button
              type="button"
              className="mt-auto self-start px-4.5 py-2.5 rounded-full font-semibold bg-indigo-50/14 text-indigo-600 hover:bg-indigo-50/20 transition-colors"
            >
              Use Template
            </button>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Communication;
