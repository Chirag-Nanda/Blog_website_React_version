import React from "react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";

function CreatePost() {
    const [title, setTitle]= useState("");
    const [summary, setSummary]= useState("");
    const [content , setContent]= useState("");
    const [files, setFiles]= useState("");
    const [redirect, setRedirect]= useState(false);

    async function  createPost(ev){
       const data = new FormData();
       data.set('title', title);
       data.set('summary', summary);
       data.set('file', files[0]);
       data.set('content', content); 
       ev.preventDefault();
       const response = await fetch("http://localhost:3000/post",{
         method : 'POST',
         body : data,
         credentials : 'include',
       });

       if(response.ok){
          setRedirect(true);
       }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <form style={{ margin: "100px" }} onSubmit={createPost}>
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
           <center> <button type="submit" className="btn btn-primary mb-6">Create Post</button> </center>
        </form>
    );
}

export default CreatePost;