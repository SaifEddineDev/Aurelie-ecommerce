import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { User, Package, LogOut, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Account() {
  const { isLoggedIn, setIsLoggedIn, user } = useAppContext();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleSignOut = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-[#faf9f8] min-h-[calc(100vh-140px)]">
      <div className="max-w-[740px] mx-auto px-8 py-12 md:py-16 w-full">
        {/* Breadcrumbs */}
        <div className="text-[9px] tracking-[0.2em] font-bold text-stone-400 uppercase mb-6 flex gap-2">
          <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-stone-900">My Account</span>
        </div>

        <h1 className="font-serif text-[32px] text-stone-900 mb-8">My Account</h1>

        {/* Profile Card */}
        <div className="bg-white border border-stone-200 p-6 flex items-center gap-5 mb-6">
          <div className="w-14 h-14 bg-[#f4f4f4] rounded-full flex items-center justify-center text-stone-500 shrink-0">
            <User className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-[15px] font-medium text-stone-900">{user?.fullName || 'Utilisateur'}</h2>
            <p className="text-[13px] text-stone-500">@{user?.username || 'utilisateur'}</p>
          </div>
        </div>

        {/* Profile Details Form */}
        <div className="bg-white border border-stone-200 p-6 md:p-8 mb-6">
          <h3 className="text-[10px] tracking-[0.2em] font-bold text-stone-900 uppercase mb-6">Profile Details</h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] tracking-[0.15em] font-bold text-stone-900 uppercase mb-2">
                Full Name
              </label>
              <input 
                type="text" 
                defaultValue={user?.fullName || ''}
                placeholder="Votre nom complet"
                className="w-full px-4 py-2.5 border border-stone-200 text-sm outline-none focus:border-stone-500 transition-colors rounded-sm text-stone-900 placeholder:text-stone-400"
              />
            </div>
            
            <div>
              <label className="block text-[10px] tracking-[0.15em] font-bold text-stone-900 uppercase mb-2">
                Phone
              </label>
              <input 
                type="tel" 
                defaultValue={user?.phone || ''}
                placeholder="+33 6 00 00 00 00"
                className="w-full px-4 py-2.5 border border-stone-200 text-sm outline-none focus:border-stone-500 transition-colors rounded-sm text-stone-900 placeholder:text-stone-400"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button className="bg-[#111] text-white text-[11px] tracking-[0.1em] font-bold uppercase px-6 py-3 rounded-sm hover:bg-black transition-colors">
                Save Changes
              </button>
              <Link 
                to="/orders"
                className="bg-[#f4f4f4] text-stone-900 text-[13px] font-medium px-4 py-3 rounded-sm hover:bg-[#eaeaec] transition-colors flex items-center gap-2"
              >
                <Package className="w-4 h-4" strokeWidth={1.5} />
                Order History
              </Link>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="mb-12">
          <button 
            onClick={handleSignOut}
            className="bg-white border border-stone-200 text-stone-900 text-[13px] font-medium px-4 py-2.5 rounded-sm hover:bg-stone-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
            Sign Out
          </button>
        </div>

        {/* Contact text */}
        <div className="text-[11px] text-stone-500 flex items-center gap-1">
          Need to reach us? Write to studio@aurelie.example — we answer within one business day. 
          <ArrowRight className="w-3 h-3 ml-1" />
        </div>
      </div>
    </div>
  );
}
