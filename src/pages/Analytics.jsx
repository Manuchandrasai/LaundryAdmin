import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import {
  customerGrowth,
  monthlyRevenue,
  partnerPerformance,
  revenueByPartner,
} from '../data/analytics.js';

const Analytics = () => {
  const metrics = [
    { label: 'Total Users', value: '12,480', delta: '+8.3%' },
    { label: 'Total Orders', value: '98,324', delta: '+5.6%' },
    { label: 'Active Deliveries', value: '42', delta: '-3.1%' },
    { label: 'Partner NPS', value: '72', delta: '+2.0' },
  ];

  return (
    <div className="flex flex-col gap-6 max-md:gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4 max-md:gap-3">
        <div>
          <h2 className="text-3xl m-0 mb-2 max-md:text-2xl">Analytics Overview</h2>
          <p className="m-0 text-slate-500 max-md:text-sm">Monitor platform health and performance metrics to stay ahead of operational needs.</p>
        </div>
      </div>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 max-md:grid-cols-2 max-md:gap-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-2xl p-4.5 shadow-sm border border-slate-200/12 flex flex-col gap-1.5">
            <span className="text-xs tracking-wide uppercase text-slate-500">{metric.label}</span>
            <strong className="text-2xl font-bold">{metric.value}</strong>
            <small className="text-teal-600 font-semibold">{metric.delta} vs last month</small>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 max-md:grid-cols-1 max-md:gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/10">
          <header className="flex justify-between items-baseline mb-4">
            <h3 className="m-0 text-lg">Monthly Revenue</h3>
            <span className="text-slate-500 text-xs">2025</span>
          </header>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4D6CFA" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4D6CFA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis dataKey="month" tick={{ fill: '#617189' }} />
              <YAxis
                tick={{ fill: '#617189' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4D6CFA"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/10">
          <header className="flex justify-between items-baseline mb-4">
            <h3 className="m-0 text-lg">Partner Performance</h3>
            <span className="text-slate-500 text-xs">Completed vs Escalations</span>
          </header>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={partnerPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis dataKey="partner" tick={{ fill: '#617189' }} />
              <YAxis tick={{ fill: '#617189' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#00c49f" radius={[6, 6, 0, 0]} />
              <Bar dataKey="escalations" fill="#ff8042" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/10">
          <header className="flex justify-between items-baseline mb-4">
            <h3 className="m-0 text-lg">Customer Growth Curve</h3>
            <span className="text-slate-500 text-xs">Monthly active customers</span>
          </header>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={customerGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis dataKey="month" tick={{ fill: '#617189' }} />
              <YAxis tick={{ fill: '#617189' }} />
              <Tooltip />
              <Line type="monotone" dataKey="customers" stroke="#00C49F" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/10">
          <header className="flex justify-between items-baseline mb-4">
            <h3 className="m-0 text-lg">Revenue Contribution</h3>
            <span className="text-slate-500 text-xs">Top partners</span>
          </header>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueByPartner}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis dataKey="partner" tick={{ fill: '#617189' }} />
              <YAxis
                tick={{ fill: '#617189' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#4D6CFA" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
