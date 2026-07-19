import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { Link } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    try {
      const response = await api.get("/cart");
      setCartItems(response.data.cartItems);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  const deleteCartItem=async(cartItemId)=>{
   try {
   const response= await api.delete(`/cart/${cartItemId}`);
   console.log(response);
   getCartItems();
   } catch (error) {
    alert("Something Went Wrong")
   }
  };

  return (
    <div className="container mt-4">
      <h1>Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="card mb-3 p-3 d-flex flex-row align-items-center"
            >
              <img
                src={`http://localhost:8080/products/get-image/${item.product.id}`}
                alt={item.product.name}
                width="100"
                height="100"
                className="me-3"
              />

              <div className="flex-grow-1">
                <h5>{item.product.name}</h5>
                <p>{item.product.description}</p>
                <p>Price: ₹{item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>

              <div>
                <strong>₹{item.product.price * item.quantity}</strong>
              </div>

              <button 
              className="btn btn-danger mx-2"
               onClick={()=>deleteCartItem(item.id)}>
                Delete</button>
            </div>
          ))}

          <h3>Total: ₹{getTotal()}</h3>

          <Link className="btn btn-primary mx-2" to={"/checkout"}>Checkout</Link>
        </>
      )}
    </div>
  );
}

export default Cart;