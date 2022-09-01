import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'


import "./Dashboard.css"

import axios from 'axios'
import Header from './Header'

const AddItem = () => {
    
    
    const [data,setData] = useState({
        itemname :""
        
    })
    const {itemname} = data;
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        console.log(data)
        if(itemname){
            axios.post(`http://localhost:5000/additem`,{itemname:itemname},{
                headers : {
                    'x-token' : localStorage.getItem('token')
                }
            }).then(res => alert(res.data)) 
            setData({itemname:""})
        }
        else{
            alert("fill the complete info")
        }
       
    }
    

    // useEffect(() =>{
        

    //     axios.get(`http://localhost:5000/item/${id}`).then(res => setIteminfo(res.data)) 

       
    // },[])

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

    
    return (
        <div className='con2'>
            
             <center>
             
                <Header />
                <br /><br /><br />
                <h1 style={{color:"brown"}}>Adding New Item to Stocks List</h1><br /><br />
                <form onSubmit={submitHandler}>
                    <h5>Item Name</h5>
                    <input type="text" name="itemname" value={itemname} onChange={changeHandler} /><br /><br />

                 

                    <input type="submit" value="save" className='btn btn-success'/>
                </form>

             </center>
           
        </div>
    )
}

export default AddItem
