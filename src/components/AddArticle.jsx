import { Timestamp, collection , addDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React from 'react'
import { useState } from 'react'
import { db, storage } from '../firebaseConfig'
import { toast } from 'react-toastify'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import { auth } from '../firebaseConfig'
export default function AddArticle() {
  const [user] = useAuthState(auth);
  const [progress, setProgress]= useState(0)
  const [formData, setFormData ] = useState({
    title: ' ',
    description: ' ', 
    image:' ',
    createdAt: Timestamp.now().toDate(),
  })
  const handleChange = (e) => {
    setFormData({ ...formData , [e.target.name]:e.target.value})
  }
  const handleImageChange = (e) => {
    setFormData({...formData, image: e.target.files[0] })
  }
  const handlePublish = () => {
    if(!formData.title || !formData.description || !formData.image){
      alert("Please fill all the fields");
      return;
    }
    const storageRef = ref(storage, `/images/${Date.now()} ${formData.image.name}`) /* hai aici la testare, daca se uplodeaza 2 imagini cu acelasi nume, se tine cont doar de ultima */
    const uploadImage = uploadBytesResumable(storageRef, formData.image);
    uploadImage.on("state_changed", (snapshot) => {
      const progressPercent =Math.round((snapshot.bytesTransferred / snapshot.totalBytes ) * 100 )
      setProgress(progressPercent);
    }, 
    (err) => {
      console.log(err);
    },
    () => {
        setFormData({
          title: ' ',
          description: ' ',
          image: ' ',
        })
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
            const articleRef = collection(db, "Articles");
            addDoc(articleRef, {
              title: formData.title,
              description: formData.description,
              imageURL: url,
              createdAt: Timestamp.now().toDate(),
              createdBy: user.displayName,
              userId: user.uid,
              likes:[],
            }).then(() => {
              toast("Article added succesfully", {type: "success"});
              setProgress(0);
            }).catch(err => {
              toast("Error adding article" , {type: "error"});
            })
        })
    });
  }
  return (
    <div className='border p-3 bg-light' style={{ marginTop:48}}>
      {
        !user ? 
          <>
        <h2><Link to='/signin'>Login to create article</Link></h2>
        Don't have an accout? <Link to = '/register'>Sign up</Link>
        </>
        :
        <>
          <h2>Create Article</h2>
      <label htmlFor=''>Title</label>
      <input type="text" name="title" className='form-contorl' value={formData.title} onChange={(e) => handleChange(e)}/>
      { /*description */ }
      <label htmlFor=''>Description</label>
      <textarea name="description" className='form-control' value={formData.description} onChange={(e) => handleChange(e)}></textarea>

      { /* image */}
      <label htmlFor=''>Image</label>
      <input type='file' name='image' accept='image/*' className='form-control' onChange={(e) => handleImageChange(e)}></input>
      {progress === 0 ? null : (
      <div className="progress"> 
        <div className="progress-bar progress-bar-striped mt-2" style={{width: `${progress}%`}}> 
          { `uploading image ${progress}%`} 
        </div>
      </div>
      )}
      <button className='form-control btn-primary mt-2' onClick={handlePublish}>Publish</button>
        </>
        
        
      }
      
          
    </div>
  )
}
