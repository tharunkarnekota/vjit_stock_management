import React from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './privatecomponents/Dashboard'
import Indprofile from './privatecomponents/Indprofile'

import {  BrowserRouter,Routes,Route} from "react-router-dom"



import Forgetpassword from './components/Forgetpassword'
import Resetpassword from './components/Resetpassword'
import Addstock from './privatecomponents/Addstock'
import Dispatchstock from './privatecomponents/Dispatchstock'
import AddItem from './privatecomponents/AddItem'
import Allstocks from './privatecomponents/Allstocks'
import Returnstock from './privatecomponents/Returnstock'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>

        <Route path='/' exact element={<Home />} />
        <Route path='/login' exact element={<Login />} />
       
        <Route path='/dashboard' exact element={<Dashboard />} />
        
        <Route path='/register' exact element={<Register />} />
        <Route path="/indprofile/:id" exact element={<Indprofile />} />
        <Route path='/addstock/:id' exact element={<Addstock />} />
        <Route path='/returnstock/:id' exact element={<Returnstock />} />
        <Route path='/dispatchstock/:id' exact element={<Dispatchstock />} />
        <Route path='/additem' exact element={<AddItem />} />
        <Route path='/allstocks' exact element={<Allstocks />} />


        
        <Route path='/forgetpassword' exact element={<Forgetpassword />} />
        <Route path='/resetpassword' exact element={<Resetpassword />} />


      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
