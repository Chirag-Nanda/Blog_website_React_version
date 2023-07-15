import React from "react";
import { useState ,useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from "react-router-dom";


function EditPost(){
    const {id} = useParams();
    const [title, setTitle]= useState("");
    const [summary, setSummary]= useState("");
    const [content , setContent]= useState("");
    const [files, setFiles]= useState("");
    const  [cover, setCover]= useState("");
    const [redirect, setRedirect]= useState(false);
    useEffect(()=>{
        fetch(`http://localhost:3000/posts/${id}`).then(response=>{
          response.json().then(postInfo=>{
            setTitle(postInfo.title);
            setSummary(postInfo.summary);
            setContent(postInfo.content);
            setCover(postInfo.cover);
          })
        })
        
       },[]);
    async function updatePost(ev){
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        if(files?.[0]){
        data.set('file', files[0]);}
        data.set('content', content);
        data.set('id',id); 
       ev.preventDefault();
       const response = await fetch("http://localhost:3000/post",{
        method : 'PUT',
        body : data,
        credentials : 'include',
      });
     if(response.ok){
      setRedirect(true);}
    }

    if(redirect){
        return <Navigate to={'/posts/'+id} />
    }

    return (
        <form style={{ margin: "100px" }} onSubmit={updatePost}>
            <div class="mb-3">
                <input type="title" className="form-control" id="exampleFormControlInput1" placeholder={'Title'} value={title} onChange={e=>setTitle(e.target.value)} />
            </div>
            <div class="mb-3">
                <input type="summary" className="form-control" id="exampleFormControlInput1" placeholder={'Summary'} value={summary} onChange={e=>setSummary(e.target.value)}/>
            </div>
            <div class="mb-3">
                <input className="form-control" type="file" id="formFile" onChange={e=>setFiles(e.target.files)}/>
            </div>
            <ReactQuill value={content} onChange={newValue=> setContent(newValue)} />
             <br/>
           <center> <button type="submit" className="btn btn-primary mb-6">Edit Post</button> </center>
        </form>
    );
}

export default EditPost;