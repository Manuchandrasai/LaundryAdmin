import { FiActivity, FiDollarSign, FiShoppingBag, FiUsers } from 'react-icons/fi';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import SummaryCard from '../components/SummaryCard.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { dailyOrders, revenueByPartner, topDeliveryAgents } from '../data/analytics.js';
import { orders } from '../data/orders.js';

const deliveryStatusColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#4D6CFA'];

const Dashboard = () => {
  const summaryCards = [
    {
      title: 'Total Orders Today',
      value: '178',
      subtitle: '+12% vs yesterday',
      icon: <FiShoppingBag />,
      accent: 'accent-blue',
    },
    {
      title: 'Active Deliveries',
      value: '42',
      subtitle: '8 running late',
      icon: <FiActivity />,
      accent: 'accent-teal',
    },
    {
      title: 'Total Revenue',
      value: '₹8.6L',
      subtitle: 'Rolling 30 days',
      icon: <FiDollarSign />,
      accent: 'accent-purple',
    },
    {
      title: 'Active Partners',
      value: '68',
      subtitle: '4 new this week',
      icon: <FiUsers />,
      accent: 'accent-orange',
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-md:gap-4">
      <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5 max-md:grid-cols-1 max-md:gap-4">
        {summaryCards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 max-md:grid-cols-1 max-md:gap-4 max-lg:[&>*:nth-child(3)]:col-span-1 max-lg:[&>*:nth-child(3)]:col-start-auto">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/12 relative">
          <div className="flex items-baseline justify-between mb-4 gap-2">
            <h3 className="m-0 text-lg">Daily Orders Trend</h3>
            <span className="text-slate-500 text-xs">Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={dailyOrders}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6eaf1" />
              <XAxis dataKey="day" tick={{ fill: '#617189' }} />
              <YAxis tick={{ fill: '#617189' }} />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#4D6CFA" strokeWidth={3} dot={{ strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/12 relative">
          <div className="flex items-baseline justify-between mb-4 gap-2">
            <h3 className="m-0 text-lg">Revenue Breakdown by Partner</h3>
            <span className="text-slate-500 text-xs">This month</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueByPartner}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis dataKey="partner" tick={{ fill: '#617189' }} />
              <YAxis tick={{ fill: '#617189' }} tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]} fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/12 relative col-span-2 max-lg:col-span-1">
          <div className="flex items-baseline justify-between mb-4 gap-2">
            <h3 className="m-0 text-lg">Top 5 Delivery Agents</h3>
            <span className="text-slate-500 text-xs">Orders completed</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={topDeliveryAgents}
                dataKey="deliveries"
                nameKey="agent"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
              >
                {topDeliveryAgents.map((entry, index) => (
                  <Cell key={entry.agent} fill={deliveryStatusColors[index % deliveryStatusColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <ul className="list-none grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3 mt-5 p-0">
            {topDeliveryAgents.map((agent, index) => (
              <li key={agent.agent} className="flex items-center gap-2.5 text-sm text-slate-500">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: deliveryStatusColors[index % deliveryStatusColors.length] }}
                />
                <span>{agent.agent}</span>
                <strong>{agent.deliveries}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-slate-200/12 overflow-hidden p-0">
        <div className="p-6 max-md:p-4 border-b border-slate-200 flex items-baseline justify-between gap-2">
          <h3 className="m-0 text-lg max-md:text-base">Live Order Status</h3>
          <span className="text-slate-500 text-xs max-md:hidden">Monitoring delivery SLAs</span>
        </div>
        {/* Desktop Table View */}
        <div className="hidden md:flex flex-col gap-3 p-5 pb-6">
          <div className="grid grid-cols-[repeat(6,minmax(100px,1fr))] items-center gap-3 text-slate-600 text-sm font-semibold uppercase tracking-wide px-4.5 pb-2.5">
            <span>Order ID</span>
            <span>Customer</span>
            <span>Partner</span>
            <span>Status</span>
            <span>Pickup</span>
            <span>ETA</span>
          </div>
          {orders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-[repeat(6,minmax(100px,1fr))] items-center gap-3 px-4.5 py-4 rounded-[10px] bg-indigo-50/3 text-slate-800 [&:nth-of-type(even)]:bg-teal-50/4"
            >
              <span>{order.id}</span>
              <span>{order.customer}</span>
              <span>{order.partner}</span>
              <StatusBadge status={order.status} />
              <span>{new Date(order.pickupTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span>{new Date(order.deliveryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          ))}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col gap-3 p-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-indigo-50/3 rounded-xl p-4 border border-slate-200/20"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">{order.id}</h3>
                  <p className="text-sm text-slate-600">{order.customer}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Partner:</span>
                  <span className="text-slate-800">{order.partner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pickup:</span>
                  <span className="text-slate-800">{new Date(order.pickupTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ETA:</span>
                  <span className="text-slate-800">{new Date(order.deliveryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
