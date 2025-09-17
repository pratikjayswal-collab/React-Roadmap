import React, { memo, useCallback } from "react";
import { ShoppingCart } from "lucide-react"
import { useCartData, useCartUI } from "../../contexts/CartContext";

const CartItem = memo(({ item, productStock, onAdd, onRemove }) => {
  console.log('CartItem rendered:', item.name); // For DevTools debugging
  
  return (
    <div className="flex justify-between items-center px-4 py-2 border-b">
      <div className="flex-1">
        <div className="font-medium">{item.name}</div>
        <div className="text-sm text-gray-600">${item.price} each</div>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onRemove(item.id)} 
          className="bg-blue-700 rounded-full text-white w-6 h-6 flex items-center justify-center text-sm"
        >
          -
        </button>
        
        <span className="min-w-[20px] text-center">{item.stockQuantity}</span>
        
        {productStock > 0 ? (
          <button 
            onClick={() => onAdd(item.id)} 
            className="bg-blue-700 rounded-full text-white w-6 h-6 flex items-center justify-center text-sm"
          >
            +
          </button>
        ) : (
          <button 
            className="bg-blue-300 rounded-full text-white w-6 h-6 flex items-center justify-center text-sm cursor-not-allowed"
          >
            +
          </button>
        )}
        
        <div className="min-w-[60px] text-right font-medium">
          ${(item.price * item.stockQuantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
});

const CartSummary = memo(({ cartItemCount, cartTotal, onEmptyCart }) => {
  console.log('CartSummary rendered'); // For DevTools debugging
  
  if (cartItemCount === 0) return null;

  return (
    <div className="border-t p-4 space-y-3">
      <div className="flex justify-between text-sm">
        <span>Total Items:</span>
        <span>{cartItemCount}</span>
      </div>
      <div className="flex justify-between text-lg font-semibold">
        <span>Cart Total:</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>
      <button 
        onClick={onEmptyCart} 
        className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 mt-2 transition"
      >
        Empty Cart
      </button>
    </div>
  );
});

const Cart = memo(() => {
  console.log('Cart component rendered'); // For DevTools debugging
  
  const { productList, cart, addToCart, removeItem, emptyCart, cartTotal, cartItemCount } = useCartData()
  const { isOpen, toggleCart } = useCartUI()

  const handleAddToCart = useCallback((productId) => {
    addToCart(productId);
  }, [addToCart]);

  const handleRemoveItem = useCallback((productId) => {
    removeItem(productId);
  }, [removeItem]);

  const handleEmptyCart = useCallback(() => {
    emptyCart();
  }, [emptyCart]);

  return (
    <div className="">
      <button
        onClick={toggleCart}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <ShoppingCart size={28} />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          onClick={toggleCart}
          className="fixed inset-0 bg-black/40"
        />
      )}

      <div
        className={`fixed flex flex-col top-0 right-0 h-full w-[40vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={toggleCart} className="text-gray-500 hover:text-gray-800">
            ✕
          </button>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              Your cart is empty
            </div>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                productStock={productList[item.id - 1].stockQuantity}
                onAdd={handleAddToCart}
                onRemove={handleRemoveItem}
              />
            ))
          )}
        </div>

        <CartSummary
          cartItemCount={cartItemCount}
          cartTotal={cartTotal}
          onEmptyCart={handleEmptyCart}
        />
      </div>
    </div>
  )
});

export default Cart


// import React, { useState, useEffect } from "react";
// import { ShoppingCart } from "lucide-react"
// import { useCart } from "../../contexts/CartContext";

// const Cart = () => {
//   console.log('🔄 CART COMPONENT RE-RENDERED');
//   const { productList, cart, addToCart, removeItem,emptyCart, cartTotal, cartItemCount, isOpen, setIsOpen } = useCart()

//   const toggleCart = () => {
//     setIsOpen(!isOpen)
//   };


//   return (
//     <div className="">
//       <button
//         onClick={toggleCart}
//         className="p-2 rounded-full hover:bg-gray-200 transition"
//       >
//         <ShoppingCart size={28} />
//       </button>

//       {isOpen && (
//         <div
//           onClick={toggleCart}
//           className="fixed inset-0 bg-black/40 "
//         />
//       )}

//       <div
//   className={`fixed flex flex-col top-0 right-0 h-full w-[30vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out 
//   ${isOpen ? "translate-x-0" : "translate-x-full"}`}
// >
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-lg font-semibold">Your Cart</h2>
//           <button onClick={toggleCart} className="text-gray-500 hover:text-gray-800">
//             ✕
//           </button>
//         </div>

//         <div className="flex-1 p-4 space-y-4 overflow-y-auto">
//   {cart.length === 0 ? (
//     <div className="text-center text-gray-500 mt-8">
//       Your cart is empty
//     </div>
//   ) : (
//     cart.map((item) => (
//       <div className="flex justify-between items-center px-4 py-2 border-b" key={item.id}>
//         <div className="flex-1">
//           <div className="font-medium">{item.name}</div>
//           <div className="text-sm text-gray-600">${item.price} each</div>
//         </div>
        
//         <div className="flex items-center gap-3">
//           <button 
//             onClick={() => removeItem(item.id)} 
//             className="bg-blue-700 rounded-full text-white w-6 h-6 flex items-center justify-center text-sm"
//           >
//             -
//           </button>
          
//           <span className="min-w-[20px] text-center">{item.stockQuantity}</span>
          
//           {productList[item.id - 1].stockQuantity > 0 ? (
//             <button 
//               onClick={() => addToCart(item.id)} 
//               className="bg-blue-700 rounded-full text-white w-6 h-6 flex items-center justify-center text-sm"
//             >
//               +
//             </button>
//           ) : (
//             <button 
//               className="bg-blue-300 rounded-full text-white w-6 h-6 flex items-center justify-center text-sm cursor-not-allowed"
//             >
//               +
//             </button>
//           )}
          
//           <div className="min-w-[60px] text-right font-medium">
//             ${(item.price * item.stockQuantity).toFixed(2)}
//           </div>
//         </div>
//       </div>
//     ))
//   )}
// </div>

// {cartItemCount > 0 && (
//   <div className="border-t p-4 space-y-3">
//     <div className="flex justify-between text-sm">
//       <span>Total Items:</span>
//       <span>{cartItemCount}</span>
//     </div>
//     <div className="flex justify-between text-lg font-semibold">
//       <span>Cart Total:</span>
//       <span>${cartTotal.toFixed(2)}</span>
//     </div>
//     <button 
//       onClick={() => emptyCart()} 
//       className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 mt-2 transition"
//     >
//       Empty Cart
//     </button>
//   </div>
// )}
        
//       </div>
//     </div>
//   )
// }

// export default Cart