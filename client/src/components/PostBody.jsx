import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

function PostBody(){
     const [postInfo, setPostInfo]= useState(null);
     const {userInfo} =useContext(UserContext);
     const {id} = useParams();
     useEffect(()=>{
      fetch(`http://localhost:3000/posts/${id}`).then(response=>{
        response.json().then(postInfo=>{
          setPostInfo(postInfo);
        })
      })
      
     },[]);
     
     if(!postInfo) return' ';
     return(<article class="blog-post">
     <center> <img src={`http://localhost:3000/${postInfo.cover}`} /> </center>
     <center><h2 class="display-5 link-body-emphasis mb-1">{postInfo.title}</h2></center>
     <center><p class="blog-post-meta"><time>{formatISO9075(new Date(postInfo.createdAt))}</time> <p>by {postInfo.author.username}</p></p></center>
     {(userInfo.id === postInfo.author._id)&&(
      <center><div className="btn btn-dark mb-6"><Link to={`/edit/${postInfo._id}`}>Edit Post</Link></div> </center>
     )}
     <center><div dangerouslySetInnerHTML={{__html:postInfo.content}} /></center>
    
   </article>);
}

export default PostBody;