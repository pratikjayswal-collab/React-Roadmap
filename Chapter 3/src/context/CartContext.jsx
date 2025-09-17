import React, {createContext, useReducer, useContext, Children} from "react";

const CartContext = createContext()

const cartReducer = (state, action) => {
    switch(action.type){
        case "ADD_ITEM" :
            return {...state, cart:[...state.cart, action.payload]}
        case "REMOVE_ITEM":
            return {...state, cart: state.cart.filter((item)=> item.id !== action.payload)}
        case "CLEAR_CART":
            return {...state, cart:[]}
        default:
            return state
    }
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, {cart:[]})

    return(
        <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)