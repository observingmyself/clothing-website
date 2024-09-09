import React,{useState,useEffect} from 'react'
import Layout from '../Layout/Layout'
import AdminMenu from '../Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom';
const {Option} = Select;
const ProductUpdateForm = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [name , setName] = useState('')
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("")
    const [photo,setPhoto] = useState("");
    const [categories,setCategories] = useState([]);
    const [category,setCategory] = useState('');
    const [quantity,setQuantity] = useState('')
    const [shipping,setShipping] = useState("")
    const[id,setId] = useState("")

    // getting categories 
    const getAllCategories = async() =>{
      try{
        const {data} = await axios.get(`/api/v1/category/get-category`)
        if(data?.success){
          setCategories(data.category);
        }
      }
      catch(error){
        toast.error("failed to get categories")
      }
    }
    useEffect(()=>{
      getAllCategories()
    },[])

    const getProduct = async() => {
      try{
        const { data } = await axios.get(`/api/v1/product/get-product/${params.id}`)
        if(data?.success){
        const product = data.product;
        // console.log(product)
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
        setPhoto(product.photo)
        setQuantity(product.quantity)
        setShipping(product.shipping)
        setCategory(product.category)
        setId(product._id)
        console.log(id)
        }
      }
      catch(error){
      }
    }

    useEffect(() => {
      getProduct(); 
    }, []);

    const handleUpdate = async (e) => {
      e.preventDefault();
      try{
        const productUpdateData = new FormData()
        productUpdateData.append("name",name)
        productUpdateData.append("description",description)
        productUpdateData.append("price",price)
        productUpdateData.append("quantity",quantity)
        productUpdateData.append("shipping",shipping)
        productUpdateData.append("category",category)
        photo && productUpdateData.append("photo",photo)

        const {data} = axios.put(`/api/v1/product/update-product/${id}`,productUpdateData)
        if(data?.success){  
            toast.success("Product updated successfully")
            navigate('/dashboard/admin/products')
        }

      }
      catch(error){
        toast.error("Failed to up product")
      }
    }
    
  return (
    <Layout title={'Product Updation --'}>
        <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select bordered={false} placeholder="Select Category" size ="large" slowsearch className="form-select mb-3" onChange={(value)=>{setCategory(value)}}>
              {categories?.map((c)=>{
                return <Option key={c._id} value={c._id}>{c.name}</Option>
              })}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo? photo.name : "Upload Photo"}
                  <input type="file" name="photo" accept="image/*" onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                </label>
              </div>
              <div className="mb-3 d-flex justify-content-around align-items-center">

              <img src={`/api/v1/product/product-photo/${id}`} height={"200px"} alt="Product 1" />

  {photo && (
    <div className="update-info text-center">
      <div className="arrow">
        {/* You can use a Unicode arrow or an SVG for the arrow */}
        <span>&rarr;</span>
      </div>
      <div className="text">Update to this</div>
    </div>
  )}
          <style jsx>
            {`
            .update-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: Arial, sans-serif; /* Adjust as needed */
        }

        .arrow {
          font-size: 24px; /* Adjust size as needed */
          margin-bottom: 10px; /* Space between arrow and text */
        }

        .text {
          font-size: 16px; /* Adjust size as needed */
          font-weight: bold; /* Optional: make text bold */
        }`}
          </style>

  {photo && (
    <div className="text-center">
      <img
        src={URL.createObjectURL(photo)}
        alt="product_photo"
        height={"200px"}
        className="img img-responsive"
      />
    </div>
  )}
</div>

              <div className="mb-3">
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Product Name"/>
              </div>
              <div className="mb-3">
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="form-control" placeholder="Product Description" rows= "4"/>
              </div>
              <div className="mb-3">
                <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} className="form-control" placeholder="Product Price"/>
              </div>
              <div className="mb-3">
                <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className="form-control" placeholder="Product Quantity"/>
              </div>
              <div className="mb-3">
                  <Select bordered={false} placeholder="select shipping" size="large" className="form-select mb-3" onChange={(value)=>setShipping(value)}>
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>Update Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductUpdateForm
