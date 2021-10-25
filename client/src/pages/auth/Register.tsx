import React,{useState} from "react";
import {Link} from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            password,
            password2
        }
        console.log(newUser);
    }


    return (
        <div className="container">
            <Link to ="/">
                <h1 className="text-center">
                    home
                </h1>
            </Link>
            <h1>Register</h1>
            <p>Already have an account? <Link to="/login">Login</Link></p>
            <form noValidate onSubmit={onsubmit}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>Confirm Password</label>
                <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                <input type="submit" value="Sign up" />
            </form>
        </div>
    )
}

export default Register;