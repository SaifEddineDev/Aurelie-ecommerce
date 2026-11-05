import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { ALL_PRODUCTS } from '../data/products';

const CATEGORIES = ['All Products', 'Apparel', 'Accessories', 'Home & Living', 'Stationery'];
const SORT_OPTIONS = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Name A-Z'];
const PRICE_OPTIONS = [
  { label: 'Up to $50.00', value: 50 },
  { label: 'Up to $100.00', value: 100 },
  { label: 'Up to $150.00', value: 150 },
  { label: 'Any price', value: null }
];

const ITEMS_PER_PAGE = 9;

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Products';
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSort, setActiveSort] = useState('Newest');
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);

  // Sync category and search state with URL if URL changes
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setActiveCategory(urlCategory);
    } else {
      setActiveCategory('All Products');
    }

    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
      setSearchInput(urlSearch);
    }
  }, [searchParams]);

  // Reset to first page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSort, maxPrice, searchQuery]);

  // Derived state: Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    // Search filter
    if (searchQuery.trim() !== '') {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Category filter
    if (activeCategory !== 'All Products') {
      result = result.filter(p => p.category === activeCategory.toUpperCase());
    }

    // Price filter
    if (maxPrice !== null) {
      result = result.filter(p => p.price <= maxPrice);
    }

    // Sorting
    switch (activeSort) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Name A-Z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Newest':
      default:
        // Mocking newest by sorting by ID descending
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [activeCategory, activeSort, maxPrice, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const hasActiveFilters = activeCategory !== 'All Products' || maxPrice !== null || searchQuery !== '' || activeSort !== 'Newest';

  const clearFilters = () => {
    setActiveCategory('All Products');
    setMaxPrice(null);
    setSearchQuery('');
    setSearchInput('');
    setActiveSort('Newest');
    setCurrentPage(1);
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-[#faf9f8]">
      {/* Breadcrumb & Header */}
      <div className="border-b border-stone-200/60 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 md:py-16">
          <p className="text-[10px] tracking-[0.2em] text-stone-400 uppercase mb-4">
            <span className="hover:text-stone-900 cursor-pointer transition-colors">Home</span>
            <span className="mx-2">/</span>
            <span className="text-stone-900">Catalog</span>
          </p>
          <div className="flex justify-between items-end">
            <h1 className="font-serif text-4xl md:text-[44px] text-stone-900">
              The Collection
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16 w-full flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-48 shrink-0 flex flex-col gap-10">
          
          {/* Search */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] font-bold text-stone-900 uppercase mb-4">Search</h4>
            <form onSubmit={handleSearch} className="flex border border-stone-200 focus-within:border-stone-400 transition-colors">
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Find a product..." 
                className="w-full px-3 py-2 text-xs outline-none bg-white placeholder:text-stone-400"
              />
              <button type="submit" className="px-3 text-[10px] tracking-wider uppercase font-bold text-stone-500 hover:text-stone-900 border-l border-stone-200 bg-stone-50 transition-colors">
                Go
              </button>
            </form>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] font-bold text-stone-900 uppercase mb-4">Category</h4>
            <ul className="space-y-3">
              {CATEGORIES.map(category => (
                <li key={category}>
                  <button 
                    onClick={() => setActiveCategory(category)}
                    className={`text-[13px] transition-colors flex items-center justify-between w-full ${
                      activeCategory === category 
                        ? 'text-stone-900 font-medium' 
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    <span>{category}</span>
                    {activeCategory === category && <span className="w-1 h-1 bg-stone-900 rounded-full"></span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] font-bold text-stone-900 uppercase mb-4">Price</h4>
            <ul className="space-y-3">
              {PRICE_OPTIONS.map(option => (
                <li key={option.label}>
                  <button 
                    onClick={() => setMaxPrice(option.value)}
                    className={`text-[13px] transition-colors text-left w-full ${
                      maxPrice === option.value
                        ? 'text-stone-900 font-medium' 
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sort Desktop (Mobile uses dropdown typically, showing list here for design fidelity) */}
          <div className="hidden lg:block">
            <h4 className="text-[10px] tracking-[0.2em] font-bold text-stone-900 uppercase mb-4">Sort</h4>
            <ul className="space-y-3">
              {SORT_OPTIONS.map(sort => (
                <li key={sort}>
                  <button 
                    onClick={() => setActiveSort(sort)}
                    className={`text-[13px] transition-colors text-left w-full flex items-center justify-between ${
                      activeSort === sort 
                        ? 'text-stone-900 font-medium' 
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    <span>{sort}</span>
                    {activeSort === sort && <span className="w-1 h-1 bg-stone-900 rounded-full"></span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {hasActiveFilters && (
            <div className="pt-2 border-t border-stone-200/60 mt-[-10px]">
              <button 
                onClick={clearFilters}
                className="flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-white border border-stone-200 rounded text-sm text-stone-800 hover:bg-stone-50 hover:border-stone-300 transition-colors shadow-sm"
              >
                <X className="w-4 h-4" />
                <span className="font-medium">Clear All Filters</span>
              </button>
            </div>
          )}

        </aside>

        {/* Product Grid Area */}
        <div className="flex-1">
          
          {/* Top Bar (Results count & horizontal sort for desktop) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-stone-200 pb-6 lg:border-none lg:pb-0">
            <p className="text-xs text-stone-500 italic">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} 
              {maxPrice !== null ? ` • Up to $${maxPrice}` : ' • Any price'}
            </p>
            
            <div className="flex gap-4 sm:gap-6 flex-wrap">
              {SORT_OPTIONS.map(sort => (
                <button 
                  key={sort}
                  onClick={() => setActiveSort(sort)}
                  className={`text-[10px] tracking-[0.15em] uppercase transition-all pb-1 border-b whitespace-nowrap ${
                    activeSort === sort 
                      ? 'text-stone-900 font-bold border-stone-900' 
                      : 'text-stone-400 font-medium border-transparent hover:text-stone-700'
                  }`}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>

          {/* Grid or Empty State */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12 mb-16">
              {paginatedProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="group block">
                  <div className="aspect-[4/5] mb-5 overflow-hidden bg-stone-100 relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.2em] text-stone-400 uppercase mb-1.5">{product.category}</p>
                    <h3 className="font-serif text-base text-stone-900 mb-1.5 group-hover:text-stone-600 transition-colors">{product.name}</h3>
                    <p className="text-sm text-stone-500">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border border-dashed border-stone-200">
              <p className="text-stone-500 mb-4">No products match your current filters.</p>
              <button 
                onClick={clearFilters}
                className="text-[11px] tracking-[0.2em] font-bold uppercase text-stone-900 underline underline-offset-4 hover:text-stone-500 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 border-t border-stone-200 pt-10">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-stone-200 text-stone-400 text-xs hover:border-stone-300 transition-colors bg-white disabled:opacity-50 disabled:hover:border-stone-200"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center text-xs font-medium transition-colors ${
                    currentPage === i + 1 
                      ? 'bg-black text-white' 
                      : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-stone-200 text-stone-900 text-xs hover:border-stone-900 transition-colors bg-white disabled:opacity-50 disabled:hover:border-stone-200"
              >
                Next
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
