//Import css
import styles from './Register.module.css';

//hooks do react
import { useEffect, useState } from 'react';

//Mine hooks
import { useRegister } from '../../hooks/useRegister';

const Register = () => {
  //const to get de values
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const {createUser, error: authError, loading} = useRegister();
  
  //Function onSubmit form
  const handleSubmit = async (e) => {
    //Avoit the refresh page
    e.preventDefault();
    setError("");

    //Creating the object user
    const user = {
      displayName,
      email,
      password
    };

    //Testing password, if something is wrong handleSubmit finishes
    if(password !== confirmPassword){
      setError("Passwords must be the same!");
      return;
    };

    const res = await createUser(user);
    
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  
  return (
    <div className={styles.register}>
        <h1>Register</h1>
        
        <form onSubmit={handleSubmit}>
          <label>
            <span>Name: </span>
            <input type="text" name="displayName" required placeholder="User name" value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
          </label>
          <label>
            <span>Email: </span>
            <input type="email" name="email" required placeholder="User email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <label>
            <span>Password: </span>
            <input type="password" name="password" required placeholder="Insert your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <label>
            <span>Confirm password: </span>
            <input type="password" name="password" required placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </label>
          {!loading && <button>Register</button>}
          {loading && <button>Wait...</button>}
          {error && <p>{error}</p>}
        </form>
    </div>
  )
}

export default Register