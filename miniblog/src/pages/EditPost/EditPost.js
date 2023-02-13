import styles from './EditPost.module.css';

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchSingleDocument } from '../../hooks/useFetchSingleDocument';


const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchSingleDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }

  }, [post]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //validate image url
    try {
      new URL(image);
    } catch (error) {
      setFormError("The image needs to be URL.");
    }
    //criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //chegar todos os valores
    if (!title || !image || tags || !body) {
      setFormError("Please, fill all fields!");
    }

    if (formError) return;


    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data);

    //redirect dashboard
    navigate("/dashboard");

  }

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h1>Editing post: {post.title}</h1>
          <p>Change the post data as you wish.</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Title: </span>
              <input type="text" name="title" required placeholder="Change the ttitle..." onChange={(e) => setTitle(e.target.value)} value={title} />
            </label>
            <label>
              <span>Image URL: </span>
              <input type="text" name="image" required placeholder="Change your mesagem..." onChange={(e) => setImage(e.target.value)} value={image} />
            </label>
            <p className={styles.preview_title}>Current image preview: </p>
            <img className={styles.image_preview} src={post.image} alt={post.title} />
            <label>
              <span>Content: </span>
              <textarea name="body" required placeholder="Change the post content..." onChange={(e) => setBody(e.target.value)} value={body}></textarea>
            </label>
            <label>
              <span>Tags: </span>
              <input type="text" name="tags" required placeholder="Change the tags separated by comma" onChange={(e) => setTags(e.target.value)} value={tags} />
            </label>

            {!response.loading && <button className="btn">Edit</button>}
            {response.loading && <button className="btn" disabled>Wait...</button>}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost