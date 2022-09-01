import React, { useState,useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

import "./Dashboard.css"

import axios from 'axios'

const Dispatchstock = () => {
    const [iteminfo,setIteminfo] = useState([])
    const {id} = useParams()
    const [data,setData] = useState({
        quantity :"",
        dept :"",
        incharge : ""
    })
    const {quantity,dept,incharge} = data;
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        console.log(data)
        console.log(iteminfo.available)
       
            if(quantity >= 1 && dept && incharge)
            {
                if(parseInt(quantity) <= parseInt(iteminfo.available)){

                axios.post(`http://localhost:5000/dispatchstock/${id}`,{quantity:quantity,dept:dept,incharge:incharge},{
                    headers : {
                        'x-token' : localStorage.getItem('token')
                    }
                }).then(res => {
                    
                    alert(res.data)
                    setData({incharge:"",dept:"",quantity:""})
                }
                    ) 

                }
                else{
                    alert("dispatch is greater than available which is not possible")
                }
                
            }
            else{
                alert("Fill the valid Info")
            }
        
        
        
    }
    

    useEffect(() =>{
        
        axios.get(`http://localhost:5000/item/${id}`,{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setIteminfo(res.data)) 

    },[id])

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

    
    return (
        <div className='con2'>
            
             <center>
             <br /><br />
            <h3><b>StockName : </b>{iteminfo.itemname}</h3>
            <h3><b>Available : </b>{iteminfo.available}</h3>
            <br />
                <h1>Dispatch Stock</h1>
                <form onSubmit={submitHandler}>
                    <h5>Incharge Name</h5>
                    <input type="text" name="incharge" value={incharge} onChange={changeHandler} /><br /><br />
                    <h5>Department Name</h5>
                    <input type="text" name="dept" value={dept} onChange={changeHandler} /><br /><br />
                    <h5>Quantity dispatch</h5>
                    <input type="text" name="quantity" value={quantity} onChange={changeHandler} /><br /><br />

                    <input type="submit" value="save" className='btn btn-success'/>
                </form>

             </center>
           
        </div>
    )
}

export default Dispatchstock
