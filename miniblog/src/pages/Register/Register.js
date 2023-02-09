//Import css
import styles from './Register.module.css';

//hooks do react
import { useState } from 'react';

const Register = () => {
  //const to get de values
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //Function onSubmit form
  const handleSubmit = (e) => {
    //Avoit the refresh page
    e.preventDefault();
    
    //Creating the object user
    const user = {
      displayName,
      email,
      password
    };

    //Testing password, if something is wrong handleSubmit finishes
    if(password !== confirmPassword){
      console.log("erro");
      return;
    };

    console.log(user);
  };
  
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
          <button>Register</button>
        </form>
    </div>
  )
}

export default Register