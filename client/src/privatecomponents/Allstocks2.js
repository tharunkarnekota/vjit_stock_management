import React, { useState,useEffect } from 'react'
import { Link,Navigate } from 'react-router-dom'
import Header from './Header'
import "./Dashboard.css"

import axios from 'axios'

const Allstocks = () => {
  const [search,setSearch] = useState("")
  
    const [itemslist,setItemlist] = useState([])

    useEffect(() =>{
        // axios.get('https://onlinegreivancevjit.herokuapp.com/alladmins',{
        //     headers : {
        //         'x-token' : localStorage.getItem('token')
        //     }
        // }).then(res => setDepartment(res.data.filter(profile => profile.concerndepartment!=="higher authority" && profile.concerndepartment!=="Re-contacted"))) 


        axios.get('https://stocksvjit.herokuapp.com/allstocks',{
          headers : {
              'x-token' : localStorage.getItem('token')
          }
      }).then(res =>  

         !search ? setItemlist(res.data) : setItemlist(res.data.filter(profile => profile.stockname.toLowerCase().includes(search.toLowerCase()) || profile.incharge.toLowerCase().includes(search.toLowerCase()) || profile.date.toLowerCase().includes(search.toLowerCase()) || profile.status.toLowerCase().includes(search.toLowerCase()) || (profile.dept ? profile.dept.toLowerCase().includes(search.toLowerCase()) : null) )))

       
    },[search])

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

    
    return (
        <div className='con2'>
           

            <Header />
            <center>
              <br />
            <div className="btn-group">
                
            <Link to={`/dashboard`} className='btn btn-primary'>Dashboard</Link>&nbsp;&nbsp;&nbsp;
                <Link to={`/additem`} className='btn btn-primary'>Add New Item to stocks</Link>&nbsp;&nbsp;&nbsp;
                <input type="text" name="search" value={search} placeholder="search item" onChange={e => setSearch(e.target.value)} />

                
                </div>
            </center>
          

            <table className="table">
  <thead>
    <tr>
      <th scope="col">Code</th>
      <th scope="col">Itemname</th>
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
      <td>{singleitem.date}</td>
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
        </div>
    )
}

export default Allstocks
