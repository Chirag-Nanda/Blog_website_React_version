import React, { useEffect ,useState} from "react";
import Post from "./Post";


function Body(){
  const [posts, setPosts]= useState([]);
   useEffect(()=>{
    fetch('http://localhost:3000/post').then(response=>{
      response.json().then(posts=>{
        setPosts(posts);
      })
    })
   },[])

  return(
    <center>
      {posts.length>0 && posts.map(element=>(
        <Post {...element}/>
      )

      )}
    </center>
  );
}

export default Body;