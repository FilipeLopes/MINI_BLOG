//Impor CSS
import styles from './CreatePost.module.css';

//Import from react router dom
import { useNavigate } from "react-router-dom";

//Import react hook
import { useState } from 'react';

//Import my hooks
import { useInsertDocument } from '../../hooks/useInsertDocuments';

//Import my context
import { useAuthValue } from '../../context/AuthContext';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    //Create "user" object with logged user data
    const { user } = useAuthValue();

    //Calls my hook
    const { insertDocument, response } = useInsertDocument("posts");

    //create function navigate
    const navigate = useNavigate();

    //Function onSubmit from form
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        //validate image url
        try {
            new URL(image);
        } catch (error) {
            setFormError("The image needs to be a URL.");
        }

        //Create tags array
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        //Check values
        if (!title || !image || !tagsArray || !body) {
            setFormError("Please, fill all fields!");
        }

        //If any error ocurr stops function submit
        if (formError) return;

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        })

        //redirect to homepage
        navigate("/");
    }
    
    return (
        <div className={styles.create_post}>
            <h1>Create Post</h1>

            <p>Write what you want and share your knowledges. </p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Title: </span>
                    <input type="text" name="titel" required placeholder='Write your post title' onChange={(e) => setTitle(e.target.value)} value={title} />
                </label>
                <label>
                    <span>Image URL: </span>
                    <input type="text" name="image" required placeholder='Include the image that represents your post' onChange={(e) => setImage(e.target.value)} value={image} />
                </label>
                <label>
                    <span>Content: </span>
                    <textarea name="body" required placeholder="Insert the body content" onChange={(e) => setBody(e.target.value)} value={body}></textarea>
                </label>
                <label>
                    <span>Tags: </span>
                    <input type="text" name="tags" required placeholder="Insert tags separated by comma" onChange={(e) => setTags(e.target.value)} value={tags} />
                </label>
                {!response.loading && <button className='btn'>Create Post</button>}
                {response.loading && <button disabled className='btn'>Wait...</button>}
                {response.error && <p>{response.error}</p>}
                {formError && <p>{formError}</p>}
            </form>
        </div>
    )
}

export default CreatePost