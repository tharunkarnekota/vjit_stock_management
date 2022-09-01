import React, { useState,useEffect } from 'react'
import { Link,Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

import "./Dashboard.css"

import axios from 'axios'
import Header from './Header';

const Indprofile = () => {
  const [search,setSearch] = useState("")

    const [iteminfo,setIteminfo] = useState([])
    const [itemslist,setItemlist] = useState([])
    const {id} = useParams()

    useEffect(() =>{
        

        axios.get(`http://localhost:5000/allitemstocks/${id}`,{
          headers : {
              'x-token' : localStorage.getItem('token')
          }
      }).then((res) => {
        !search ? setItemlist(res.data) : setItemlist(res.data.filter(profile =>  profile.date.toLowerCase().includes(search.toLowerCase())  ));
        console.log(res.data)
      })
        


         axios.get(`http://localhost:5000/item/${id}`,{
          headers : {
              'x-token' : localStorage.getItem('token')
          }
      }).then(res => setIteminfo(res.data)) 
    
           
       
       
    },[search,id])

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
             <div className="btn-group">
                
            
            <Link to={`/addstock/${id}`} className='btn btn-primary'>Add Stock</Link>&nbsp;&nbsp;&nbsp;

            <Link to={`/dispatchstock/${id}`} className='btn btn-primary'>dispatch Stock</Link>&nbsp;&nbsp;&nbsp;

            <Link to={`/returnstock/${id}`} className='btn btn-primary'>Return Stock</Link>&nbsp;&nbsp;&nbsp;


            {/* <input type="text" name="search" value={search} placeholder="search date" onChange={e => setSearch(e.target.value)} /> */}

            
            </div>
            <br /><br />
            </center>
            {itemslist.length >=1 ?

            <table className="table">
  <thead>
    <tr>
      <th scope="col">Code</th>
      <th scope="col">Date</th>
      <th scope="col">Invoice</th>
      <th scope="col">Supplier</th>
      <th scope="col">Incharge</th>
      <th scope="col">Department</th>
      <th scope="col">Status</th>
      <th scope="col">Quantity</th>
      <th scope="col">Available</th>
      
    </tr>
  </thead>
  <tbody>
   {itemslist.map((singleitem,index) => 
    <tr key={index}>
      <th scope="row">{index}</th>
      <td>{singleitem.date ? new Date(singleitem.date).toLocaleString() :"-"}</td>
      <td>{singleitem.invoice ? singleitem.invoice : "-"}</td>
      <td>{singleitem.supplier ? singleitem.supplier : "-"}</td>
      <td>{singleitem.incharge}</td>
      <td>{singleitem.dept ? singleitem.dept : "-"}</td>
      <td>{singleitem.status}</td>
      <td>{singleitem.quantity}</td>
      <td>{singleitem.available}</td>
      {/* <td><Link to={`/indprofile/${singleitem._id}`} className='btn btn-primary'>View</Link></td> */}
      
    </tr>
    )}
   
  </tbody>
</table>

:
<h4>Loading...</h4>}
<br /><br /><br /><br />
            
           
        </div>
    )
}

export default Indprofile
