//Import css
import styles from './Home.module.css';

//Import context
import { useAuthValue } from '../../context/AuthContext';

//Import my hooks
import { useFetchAllDocuments } from '../../hooks/useFetchAllDocuments';

//import react hooks
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

//Import components
import PostDetail from '../../components/PostDetail';

const Home = () => {
  const { user } = useAuthValue();
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchAllDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  }
  return (
    <div className={styles.home}>
      <h1>Home</h1>
      {user && <p>Welcome {user.displayName[0].toUpperCase() + user.displayName.substring(1)}! Read our recent posts.</p>}
      {!user && <p>Welcome! Read our recent posts.</p>}
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text" placeholder='Or search for tags...' onChange={(e) => setQuery(e.target.value)} />
        <button className='btn btn-dark'>Search</button>
      </form>
      <div>
        {loading && <p>Loading...</p>}
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post={post} />
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Posts not found</p>
            <Link to="/post/create" className='btn'>Create first post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home