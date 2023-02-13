//Import css
import styles from './Home.module.css';

//Import context
import { useAuthValue } from '../../context/AuthContext';

//Import my hooks
import { useFetchAllDocuments } from '../../hooks/useFetchAllDocuments';

//import react hooks
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const { user } = useAuthValue();
  const { documents: posts, loading } = useFetchAllDocuments("posts");

  return (
    <div className={styles.home}>
      <h1>Home</h1>
      {user && <h2>Welcome {user.displayName}! Read our recent posts</h2>}
      {!user && <h2>Welcome! Read ours recent posts</h2>}

      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className='btn'>Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home