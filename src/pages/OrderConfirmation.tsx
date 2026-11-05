import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

export default function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex-1 flex flex-col w-full bg-white min-h-[calc(100vh-140px)]">
      <div className="max-w-[800px] mx-auto px-6 py-16 md:py-24 w-full">
        
        {/* Header / Success message */}
        <div className="text-center mb-12">
          <div className="w-14 h-14 rounded-full border-2 border-[#a82a2a] flex items-center justify-center mx-auto mb-6">
            <Check className="text-[#a82a2a] w-7 h-7" strokeWidth={2.5} />
          </div>
          <p className="text-[10px] tracking-[0.2em] font-bold text-stone-500 uppercase mb-3">
            Thank You
          </p>
          <h1 className="font-serif text-[40px] text-stone-900 mb-4">
            Your order is confirmed
          </h1>
          <p className="text-[13px] text-stone-600">
            A confirmation has been noted for order <strong className="text-stone-900">{order.id}</strong>. We'll be in touch when it ships.
          </p>
        </div>

        {/* Order Card */}
        <div className="bg-white border border-stone-200">
          
          {/* Card Header */}
          <div className="p-6 md:p-8 border-b border-stone-200 flex flex-col md:flex-row justify-between md:items-start gap-4">
            <div>
              <div className="text-[9px] tracking-[0.2em] font-bold text-stone-400 uppercase mb-2">Order Number</div>
              <div className="font-serif text-[17px] text-stone-900">{order.id}</div>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-stone-500">{order.date}</span>
              <span className="bg-[#f4f4f4] text-stone-900 font-bold tracking-[0.1em] px-2.5 py-1.5 rounded-sm uppercase">Pending</span>
            </div>
          </div>

          {/* Card Items */}
          <div className="p-6 md:p-8 border-b border-stone-200 space-y-6">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex gap-4 md:gap-6 items-center">
                <img src={item.image} alt={item.name} className="w-16 h-20 bg-stone-100 object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <h4 className="font-serif text-[15px] text-stone-900 truncate">{item.name}</h4>
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

          {/* Card Footer */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between gap-8 md:gap-12">
            <div className="flex-1">
              <div className="text-[9px] tracking-[0.2em] font-bold text-stone-400 uppercase mb-4">Shipping To</div>
              <div className="text-[13px] text-stone-900 leading-relaxed">
                {order.shippingAddress.fullName}<br/>
                {order.shippingAddress.street}<br/>
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br/>
                {order.shippingAddress.country}<br/>
                {order.shippingAddress.phone}
              </div>
            </div>
            <div className="w-full md:w-64 text-left md:text-right">
              <div className="flex justify-between md:justify-end items-end gap-6 mb-2">
                <span className="text-[13px] text-stone-600 pb-1">Total</span>
                <span className="font-serif text-[22px] text-stone-900">${order.total.toFixed(2)}</span>
              </div>
              <div className="text-[11px] text-stone-500">Shipping due on delivery</div>
            </div>
          </div>

        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link to="/orders" className="bg-[#111] text-white text-[11px] tracking-[0.1em] font-bold uppercase px-8 py-4 hover:bg-black transition-colors flex items-center justify-center gap-2 rounded-sm">
            View Order History
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link to="/catalog" className="bg-[#f4f4f4] text-stone-900 text-[11px] tracking-[0.1em] font-bold uppercase px-8 py-4 hover:bg-[#eaeaec] transition-colors rounded-sm flex items-center justify-center">
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}
