import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function OrderHistory() {
  const { isLoggedIn, orders } = useAppContext();
  const navigate = useNavigate();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex-1 flex flex-col w-full bg-white min-h-[calc(100vh-140px)]">
      <div className="max-w-[1000px] mx-auto px-6 py-12 md:py-16 w-full">
        {/* Breadcrumbs */}
        <div className="text-[9px] tracking-[0.2em] font-bold text-stone-400 uppercase mb-6 flex gap-2">
          <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-stone-900">Order History</span>
        </div>

        <h1 className="font-serif text-[32px] text-stone-900 mb-8">Order History</h1>

        {orders.length === 0 ? (
          /* Empty State */
          <div className="border border-stone-200 py-24 flex flex-col items-center justify-center bg-white mb-16">
            <div className="w-12 h-12 flex items-center justify-center border-2 border-stone-400 rounded-lg mb-4">
              <Package className="w-6 h-6 text-stone-600" strokeWidth={2} />
            </div>
            <h2 className="font-serif text-xl text-stone-900 mb-2">No orders yet</h2>
            <p className="text-stone-500 text-[13px] mb-8">When you place your first order, it will appear here.</p>
            <Link to="/catalog" className="bg-[#111] text-white text-[13px] font-bold tracking-[0.05em] px-8 py-3.5 rounded-sm hover:bg-black transition-colors">
              Browse the Collection
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order) => {
              const isExpanded = expandedOrder === order.id;
              const itemCount = order.items.reduce((sum: number, item: any) => sum + item.quantity, 0);

              return (
                <div key={order.id} className="bg-white border border-stone-200">
                  {/* Header (Clickable) */}
                  <button 
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    className="w-full px-6 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left hover:bg-stone-50/50 transition-colors"
                  >
                    <div>
                      <div className="font-serif text-[17px] text-stone-900 mb-1">{order.id}</div>
                      <div className="text-[13px] text-stone-500">
                        {order.date} · {itemCount} {itemCount === 1 ? 'item' : 'items'}
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="bg-[#f4f4f4] text-stone-900 text-[10px] font-bold tracking-[0.1em] px-2.5 py-1.5 rounded-sm uppercase">
                        {order.status}
                      </span>
                      <span className="font-medium text-stone-900">${order.total.toFixed(2)}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-stone-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-stone-200">
                      {/* Items */}
                      <div className="px-6 py-6 border-b border-stone-100 space-y-4">
                        {order.items.map((item: any) => (
                          <div key={item.id} className="flex gap-4 items-center">
                            <img src={item.image} alt={item.name} className="w-14 h-16 bg-stone-100 object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start gap-4 mb-0.5">
                                <h4 className="text-[14px] text-stone-900 truncate">{item.name}</h4>
                                <span className="text-[13px] text-stone-900 shrink-0">${item.price.toFixed(2)}</span>
                              </div>
                              <p className="text-[10px] text-stone-500 uppercase tracking-[0.1em] mb-1">
                                {item.size} · {item.color}
                              </p>
                              <p className="text-[11px] text-stone-500">
                                {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer Actions */}
                      <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="text-[12px] text-stone-500 truncate">
                          {order.shippingAddress.fullName}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/order-confirmation', { state: { order } });
                          }}
                          className="bg-white border border-stone-200 text-stone-900 text-[11px] font-bold tracking-[0.05em] px-4 py-2 rounded-sm hover:bg-stone-50 transition-colors shrink-0"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
