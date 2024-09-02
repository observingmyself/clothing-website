import React, { useEffect, useState , useRef } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const {Option} = Select;
const CreateProduct = () => {
  const [categories,setCategories] = useState([]);
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [quantity,setQuantity] = useState("");
  const [shipping,setShipping] = useState("");
  const [photo,setPhoto] = useState("");
  const [category,setCategory] = useState("");
  const navigate = useNavigate();
  const myRef = useRef();
  const getAllCategories = async() =>{
    try{
      const {data} = await axios.get(`/api/v1/category/get-category`)
      if(data?.success){
        setCategories(data.category);
      }
    }
    catch(error){
      console.log(error)
      toast.error("failed to get categories")
    }
  }
  useEffect(()=>{
    getAllCategories()
  },[])

  // create product function
   const handleCreate = async(e) => {
    e.preventDefault();
    try{
      const productData = new FormData()
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("quantity",quantity);
      productData.append("photo",photo);
      productData.append("category",category);
      productData.append("shipping",shipping);

      const {data} = await axios.post("/api/v1/product/create-product",productData)
      if(data?.success){
        toast.success(data.message)
      }
      else{
        toast.success("Product Created Successfully")
        
        navigate('/dashboard/admin/products')
      }
    }
    catch(error){
      console.log(error)
    }
   }

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
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
              <div className="mb-3">
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
                <input type="text" ref={myRef} value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Product Name"/>
              </div>
              <div className="mb-3">
                <textarea ref={myRef} value={description} onChange={(e)=>setDescription(e.target.value)} className="form-control" placeholder="Product Description" rows= "4"/>
              </div>
              <div className="mb-3">
                <input type="number" ref={myRef} value={price} onChange={(e)=>setPrice(e.target.value)} className="form-control" placeholder="Product Price"/>
              </div>
              <div className="mb-3">
                <input type="number" value={quantity} ref={myRef} onChange={(e)=>setQuantity(e.target.value)} className="form-control" placeholder="Product Quantity"/>
              </div>
              <div className="mb-3">
                  <Select bordered={false} placeholder="select shipping" size="large" className="form-select mb-3" onChange={(value)=>setShipping(value)}>
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>Create Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
