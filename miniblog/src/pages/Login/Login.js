//Import CSS
import styles from './Login.module.css';

//Import hooks from react
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (

        <div className={styles.login}>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Email: </span>
                    <input type="text" name="email" required placeholder='Type your registered email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label>
                    <span>Password: </span>
                    <input type="password" name="password" required placeholder='Type your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
            </form>

        </div>
    )
}

export default Login