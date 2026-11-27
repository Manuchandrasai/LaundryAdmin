import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import StatusBadge from '../components/StatusBadge.jsx';
import { orders } from '../data/orders.js';

const filters = ['All', 'Today', 'Pending', 'Processing', 'Delivering', 'Completed', 'Cancelled'];

const formatTime = (dateString) =>
  new Date(dateString).toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true });

const formatCurrency = (amount) => `₹${amount.toFixed(2)}`;

const Orders = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [galleryOrder, setGalleryOrder] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const filteredOrders = useMemo(() => {
    const today = new Date().toDateString();

    return orders.filter((order) => {
      if (selectedFilter === 'All') {
        return true;
      }

      if (selectedFilter === 'Today') {
        return new Date(order.pickupTime).toDateString() === today;
      }

      return order.status.toLowerCase() === selectedFilter.toLowerCase();
    });
  }, [selectedFilter]);

  const toggleSummary = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const getLimitedPhotos = (order) => {
    const photos = order?.uploadedItems?.photos ?? [];
    const requestedCount = order?.uploadedItems?.count;
    const limit = requestedCount ? Math.min(requestedCount, 10) : 10;
    return photos.slice(0, limit);
  };

  const getPhotoCount = (order) => getLimitedPhotos(order).length;

  const openGallery = (order) => {
    setGalleryOrder(order);
  };

  const closeGallery = () => setGalleryOrder(null);

  const openPhotoPreview = (order, photo) => {
    if (!photo) return;
    setPhotoPreview({ order, photo });
  };

  const closePhotoPreview = () => setPhotoPreview(null);

  return (
    <div className="flex flex-col gap-6 max-md:gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4 max-md:gap-3">
        <div>
          <h2 className="text-3xl m-0 mb-2 max-md:text-2xl">Orders</h2>
          <p className="m-0 text-slate-500 max-md:text-sm">Monitor and manage every order across customers, partners, and delivery agents.</p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-[10px] text-slate-500 shadow-sm">
          <FiFilter />
          <select
            className="border-none outline-none bg-transparent text-inherit font-medium"
            value={selectedFilter}
            onChange={(event) => setSelectedFilter(event.target.value)}
          >
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:flex flex-col gap-3 p-5 pb-6 bg-white rounded-2xl shadow-sm border border-slate-200/10">
        <div className="grid grid-cols-[repeat(9,minmax(100px,1fr))] items-center gap-3 text-slate-600 text-sm font-semibold uppercase tracking-wide px-4.5 pb-2.5">
          <span>Order ID</span>
          <span>Customer</span>
          <span>Service</span>
          <span>Partner</span>
          <span>Pickup</span>
          <span>Delivery</span>
          <span>Status</span>
          <span>Payment</span>
          <span>Total</span>
        </div>

        {filteredOrders.map((order) => (
          <motion.div
            key={order.id}
            className="grid grid-cols-[repeat(9,minmax(100px,1fr))] items-center gap-3 px-4.5 py-3.5 rounded-[10px] bg-indigo-50/3 text-slate-800 [&:nth-of-type(even)]:bg-teal-50/4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span>{order.id}</span>
            <span>{order.customer}</span>
            <span className="flex flex-col gap-2">
              <strong className="text-[15px] text-slate-800">{order.service}</strong>
            </span>
            <span>{order.partner}</span>
            <span>
              <strong>{formatTime(order.pickupTime)}</strong>
            </span>
            <span>
              <strong>{formatTime(order.deliveryTime)}</strong>
            </span>
            <StatusBadge status={order.status} />
            <span>{order.payment}</span>
            <span className="flex flex-col gap-1.5 items-start">
              <span className="text-lg font-bold text-slate-800">{formatCurrency(order.totalPrice)}</span>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-xs text-indigo-600 bg-indigo-50/12 hover:bg-indigo-50/20 transition-colors"
                onClick={() => toggleSummary(order.id)}
              >
                {expandedOrderId === order.id ? 'Hide Summary' : 'View Summary'}
              </button>
            </span>
            <AnimatePresence initial={false}>
              {expandedOrderId === order.id && (
                <motion.div
                  key={`${order.id}-summary`}
                  className="col-span-full -mx-4.5 mb-3 px-4.5 py-4.5 rounded-[10px] border border-indigo-500/16 bg-indigo-50/5 flex flex-col gap-4.5"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
                    <div>
                      <h4 className="m-0 mb-2 text-sm tracking-wide uppercase text-slate-500">Pickup Address</h4>
                      <p className="m-0 mb-1 text-sm text-slate-800">{order.pickupAddress?.street}</p>
                      <small className="m-0 mb-1 block text-sm font-semibold text-slate-500">
                        {[order.pickupAddress?.area, order.pickupAddress?.city].filter(Boolean).join(', ')}
                      </small>
                      <small className="m-0 mb-1 block text-sm font-semibold text-slate-500">
                        {[order.pickupAddress?.state, order.pickupAddress?.postalCode].filter(Boolean).join(', ')}
                      </small>
                      {order.pickupAddress?.landmark && (
                        <small className="m-0 block text-sm font-semibold text-slate-500">{order.pickupAddress.landmark}</small>
                      )}
                    </div>
                    <div>
                      <h4 className="m-0 mb-2 text-sm tracking-wide uppercase text-slate-500">Mobile Number</h4>
                      <p className="m-0 text-sm text-slate-800">{order.mobileNumber}</p>
                    </div>
                    <div>
                      <h4 className="m-0 mb-2 text-sm tracking-wide uppercase text-slate-500">Pickup Agent</h4>
                      <p className="m-0 text-sm text-slate-800">{order.pickupAgent?.name ?? 'Not assigned'}</p>
                      <small className="m-0 block text-sm font-semibold text-slate-500">{order.pickupAgent?.phone}</small>
                    </div>
                    {(order.status?.toLowerCase() === 'completed' || order.status?.toLowerCase() === 'delivering') && (
                      <div>
                        <h4 className="m-0 mb-2 text-sm tracking-wide uppercase text-slate-500">Delivery Agent</h4>
                        <p className="m-0 text-sm text-slate-800">{order.deliveryAgent?.name ?? 'Not assigned'}</p>
                        <small className="m-0 block text-sm font-semibold text-slate-500">{order.deliveryAgent?.phone}</small>
                      </div>
                    )}
                    <div className="flex flex-col gap-3">
                      <h4 className="m-0 mb-2 text-sm tracking-wide uppercase text-slate-500">Uploaded Items</h4>
                      <p className="m-0 font-semibold text-slate-800">{getPhotoCount(order)} photos</p>
                      <div className="flex gap-2 flex-wrap">
                        {getLimitedPhotos(order)
                          .slice(0, 3)
                          .map((photo, index) => (
                            <button
                              type="button"
                              key={`${order.id}-preview-${photo}`}
                              onClick={() => openPhotoPreview(order, photo)}
                              aria-label={`View uploaded item ${index + 1}`}
                              className="border-none p-0 bg-transparent cursor-pointer rounded-[10px] overflow-hidden border border-slate-200/20"
                            >
                              <img src={photo} alt={`Uploaded item ${index + 1}`} className="w-[60px] h-[60px] object-cover block" />
                            </button>
                          ))}
                      </div>
                      <button
                        type="button"
                        className="mt-2.5 px-4 py-2 rounded-full bg-indigo-50/16 text-indigo-600 font-semibold hover:bg-indigo-50/24 transition-colors"
                        onClick={() => openGallery(order)}
                      >
                        View Photos
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-slate-300/30 pt-4 flex flex-col gap-3">
                    <h4 className="col-span-full m-0 mb-2 text-sm tracking-wide uppercase text-slate-500">Order Summary</h4>
                    <ul className="list-none m-0 p-0 flex flex-col gap-2">
                      {order.orderSummary?.items?.map((item) => (
                        <li key={`${order.id}-${item.label}`} className="flex justify-between text-sm text-slate-800">
                          <span>{item.label}</span>
                          <strong>{formatCurrency(item.amount)}</strong>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>Items Subtotal</span>
                        <strong className="text-slate-800">{formatCurrency(order.orderSummary?.subtotal ?? 0)}</strong>
                      </div>
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>Delivery Charges</span>
                        <strong className="text-slate-800">{formatCurrency(order.orderSummary?.deliveryCharges ?? 0)}</strong>
                      </div>
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>{order.orderSummary?.taxLabel}</span>
                        <strong className="text-slate-800">{formatCurrency(order.orderSummary?.taxAmount ?? 0)}</strong>
                      </div>
                      <div className="pt-2 border-t border-slate-300/20 text-base font-bold text-slate-800">
                        <span>Grand Total</span>
                        <strong className="ml-auto">{formatCurrency(order.orderSummary?.total ?? 0)}</strong>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-3">
        {filteredOrders.map((order) => (
          <motion.div
            key={order.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-200/10 p-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-slate-800 mb-1">{order.id}</h3>
                <p className="text-sm text-slate-600">{order.customer}</p>
              </div>
              <StatusBadge status={order.status} />
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Service:</span>
                <span className="font-semibold text-slate-800">{order.service}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Partner:</span>
                <span className="text-slate-800">{order.partner}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Pickup:</span>
                <span className="font-semibold text-slate-800">{formatTime(order.pickupTime)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Delivery:</span>
                <span className="font-semibold text-slate-800">{formatTime(order.deliveryTime)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Payment:</span>
                <span className="text-slate-800">{order.payment}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                <span className="text-slate-500 font-semibold">Total:</span>
                <span className="text-lg font-bold text-slate-800">{formatCurrency(order.totalPrice)}</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full mt-3 px-4 py-2 rounded-xl font-semibold text-sm text-indigo-600 bg-indigo-50/12 hover:bg-indigo-50/20 transition-colors"
              onClick={() => toggleSummary(order.id)}
            >
              {expandedOrderId === order.id ? 'Hide Summary' : 'View Summary'}
            </button>

            <AnimatePresence initial={false}>
              {expandedOrderId === order.id && (
                <motion.div
                  key={`${order.id}-summary-mobile`}
                  className="mt-4 pt-4 border-t border-slate-200 flex flex-col gap-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-semibold uppercase text-slate-500 mb-1">Pickup Address</h4>
                      <p className="text-sm text-slate-800">{order.pickupAddress?.street}</p>
                      <p className="text-xs text-slate-500">
                        {[order.pickupAddress?.area, order.pickupAddress?.city].filter(Boolean).join(', ')}
                      </p>
                      <p className="text-xs text-slate-500">
                        {[order.pickupAddress?.state, order.pickupAddress?.postalCode].filter(Boolean).join(', ')}
                      </p>
                      {order.pickupAddress?.landmark && (
                        <p className="text-xs text-slate-500">{order.pickupAddress.landmark}</p>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase text-slate-500 mb-1">Mobile Number</h4>
                      <p className="text-sm text-slate-800">{order.mobileNumber}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase text-slate-500 mb-1">Pickup Agent</h4>
                      <p className="text-sm text-slate-800">{order.pickupAgent?.name ?? 'Not assigned'}</p>
                      <p className="text-xs text-slate-500">{order.pickupAgent?.phone}</p>
                    </div>
                    {(order.status?.toLowerCase() === 'completed' || order.status?.toLowerCase() === 'delivering') && (
                      <div>
                        <h4 className="text-xs font-semibold uppercase text-slate-500 mb-1">Delivery Agent</h4>
                        <p className="text-sm text-slate-800">{order.deliveryAgent?.name ?? 'Not assigned'}</p>
                        <p className="text-xs text-slate-500">{order.deliveryAgent?.phone}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-semibold uppercase text-slate-500 mb-2">Uploaded Items</h4>
                      <p className="text-sm font-semibold text-slate-800 mb-2">{getPhotoCount(order)} photos</p>
                      <div className="flex gap-2 flex-wrap mb-2">
                        {getLimitedPhotos(order)
                          .slice(0, 3)
                          .map((photo, index) => (
                            <button
                              type="button"
                              key={`${order.id}-preview-${photo}`}
                              onClick={() => openPhotoPreview(order, photo)}
                              aria-label={`View uploaded item ${index + 1}`}
                              className="border-none p-0 bg-transparent cursor-pointer rounded-lg overflow-hidden border border-slate-200/20"
                            >
                              <img src={photo} alt={`Uploaded item ${index + 1}`} className="w-16 h-16 object-cover block" />
                            </button>
                          ))}
                      </div>
                      <button
                        type="button"
                        className="w-full px-4 py-2 rounded-full bg-indigo-50/16 text-indigo-600 font-semibold text-sm hover:bg-indigo-50/24 transition-colors"
                        onClick={() => openGallery(order)}
                      >
                        View Photos
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <h4 className="text-xs font-semibold uppercase text-slate-500 mb-3">Order Summary</h4>
                    <div className="space-y-2 mb-3">
                      {order.orderSummary?.items?.map((item) => (
                        <div key={`${order.id}-${item.label}`} className="flex justify-between text-sm text-slate-800">
                          <span>{item.label}</span>
                          <strong>{formatCurrency(item.amount)}</strong>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>Items Subtotal</span>
                        <strong className="text-slate-800">{formatCurrency(order.orderSummary?.subtotal ?? 0)}</strong>
                      </div>
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>Delivery Charges</span>
                        <strong className="text-slate-800">{formatCurrency(order.orderSummary?.deliveryCharges ?? 0)}</strong>
                      </div>
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>{order.orderSummary?.taxLabel}</span>
                        <strong className="text-slate-800">{formatCurrency(order.orderSummary?.taxAmount ?? 0)}</strong>
                      </div>
                      <div className="flex justify-between text-base font-bold text-slate-800 pt-2 border-t border-slate-200">
                        <span>Grand Total</span>
                        <strong>{formatCurrency(order.orderSummary?.total ?? 0)}</strong>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {galleryOrder && (
        <div className="fixed inset-0 flex items-center justify-center z-[999] max-md:p-4">
          <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm" onClick={closeGallery} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-[640px] max-w-[90%] rounded-2xl bg-white p-6 max-md:p-4 shadow-2xl flex flex-col gap-4">
            <button
              type="button"
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/8 text-xl font-bold text-slate-800 hover:bg-slate-900/16 transition-colors"
              onClick={closeGallery}
            >
              ×
            </button>
            <div className="flex flex-col gap-1 text-sm text-slate-800">
              <span className="font-bold tracking-wider uppercase text-slate-500">Uploaded Items</span>
              <strong>{getPhotoCount(galleryOrder)} photos</strong>
              <small className="text-slate-500">{galleryOrder.customer}</small>
              <small className="text-slate-500">{galleryOrder.id}</small>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 max-md:grid-cols-2 max-md:gap-3">
              {getLimitedPhotos(galleryOrder).map((photo, index) => (
                <figure
                  key={`${galleryOrder.id}-photo-${index}`}
                  className="m-0 flex flex-col gap-2 cursor-pointer"
                  onClick={() => openPhotoPreview(galleryOrder, photo)}
                >
                  <img src={photo} alt={`Uploaded item ${index + 1}`} className="w-full h-40 max-md:h-32 object-cover rounded-[10px] border border-slate-200/20" />
                  <figcaption className="flex flex-col gap-0.5 text-xs text-slate-800">
                    <strong className="tracking-wider uppercase text-slate-500">Item {index + 1}</strong>
                    <span>Tap to preview</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}
      {photoPreview && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] max-md:p-4">
          <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm" onClick={closePhotoPreview} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-[720px] max-w-[92%] rounded-2xl bg-white p-6 max-md:p-4 shadow-2xl flex flex-col gap-4">
            <button
              type="button"
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/8 text-xl font-bold text-slate-800 hover:bg-slate-900/16 transition-colors"
              onClick={closePhotoPreview}
            >
              ×
            </button>
            <img
              src={photoPreview.photo}
              alt="Uploaded laundry item"
              className="w-full h-auto max-h-[70vh] object-contain rounded-xl border border-slate-200/20"
            />
            <div className="flex flex-col gap-1 text-sm text-slate-800">
              <span className="font-bold tracking-wider uppercase text-slate-500">Selected Item</span>
              <small className="text-slate-500">{photoPreview.order?.customer}</small>
              <small className="text-slate-500">{photoPreview.order?.id}</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
