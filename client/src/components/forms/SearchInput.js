import React from 'react'
import { useSearch } from '../../context/searchcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchInput = () => {
    const [values,setValues] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        
        e.preventDefault();
        try{
            const {data} = await axios.get(`/api/v1/product/search/${values.keyword}`)
            setValues({...values , results : data , keyword : ''})
            navigate('/search')
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <form className="form-inline my-2 my-lg-0 d-flex" onSubmit={handleSubmit}>
                    <input className="form-control mr-sm-2 border border-secondary" type="search"  placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e)=>setValues({...values,keyword : e.target.value})}/>
                    <button className="btn btn-outline-success mx-3 my-2 my-sm-0" type="submit" >Search</button>
    </form>
  )
}

export default SearchInput
