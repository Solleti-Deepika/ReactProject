import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from './store';

function NonVeg() {
    const dispatch = useDispatch();

    // Correctly accessing nonveg products
    const nonvegProducts = useSelector(state => state.products?.nonveg || []); 

    // Check if nonvegProducts is defined and has items
    if (!Array.isArray(nonvegProducts)) {
        return <div>Error: Products are not available.</div>; // Fallback message
    }

    const items = nonvegProducts.map((product, index) => (
        <li key={index}>
            {product.name} - ${product.price.toFixed(2)}
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        </li>
    ));

    return (
        <> 
            <h1>Non-Veg Products</h1>
            <ul>
                {items.length > 0 ? items : <li>No products available</li>}
            </ul>
        </>
    );
}

export default NonVeg;
