import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";

function Veg() {
    const dispatch = useDispatch();

    // Safely accessing veg products
    const vegProducts = useSelector(state => state.products?.veg || []); 

    // If vegProducts is empty, we can show a message
    const items = vegProducts.map((product, index) => (
        <li key={index}>
            {product.name} - ${product.price.toFixed(2)}
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        </li>
    ));

    return (
        <> 
            <h1>Veg Products</h1>
            <ul>
                {items.length > 0 ? items : <li>No products available</li>}
            </ul>
        </>
    );
}

export default Veg;
