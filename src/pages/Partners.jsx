import { motion } from 'framer-motion';
import { FiEdit2, FiEye } from 'react-icons/fi';
import { partners } from '../data/partners.js';

const Partners = () => {
  return (
    <div className="flex flex-col gap-6 max-md:gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4 max-md:gap-3">
        <div>
          <h2 className="text-3xl m-0 mb-2 max-md:text-2xl">Laundry Partners</h2>
          <p className="m-0 text-slate-500 max-md:text-sm">Track partner performance, ratings, and availability across the network.</p>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 max-md:grid-cols-1 max-md:gap-4">
        {partners.map((partner, index) => (
          <motion.article
            key={partner.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/12 flex flex-col gap-4 min-h-[230px] transition-shadow hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ translateY: -6 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 grid place-items-center text-white text-2xl font-bold">
              {partner.name.charAt(0)}
            </div>
            <h3 className="m-0 text-xl">{partner.name}</h3>
            <p className="m-0 text-slate-500 text-sm">{partner.location}</p>
            <div className="grid grid-cols-[repeat(2,minmax(100px,1fr))] gap-3">
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide block">Total Orders</span>
                <strong className="block mt-1 text-lg">{partner.totalOrders}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide block">Rating</span>
                <strong className="block mt-1 text-lg">{partner.rating.toFixed(1)}</strong>
              </div>
            </div>
            <div className="mt-auto flex gap-3">
              <button type="button" className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-full font-semibold bg-indigo-50/12 text-indigo-600 hover:bg-indigo-50/20 transition-colors">
                <FiEye />
                View
              </button>
              <button type="button" className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-full font-semibold bg-gradient-to-br from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 transition-colors">
                <FiEdit2 />
                Edit
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Partners;
