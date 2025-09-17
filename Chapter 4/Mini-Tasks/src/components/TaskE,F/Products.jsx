
import React, { memo, useCallback } from 'react'
import { useCartData, useCartUI } from '../../contexts/CartContext'

const ProductItem = memo(({ product, onAddToCart }) => {
  console.log('ProductItem rendered:', product.name); // For DevTools debugging
  
  return (
    <div className="p-3 gap-24 text-xl flex justify-between">
      <span>{product.name}</span>
      <button
        className="bg-blue-500 text-white text-sm px-2 py-1 rounded"
        onClick={() => onAddToCart(product.id)}
      >
        Add to Cart ({product.stockQuantity} left)
      </button>
    </div>
  );
});

const Products = memo(() => {
  console.log('Products component rendered'); // For DevTools debugging
  
  const { productList, addToCart } = useCartData()
  const { setIsOpen } = useCartUI()
  
  const handleAddToCart = useCallback((productId) => {
    addToCart(productId);
    setIsOpen(true); // Open cart when item is added
  }, [addToCart, setIsOpen]);

  return (
    <div>
      <div className='mb-5'>Products</div>
      {productList.map((product) => (
        <ProductItem 
          key={product.id} 
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  )
});

export default Products



// import React from 'react'
// import { useCart } from '../../contexts/CartContext'

// const Products = () => {

//   console.log('🔄 PRODUCTS COMPONENT RE-RENDERED'); 
//   const {productList, addToCart} = useCart()
  

    
//   return (
//     <div>
//       <div className='mb-5 '>
//         Products 
//       </div>
//       {productList.map((item) => (
//         <div key={item.id} className="p-3 gap-24 text-xl flex justify-between">
//           <span>
//             <div>{item.name}</div>
//             <div className='flex gap-2 items-center'>

//             <div>Stock: {item.stockQuantity}</div>
//             <div className='text-gray-500 text-sm'>${item.price}</div>
//             </div>
//           </span>
//           <button
//             className="bg-blue-500 text-white text-sm px-2 h-fit py-1 rounded"
//             onClick={() => addToCart(item.id)}
//           >
//             Add to Cart
//           </button>
          
//         </div>
//       ))}
//     </div>

//   )
// }

// export default Products