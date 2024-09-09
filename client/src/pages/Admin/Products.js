import Layout from '../../components/Layout/Layout'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminMenu from '../../components/Layout/AdminMenu'
import { Link } from 'react-router-dom'
import '../card.css'


const Products = () => {
  const [products,setProducts] = useState([])

    const getAllProducts = async() => {
        try{
          const {data} = await axios.get('/api/v1/product/get-product')
          setProducts(data?.products)
        }
        catch(error){
          toast.error('error getting products')
        }
       }
       useEffect(()=>{
        getAllProducts();
       },[])


  // product delete function
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(`/api/v1/product/delete-product/${pid}`);
      if (data.success) {
        toast.success('Product Deleted');
        getAllProducts();
      } else {
        toast.error(data.message || 'Failed to delete product');
      }
    } catch (error) {
      toast.error('Something went wrong while deleting the product');
    }
  };
  return (
    <Layout title={'Products U & D'}>
        <div className="container-fluid m-3 p-3">
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
              <center>  <b className='h1 text-secondary' style={{borderBottom : "2px solid gray", paddingBottom : "2px"}}>All Products</b></center>
            <div className="d-flex flex-wrap mt-5">
                {products?.map((p)=>(
                  <div className="card card-bnana mx-2 my-3" style={{width : "18rem"}}>
                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name}/>
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>  
                        <h5 className="card-text">₹{p.price}</h5>
                      <div className="d-flex justify-content-around mt-2">
                   <Link to = {`/dashboard/admin/update-product/${p.slug}`}><button className="btn btn-warning">Update</button></Link>
                        <button className="btn btn-danger" onClick={()=>handleDelete(p._id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            </div>
            </div>
            </div>
    </Layout>
  )
}

export default Products
