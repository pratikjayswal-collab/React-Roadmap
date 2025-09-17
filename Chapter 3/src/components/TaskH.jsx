import React from 'react'
import { useCart } from '../context/CartContext';

const products = [
  { id: 1, name: "Laptop", price: 60000 },
  { id: 2, name: "Headphones", price: 3000 },
  { id: 3, name: "Keyboard", price: 1500 }
]

const TaskH = () => {
  const { state, dispatch } = useCart();

  return (
    <div>
      <div className="max-w-md mx-auto mt-8 p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

        <h3 className="text-lg font-semibold mb-2">Products</h3>
        {products.map((product) => (
          <div key={product.id} className="flex justify-between items-center mb-2">
            <span>
              {product.name} - ₹{product.price}
            </span>
            <button
              onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
        ))}

        <h3 className="mt-4 text-lg font-semibold">Your Cart</h3>
        {state.cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            <ul className="mb-3">
              {state.cart.map((item, index) => (
                <li
                  key={`${item.id}-${index}`}
                  className="flex justify-between items-center mb-1"
                >
                  {item.name} - ₹{item.price}
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_ITEM", payload: item.id })
                    }
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => dispatch({ type: "CLEAR_CART" })}
              className="px-4 py-2 bg-gray-600 text-white rounded"
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskH;
