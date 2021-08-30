import React from "react";

const Post = ({ title, content, editPost, id, deletePost, likePost, likes }) => {

  

  return (
    <>
      <section className="post-container">
        <h2>{title}</h2>
        <p className="post-content"> {content}</p>
        <div className="buttonC">
          <button className="button" onClick={() => editPost(id)}>
            Edit
          </button>
          <button className="button" onClick={() => deletePost(id)}>
            Delete
          </button>
          <button className="button" onClick={() => likePost(id)}>
          Like 
          <i class="fas fa-thumbs-up"></i>
          </button>
          <label><strong>{likes}</strong></label>
        </div>
      </section>
    </>
  );
};
export default Post;
