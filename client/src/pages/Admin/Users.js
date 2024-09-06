import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";


const Users = () => {
  const [users,setUsers] = useState([])

  const getAllUsers = async() => {
    try{
      const {data} = await axios.get("/api/v1/auth/all-users")
      setUsers(data.users)
    }catch(err){
      console.log(err)
      toast.error("Error getting users")
    }
  }
  useEffect(()=> {
    getAllUsers();
  },[])
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            <div className="mt-4 col-6">
              {users.map((info)=>(
             info.role != 1 ? (<>
              <div key={info._id} className="mt-2 border border-secondary p-3">
              <h4>Name: {info.name}</h4>
              <p>Email: {info.email}</p>
              </div>
             </>) : ("")
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
