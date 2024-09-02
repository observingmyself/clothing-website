import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiSupport } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";
const Contact = () => {
  const [name,setName] = useState('');
  const [search, setSearch] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async(e)=> {
    e.preventDefault();
    try{
      const {data} = await axios.post("/api/v1/contact/contact-form",{name,search,phone})
      if(data?.success){
        toast.success(data.message)
        setName('')
        setSearch('')
        setPhone('')
      }
      else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error("Something went wrong")
    }
  }
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h4 className="bg-dark p-2 text-white text-center">CONTACT US</h4>
          <p className="text-justify mt-2">
            any query and info about product feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
          <h6 className="bg-dark p-2 text-white text-center mb-2">Any Query You Have &darr; </h6>
          <form className="form-group">
            <label for="namequery" className="h5 mb-2">Query Form</label>
            <input className="form-control mb-2" id="namequery" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Your name :"/>
            <textarea className="form-control mb-2" value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Enter your Query :" rows={2} cols={4}/>
            <input type="number" className="form-control" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter Your Number :"/>
            <button type="submit" className="btn btn-dark mt-2" onClick={handleSubmit}>Submit Query</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
