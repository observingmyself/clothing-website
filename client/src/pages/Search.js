import { Layout } from "antd";
import React from "react";
import { useSearch } from "../context/searchcontext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import './card.css'
import toast from "react-hot-toast";
const Search = () => {
  const [values] = useSearch();
  const navigate = useNavigate();
  const [cart,setCart] = useCart([])
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <div className="row align-items-center">
            <div className="col-auto">
              <i
                className="fa-solid fa-backward"
                style={{ fontSize: "25px", cursor:'pointer' }}
                aria-label="Go back" onClick={()=>navigate('/')}
              ></i>
            </div>
            <div className="col text-center">
              <h1>Search Results</h1>
            </div>
          </div>
          <h6>
            {values?.results.length < 1
              ? "Products Not Found"
              : `Found ${values?.results.length}`}
          </h6>

          <div className="d-flex flex-wrap justify-content-center">
            {values.results?.map((p) => (
              <div className="card card-bnana mx-2 my-3" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  onClick={()=>navigate(`/product-detail/${p.slug}`)}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <h5 className="card-text">₹{p.price}</h5>
                  <div className="d-flex justify-content-around">
                    <button className="btn btn-secondary col-md-12" onClick={()=>{setCart([...cart,p]);
                        localStorage.setItem("cart",JSON.stringify([...cart,p]));
                        toast.success("Item Added to Cart")}}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
