import React, { useState,useEffect } from "react";
import Layout from "../components/Layout/Layout";
import "./Checkout.css";
import toast from "react-hot-toast";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cartContext";
const Checkout = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [auth] = useAuth();
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState();
  const [cart,setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance,setInstance] = useState("");
  
  const getToken = async() => {
    try{
      const {data} = await axios.get("/api/v1/product/braintree/token")
      setClientToken(data?.clientToken)
    }catch(error){
    }
  }
  useEffect(()=>{
    getToken()
  },[auth?.token])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const productId = cart.map((product)=>product._id)
      const {nonce} = await instance.requestPaymentMethod();
      const userId = auth?.user?._id
      const data = await axios.post("/api/v1/checkout/order-details",{address,address2,city,state,pincode,userId,productId,nonce})
      if(data?.success){
        localStorage.removeItem("cart");
        setCart([])
        toast.success(data?.message);
        navigate('/')

      }
    }catch(error){
      toast.error("Failed to place order")
    }
  }
  return (
    <Layout title={"checkout"}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mt-4">
            <h3 className="text-center">Checkout Step</h3>
            <form>
              <div className="form-group">
                <label htmlFor="inputAddress">Receiving Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control margin-down"
                  id="inputAddress"
                  placeholder="Enter 1st address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress2">Permanent Address</label>
                <input
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="form-control margin-down"
                  id="inputAddress2"
                  placeholder="Enter 2nd address"
                />
              </div>
              <div className="form-row d-flex margin-down">
                <div className="form-group col-md-6 margin-right">
                  <label htmlFor="inputCity">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control"
                    placeholder="Enter city"
                    id="inputCity"
                  />
                </div>
                <div className="form-group col-md-3 margin-right">
                  <label htmlFor="inputState">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="form-control col-md-3"
                    id="inputState"
                    placeholder="Enter state"
                  />
                </div>
                <div className="form-group col-md-2 margin-right">
                  <label htmlFor="inputZip">Pin Code</label>
                  <input
                    type="tel"
                    inputMode="Numeric"
                    pattern="[0-9]*"
                    title="6 digit pin code"
                    maxLength={6}
                    value={pincode}
                    placeholder="Enter pincode"
                    onChange={(e) => setPincode(e.target.value)}
                    className="form-control"
                    id="inputZip"
                  />
                </div>
              </div>
              <div className="form-group"></div>
              <div className="d-flex justify-content-center align-items-center">
                
              </div>
            </form>
          </div>
        <div className="col-md-4" style={{marginTop : "90px"}} >
          <div className="card shadow p-3"
          style={{border: "none"}}>
              <h4 className="text-center">Order Summary</h4>
            <div className="card-body">
              
               
                <div className="d-flex justify-content-between fw-bold">
                <div>No. of items</div>
                <div>{cart.length}</div>
                </div>
                <div className="d-flex justify-content-between fw-bold">
                <div>Grand Total</div>
                <div>₹{cart.reduce((acc,item)=>acc+item.price,0)}</div>
                </div>
            </div>
          </div>
        <div className="mt-2">
          {!clientToken || !auth.token || !cart.length ? ("Failed to load") : (
            <>
            <DropIn options={{
              authorization : clientToken,
              paypal : {
                flow : "vault",

              }
            }}
            onInstance = {(instance)=>setInstance(instance)}/>
            <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary py-2 px-3"
                  style={{ borderRadius: "20px" }}
                >
                  Next Step
                </button>
                </>
          )}
        </div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
