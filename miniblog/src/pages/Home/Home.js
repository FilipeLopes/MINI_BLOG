//Import css
import { useAuthValue } from '../../context/AuthContext';
import styles from './Home.module.css';

const Home = () => {
  const { user } = useAuthValue();
  
  
  return (
    <div className={styles.home}>
      <h1>Home</h1>
      {user && <p>Welcome: <span>{user.displayName}</span></p>} 
    </div>
  )
}

export default Home