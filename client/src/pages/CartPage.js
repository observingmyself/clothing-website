import React, { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [total, setTotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [grandtotal, setGrandtotal] = useState(0);
  const [auth] = useAuth();
  const navigate = useNavigate();

  const removeProductFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum);
    const gst = (sum * 5) / 100;
    setGst(gst);
    const grandTotal = sum + gst + 50;
    setGrandtotal(grandTotal);
  });

  if (!auth?.user) {
    return (
      <Layout title={"Cart--Page"}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 mt-5">
              <p className="h3 text-center">
                You need to be logged in to view your cart.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary px-4 py-2 d-flex m-auto mt-4"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if(cart.length == 0){
    return (
      <Layout title={'Cart--Page'}>
  <div className="container d-flex align-items-center justify-content-center flex-column" style={{ height: '70vh' }}>
    <h1 className="text-center text-secondary">Your Cart is Empty</h1>
    <button className="btn btn-outline-primary col-md-2 py-2 mt-4" style={{ borderRadius: '40px' }} onClick={() => navigate('/')}>
      Add Products
    </button>
  </div>
</Layout>

    )
  }

  return (
    <Layout title={"Cart--Page"}>
      <div className="container">
        <div className="row">
          <div className="col-md-7 mt-4 mx-auto">
            <h1 className="text-center">Cart</h1>
            {cart?.map((p) => (
              <div className="card col-md-11 shadow mt-4 d-flex flex-row mb-4" onClick={()=>navigate(`/product-detail/${p.slug}`)} style={{border : 'none'}} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  style={{ height: "150px", width: "120px" }}
                  className="card-img-top img img-responsive"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>

                  <p className="card-text">₹{p.price}</p>
                </div>

                <button
                  type="button"
                  class="btn-close my-auto"
                  onClick={() => removeProductFromCart(p._id)}
                  style={{ fontSize: "20px", marginRight: "20px" }}
                ></button>
              </div>
            ))}
          </div>
          <div className="col-md-5 mx-auto" style={{marginTop : '97px'}}>
            <div className="p-3 shadow bg-white">
              <h4 className="mb-4">Grand Total</h4>
              <div className="d-flex justify-content-between">
                <p>Products Price</p>
                <p>₹{total}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Taxes</p>
                <p>₹{gst}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Shipping Charge</p>
                <p>₹50</p>
              </div>
              <div className="d-flex justify-content-between">
                <h6>To Pay</h6>
                <h6>₹{grandtotal}</h6>
              </div>
            </div>
            <button className="btn btn-primary mt-3 col-md-12" onClick={()=>navigate('/checkout')}>Checkout</button>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
