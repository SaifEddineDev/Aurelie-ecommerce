import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Minus, Plus } from 'lucide-react';
import { ALL_PRODUCTS } from '../data/products';
import { useAppContext } from '../context/AppContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCartItems } = useAppContext();
  
  const product = ALL_PRODUCTS.find(p => p.id === Number(id));
  
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedVariant(product.variants?.[0] || '');
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [id, product]);

  // Dummy related products
  const relatedProducts = ALL_PRODUCTS.filter(p => p.id !== Number(id)).slice(0, 3);

  if (!product) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <p className="text-stone-500">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Determine size and color based on variant format
    const hasSizeAndColor = selectedVariant.includes(' - ');
    const size = hasSizeAndColor ? selectedVariant.split(' - ')[0].trim() : 'Standard';
    const color = hasSizeAndColor ? selectedVariant.split(' - ')[1].trim() : selectedVariant;

    // Basic Add to Cart logic
    const newItem = {
      id: Date.now(), // Unique ID for cart item
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: size,
      color: color
    };
    
    setCartItems(prev => [...prev, newItem]);
    navigate('/cart');
  };

  const variants = product.variants || [];

  return (
    <div className="flex-1 flex flex-col w-full bg-white">
      {/* Main Product Area */}
      <div className="max-w-[1200px] mx-auto w-full px-6 py-12 md:py-16">
        
        {/* Breadcrumbs */}
        <div className="text-[9px] tracking-[0.2em] font-bold text-stone-400 uppercase mb-8 flex gap-2">
          <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-stone-900 transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-stone-900">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          
          {/* Left Column - Images */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/5] bg-stone-100 mb-4 overflow-hidden">
              <img 
                src={product.additionalImages ? product.additionalImages[activeImageIndex] : product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {(product.additionalImages || [product.image]).map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-20 h-24 p-0.5 relative overflow-hidden bg-stone-100 transition-all shrink-0 ${
                    activeImageIndex === index 
                      ? 'border border-stone-900 opacity-100' 
                      : 'border border-transparent hover:border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="w-full lg:w-1/2 lg:pt-8">
            <p className="text-[10px] tracking-[0.2em] font-bold text-stone-500 uppercase mb-3">
              {product.category}
            </p>
            <h1 className="font-serif text-[32px] md:text-[40px] text-stone-900 mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-[15px] font-medium text-stone-900 mb-8">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-[14px] leading-[1.8] text-stone-600 mb-12 max-w-[90%]">
              {product.description}
            </p>

            {/* Options */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] tracking-[0.2em] font-bold text-stone-900 uppercase">Options</span>
                <span className="text-[11px] text-stone-400">8 in stock</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {variants.map(variant => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 text-[11px] font-medium tracking-[0.05em] border transition-colors ${
                      selectedVariant === variant 
                        ? 'border-stone-900 bg-[#111] text-white' 
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center border border-stone-200 w-32 shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-[52px] flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="flex-1 text-center text-[13px] font-medium text-stone-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-[52px] flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#111] text-white text-[11px] tracking-[0.2em] font-bold uppercase h-[52px] flex items-center justify-center hover:bg-black transition-colors rounded-sm"
              >
                Add to Bag
              </button>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-stone-600 mb-10">
              <Check className="w-3.5 h-3.5 text-[#a82a2a]" strokeWidth={2.5} />
              <span>In stock and ready to ship within 2 business days.</span>
            </div>

            <hr className="border-stone-100 mb-6" />

            <div className="space-y-2 text-[10px] text-stone-500">
              <p>Complimentary shipping on orders over $150</p>
              <p>30-day returns, no questions asked</p>
              <p>Ships from our studio in eco-friendly packaging</p>
            </div>

          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <div className="border-t border-stone-100 bg-[#faf9f8] mt-16">
        <div className="max-w-[1200px] mx-auto px-6 py-20 w-full">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-serif text-[28px] text-stone-900">You May Also Like</h2>
            <Link to="/catalog" className="hidden sm:flex text-[9px] tracking-[0.2em] font-bold uppercase text-stone-500 hover:text-stone-900 transition-colors items-center">
              More <ArrowRight className="w-3 h-3 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map(relProduct => (
              <Link to={`/product/${relProduct.id}`} key={relProduct.id} className="group block">
                <div className="aspect-[4/5] mb-6 overflow-hidden bg-stone-100 relative">
                  <img 
                    src={relProduct.image} 
                    alt={relProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] text-stone-500 uppercase mb-2">{relProduct.category}</p>
                  <h3 className="font-serif text-[16px] text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">{relProduct.name}</h3>
                  <p className="text-[13px] text-stone-900">${relProduct.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
