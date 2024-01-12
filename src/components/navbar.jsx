import React from 'react'
import { Link } from 'react-router-dom'
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
export default function Navbar() {
    const handleSignOut = () => {
        // Call signOut when the button is clicked
        signOut(auth);
      };
    const [user] = useAuthState(auth)
  return (
    <div className='fixed-top border' style={{backgroundColor:"whitesmoke"}}>
      <nav className='navbar'>
        <div>
            <img src='logo192.png' width={30} height={30} alt='logo' className='ms-5'></img>
        </div>
        <Link className='nav-link' to="/">Home</Link>
        <div>
            {user && ( 
                <>
                <span className='pe-4'>
                    Signed in as {user.displayName}
                </span>
                <button className='btn btn-primary btn-sm me-3' onClick={handleSignOut}>Logout</button>
                </>
            )
            }       
        </div>
      </nav>
    </div>
  )
}
