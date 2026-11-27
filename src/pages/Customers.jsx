import { useMemo, useState } from 'react';
import { customers } from '../data/customers.js';
import { orders } from '../data/orders.js';

const Customers = () => {
  const [activeCustomer, setActiveCustomer] = useState(null);

  const customerOrders = useMemo(() => {
    if (!activeCustomer) return [];

    const sourceOrders = orders.filter((o) => o.customer === activeCustomer.name);

    const desiredCount = Math.max(activeCustomer.totalOrders || 0, sourceOrders.length);
    if (sourceOrders.length === 0 || sourceOrders.length >= desiredCount) {
      return sourceOrders;
    }

    const template = sourceOrders[0];
    const generated = [...sourceOrders];

    for (let i = sourceOrders.length; i < desiredCount; i += 1) {
      const pickup = new Date(template.pickupTime);
      const delivery = new Date(template.deliveryTime);
      pickup.setDate(pickup.getDate() - i);
      delivery.setDate(delivery.getDate() - i);

      const clone = {
        ...template,
        id: `${template.id}-H${String(i + 1).padStart(2, '0')}`,
        status: 'Completed',
        pickupTime: pickup.toISOString(),
        deliveryTime: delivery.toISOString(),
        orderSummary: {
          ...template.orderSummary,
          subtotal: (template.orderSummary?.subtotal ?? 0) + (i % 3) * 5,
          deliveryCharges: template.orderSummary?.deliveryCharges ?? 0,
          taxLabel: template.orderSummary?.taxLabel ?? 'GST (18%)',
          taxAmount: (template.orderSummary?.taxAmount ?? 0) + (i % 2) * 2,
          total:
            ((template.orderSummary?.subtotal ?? 0) + (i % 3) * 5) +
            (template.orderSummary?.deliveryCharges ?? 0) +
            ((template.orderSummary?.taxAmount ?? 0) + (i % 2) * 2),
          items: template.orderSummary?.items ?? [],
        },
        totalPrice:
          (((template.orderSummary?.subtotal ?? 0) + (i % 3) * 5) +
            (template.orderSummary?.deliveryCharges ?? 0) +
            ((template.orderSummary?.taxAmount ?? 0) + (i % 2) * 2)),
      };

      generated.push(clone);
    }

    return generated;
  }, [activeCustomer]);

  const formatTime = (dateString) =>
    new Date(dateString).toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div className="flex flex-col gap-6 max-md:gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4 max-md:gap-3">
        <div>
          <h2 className="text-3xl m-0 mb-2 max-md:text-2xl">Customer Directory</h2>
          <p className="m-0 text-slate-500 max-md:text-sm">Understand customer loyalty, order frequency, and satisfaction at a glance.</p>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:flex flex-col gap-3 p-5 pb-6 bg-white rounded-2xl shadow-sm border border-slate-200/10">
        <div className="grid grid-cols-[1.2fr_1.8fr_1.6fr_1.2fr_0.8fr_0.9fr_0.9fr] items-center gap-3 text-slate-600 text-sm font-semibold uppercase tracking-wide px-4.5 pb-2.5">
          <span>Customer</span>
          <span>Address</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Total Orders</span>
          <span>Feedback Score</span>
          <span>Actions</span>
        </div>

        {customers.map((customer) => (
          <div key={customer.id} className="grid grid-cols-[1.2fr_1.8fr_1.6fr_1.2fr_0.8fr_0.9fr_0.9fr] items-center gap-3 px-4.5 py-4 rounded-[10px] bg-indigo-50/3 text-slate-800 [&:nth-of-type(even)]:bg-teal-50/4">
            <span>{customer.name}</span>
            <span>{customer.address}</span>
            <span>{customer.email}</span>
            <span>{customer.phone}</span>
            <span>{customer.totalOrders}</span>
            <span>{customer.feedbackScore.toFixed(1)}</span>
            <button
              type="button"
              className="justify-self-start px-4 py-2 rounded-full bg-indigo-50/14 text-indigo-600 font-semibold hover:bg-indigo-50/20 transition-colors"
              onClick={() => setActiveCustomer(customer)}
            >
              View History
            </button>
          </div>
        ))}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-3">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-2xl shadow-sm border border-slate-200/10 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 mb-1">{customer.name}</h3>
                <p className="text-sm text-slate-500 mb-1">{customer.email}</p>
                <p className="text-sm text-slate-500">{customer.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 mb-1">Score</p>
                <p className="text-lg font-bold text-slate-800">{customer.feedbackScore.toFixed(1)}</p>
              </div>
            </div>
            <div className="space-y-2 mb-3 pt-3 border-t border-slate-200">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Address:</span>
                <span className="text-slate-800 text-right flex-1 ml-2">{customer.address}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total Orders:</span>
                <span className="font-semibold text-slate-800">{customer.totalOrders}</span>
              </div>
            </div>
            <button
              type="button"
              className="w-full px-4 py-2 rounded-full bg-indigo-50/14 text-indigo-600 font-semibold hover:bg-indigo-50/20 transition-colors"
              onClick={() => setActiveCustomer(customer)}
            >
              View History
            </button>
          </div>
        ))}
      </div>

      {activeCustomer && (
        <div className="fixed inset-0 flex items-center justify-center z-[999] max-md:p-4">
          <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm" onClick={() => setActiveCustomer(null)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-[98vw] max-w-[1600px] max-h-[82vh] rounded-2xl bg-white p-6 max-md:p-4 shadow-2xl flex flex-col">
            <button
              type="button"
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/8 text-xl font-bold text-slate-800 hover:bg-slate-900/16 transition-colors"
              onClick={() => setActiveCustomer(null)}
            >
              ×
            </button>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 mb-3 max-md:grid-cols-1">
              <div>
                <h4 className="m-0 mb-2 text-sm tracking-wide uppercase text-slate-500 max-md:text-xs">Customer</h4>
                <p className="m-0 mb-1 text-sm text-slate-800 max-md:text-base font-semibold">{activeCustomer.name}</p>
                <small className="block mt-0.5 text-sm font-semibold text-slate-500 max-md:text-xs">{activeCustomer.email}</small>
                <small className="block mt-0.5 text-sm font-semibold text-slate-500 max-md:text-xs">{activeCustomer.phone}</small>
                <small className="block mt-0.5 text-sm font-semibold text-slate-500 max-md:text-xs">{activeCustomer.address}</small>
              </div>
            </div>

            <div className="max-h-[62vh] max-md:max-h-[70vh] overflow-y-auto pr-1.5 max-md:pr-0">
              <h4 className="m-0 mb-2 text-sm tracking-wide uppercase text-slate-500 max-md:text-xs">Orders</h4>
              <div className="grid grid-cols-[repeat(3,minmax(420px,1fr))] gap-[22px] overflow-x-hidden pb-2 max-md:grid-cols-1 max-md:gap-3">
                {customerOrders.map((o) => (
                  <div key={o.id} className="bg-white border border-slate-200/18 rounded-md p-3.5 max-md:p-3 min-h-0 shadow-sm [&_*]:break-words">
                    <div className="flex w-full justify-between mb-2 max-md:flex-col max-md:gap-1">
                      <strong className="max-md:text-base">{o.id}</strong>
                      <strong className="max-md:text-base">₹{o.totalPrice.toFixed(2)}</strong>
                    </div>
                    <div className="flex gap-1.5 text-slate-500 whitespace-normal flex-wrap max-md:text-xs max-md:gap-1">
                      <span className="break-normal overflow-wrap-normal">{o.partner}</span>
                      <span className="break-normal overflow-wrap-normal">• {o.status}</span>
                      <span className="break-normal overflow-wrap-normal">• Pickup {formatTime(o.pickupTime)}</span>
                      <span className="break-normal overflow-wrap-normal">• Delivery {formatTime(o.deliveryTime)}</span>
                    </div>

                    {o.orderSummary?.items?.map((item) => (
                      <div key={`${o.id}-${item.label}`} className="flex w-full justify-between mt-2 max-md:text-sm">
                        <span>{item.label}</span>
                        <span>₹{item.amount.toFixed(2)}</span>
                      </div>
                    ))}

                    <div className="flex flex-col gap-2 w-full mt-3">
                      <div className="flex justify-between text-sm max-md:text-xs text-slate-500">
                        <span>Items Subtotal</span>
                        <strong className="text-slate-800">₹{(o.orderSummary?.subtotal ?? 0).toFixed(2)}</strong>
                      </div>
                      <div className="flex justify-between text-sm max-md:text-xs text-slate-500">
                        <span>Delivery Charges</span>
                        <strong className="text-slate-800">₹{(o.orderSummary?.deliveryCharges ?? 0).toFixed(2)}</strong>
                      </div>
                      <div className="flex justify-between text-sm max-md:text-xs text-slate-500">
                        <span>{o.orderSummary?.taxLabel}</span>
                        <strong className="text-slate-800">₹{(o.orderSummary?.taxAmount ?? 0).toFixed(2)}</strong>
                      </div>
                      <div className="pt-2 border-t border-slate-300/20 text-base max-md:text-sm font-bold text-slate-800">
                        <span>Grand Total</span>
                        <strong className="ml-auto">₹{(o.orderSummary?.total ?? 0).toFixed(2)}</strong>
                      </div>
                    </div>

                    <div className="w-full mt-1.5">
                      <strong className="text-indigo-600 max-md:text-sm">Feedback</strong>
                      <div className="flex flex-col gap-2 text-slate-800 mt-2 max-md:text-sm">
                        <span className="break-normal overflow-wrap-normal">Rating: {o.feedback?.rating ?? '-'}</span>
                        <span className="block whitespace-normal break-normal overflow-wrap-normal">• {o.feedback?.description ?? 'No feedback yet.'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
