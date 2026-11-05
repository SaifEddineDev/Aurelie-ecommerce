import React, { useState } from 'react';
import { Search, User, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function MainLayout() {
  const { isLoggedIn, setIsLoggedIn, cartItems } = useAppContext();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 flex flex-col">
      {/* Sticky Header Group */}
      <div className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md flex flex-col transition-colors shadow-[0_4px_20px_-15px_rgba(0,0,0,0.05)]">
        {/* Top Banner */}
        <div className="bg-[#faf9f8]/60 py-1.5 text-center text-[10px] sm:text-xs tracking-[0.15em] text-stone-500 uppercase border-b border-stone-200/50">
          Complimentary shipping on orders over $150
        </div>

        {/* Header */}
        <header className="px-6 md:px-12 py-5 md:py-6 flex items-center justify-between border-b border-stone-200/50 bg-transparent relative">
          <div className="w-1/3 flex items-center">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-stone-900 hover:text-stone-500 transition-colors p-2 -ml-2"
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
          
          <div className="w-1/3 text-center flex justify-center">
            <Link to="/">
              <h1 className="font-serif text-2xl md:text-3xl lg:text-[2rem] tracking-[0.1em] font-medium uppercase">
                Aurélie
              </h1>
            </Link>
          </div>
          
          <div className="w-1/3 flex items-center justify-end space-x-2 sm:space-x-4">
            <Link to={isLoggedIn ? "/account" : "/login"} className="text-stone-900 hover:text-stone-500 transition-colors p-2">
              <User className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <Link to="/cart" className="relative text-stone-900 hover:text-stone-500 transition-colors p-2 -mr-2">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {isLoggedIn && cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#a82a2a] text-white text-[9px] font-bold flex items-center justify-center rounded-full pointer-events-none">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </header>

        {/* Search Bar Dropdown */}
        <div 
          className={`w-full bg-[#faf9f8] overflow-hidden transition-all duration-300 ease-in-out border-b border-stone-200/50 ${
            isSearchOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 border-transparent'
          }`}
        >
          <div className="max-w-[800px] mx-auto px-6 py-3.5">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-stone-900 pb-2">
              <Search className="w-4 h-4 text-stone-400 absolute left-0" />
              <input 
                type="text" 
                placeholder="Search the shop..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent pl-8 pr-8 outline-none text-sm placeholder:text-stone-400 text-stone-900 font-medium"
                autoFocus={isSearchOpen}
              />
              <button 
                type="button" 
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-0 text-stone-400 hover:text-stone-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block bg-transparent border-b border-stone-200/50">
          <ul className="flex justify-center space-x-12 py-2.5 text-[11px] tracking-[0.2em] font-medium text-stone-600">
            <li><Link to="/catalog?category=Apparel" className="hover:text-stone-900 transition-colors uppercase">Apparel</Link></li>
            <li><Link to="/catalog?category=Accessories" className="hover:text-stone-900 transition-colors uppercase">Accessories</Link></li>
            <li><Link to={`/catalog?category=${encodeURIComponent('Home & Living')}`} className="hover:text-stone-900 transition-colors uppercase">Home & Living</Link></li>
            <li><Link to="/catalog?category=Stationery" className="hover:text-stone-900 transition-colors uppercase">Stationery</Link></li>
            <li><Link to="/catalog" className="hover:text-stone-900 transition-colors uppercase">All Products</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 lg:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:pr-8">
            <h3 className="font-serif text-2xl font-medium tracking-wide uppercase mb-6">Aurélie</h3>
            <p className="text-stone-500 text-sm leading-relaxed">
              Objects for a considered life. Natural materials, small workshops, and quiet design — chosen slowly, made to last.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] tracking-[0.2em] font-bold text-stone-900 uppercase mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-stone-500">
              <li><Link to="/" className="hover:text-stone-900 transition-colors">Apparel</Link></li>
              <li><Link to="/" className="hover:text-stone-900 transition-colors">Accessories</Link></li>
              <li><Link to="/" className="hover:text-stone-900 transition-colors">Home & Living</Link></li>
              <li><Link to="/" className="hover:text-stone-900 transition-colors">Stationery</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] tracking-[0.2em] font-bold text-stone-900 uppercase mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-stone-500">
              <li><Link to={isLoggedIn ? "/orders" : "/login"} className="hover:text-stone-900 transition-colors">Order History</Link></li>
              <li><Link to={isLoggedIn ? "/account" : "/login"} className="hover:text-stone-900 transition-colors">My Account</Link></li>
              <li><Link to="/cart" className="hover:text-stone-900 transition-colors">Shopping Bag</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] tracking-[0.2em] font-bold text-stone-900 uppercase mb-6">The Dispatch</h4>
            <p className="text-stone-500 text-sm leading-relaxed mb-4">
              New arrivals and studio notes, once a month. No noise.
            </p>
            <form className="flex border border-stone-300">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 text-sm outline-none placeholder:text-stone-400"
                required
              />
              <button 
                type="submit" 
                className="bg-[#111] text-white px-5 hover:bg-black transition-colors flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-[0.1em] text-stone-400 uppercase gap-4">
          <p>© 2024 Aurélie. All rights reserved.</p>
          <p className="tracking-[0.2em]">Issue No. 09 — The Autumn Edit</p>
        </div>
      </footer>
    </div>
  );
}
