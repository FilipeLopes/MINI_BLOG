//Import CSS
import styles from './Login.module.css';

//Import hooks from react
import { useState, useEffect } from 'react';

//Import my hooks
import { useLogIn } from '../../hooks/useLogIn';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const { login, error: logError, loading } = useLogIn();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const user = {
            email,
            password
        }
        await login(user);
    }

    useEffect(() => {
        if (logError) {
            setError(logError);
        }
    }, [logError]);
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
                {!loading && <button className="btn">Login</button>}
                {loading && <button className="btn" disabled>Wait...</button>}
                {error && <p className="error">{error}</p>}
            </form>

        </div>
    )
}

export default Login