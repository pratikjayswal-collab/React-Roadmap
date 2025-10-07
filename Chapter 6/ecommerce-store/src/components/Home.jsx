import React, { useEffect, useState, useMemo} from 'react'
import { useProduct } from '../contexts/ProductContext'
import ProductCard from './productCard'
import { Search, SlidersHorizontal } from 'lucide-react'

const Home = () => {
  const { data, loading } = useProduct()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity })
  const [showFilters, setShowFilters] = useState(false)

  const categories = useMemo(() => {
    if (!data) {
      return []
    }

    const cats = [...new Set(data.map((item)=> item.category))]
    return cats
  }, [data])

   const actualPriceRange = useMemo(() => {
    if (!data || data.length === 0 ) {
      return { min: 0, max: 1000 }
    }

    const prices = data.map(item => item.price)
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    }
   }, [data])


   const filteredAndSortedProducts = useMemo(() => {
    if (!data) return []

    let filtered = [...data]

    if(searchTerm){
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) 
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item=>item.category === selectedCategory)
    }

    filtered = filtered.filter(item =>
      item.price >= priceRange.min && item.price <= priceRange.max
    )

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a,b) => a.price - b.price)
        break
        
        case 'price-desc':
        filtered.sort((a,b) => b.price - a.price)
        break

        case 'name-asc':
        filtered.sort((a,b) => a.title.localeCompare(b.title))
        break
    case 'name-desc':
        filtered.sort((a,b) => b.title.localeCompare(a.title))
        break
    
      default:
        break;
    }

    return filtered


   }, [data, searchTerm, selectedCategory, priceRange, sortBy])
   
   useEffect(() => {
     if(data && data.length > 0){
      setPriceRange({min: actualPriceRange.min, max: actualPriceRange.max})
     }
   }, [data, actualPriceRange])
   
   const handleReset = () => {
     setSearchTerm('')
     setSelectedCategory('all')
     setPriceRange({ min: actualPriceRange.min, max: actualPriceRange.max })
     setSortBy('default')
   }
   
   if (loading) {
    return (
      <div className='h-screen text-center mt-[20vh] font-bold text-2xl text-blue-500'>
        Loading...
      </div>
    )
  }

  return (
    <>
      <div className='container mx-auto px-4'>
        <div className='sticky top-0 bg-white rounded-2xl z-10 py-4 shadow-sm mb-6'>

          <div className='mb-4'>
          <div className='relative max-w-2xl mx-auto'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
            <input 
            type="text"
            placeholder='Search Products...'
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
             />
          </div>
          </div>

          <div className='flex justify-center mb-4'>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className='flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
          >
            <SlidersHorizontal size={20} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

{showFilters && (
          <div className='bg-gray-50 p-4 rounded-lg'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='all'>All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='default'>Default</option>
                  <option value='price-asc'>Price: Low to High</option>
                  <option value='price-desc'>Price: High to Low</option>
                  <option value='name-asc'>Name: A to Z</option>
                  <option value='name-desc'>Name: Z to A</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Price Range: ${priceRange.min} - ${priceRange.max}
                </label>
                <div className='flex gap-2'>
                  <input
                    type='number'
                    placeholder='Min'
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className='w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <input
                    type='number'
                    placeholder='Max'
                    value={priceRange.max === Infinity ? '' : priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value ? Number(e.target.value) : Infinity }))}
                    className='w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
            </div>

            <div className='mt-4 text-center'>
              <button
                onClick={handleReset}
                className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
        <div className='text-center text-gray-600 mt-4'>
          Showing {filteredAndSortedProducts.length} of {data.length} products
        </div>
        </div>
        {filteredAndSortedProducts.length === 0 ? (
        <div className='text-center py-20'>
          <p className='text-xl text-gray-500'>No products found matching your criteria</p>
          <button
            onClick={handleReset}
            className='mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-5 pb-10'>
          {filteredAndSortedProducts.map((item) => (
            <div key={item.id}>
              <ProductCard data={item} />
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  )
}

export default Home
