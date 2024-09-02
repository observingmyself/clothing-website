import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import './AllCategory.css'
import { NavLink } from 'react-router-dom';

const AllCategory = () => {
    const [categories, setCategories] = useState([]);

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("api/v1/category/get-category");
            if (data?.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error('Error getting category');
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);
    return (
        <Layout title={"All Categories"}>
            <div className='container d-flex flex-column justify-content-center align-items-center min-vh-100'>
                <div className='row w-100'>
                    {categories.map((e) => (
                        <div className='col-md-4' key={e._id}>
                            <div className='card hehe'>
                                <div className='card-body bg-dark d-flex justify-content-center align-items-center text-light'>
                                <NavLink className="nav-link" to={`/filter/${e.slug}`}>  <h5 className='card-title p-4'>{e.name}</h5></NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default AllCategory;
