import React, { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
};

type UserProfile = {
  fullName: string;
  username: string;
  phone: string;
};

type AppContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  orders: any[];
  setOrders: React.Dispatch<React.SetStateAction<any[]>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { 
      id: 1, 
      name: 'Merino Wool Crewneck Sweater', 
      category: 'APPAREL', 
      price: 128.00, 
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
      quantity: 3,
      size: 'S',
      color: 'CHARCOAL'
    }
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, cartItems, setCartItems, updateQuantity, removeItem, orders, setOrders }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
