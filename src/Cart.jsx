import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, removeCart } from './store';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);



  const [couponCode, setCouponCode] = useState('');
  const [couponDiscountPercentage,setCouponDiscountPercentage] = useState(0);
  const handleApplyCoupon = () => {
    switch (couponCode){
        case 'Deepu10':
            setCouponDiscountPercentage(10);
            break;
        case 'Deepu20':
            setCouponDiscountPercentage(20);
            break;
        case 'Deepu30':
            setCouponDiscountPercentage(20);
            break;
        default:
            alert('Invalid coupon code');
            setCouponDiscountPercentage(0);
    }
  };


  // State to store the discount percentage
  const [discount, setDiscount] = useState(0);

  // Function to calculate all totals (original, discounted, and savings)
  const calculateTotals = () => {
    const originalTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountedTotal = originalTotal - (originalTotal * discount) / 100;
    const couponAmount = originalTotal*(couponDiscountPercentage/100);
    const savings = originalTotal - discountedTotal;
    return {
      originalTotal: originalTotal.toFixed(2),
      discountedTotal: discountedTotal.toFixed(2),
      couponAmount: couponAmount.toFixed(2),
      savings: savings.toFixed(2),
    };
  };

  // Destructure the totals from calculateTotals
  const { originalTotal, discountedTotal, savings } = calculateTotals();

  // Handle discount button clicks
  const applyDiscount = (percent) => {
    setDiscount(percent);
  };



  // Handle coupon code application
  const applyCoupon = () => {
    if (couponCode === "Deepu10") {
      setDiscount(50);
      alert("Coupon applied! You get 50% off.");
    } else {
      alert("Invalid coupon code.");
    }
  };

  const items = cartItems.length > 0 ? (
    <ul>
      {cartItems.map((item, index) => (
        <li key={index}>
          {item.name} - ${item.price.toFixed(2)} - {item.quantity}
          <button style={{ marginRight: '10px' }} onClick={() => dispatch(increment(item.name))}>+</button>
          <button style={{ marginRight: '10px' }} onClick={() => dispatch(decrement(item.name))}>-</button>
          <button onClick={() => dispatch(removeCart(item.name))}>Remove</button>
        </li>
      ))}
    </ul>
  ) : (
    <p>There are no items in the cart.</p>
  );

  return (
    <>
      <h3>Cart Items</h3>
      {items}


      <h4>Total bill before discount: ${originalTotal}</h4>
    
      <button style={{ marginRight: '10px' }} onClick={() => applyDiscount(10)}>Apply Discount 10%</button>
      <button style={{ marginRight: '10px' }} onClick={() => applyDiscount(20)}>Apply Discount 20%</button>
      <button onClick={() => applyDiscount(30)}>Apply Discount 30%</button>

      {/* Coupon code input */}
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"     //make the text files
          placeholder="Enter coupon code"   
          value={couponCode}   //to maintain the value
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button style={{ marginRight: '10px' }} onClick={applyCoupon}>Apply Coupon</button>
      </div>

      
     
      
      <p>Discount percentage Applied: {discount}%</p>
      <p> Discount Amount ${savings}</p>
      <h4>Final Bill After Discount: ${discountedTotal}</h4>
    </>
  );
}

export default Cart;