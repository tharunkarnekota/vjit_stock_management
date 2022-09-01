import React, { useState,useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

import "./Dashboard.css"

import axios from 'axios'
import Header from './Header';

const Addstock = () => {
    const {id} = useParams()
    const [iteminfo,setIteminfo] = useState([])
    const [data,setData] = useState({
        quantity :"",
        incharge : "",
        invoice : "",
        supplier : ""
    })
    const {quantity,incharge,invoice,supplier} = data;
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        // console.log(data)
        // console.log(parseInt(quantity))
       if(quantity >= 1 && incharge && invoice && supplier){
        console.log(quantity)
       
            axios.post(`http://localhost:5000/addstock/${id}`,{quantity:quantity,incharge:incharge,invoice:invoice,supplier:supplier },{
                headers : {
                    'x-token' : localStorage.getItem('token')
                }
            }).then(res => alert(res.data)) 
            setData({incharge:"",quantity:"",invoice:"",supplier:""})
        
        
       }
       else{
        alert("please enter valid info")
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
            <Header />
             
            <br /><br />
            <h3><b>StockName : </b>{iteminfo.itemname}</h3>
            <h3><b>Available : </b>{iteminfo.available}</h3>
            <br />
            
                <h1 style={{color:"brown"}}>Adding Stock</h1>
                <form onSubmit={submitHandler}>
                    <h5>Incharge Name</h5>
                    <input type="text" name="incharge" value={incharge} onChange={changeHandler} /><br /><br />

                    <h5>Quantity Adding</h5>
                    <input type="text" name="quantity" value={quantity} onChange={changeHandler} /><br /><br />

                    <h5>Invoice Number</h5>
                    <input type="text" name="invoice" value={invoice} onChange={changeHandler} /><br /><br />

                    <h5>Supplier Info</h5>
                    <input type="text" name="supplier" value={supplier} onChange={changeHandler} /><br /><br />

                    <input type="submit" value="save" className='btn btn-success'/>
                </form>

             </center>
           
        </div>
    )
}

export default Addstock
