import React from "react";
import style from '../Style/Login.module.css'
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function submitForm(e) {
        e.preventDefault();
        let responseclone;
        console.log(email, password);
        await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        }

        )
            .then((res) => {
                responseclone = res.clone;
                return res.json();
            })
            .then(() => {
                alert("data save successfully");
                setEmail("");
                setPassword("");
            })
        // .then((response) => response.json())
        // .then((data) => {
        //     console.log(data)
        // })
        // .catch((error) => {

        //     console.log(error)
        // })


    }
    return (
        <div className={style.main}>
            <div>
                <div className={style.form1}>
                    <form action="" className={style.formContainer} onSubmit={submitForm}>

                        <input type="email" placeholder="email" className={style.input2} value={email} onChange={(e) => { setEmail(e.target.value) }} autoComplete="on" /><br></br><br></br><br></br>
                        <input type="password" placeholder="password" className={style.input3} value={password} onChange={(e) => { setPassword(e.target.value) }} autoComplete="new-password" /><br></br><br></br><br></br>
                        <button type='submit' className={style.btn11} style={{ position: "relative", left: "00px" }} >Register</button>
                    </form>
                </div>
                <Link to='/login'><button type='button' className={style.btn12}>Sign in</button></Link>
            </div>
        </div >

    )
}