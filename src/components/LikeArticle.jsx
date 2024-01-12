import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebaseConfig'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

export default function LikeArticle({id, likes}) {
    console.log("ceau");
    const [user] = useAuthState(auth);
    const likesRef = doc(db,"Articles", id)
    const handleLike = () => {
        if(likes?.includes(user.uid)){
            updateDoc(likesRef,{
                likes: arrayRemove(user.uid)
            }).then(() => {
                console.log('unliked');
            }).catch((err) => {
                console.log(err);
            })
        }
        
        else {
            updateDoc(likesRef,{
                likes: arrayUnion(user.uid)
            }).then(() => {
                console.log('liked');
            }).catch((err) => {
                console.log(err);
            })
        }
    }
  return (
    <div>
      <i className={ `fa fa-heart${!likes?.includes(user.uid) ? "-o" : "" } fa-lg`} 
      style={{cursor: "pointer", color:likes?.includes(user.uid)?"red" : null ,}}
      onClick={handleLike}
      ></i>
    </div>
  )
}
