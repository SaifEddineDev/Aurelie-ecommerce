import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Cart() {
  const { isLoggedIn, cartItems, updateQuantity, removeItem } = useAppContext();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  // State 1: Not logged in
  if (!isLoggedIn) {
    return (
      <div className="flex-1 flex w-full bg-[#faf9f8] min-h-[calc(100vh-140px)] items-center justify-center">
        <div className="py-32 text-center flex flex-col items-center">
          <h2 className="font-serif text-[32px] text-stone-900 mb-3">Your Shopping Bag</h2>
          <p className="text-stone-500 mb-8 text-[15px]">Sign in to view the items saved in your bag and continue to checkout.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              to="/login"
              className="bg-[#111] text-white text-[13px] font-medium px-8 py-3.5 rounded-sm hover:bg-black transition-colors min-w-[140px]"
            >
              Sign In
            </Link>
            <Link 
              to="/catalog"
              className="bg-[#f4f4f4] text-stone-900 text-[13px] font-medium px-8 py-3.5 rounded-sm hover:bg-[#eaeaec] transition-colors min-w-[140px]"
            >
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // State 2: Logged in, empty bag
  if (cartItems.length === 0) {
    return (
      <div className="flex-1 flex w-full bg-[#faf9f8] min-h-[calc(100vh-140px)]">
        <div className="max-w-[1000px] mx-auto px-6 py-16 md:py-24 w-full">
          <h1 className="font-serif text-[32px] text-stone-900 mb-8">Your Shopping Bag</h1>
          <div className="border border-stone-200 py-24 flex flex-col items-center justify-center bg-white">
            <div className="w-12 h-12 flex items-center justify-center border-2 border-stone-400 rounded-lg mb-4">
               <ShoppingBag className="w-6 h-6 text-stone-600" strokeWidth={2} />
            </div>
            <h2 className="font-serif text-xl text-stone-900 mb-2">Your bag is empty</h2>
            <p className="text-stone-500 text-[13px] mb-8">Looks like you haven't added anything yet. The collection awaits.</p>
            <Link to="/catalog" className="bg-[#111] text-white text-[13px] font-bold tracking-[0.05em] px-8 py-3.5 rounded-sm hover:bg-black transition-colors">
              Browse the Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // State 3: Logged in, has items
  return (
    <div className="flex-1 flex flex-col w-full bg-[#faf9f8] min-h-[calc(100vh-140px)]">
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 w-full">
        <h1 className="font-serif text-[32px] text-stone-900 mb-8">Your Shopping Bag</h1>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Cart Items List */}
          <div className="flex-1 border-t border-stone-200">
            <div className="divide-y divide-stone-200">
              {cartItems.map(item => (
                <div key={item.id} className="py-8 flex gap-6 sm:gap-8 items-start relative">
                  
                  {/* Product Info */}
                  <Link to="/catalog" className="w-24 sm:w-32 aspect-[4/5] shrink-0 bg-stone-100 overflow-hidden block">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </Link>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-serif text-[17px] text-stone-900 leading-snug pr-8">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-stone-400 hover:text-stone-900 transition-colors absolute right-0 top-8"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <p className="text-[11px] tracking-[0.1em] text-stone-500 uppercase mb-1">
                      {item.size} · {item.color}
                    </p>
                    <p className="text-[13px] text-stone-500 mb-6">${item.price.toFixed(2)} each</p>

                    <div className="flex justify-between items-end mt-auto">
                      <div className="flex items-center border border-stone-200 bg-white">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-[13px] font-medium text-stone-900">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <span className="text-[15px] text-stone-900 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-8">
               <Link to="/catalog" className="inline-block bg-[#f4f4f4] text-stone-900 text-[13px] font-medium px-6 py-3 rounded-sm hover:bg-[#eaeaec] transition-colors">
                 Continue Shopping
               </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white p-8 border border-stone-200">
              <h2 className="text-[11px] tracking-[0.2em] font-bold text-stone-900 uppercase mb-8">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-6 pb-6 border-b border-stone-200">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-[17px] font-serif text-stone-900">Total</span>
                <span className="text-[17px] font-bold text-stone-900">${total.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="w-full bg-[#111] text-white text-[11px] tracking-[0.2em] font-bold uppercase py-4 rounded-sm hover:bg-black transition-colors flex items-center justify-center gap-3 group">
                Proceed to Checkout
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="mt-8 text-center text-[11px] text-stone-500 space-y-2">
                <p>Complimentary shipping on orders over $150.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
