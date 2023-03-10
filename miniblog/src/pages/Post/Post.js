import styles from './Post.module.css';

//hooks
import { useParams } from 'react-router-dom';
import { useFetchSingleDocument } from '../../hooks/useFetchSingleDocument';

const Post = () => {
    const { id } = useParams();
    const { document: post, loading } = useFetchSingleDocument("posts", id);

    return (
        <div className={styles.post_container}>
            {loading && <p>Loading Posts...</p>}
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title} />
                    <p className={styles.post_body}>{post.body}</p>
                    <h3>This posts is about: </h3>
                    <div className={styles.tags}>
                        {post.tagsArray.map((tag) => (
                            <p key={tag}>
                                <span>#</span>
                                {tag}
                            </p>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Post