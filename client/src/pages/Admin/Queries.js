import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
const Queries = () => {
    const [queries,setQueries] = useState([])

    const getAllQueries = async () => {
        try {
            const { data } = await axios.get('/api/v1/contact/all-queries');
            setQueries(data?.contact);
            toast.success(data.message);
        } catch (error) {
            console.error(error);
            toast.error('Error Getting Queries');
        }
    };
    
    useEffect(() => {
        getAllQueries();
    }, []);

    const handleDelete = async (id) => {
        try{
            const {data} = await axios.delete(`/api/v1/contact/delete-query/${id}`)
            if(data?.success){
                toast.success(data?.message)
                getAllQueries()
            }
        }catch(error){
            console.log(error)
            toast.error("Failed to delete query")
        }
    }
    
  return (
    <Layout title={'Queries'}>
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu />
            </div>
            <div className='col-md-9'>
                <h2 className='text-center mt-3 fw-bold'>All Queries</h2>
                {queries?.map((p) => (
                    <div className='card mx-auto w-75 mb-2 mt-3' key={p._id}>
                        <div className='card-body d-flex justify-content-between align-items-center'>
                            <div>
                            <h5 className='card-title mb-2'>Name: {p.name}</h5>
                            <h6 className='card-subtitle mb-1 text-muted'>Query: {p.search}</h6>
                            <p className='card-text'>Phone: {p.phone}</p>
                            </div>
                            <div className='text-center text-danger'>
                            <i class="fa-solid fa-trash" onClick={()=>handleDelete(p._id)} style={{cursor : 'pointer'}}></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
</Layout>

  )
}

export default Queries
