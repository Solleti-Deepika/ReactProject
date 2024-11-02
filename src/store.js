import { configureStore, createSlice } from "@reduxjs/toolkit";

// Products slice
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        veg: [
            { name: 'Tomato', price: 200.5 },
            { name: 'Potato', price: 100.8 }
        ],
        nonveg: [
            { name: 'Chicken', price: 800.0 },
            { name: 'Fish', price: 1000.0 }
        ],
    },
    reducers: {}
});

// Cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.find(item => item.name === action.payload.name);
            if (existingItem) {
                existingItem.quantity += 1; // Increment quantity if item exists
            } else {
                state.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
            }
        },
        increment: (state, action) => {
            const item = state.find(item => item.name === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrement: (state, action) => {
            const item = state.find(item => item.name === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    return state.filter(item => item.name !== action.payload);
                }
            }
        },
        removeCart: (state, action) => {
            return state.filter(item => item.name !== action.payload);
        }
    }
});

// Export actions
export const { addToCart, increment, decrement, removeCart } = cartSlice.actions;

// Create store
const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        cart: cartSlice.reducer,
    }
});

export default store;
