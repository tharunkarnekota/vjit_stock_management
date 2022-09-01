import React,{useState} from 'react'
import { Link,Navigate } from 'react-router-dom'
import axios from 'axios'
import "./Login.css"

const Login = () => {
    const [auth,setAuth] = useState(false)
    const [data,seData] = useState({
        email : '',
        password : '',
    })
    const {email,password} = data
    const changeHandler = e =>{
        seData({...data,[e.target.name]:e.target.value})
    }

    const submitHandler = e =>{
        e.preventDefault();
        if(email && password){
            axios.post('http://localhost:5000/login',data).then(
            res => { 
                if(res.data.token)
                    {
                        localStorage.setItem('token',res.data.token);
                        setAuth(true)
                    }
                else{
                        alert(res.data);
                }}
            )
        }
        else{
            alert("Invalid info")
        }
        
    }
    if(auth){
        return <Navigate to='/dashboard' />
    }

    return (
           
        <div className='con' >
        <nav className="navbar bg-dark justify-content-left">
            <h1 className='heading' style={{"marginLeft":"5px"}}>
                <Link to='/' style={{ textDecoration: 'none' }}>Stocks Tracker</Link>

             
            </h1>
            
            
        </nav>
        <div  >             
            <section className="container">
                <h1 className="large " style={{"color":"orange","marginTop":"100px","marginBottom":"1rem"  }} >Sign In</h1>
                <p className="lead" style={{"paddingBottom":"1rem"}}><b>Sign into Your Account</b></p>
                <form onSubmit={submitHandler} autoComplete="off">
                    <input className="form-control-lg border" style={{"float":"left" }} type="email"    placeholder="Enter email"    name="email" value={email}   onChange={changeHandler} /><br /><br /><br />
                    <input className="form-control-lg border" style={{ "float":"left"}} type="password" placeholder="Enter password" name="password" value={password} onChange={changeHandler} /><br />
                    
                    <br/>
                    <input type="submit" className=" button btn btn-primary" value="login" style={{"marginTop":"30px"}}></input>
                </form>
                <br/>
                <p>
                    Don't know password? <Link to="/forgetpassword"  style={{ textDecoration: 'none' }}>Forget Password</Link>
                </p>
                
            </section>
            </div>
        </div>
    )
}

export default Login