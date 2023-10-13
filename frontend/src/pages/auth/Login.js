import React, { useState } from 'react'
import styles from "./auth.module.scss"
import loginimg from "../../assets/login.png"
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import { Card } from '../../components/card/Card'
import {signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase/config'
import Loader from '../../components/loader/Loader'
import { toast } from 'react-toastify'
import { GoogleAuthProvider } from "firebase/auth"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate= useNavigate()

    const loginUser=(e)=>{
        e.preventDefault();

        setIsLoading(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setIsLoading(false)
                toast.success("Login Successful.")
                navigate("/")
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error.message)
            });

    }

    //login with google
    const provider = new GoogleAuthProvider();
    const signInWithGoogle=()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            toast.success("Login successfull..")
            navigate("/")
        }).catch((error) => {
            toast.error(error.message)
        });
    }

  return (
    <>
    {isLoading && <Loader/>}
    <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
            <img src={loginimg} alt="Login" width="400"/>
        </div>
        <Card>
        <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={loginUser}>
                <input type="text"  placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <input type="password"  placeholder='Password'value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <button className="--btn --btn-primary --btn-block">Login</button>
                <div className={styles.links}>
                    <Link to="/reset">Reset Password</Link>
                </div>
                <p>-- or --</p>
            </form>
            <button type="submit"  onClick={signInWithGoogle}className="--btn --btn-danger --btn-block"><FaGoogle color="#fff"/>Login With Google</button>
            <span className={styles.register}>
                <p>Don't have an account? </p>
                <Link to="/register">Register</Link>
            </span>
        </div>
        </Card>
    </section>
    </>
  )
}

export default Login