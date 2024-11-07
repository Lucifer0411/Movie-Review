import axios from 'axios';
import React, { useState } from 'react'
import { API_URL } from '../config';

function Upload() {

const [file,setFile]=useState();

const handleUpload=async()=>{
    try{
        const formData=new FormData();
        // console.log();
        formData.append('file',file)

        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
        }
        const res = await axios.post(`${API_URL}/api/posts/`, formData, config);
        console.log(res);
        
    }catch(e){
        console.log(e);
    }
    }
    const handleChange=(e)=>{
        console.log(e.target.files[0]);
        setFile(e.target.files[0])
        
    }
  return (
    <div>
      <input type='file' name='file' onChange={handleChange}/>
      <button onClick={handleUpload}>Upload</button>

      <div>
      </div>
    </div>
  )
}

export default Upload
