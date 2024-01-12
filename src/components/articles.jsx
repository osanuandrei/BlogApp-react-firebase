import React, { useEffect } from 'react'
import { useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import DeleteArticle from './deleteArticle';
import { useAuthState } from 'react-firebase-hooks/auth';
import LikeArticle from './LikeArticle';
import { Link } from 'react-router-dom';
export default function Articles() {
    const [user] = useAuthState(auth);
    const [articles, setArticles]  = useState([])
    useEffect(() =>
    {
        const articleRef = collection(db, "Articles");
        const q = query(articleRef, orderBy("createdAt", "desc"));
        onSnapshot(q,(snapshot)=> {
            const article = snapshot.docs.map((docs) => ({
                id:docs.id,...docs.data(),
            }))
            setArticles(article);
            console.log(article);
        })
    
    }
    ,[]);
  return (
    <div style={{marginTop:48}}>
        {
      articles.length === 0 ? (
        <p>No articles found!</p>
        ) : 
        ( articles.map(({id, title, description, imageURL, createdAt ,createdBy, userId, likes, comments }) => <div className='border mt -3 p-3 bg - light' key={id}>
            <div className="row">
                <div className="col-3">
                    <Link to = {`/article/${id}`}><img src = {imageURL} alt='title' style={{height:180, width:180}}></img></Link>
                </div>
                <div className="col-9 ps-3">
                    <div className='row'>
                        <div className='col-6'>
                        {
                            createdBy && (
                                <span className='badge bg-primary'>{createdBy}</span>
                            )
                        }
                        </div>
                        <div className='col-6 d-flex flex-row-reverse'>
                            {
                                user && user.uid === userId && (
                                    <DeleteArticle id = {id} imageURL={imageURL}/>
                                )
                            }           
                        </div>
                    </div>
                    <h3>{title}</h3>
                    <p>{createdAt.toDate().toDateString()}</p>
                    <h5>{description}</h5>
                    <div className="d-flex flex-row-reverse">
                    {user && <LikeArticle id={id} likes={likes} />}
                    <div className="pe-2">
                      <p>{likes?.length} likes</p>
                    </div>
                    {comments && comments.length > 0 && (
                      <div className="pe-2">
                        <p>{comments?.length} comments</p>
                      </div>
                    )}
                  </div>
                </div>
            </div>
        </div>)
        )

        }
        
        
    </div>
  )
}
