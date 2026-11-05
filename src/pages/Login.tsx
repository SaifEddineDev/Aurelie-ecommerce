import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAppContext();

  // High-quality aesthetic Unsplash images to match the vibe
  const loginImage = "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1200&auto=format&fit=crop"; 
  const registerImage = "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1200&auto=format&fit=crop";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const username = (formData.get('username') as string) || 'utilisateur';
    
    // Get full name if provided (during Create Account)
    let fullName = formData.get('fullName') as string;
    if (!fullName) {
      // Fallback for Sign In since the field doesn't exist
      fullName = isLogin ? username : '';
    }
    
    setUser({ fullName, username, phone: '' });
    setIsLoggedIn(true);
    navigate('/account');
  };

  return (
    <div className="flex-1 flex w-full bg-white min-h-[calc(100vh-140px)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full min-h-[calc(100vh-140px)]">
        
        {/* Left Side - Image panel (Hidden on small screens) */}
        <div className="hidden lg:block relative w-full h-full bg-stone-100 overflow-hidden">
          <img 
            src={isLogin ? loginImage : registerImage} 
            alt={isLogin ? "Leather accessories flatlay" : "Folded sweaters stack"} 
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000"
          />
          {/* Overlay matching the design */}
          <div className="absolute inset-0 bg-black/20 transition-colors duration-1000"></div>
          <div className="absolute bottom-16 left-16 right-16 text-white drop-shadow-sm">
            <p className="text-[11px] tracking-[0.2em] font-bold uppercase mb-4 text-white/90">
              {isLogin ? "Issue No. 09" : "The Autumn Edit"}
            </p>
            <h2 className="font-serif text-4xl leading-tight max-w-md">
              {isLogin 
                ? "Quiet design, honest materials — welcome back to AURÉLIE." 
                : "Join us — for considered pieces, first."}
            </h2>
          </div>
        </div>

        {/* Right Side - Form panel */}
        <div className="w-full flex flex-col justify-center px-10 py-14 md:px-16 lg:px-24">
          <div className="w-full max-w-[420px] mx-auto lg:mx-0">
            <div className="mb-10">
              <h1 className="font-serif text-[32px] text-stone-900 mb-3">
                {isLogin ? 'Sign In' : 'Create Account'}
              </h1>
              <p className="text-stone-500 text-sm">
                {isLogin 
                  ? 'Access your bag, orders, and saved details.' 
                  : 'Faster checkout, order tracking, and first word on new arrivals.'}
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className="block text-[10px] tracking-[0.15em] font-bold text-stone-900 uppercase mb-2">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    name="fullName"
                    className="w-full px-4 py-3.5 border border-stone-200 text-sm outline-none focus:border-stone-500 transition-colors rounded-sm placeholder:text-stone-400"
                    placeholder="Jane Doe"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-[10px] tracking-[0.15em] font-bold text-stone-900 uppercase mb-2">
                  Username
                </label>
                <input 
                  type="text" 
                  name="username"
                  className="w-full px-4 py-3.5 border border-stone-200 text-sm outline-none focus:border-stone-500 transition-colors rounded-sm placeholder:text-stone-400"
                  placeholder={isLogin ? "your_username" : "letters, digits and _ only"}
                />
              </div>

              {isLogin ? (
                <div>
                  <label className="block text-[10px] tracking-[0.15em] font-bold text-stone-900 uppercase mb-2">
                    Password
                  </label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3.5 border border-stone-200 text-sm outline-none focus:border-stone-500 transition-colors rounded-sm placeholder:text-stone-400"
                    placeholder="••••••••"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] font-bold text-stone-900 uppercase mb-2">
                      Password
                    </label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-3.5 border border-stone-200 text-sm outline-none focus:border-stone-500 transition-colors rounded-sm placeholder:text-stone-400"
                      placeholder="Min. 6 characters"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] font-bold text-stone-900 uppercase mb-2">
                      Confirm
                    </label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-3.5 border border-stone-200 text-sm outline-none focus:border-stone-500 transition-colors rounded-sm placeholder:text-stone-400"
                      placeholder="Repeat password"
                    />
                  </div>
                </div>
              )}

              {/* Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="mt-1 flex-shrink-0 w-4 h-4 border-stone-300 rounded-sm text-stone-900 focus:ring-stone-900 cursor-pointer accent-stone-900"
                />
                <label htmlFor="terms" className="text-sm text-stone-600 leading-tight pt-0.5">
                  I have read and agree to the <a href="#" className="text-stone-900 underline underline-offset-4 hover:text-stone-600 transition-colors">User Agreement</a> and <a href="#" className="text-stone-900 underline underline-offset-4 hover:text-stone-600 transition-colors">Privacy Policy</a>.
                </label>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-[#111] text-white text-[11px] tracking-[0.2em] font-bold uppercase py-4 rounded-sm hover:bg-black transition-colors flex items-center justify-center gap-3 group"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

            <div className="mt-12 text-sm text-stone-500">
              {isLogin ? "New to AURÉLIE? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-stone-900 font-bold underline underline-offset-4 hover:text-stone-600 transition-colors"
              >
                {isLogin ? 'Create an account' : 'Sign in'}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
