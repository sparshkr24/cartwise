import React, { useState } from 'react'
import styles from "./auth.module.scss"
import resetImg from "../../assets/forgot.png"
import { Link } from 'react-router-dom'
import { Card } from '../../components/card/Card'
import { toast } from 'react-toastify'
import { auth } from '../../firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'

const Reset = () => {
    const [email,setEmail]= useState("")

    const resetPassword=(e)=>{
        e.preventDefault();

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Check your email for reset link.")
            })
            .catch((error) => {
                toast.error(error.message)
            });
    }


  return (
    <section className={`container ${styles.auth}`}>

        <div className={styles.img}>
            <img src={resetImg} alt="Reset Password" width="400"/>
        </div>

        <Card>
        <div className={styles.form}>
            <h2>Reset Password</h2>
            <form onSubmit={resetPassword}>
                <input type="text"  placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                < button type="submit" className="--btn --btn-primary --btn-block">Reset Password</button>
                <div className={styles.links}>
                    <p>
                        <Link to="/login">-Login</Link>
                    </p>
                    <p>
                        <Link to="/register">-Register</Link>
                    </p>
                </div>
            </form>
        </div>
        </Card>
    </section>
  )
}

export default Reset