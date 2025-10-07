import { createContext, useContext, useState, useEffect } from "react";

const LocalContext = createContext()

export const LocalContextProvider = ({children}) => {
    const [detail, setDetail] = useState(() => {
        const storedDetail = localStorage.getItem("detail")
        return storedDetail ? JSON.parse(storedDetail) : { cart: [], order: [] }
    })

    useEffect(() => {
        localStorage.setItem("detail", JSON.stringify(detail)) 
    }, [detail])

    const addToCart = (product) => {
        setDetail((prev) => {
            const existingItem = prev.cart.find(item => item.id === product.id)
            
            if (existingItem) {
                return {
                    ...prev,
                    cart: prev.cart.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                }
            } else {
                return {
                    ...prev,
                    cart: [...prev.cart, { ...product, quantity: 1 }]
                }
            }
        })
    }

    const removeFromCart = (id) => {
        setDetail((prev) => ({
            ...prev,
            cart: prev.cart.filter((item) => item.id !== id)
        }))
    }

    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id)
            return
        }
        
        setDetail((prev) => ({
            ...prev,
            cart: prev.cart.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        }))
    }

    const increaseQuantity = (id) => {
        setDetail((prev) => ({
            ...prev,
            cart: prev.cart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        }))
    }

    const decreaseQuantity = (id) => {
        setDetail((prev) => ({
            ...prev,
            cart: prev.cart.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0)
        }))
    }

    const clearCart = () => {
        setDetail((prev) => ({
            ...prev,
            cart: []
        }))
    }

    const addOrder = (orderData) => {
        const newOrder = {
            id: Date.now(), 
            items: [...detail.cart],
            total: calculateTotal(),
            date: new Date().toISOString(),
            ...orderData 
        }
        
        setDetail((prev) => ({
            cart: [],
            order: [...prev.order, newOrder]
        }))
    }

    const calculateTotal = () => {
        return detail.cart.reduce((total, item) => {
            return total + (item.price * item.quantity)
        }, 0)
    }

    const getCartCount = () => {
        return detail.cart.reduce((count, item) => count + item.quantity, 0)
    }

    const isInCart = (id) => {
        return detail.cart.some(item => item.id === id)
    }

    const getItemQuantity = (id) => {
        const item = detail.cart.find(item => item.id === id)
        return item ? item.quantity : 0
    }

    const value = {
        detail,
        cart: detail.cart,
        orders: detail.order,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        addOrder,
        calculateTotal,
        getCartCount,
        isInCart,
        getItemQuantity
    }

    return (
        <LocalContext.Provider value={value}>
            {children}
        </LocalContext.Provider>
    )
}

export const useLocalStorage = () => {
    const context = useContext(LocalContext)
    if (!context) {
        throw new Error('useLocalStorage must be used within LocalContextProvider')
    }
    return context
}