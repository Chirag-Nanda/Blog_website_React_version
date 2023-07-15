import React from "react";
import {formatISO9075} from "date-fns";
import { Link } from "react-router-dom";

function Post({_id,title,summary,content,cover,createdAt,author}){
    return(
        <div className="card" style={{width: "18rem"}}>
   <Link to={`/posts/${_id}`}>       
  <img className="card-img-top" src={"http://localhost:3000/"+cover} alt="Card image cap"/></Link>  
  <div className="card-body">
 
  <h1 className="post" > <Link to={`/posts/${_id}`}> {title}</Link></h1>
  <h5 className="card-title">{author.username} </h5>
    <time>{formatISO9075(new Date(createdAt))}</time>
    <p className="card-text">{summary}</p>
    
  </div>
</div>
    );
}
export default Post;