import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox,Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [cart,setCart] = useCart()
  const navigate = useNavigate();
  const [products,setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [checked,setChecked]  = useState([]);
  const [radio,setRadio] = useState([]);


 // get all categories 
 const getAllCategory = async () => {
  try {
    const { data } = await axios.get("/api/v1/category/get-category");
    if (data.success) {
      setCategories(data.category);
    }
  } catch (error) {
    toast.error("Something went wrong in getting catgeory");
  }
};

useEffect(() => {
  getAllCategory();
}, []);

//filter by category logic 

const handleFilter = (value,id)=>{
  let all = [...checked]
  if(value){
    all.push(id)
  }
  else{
    all = all.filter(c=>c!==id)
  }
  setChecked(all)
}
useEffect(()=>{
  if(!checked.length || !radio.length) getAllProducts()
},[checked.length, radio.length])

useEffect(()=>{
  if(checked.length || radio.length) filterproducts();
},[checked,radio])


// get filter product
const filterproducts = async () =>{
  try{
    const {data} = await axios.post("/api/v1/product/product-filters",{
      checked,
      radio 
    })
    setProducts(data?.products)
  }
  catch(error){
    console.log(error)
    }
  }

  // get All Products 

  const getAllProducts = async() => {
    try{
      const {data} = await axios.get(`/api/v1/product/get-product`)
       setProducts(data?.products)
    }
    catch(error){
      console.log(error)
      toast.error('something went wrong in getting the products')
    }
  }
  useEffect(()=>{
    getAllProducts()
  },[])

  return (
    <Layout title={"Best offers "}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className="m-1">Filter By Category</h4>
          <div className="d-flex flex-column justify-content-center">
            {categories?.map((c)=>(
              <Checkbox className="m-1" key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>{c.name}</Checkbox>
            ))}
          </div>
          <h4 className="m-1 mt-2">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
            {Prices.map((p)=>(
              <div key={p._id} >
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
            </Radio.Group>
          </div>
        </div>
          <div className="col-md-10 mt-4">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap justify-content-center">
                {products?.map((p)=>(
                  <div className="card mx-2 my-3" style={{width : "18rem"}}>
                    <img src={`/api/v1/product/product-photo/${p._id}`} onClick={()=>navigate(`/product-detail/${p.slug}`)} className="card-img-top" alt={p.name}/>
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                        <h5 className="card-text">₹{p.price}</h5>
                      <div className="d-flex justify-content-around">
                        <button className="btn btn-secondary col-md-12" onClick={()=>{setCart([...cart,p]);
                        localStorage.setItem("cart",JSON.stringify([...cart,p]));
                        toast.success('Item Added To Cart') }}>Add to Bag</button>
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

export default HomePage;
