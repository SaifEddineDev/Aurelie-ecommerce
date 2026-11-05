import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Checkout() {
  const { isLoggedIn, user, cartItems, setCartItems, setOrders } = useAppContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (cartItems.length === 0 && !isSubmitting) {
    return <Navigate to="/cart" replace />;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal; // Shipping is due on delivery based on the design

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    const orderData = {
      id: `AUR-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: [...cartItems],
      total: subtotal,
      shippingAddress: {
        fullName: formData.get('fullName'),
        street: formData.get('street'),
        city: formData.get('city'),
        postalCode: formData.get('postalCode'),
        country: formData.get('country'),
        phone: formData.get('phone')
      },
      status: 'PENDING'
    };

    setOrders(prev => [orderData, ...prev]);
    setCartItems([]);
    navigate('/order-confirmation', { state: { order: orderData } });
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-white min-h-[calc(100vh-140px)]">
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16 w-full flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column - Form */}
        <div className="flex-1">
          <h1 className="font-serif text-[40px] text-stone-900 mb-12">Checkout</h1>
          
          <h2 className="text-[10px] tracking-[0.2em] font-bold text-stone-900 uppercase mb-8">Shipping Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] tracking-[0.15em] font-bold text-stone-900 uppercase mb-2">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                defaultValue={user?.fullName || ''} 
                required 
                className="w-full px-4 py-3 border border-stone-200 text-sm outline-none focus:border-stone-500 transition-colors rounded-sm text-stone-900 bg-transparent" 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] tracking-[0.15em] font-bold text-stone-900 uppercase mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="jane@example.com" 
                  required 
                  className="w-full px-4 py-3 border border-stone-200 text-sm outline-none focus:border-stone-500 transition-colors rounded-sm text-stone-900 bg-transparent placeholder:text-stone-400" 
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] font-bold text-stone-900 uppercase mb-2">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="+1 555 000 0000" 
                  className="w-full px-4 py-3 border border-stone-200 text-sm outline-none focus:border-stone-500 transition-colors rounded-sm text-stone-900 bg-transparent placeholder:text-stone-400" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] font-bold text-stone-900 uppercase mb-2">Street Address</label>
              <input 
                type="text" 
                name="street"
                placeholder="12 Rue de la Paix" 
                required 
                className="w-full px-4 py-3 border border-stone-200 text-sm outline-none focus:border-stone-500 transition-colors rounded-sm text-stone-900 bg-transparent placeholder:text-stone-400" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] tracking-[0.15em] font-bold text-stone-900 uppercase mb-2">City</label>
                <input 
                  type="text" 
                  name="city"
                  placeholder="Paris" 
                  required 
                  className="w-full px-4 py-3 border border-stone-200 text-sm outline-none focus:border-stone-500 transition-colors rounded-sm text-stone-900 bg-transparent placeholder:text-stone-400" 
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] font-bold text-stone-900 uppercase mb-2">Postal Code</label>
                <input 
                  type="text" 
                  name="postalCode"
                  placeholder="75002" 
                  required 
                  className="w-full px-4 py-3 border border-stone-200 text-sm outline-none focus:border-stone-500 transition-colors rounded-sm text-stone-900 bg-transparent placeholder:text-stone-400" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] font-bold text-stone-900 uppercase mb-2">Country</label>
              <input 
                type="text" 
                name="country"
                placeholder="France" 
                required 
                className="w-full px-4 py-3 border border-stone-200 text-sm outline-none focus:border-stone-500 transition-colors rounded-sm text-stone-900 bg-transparent placeholder:text-stone-400" 
              />
            </div>

            <div className="pt-6">
              <button type="submit" className="w-full bg-[#111] text-white text-[11px] tracking-[0.2em] font-bold uppercase py-4 rounded-sm hover:bg-black transition-colors flex items-center justify-center gap-3 group">
                Place Order
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] text-stone-500 mt-4">
                Payment is collected on delivery for this release — no card required today.
              </p>
            </div>
          </form>
        </div>

        {/* Right Column - Order Summary */}
        <div className="w-full lg:w-[420px] shrink-0 mt-20 lg:mt-[88px]">
          <h2 className="text-[10px] tracking-[0.2em] font-bold text-stone-900 uppercase mb-8">Order Summary</h2>
          
          <div className="border-t border-b border-stone-200 py-6 mb-6">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-stone-100 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-serif text-[15px] text-stone-900 leading-tight pr-4">{item.name}</h4>
                      <span className="text-[13px] text-stone-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <p className="text-[10px] tracking-[0.1em] text-stone-500 uppercase mb-1">
                      {item.size} · {item.color}
                    </p>
                    <p className="text-[12px] text-stone-500">Qty {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 mb-6 text-[13px]">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span className="text-stone-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Shipping</span>
              <span className="text-stone-900">Due on delivery</span>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-6 mb-8 flex justify-between items-center">
            <span className="font-serif text-[19px] text-stone-900">Total</span>
            <span className="text-[17px] font-bold text-stone-900">${total.toFixed(2)}</span>
          </div>

          <div className="space-y-3 text-[11px] text-stone-500">
            <div className="flex items-center gap-3">
              <Check className="w-3.5 h-3.5 text-[#a82a2a]" strokeWidth={2.5} />
              <span>30-day returns, no questions asked</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-3.5 h-3.5 text-[#a82a2a]" strokeWidth={2.5} />
              <span>Eco-friendly studio packaging</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-3.5 h-3.5 text-[#a82a2a]" strokeWidth={2.5} />
              <span>Order confirmation sent by email</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
