import React, { useEffect } from 'react'
import { GoogleLoginButton } from "react-social-login-buttons";
import Spline from '@splinetool/react-spline'
import SplineAssets from '../assets/edited_clone.png'
import Image from 'next/image'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from '../firebase/firebase';
import { Router, useRouter } from 'next/router';

export default function Login() {
  const router = useRouter()

 
  return (
    <div className='container-fluid' style={{ height: '100vh' }}>
      <div className='row'>
        <div className='col-7 d-flex align-items-center justify-content-center' style={{ height: '100vh', backgroundColor: '#262626' }}>
          <Image
            className='col-6 bg-dark d-flex align-items-center justify-content-center'
            src={SplineAssets}
            alt="Picture of the author"
          />

        </div>
        <div style={{ backgroundColor: '#F7F8FD', height: '100vh' }} className='col-5'>
          <h1 className='text-center mt-5' style={{textDecoration:'underline',fontSize:100}}>Nova Feedback</h1>
          <h4 className='text-start mt-5 ml-5' style={{paddingLeft:'5%'}}>Build <i style={{color:"#d34260",fontWeight:'bold'}}>fast</i> , <i style={{color:"#FE9829",fontWeight:'bold'}}>right</i> and <i style={{color:"#d0aab6",fontWeight:'bold'}}>effectively</i> at <i style={{color:"#f16b88",fontWeight:'bold'}}>scale</i> </h4>
          <div className='d-flex h-75 justify-content-center align-items-center'>
            <GoogleLoginButton className='"align-self-center w-50' onClick={async () => {
              try{
                const googleProvider = new GoogleAuthProvider();
                const res = await signInWithPopup(firebaseAuth, googleProvider);
                if(res.user){
                 await router.push({
                    pathname:'/Projects/projects',
                    
                  })
                }
              }catch(err){
                console.log('KKKKKKK',err)
              }

            }} />
          </div>
        </div>
      </div>
    </div>
  )
}
