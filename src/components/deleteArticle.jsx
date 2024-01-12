import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { db, storage } from '../firebaseConfig'
import { toast } from 'react-toastify';
import { deleteObject, ref } from 'firebase/storage';

export default function DeleteArticle({id, imageURL}) {
    const handleDelete = async () => {
      if(window.confirm("Are you sure you want to delete this article?"))
        try {
        await deleteDoc(doc(db, "Articles", id));
        toast("Article deleted succesfully", {type: "success"}) /* caz prost de testare, nu apare toast in dreapta sus */
        const storageRef = ref(storage, imageURL);
        await deleteObject(storageRef);

        }
 catch(error) {
        toast("Error deleting article", {type: "error"});

    }
}
  return (
    <div>
        <i className='fa fa-times' onClick={handleDelete} style={{cursor:"pointer"}}/>
    </div>
  )
}
