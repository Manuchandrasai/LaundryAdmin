const statusStyles = {
  pending: 'bg-orange-100/18 text-orange-700',
  processing: 'bg-indigo-100/18 text-indigo-700',
  'on-pickup': 'bg-blue-100/18 text-blue-700',
  delivering: 'bg-teal-100/18 text-teal-700',
  idle: 'bg-slate-100/18 text-slate-600',
  completed: 'bg-green-100/18 text-green-700',
  cancelled: 'bg-red-100/18 text-red-700',
};

const StatusBadge = ({ status }) => {
  const normalized = status.toLowerCase().replace(/\s+/g, '-');
  const style = statusStyles[normalized] || statusStyles.processing;

  return (
    <span className={`px-3 py-1.5 rounded-full font-semibold text-xs uppercase tracking-wide w-max ${style}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
