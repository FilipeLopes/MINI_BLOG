import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';

//hook
import { useAuthValue } from '../../context/AuthContext';
import { useFetchAllDocuments } from '../../hooks/useFetchAllDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const Dashboard = () => {

  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading } = useFetchAllDocuments("posts", null, uid);

  const {deleteDocument} = useDeleteDocument("posts");

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Manage your posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>No posts were found</p>
          <Link to="/post/create" className="btn">Create first post</Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Title</span>
            <span>Action</span>
          </div>
          {posts && posts.map((post) => <div key={post.id} className={styles.post_row}>
            <p>{post.title}</p>
            <div>
              <Link to={`/posts/${post.id}`} className="btn btn-outline">Open</Link>
              <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">Edit</Link>
              <button onClick={()=> deleteDocument(post.id)} className="btn btn-outline btn-danger">Delete</button>
            </div>
          </div>)}
        </>
      )}


    </div>
  )
}

export default Dashboard