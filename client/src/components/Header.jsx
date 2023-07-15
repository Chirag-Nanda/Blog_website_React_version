import React ,{useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Header(){
  const {setUserInfo,userInfo} = useContext(UserContext);
   
   const navigate = useNavigate();
   const [refresh , setRefresh]= useState(false);
   
 

  useEffect(()=>{
    fetch("http://localhost:3000/profile",{
      credentials: 'include',
   }).then(response=>{
       response.json().then(userInfo=>{
        console.log(userInfo);
         setUserInfo(userInfo);
        
       })
   });
  },[]);
  
  async function logout(){
    await fetch("http://localhost:3000/logout",{
     credentials : 'include',
     method : 'POST'
    });
    setUserInfo(null);
    
   }
    
  const userName = userInfo?.userName;
    return(
      
        <nav className="navbar navbar-dark bg-dark justify-content-between">
  <div>
    <img src="logo.png" placeholder='logo'/>
  <Link to="/"> <p className="navbar-brand">BlogHog</p></Link>
  </div>
  {!userName&&(
   <div className="login">
  <Link to="/login"><p className="navbar-brand">Login</p> </Link>
  <Link to="/register"><p className="navbar-brand">Register</p></Link>
  </div>)
}

{userName && (<div className="login">
<Link to="/create"><p className="navbar-brand">Create New Post </p> </Link>
<a className="navbar-brand" onClick={logout} style={{color:"white"}}>Logout</a>
</div>)

}
 
</nav>


        
    );

}

export default Header;