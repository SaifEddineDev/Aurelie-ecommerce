import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_PRODUCTS } from '../data/products';

export default function Home() {
  const categories = [
    { name: 'Apparel', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop' },
    { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop' },
    { name: 'Stationery', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop' }
  ];

  const featuredProducts = ALL_PRODUCTS.slice(0, 8);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row min-h-[85vh]">
        {/* Left Content */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 lg:py-0 bg-white order-2 lg:order-1">
          <div className="max-w-xl mx-auto lg:mx-0 w-full">
            <p className="text-[11px] tracking-[0.2em] text-stone-500 uppercase mb-8 font-medium">
              Issue No. 09 — The Autumn Edit
            </p>
            
            <h2 className="font-serif text-[44px] sm:text-6xl lg:text-[72px] leading-[1.05] tracking-tight mb-8 text-stone-900">
              Objects for a <br className="hidden sm:block" />
              considered life.
            </h2>
            
            <p className="text-stone-500 leading-[1.8] mb-10 text-[15px] sm:text-base max-w-[420px]">
              We work with small workshops and honest materials — merino wool,
              full-grain leather, stoneware and linen. Everything here is chosen
              slowly and made to last.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog" className="bg-[#111] text-white px-8 py-4 text-[11px] tracking-[0.2em] font-bold uppercase flex items-center justify-center hover:bg-black transition-colors min-w-[200px]">
                Shop the edit
                <ArrowRight className="w-4 h-4 ml-3" strokeWidth={2} />
              </Link>
              <Link to="/catalog?category=Apparel" className="bg-[#f4f4f4] text-stone-900 px-8 py-4 text-[11px] tracking-[0.2em] font-bold uppercase flex items-center justify-center hover:bg-[#eaeaec] transition-colors min-w-[200px]">
                New in apparel
              </Link>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-[45%] relative h-[50vh] lg:h-auto bg-[#eaddd7] order-1 lg:order-2">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" 
            alt="Minimalist clothing rack with neutral tones"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto w-full border-t border-stone-100">
        <div className="flex justify-between items-end mb-10 md:mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900">Shop by Category</h2>
          <Link to="/catalog" className="hidden sm:flex text-[10px] tracking-[0.2em] font-bold uppercase text-stone-500 hover:text-stone-900 transition-colors items-center">
            View All <ArrowRight className="w-3 h-3 ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link to={`/catalog?category=${encodeURIComponent(category.name)}`} key={category.name} className="group block">
              <div className="aspect-square mb-6 overflow-hidden bg-stone-100">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <h3 className="font-serif text-xl text-stone-900 group-hover:text-stone-600 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* The Edit - Featured */}
      <section className="w-full bg-[#faf9f8] border-t border-stone-100">
        <div className="py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
          <div className="flex justify-between items-end mb-10 md:mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900">The Edit — Featured</h2>
            <Link to="/catalog" className="hidden sm:flex text-[10px] tracking-[0.2em] font-bold uppercase text-stone-500 hover:text-stone-900 transition-colors items-center">
              All Products <ArrowRight className="w-3 h-3 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
            {featuredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group block">
                <div className="aspect-[4/5] mb-6 overflow-hidden bg-stone-100 relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-stone-500 uppercase mb-2">{product.category}</p>
                  <h3 className="font-serif text-lg text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">{product.name}</h3>
                  <p className="text-sm text-stone-600">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-[#f4f4f4] py-32 px-6 text-center flex flex-col items-center justify-center border-t border-stone-200">
        <p className="text-[10px] tracking-[0.2em] text-stone-500 uppercase mb-8 font-bold">
          From the studio
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight max-w-3xl mx-auto text-stone-900 mb-8 italic">
          "Buy less, choose well, make it last. Quality is never out of fashion."
        </h2>
        <div className="flex items-center text-[10px] tracking-[0.2em] text-stone-500 uppercase">
          <span className="w-8 h-px bg-stone-300 mr-4"></span>
          Our making philosophy
        </div>
      </section>
    </div>
  );
}
