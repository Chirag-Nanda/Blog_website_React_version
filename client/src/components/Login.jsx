import React ,{useContext, useState} from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Login(){
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect , setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  async function register(ev){
   ev.preventDefault();
   const response =await fetch("http://localhost:3000/login", {
      method : "POST",
      body: JSON.stringify({userName,password}),
      headers: {
        "Content-Type": "application/json"
        
      },
      credentials : 'include',
   });

   if(response.ok){
    response.json().then(userInfo=>{
    setUserInfo(userInfo);
    setRedirect(true);
    })
    
   }
   else{
     alert("wrong credentials");
   }
   
  
  }

  if(redirect){
    return <Navigate to={"/"} forceRefresh={true}/>
  }
  
    return(<>
     <center><h1>LOGIN</h1></center> 
        <form style={{margin: "50px"}} onSubmit={register}>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={userName} onChange={function(e){
      setUserName(e.target.value)}
    }/>
    
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={function(e){setPassword(e.target.value)}}/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</>
    );

    

}

export default  Login;