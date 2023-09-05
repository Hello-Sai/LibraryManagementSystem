import { FormControl, FormControlLabel } from '@mui/material'
import React from 'react'
import { Route, useNavigate } from 'react-router-dom'
import {useState} from 'react'
import { Button, FormLabel } from '@mui/material'
import {Select,MenuItem} from '@mui/material'
const AddBook = ({onAdd}) => {
  const [title,setTitle] =useState("")
  const [category,setCategory] = useState("Sci-Fi")
  const [desc,setDesc] =useState("")
  const navigate = useNavigate()
  const handleSubmit =(e) =>{
    e.preventDefault();
    
    onAdd({title,desc,category});
    navigate("/dashboard")
  }
  return (
    <div className="container-fluid text-center " style={{margin:"auto",border:"2px dotted black",width:600}} >
      <h3>AddBook</h3>
    <form method='post' onSubmit={handleSubmit} className='form'  >
        <input type="text" value={title} onChange={(e) =>setTitle(e.target.value)}  className="form-control" placeholder='Name of the book' name='name' /><br />
        <select name='category'className='form-select' onChange={(e) =>setCategory(e.target.value)}>
          <option>ScienceFiction</option>
          <option >Fiction</option>
          <option >Comedy</option>
        </select>
        <textarea placeholder="Write about the book"style={{width:"500px"}} className="form-control"value={desc} onChange={(e) =>setDesc(e.target.value)} name='desc'></textarea><br/>
        
        <input type="submit" className='btn btn-primary' value="submit" />
    </form>
    </div>
  )
}

export default AddBook
