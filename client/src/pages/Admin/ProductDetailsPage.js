import React, { useState,useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import { useCart } from '../../context/cartContext'

const ProductDetailsPage = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [id,setId] = useState('')
    const [cart,setCart] = useCart([])
    const [product,setProduct] = useState([])

    const getSingleProduct = async() => {
        try{
        const {data} = await axios.get(`/api/v1/product/get-product/${params.id}`)
            if(data?.success){
                setName(data.product.name)
                setDescription(data.product.description)
                setPrice(data.product.price)
                setId(data.product._id)
                setProduct(data.product)
            }
        }
        catch(error){
            toast.error("Failed to get product")
        }
    }
    
    useEffect(()=>{
        getSingleProduct() // replace with actual product id
    },[])
  return (
    <Layout title={'Product Details'}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 d-flex justify-content-center'>
            <div className='d-flex mt-4 flex-column justify-content-center image-container' style={{marginRight : '10px'}}>
              <img src={`/api/v1/product/product-photo/${id}`} className="img img-responsive mb-1" style={{height : '100px'}}/>
              <img src={`/api/v1/product/product-photo/${id}`} className="img img-responsive mb-1" style={{height : '100px'}}/>
              <img src={`/api/v1/product/product-photo/${id}`} className="img img-responsive mb-1" style={{height : '100px'}}/>
              <img src={`/api/v1/product/product-photo/${id}`} className="img img-responsive mb-1" style={{height : '100px'}}/>
            </div>
            <img src={`/api/v1/product/product-photo/${id}`} className='img img-responsive mt-4' alt={name} />
          </div>
          <div className='col-md-6 mt-5'>
            <h5 className=''>{name}</h5>
            <div style={{marginTop : '5px'}}>
            <i class="fa-solid fa-star text-warning" ></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star"></i>
            <span className='text-primary' style={{marginLeft : '5px'}}>177 reviews</span>
            </div>
            <div className='d-flex flex-wrap mt-3'>
            <h5>₹{price}</h5>
            <p className= "text-secondary h5" style={{textDecoration : 'line-through', marginLeft : '10px'}}>₹{price+200}</p>
            <span className='fw-bold text-danger' style={{marginLeft : "10px"}}>rs 200 off</span>
            </div>
            <div className='d-flex my-4 mx-2'>
              <button className='btn btn-success py-2 disabled' style={{marginRight : '8px'}}>XXS</button>
              <button className='btn btn-success py-2' style={{marginRight : '8px'}}>XS</button>
              <button className='btn btn-success py-2' style={{marginRight : '8px'}}>S</button>
              <button className='btn btn-success py-2' style={{marginRight : '8px'}}>M</button>
              <button className='btn btn-success py-2' style={{marginRight : '8px'}}>L</button>
              <button className='btn btn-success py-2' style={{marginRight : '8px'}}>XL</button>
              <button className='btn btn-success py-2' style={{marginRight : '8px'}}>2XL</button>
              <button className='btn btn-success py-2' style={{marginRight : '8px'}}>3XL</button>
            </div>
            <button className='btn btn-danger py-2 px-4' style={{borderRadius : '30px'}} onClick={()=>{setCart([...cart,product]);
                        localStorage.setItem("cart",JSON.stringify([...cart,product]));
                        toast.success('Item Added To Cart');
                        navigate('/cart') }}>Add to bag</button>
            <p className='mt-4' style={{fontStyle : 'italic'}}>{description}</p>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetailsPage
