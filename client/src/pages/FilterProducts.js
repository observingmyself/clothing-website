import React, { useState,useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCart } from '../context/cartContext';

const FilterProducts = () => {
  const [products,setProducts] = useState([]);
  const navigate = useNavigate();
  const [cart,setCart] = useCart([]);
  const params = useParams();
  const filterProducts = async() => {
    try{
      const {data} = await axios.get(`/api/v1/product/filter-category/${params.slug}`)
      if(data?.success){
        setProducts(data.product)
      }
    }catch(error){
      console.log(error)
      toast.error("Error in getting products")
    }
  }
  useEffect(()=>{
    filterProducts();
  },[params.slug])
  return (
    <>
      <Layout title={'Filtered Products'}>
        <h3 className='text-center mt-3' style={{textTransform : 'capitalize'}}>{params.slug}</h3>
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
      </Layout>
    </>
  )
}

export default FilterProducts
