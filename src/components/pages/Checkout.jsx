import React, { useEffect, useState } from "react";
import { api } from "../../api";

function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const [addresses, setAddresses] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);

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
        getAddresses();
    }, []);

    const getTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0,
        );
    };

    const getAddresses = async () => {

        try {
            const response = await api.get("/address")
            setAddresses(response.data);
        } catch (error) {
            alert("Something Went Wrong")
        }
    };

    const handlePayment = async () => {

        try {
          const response=await  api.post(`/payment/create-order/${selectedAddress}`)
          console.log(response)

            var options = {
            "key": "rzp_test_S060WMnc2eFoWe", // Enter the Key ID generated from the Dashboard
            "amount": response.data.amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Acme Corp",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response) {
                
                try {
                  const paymentResponse=await  api.post("/payment/verify",{
                        razorpayOrderId:response.razorpay_order_id,
                        razorpayPaymentId:response.razorpay_payment_id,
                        razorpaySignature:response.razorpay_signature,
                        addressId:selectedAddress
                    })

                    console.log(paymentResponse)

                    if(paymentResponse.data)
                        alert("Payment Succesfull")
                } catch (error) {
                    alert("Something Went Wrong")
                }

            },
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        const rzp1 = new Razorpay(options);
rzp1.open();
        } catch (error) {
            
        }
      
    }
    return (
        <div>
            <h1>Checkout Page</h1>
            <div className="row">
                <div className="col">
                    <h3>Address</h3>
                    <h5>Selected Address Id : {selectedAddress} </h5>
                    {addresses ? (
                        addresses.map((a) => <div class="form-check m-4 p-3 border border-dark">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                value={a.id}
                                onChange={(e) => setSelectedAddress(e.target.value)}
                            />

                            <label class="form-check-label" for="flexRadioDefault1">
                                <p>{a.fullName} {a.id}</p>
                                <p>Phone No:{a.phoneNo}</p>
                                <p>{a.addressLine}</p>
                                <p>{a.city} {a.state} {a.pincode} </p>
                            </label>
                        </div>
                        )
                    ) : <p>Loading</p>}
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

                            {cartItems ?
                                cartItems.map((item) => <tr>
                                    <th scope="row">{item.product.name}</th>
                                    <td>{item.product.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.product.price * item.quantity}</td>
                                </tr>) :
                                <p>No Products</p>}
                        </tbody>
                        <tfoot>
                            <tr><h4>Total:{getTotal()}</h4></tr>
                        </tfoot>
                    </table>
                    {/* Table Ended */}
                    <button id="rzp-button1" 
                    className="btn btn-primary"
                    onClick={handlePayment}
                    >Pay with Razorpay</button>
                </div>
            </div>
        </div>
    )
}

export default Checkout