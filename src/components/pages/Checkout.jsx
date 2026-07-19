import React, { useEffect, useState } from "react";
import { api } from "../../api";

function Checkout() {
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
    return (
        <div>
            <h1>Checkout Page</h1>
            <div className="row">
                <div className="col">
                    <h3>Address</h3>
                </div>
                <div className="col">
                    <h3>Product Summary</h3>
                    {/* Summary Table */}
                    <table class="table table-bordered border-dark m-3 p-3">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>

                        {cartItems? 
                       cartItems.map((item)=> <tr>
                                <th scope="row">{item.product.name}</th>
                                <td>{item.product.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.product.price*item.quantity}</td>
                            </tr>) : 
                        <p>No Products</p> }
                        </tbody>
                        <tfoot>
                            <tr><h4>Total:{getTotal()}</h4></tr>
                        </tfoot>
                    </table>
                    {/* Table Ended */}
                </div>
            </div>
        </div>
    )
}

export default Checkout