import styles from './Search.module.css';

import { Link } from 'react-router-dom';

//Components
import PostDetail from '../../components/PostDetail';

//hooks
import { useFetchAllDocuments } from '../../hooks/useFetchAllDocuments';
import { useQuery } from '../../hooks/useQuery';



const Search = () => {
    const query = useQuery();
    const search = query.get("q"); 

    const {documents: posts} = useFetchAllDocuments("posts", search);

    return (
    <div className={styles.search_container}>
        <h1>Search</h1>
        <div>
            {posts && posts.length === 0 &&(
                <div className={styles.noposts}>
                    <p>Your search did not found posts</p>
                    <Link to="/" className="btn btn-dark">Back</Link>
                </div>
            )}
            {posts && posts.map((post) =>(
                <PostDetail key={post.id} post={post}/>
            ))}
        </div>
    </div>
  )
}

export default Search