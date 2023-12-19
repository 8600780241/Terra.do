import React from 'react'
import style from '../Style/Login.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ba from '../Images/ba3.jpeg';
export default function Login() {

    const [formdata, setFormData] = useState({
        
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    function setFormValues(e) {
        setFormData(
            ...formdata,
            [e.target.name] = e.target.value
        )
    }
    function submitForm(e) {
        e.preventDefault();
        console.log(formdata);
        fetch('http://localhost:/8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata)
        }

        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                localStorage.setItem('token', data.data)
                navigate("/task-list")
            })
            .catch((error) => {
                throw new error
            })

    }
    return (
        <div className={style.main}>
            <div>
                <div className={style.form}>
                    <form onSubmit={submitForm}>
                       
                        <input type="email" placeholder="email" className={style.input2} value={formdata.email} onChange={setFormValues} /><br></br><br></br><br></br>

                        <input type="password" placeholder="password" className={style.input3} value={formdata.password} onChange={setFormValues}/><br></br><br></br><br></br>
                       
                        <button type='button' className={style.btn21}>Login</button>
                    </form>
                </div>
                <Link to='/'><button type='button' className={style.btn22}>Sign up</button></Link>
            </div>
        </div>

    )
}