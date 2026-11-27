import { useState } from 'react';
import { deliveryAgents } from '../data/deliveryAgents.js';
import StatusBadge from '../components/StatusBadge.jsx';
import GoogleMap from '../components/GoogleMap.jsx';

const Delivery = () => {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [docViewer, setDocViewer] = useState({ url: null, label: '' });

  return (
    <div className="flex flex-col gap-6 max-md:gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4 max-md:gap-3">
        <div>
          <h2 className="text-3xl m-0 mb-2 max-md:text-2xl">Delivery Control Center</h2>
          <p className="m-0 text-slate-500 max-md:text-sm">Live delivery operations overview with geospatial visibility coming soon.</p>
        </div>
      </div>

      <div className="bg-white/90 rounded-2xl border border-slate-200 shadow-sm p-4 max-md:p-2">
        <GoogleMap />
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:flex flex-col gap-3 p-5 pb-6 bg-white rounded-2xl shadow-sm border border-slate-200/10">
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_0.8fr] items-center gap-3 text-slate-600 text-sm font-semibold uppercase tracking-wide px-4.5 pb-2.5">
          <span>Agent</span>
          <span>Status</span>
          <span>Orders Completed</span>
          <span>Rating</span>
          <span>Details</span>
        </div>

        {deliveryAgents.map((agent) => (
          <div key={agent.id} className="grid grid-cols-[1.6fr_1fr_1fr_1fr_0.8fr] items-center gap-3 px-4.5 py-4 rounded-[10px] bg-indigo-50/3 text-slate-800 [&:nth-of-type(even)]:bg-teal-50/4">
            <span>
              <div className="inline-flex items-center gap-2.5">
                <img
                  className="w-9 h-9 rounded-full object-cover border border-slate-200/20 cursor-pointer"
                  src={agent.photo}
                  alt={agent.name}
                  onClick={() => setDocViewer({ url: agent.photo, label: `${agent.name} • Profile Photo` })}
                />
                <span className="font-semibold text-slate-800">{agent.name}</span>
              </div>
            </span>
            <StatusBadge status={agent.status} />
            <span>{agent.ordersCompleted}</span>
            <span>{agent.rating.toFixed(1)}</span>
            <button
              type="button"
              className="px-4 py-2 rounded-full font-semibold bg-teal-50/16 text-teal-700 hover:bg-teal-50/24 transition-colors"
              onClick={() => setSelectedAgent(agent)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-3">
        {deliveryAgents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-2xl shadow-sm border border-slate-200/10 p-4">
            <div className="flex items-center gap-3 mb-3">
              <img
                className="w-12 h-12 rounded-full object-cover border border-slate-200/20 cursor-pointer"
                src={agent.photo}
                alt={agent.name}
                onClick={() => setDocViewer({ url: agent.photo, label: `${agent.name} • Profile Photo` })}
              />
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 mb-1">{agent.name}</h3>
                <StatusBadge status={agent.status} />
              </div>
            </div>
            <div className="space-y-2 mb-3 pt-3 border-t border-slate-200">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Orders Completed:</span>
                <span className="font-semibold text-slate-800">{agent.ordersCompleted}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Rating:</span>
                <span className="font-semibold text-slate-800">{agent.rating.toFixed(1)}</span>
              </div>
            </div>
            <button
              type="button"
              className="w-full px-4 py-2 rounded-full font-semibold bg-teal-50/16 text-teal-700 hover:bg-teal-50/24 transition-colors"
              onClick={() => setSelectedAgent(agent)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      {selectedAgent && (
        <div className="fixed inset-0 flex items-center justify-center z-[999] max-md:p-4">
          <div
            className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm"
            onClick={() => setSelectedAgent(null)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-[720px] max-w-[92%] rounded-2xl bg-white p-6 max-md:p-4 shadow-2xl flex flex-col gap-4">
            <button
              type="button"
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/8 text-xl font-bold text-slate-800 hover:bg-slate-900/16 transition-colors"
              onClick={() => setSelectedAgent(null)}
            >
              ×
            </button>
            <div className="inline-flex items-center gap-2.5 mb-3">
              <img
                className="w-14 h-14 rounded-full object-cover border border-slate-200/20 cursor-pointer"
                src={selectedAgent.photo}
                alt={selectedAgent.name}
                onClick={() =>
                  setDocViewer({ url: selectedAgent.photo, label: `${selectedAgent.name} • Profile Photo` })
                }
              />
              <div className="flex flex-col">
                <strong className="font-semibold text-slate-800">{selectedAgent.name}</strong>
                <small className="text-slate-500">
                  Orders: {selectedAgent.ordersCompleted} • Rating: {selectedAgent.rating.toFixed(1)}
                </small>
              </div>
            </div>
            <div className="border-t border-dashed border-slate-300/30 pt-4 flex flex-col gap-3">
              <h4 className="m-0 mb-2 text-sm tracking-wide uppercase text-slate-500">Required Documents</h4>
              <ul className="list-none m-0 p-0 flex flex-col gap-2">
                {[
                  { key: 'aadhaar', label: 'Aadhaar Card / Government ID Proof' },
                  { key: 'pan', label: 'PAN Card' },
                  { key: 'dl', label: 'Driving License (for bike/scooter)' },
                  { key: 'rc', label: 'Vehicle RC (Registration Certificate)' },
                  { key: 'bank', label: 'Bank Account Details (Passbook/Cancelled Cheque)' },
                  { key: 'insurance', label: 'Vehicle Insurance' },
                ].map((item) => {
                  const doc = selectedAgent.documents?.[item.key];
                  const number = doc?.number;
                  const url = doc?.url;
                  return (
                    <li key={item.key} className="flex items-center justify-between gap-3">
                      <div className="flex items-baseline gap-1.5 flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                        <span className="whitespace-nowrap">{item.label}</span>
                        {number && <strong className="whitespace-nowrap"> — {number}</strong>}
                      </div>
                      <div className="flex justify-end min-w-[64px]">
                        {url && (
                          <button
                            type="button"
                            className="px-3 py-1.5 rounded-full bg-indigo-50/16 text-indigo-600 font-semibold hover:bg-indigo-50/24 transition-colors"
                            onClick={() => setDocViewer({ url, label: item.label })}
                          >
                            View
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
      {docViewer.url && (
        <div className="fixed inset-0 flex items-center justify-center z-[999] max-md:p-4">
          <div
            className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm"
            onClick={() => setDocViewer({ url: null, label: '' })}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-[720px] max-w-[92%] rounded-2xl bg-white p-6 max-md:p-4 shadow-2xl flex flex-col gap-4">
            <button
              type="button"
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/8 text-xl font-bold text-slate-800 hover:bg-slate-900/16 transition-colors"
              onClick={() => setDocViewer({ url: null, label: '' })}
            >
              ×
            </button>
            <h4 className="mt-0 mb-2 text-slate-800">{docViewer.label}</h4>
            {docViewer.url.toLowerCase().endsWith('.pdf') ? (
              <iframe
                title="Document"
                src={docViewer.url}
                className="w-full h-[420px] border border-slate-200/20 rounded-lg"
              />
            ) : (
              <img
                src={docViewer.url}
                alt={docViewer.label}
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl border border-slate-200/20"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Delivery;
