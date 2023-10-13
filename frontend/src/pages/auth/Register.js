import React, { useState } from 'react'
import { Card } from '../../components/card/Card'
import styles from "./auth.module.scss"
import registerimg from "../../assets/register.png"
import { Link, useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword} from "firebase/auth"
import { auth } from '../../firebase/config'
import Loader from '../../components/loader/Loader'
import { toast } from 'react-toastify'

const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate= useNavigate()

    const registerUser=(e)=>{
        e.preventDefault()
        if(password!== cPassword){
            toast.error("Password do not match.")
        }

        setIsLoading(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setIsLoading(false)
                toast.success("Registration Successful....")
                navigate("/login")
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error.message)
            });
    }

    return (
        <>
        {isLoading && <Loader/>}
        <section className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <h2>Register</h2>

                    <form onSubmit={registerUser}>
                        <input type="text" placeholder='Email' value={email} onChange={(e) =>
                            setEmail(e.target.value)} required />
                        <input type="password" placeholder='Password' value={password} onChange={(e) =>
                            setPassword(e.target.value)} required  />
                        <input type="password" placeholder='Confirm Password' value={cPassword} onChange={(e) =>
                            setCPassword(e.target.value)} required />
                        <button type="submit" className="--btn --btn-primary --btn-block">Register</button>
                    </form>
                    <span className={styles.register}>
                        <p>Already have an account? </p>
                        <Link to="/login">Login</Link>
                    </span>
                </div>
            </Card>
            <div className={styles.img}>
                <img src={registerimg} alt="Login" width="400" />
            </div>
        </section>
        </>
    )
}

export default Register