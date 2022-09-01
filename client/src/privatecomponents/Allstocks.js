import React, { useState,useEffect } from 'react'
import { Link,Navigate } from 'react-router-dom'
import Header from './Header'
import "./Dashboard.css"

import axios from 'axios'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Allstocks = () => {
  const [search,setSearch] = useState("")
  const [search2,setSearch2] = useState("")
  const [search3,setSearch3] = useState("")
  const [search4,setSearch4] = useState("")
  const [search5,setSearch5] = useState("")
  const [from,setFrom] = useState("")
  const [to,setTo] = useState("")
    const [itemslist,setItemlist] = useState([])

    const searchHandler = () =>{
        if(search || search2  || search4 || search5){
           
             setItemlist(itemslist.filter(item =>  ( search ? item.stockname === search : 1) && ( search2 ? item.incharge === search2 : 1)  && ( search5 ? item.invoice === search5 : 1) && ( search4 ? item.dept === search4 : 1) ))
        }
        
        
    }

    const dateHandler2 = () =>{
      // axios.post('http://localhost:5000/allstocksfilter',{
      //   from : from,
      //   to : to
      // }).then(res =>  setItemlist(res.data));

      let startDate = new Date(from);
      let endDate = new Date(to);
      endDate.setDate(endDate.getDate() + 1);
      let resultProductData = itemslist. filter(a => {
      let datee = new Date(a.date);
      return (datee >= startDate && datee <= endDate);
      });
      setItemlist(resultProductData)
    }

    useEffect(() =>{
      

        axios.get('http://localhost:5000/allstocks',{
          headers : {
              'x-token' : localStorage.getItem('token')
          }
      }).then(res =>   

        !search3 ? setItemlist(res.data) : setItemlist(res.data.filter(profile =>  profile.date.toLowerCase().includes(search3.toLowerCase())  )))

       
    },[search3])

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

    
    return (
        <div className='con2'>
           

            <Header />
            
            <center>
              <br />
            <div className="btn-group">
                
            {/* <Link to={`/dashboard`} className='btn btn-primary'>Dashboard</Link>&nbsp;&nbsp;&nbsp; */}
                <Link to={`/additem`} className='btn btn-primary'>Add New Item to stocks</Link>&nbsp;&nbsp;&nbsp;
                {/* <input type="text" name="search" value={search3} placeholder="search date" onChange={e => setSearch3(e.target.value)} />&nbsp;&nbsp;&nbsp; */}
                <input type="text" name="search" value={search} placeholder="search item" onChange={e => setSearch(e.target.value)} />&nbsp;&nbsp;&nbsp;
                <input type="text" name="search" value={search2} placeholder="search incharge" onChange={e => setSearch2(e.target.value)} />&nbsp;&nbsp;&nbsp;
                <input type="text" name="search" value={search4} placeholder="search dept" onChange={e => setSearch4(e.target.value)} />&nbsp;&nbsp;&nbsp;
                <input type="text" name="search" value={search5} placeholder="search invoice" onChange={e => setSearch5(e.target.value)} />&nbsp;&nbsp;&nbsp;

                <button onClick={searchHandler} className="btn btn-success">Search</button>
                
                </div>
            </center>
            <br /><br />
            <center>
              <input type="text" name="from" value={from} placeholder="from Date YYYY-MM-DD" onChange={e => setFrom(e.target.value)} />&nbsp;&nbsp;&nbsp;
              <input type="text" name="to" value={to} placeholder="to Date YYYY-MM-DD" onChange={e => setTo(e.target.value)} />&nbsp;&nbsp;&nbsp;

              <button onClick={dateHandler2} className="btn btn-success">Filter</button></center><br /><br />
          
{itemslist.length >=1 ?
            <table className="table" id="stocksData">
  <thead>
    <tr>
      <th scope="col">Code</th>
      <th scope="col">Itemname</th>
      <th scope="col">Invoice</th>
      <th scope="col">Supplier</th>
      <th scope="col">Date</th>
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
      <td>{singleitem.stockname}</td>
      <td>{singleitem.invoice ? singleitem.invoice : "-"}</td>
      <td>{singleitem.supplier ? singleitem.supplier : "-"}</td>
      <td>{singleitem.date ? new Date(singleitem.date).toLocaleString() :"-"}</td>
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
<h4>Loading..</h4>}

            
            {/* <div className='container'>
            { department ? 
                     department.map( (profile,index) => 
                        <div className="flex-container" style={{"margin":"10px"}} key={index} >
                            <div className='flex-item-left'>
                                <img
                                    className="round-img"
                                    src={profile.pic}
                                    height="150" width="300"
                                    alt="userPhoto"
                                    style={{borderRadius:"10px"}}
                                />
                            </div>
                            <div className='flex-item-right'>
                                <h2 style={{"color":"green"}} ><b>{profile.concerndepartment}</b></h2>
                                <p style={{fontSize:"20px"}}><b>Incharge : </b>{profile.inchargename}</p>
                                <Link to={`/indprofile/${profile.concerndepartment}`} className='btn btn-primary'>Complaint</Link>
                            </div>
                            
                        
                        </div>
                        )
                    : null}
                    <br /><br />
            </div> */}
                <center><ReactHTMLTableToExcel className="btn btn-success"
    table = "stocksData"
    filename="reportexcel"
    sheet="sheet"
    buttonText="Export excel"/>
    </center>
    <br /><br /><br /><br />
      </div>
    )
}

export default Allstocks
