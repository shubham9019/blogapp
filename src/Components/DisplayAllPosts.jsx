import React, { useState, useRef, useEffect } from "react";
import CreateNewPost from "./CreateNewPost";
import Post from "./Post";
import ModifyPost from "./ModifyPost";

const DisplayAllPosts = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [isCreateNewPost, setIsCreateNewPost] = useState(false);
  const [isModifyPost, setIsModifyPost] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const [likes, setLikes] = useState(0);



  const getTitle = useRef();
  const getContent = useRef();
  const getLikes = useRef();

  const savePostTitleToState = (event) => {
    setTitle(event.target.value);
  };
  const savePostContentToState = (event) => {
    setContent(event.target.value);
  };
  const savePostLikesToState = (event) => {
    setLikes(event.target.value);
  };
  const toggleCreateNewPost = () => {
    setIsCreateNewPost(!isCreateNewPost);
  };
  const toggleModifyPostComponent = () => {
    setIsModifyPost(!isModifyPost);
  };




  useEffect(() => {
    const localBlog = localStorage.getItem("allPosts");
    if(localBlog){
      setAllPosts(JSON.parse(localBlog));
    }
    
  }, [])
  useEffect(() => {
    localStorage.setItem("allPosts", JSON.stringify(allPosts))
    
  }, [allPosts])


  const likePost = (event) => {
    const updatedPost = allPosts.map((eachPost) => {
      if (eachPost.id === event) {
        console.log([eachPost.id, event]);
        console.log("dsda")
        setLikes(likes+1);
        return {
          ...eachPost,
          title: title || eachPost.title,
          content: content || eachPost.content,
          likes: likes || eachPost.likes,
        };
      }
      console.log(eachPost);
      return eachPost;
    });
    setAllPosts(updatedPost);
  }
      


  const editPost = (id) => {
    setEditPostId(id);
    console.log(id);
    toggleModifyPostComponent();
  };
  const deletePost = (id) => {
    const modifiedPost = allPosts.filter((eachPost) => {
      return eachPost.id !== id;
    });
    setAllPosts(modifiedPost);
  };




  const updatePost = (event) => {
    event.preventDefault();
    const updatedPost = allPosts.map((eachPost) => {
      if (eachPost.id === editPostId) {
        console.log([eachPost.id, editPostId]);
        return {
          ...eachPost,
          title: title || eachPost.title,
          content: content || eachPost.content,
        };
      }
      console.log(eachPost);
      return eachPost;
    });
    setAllPosts(updatedPost);
    toggleModifyPostComponent();
  };





  const savePost = (event) => {
    event.preventDefault();
    const id = Date.now();
    setAllPosts([...allPosts, { title, content, id, likes}]);
    console.log(allPosts);
    setTitle("");
    setContent("");
    setLikes(0);
    
    getTitle.current.value = "";
    getContent.current.value = "";
    
    
    toggleCreateNewPost();
  };



  if (isCreateNewPost) {
    return (
      <>
        <CreateNewPost
          savePostTitleToState={savePostTitleToState}
          savePostContentToState={savePostContentToState}
          savePostLikesToState={savePostLikesToState}
          
          getTitle={getTitle}
          getContent={getContent}
          savePost={savePost}
          deletePost={deletePost}
          getLikes={getLikes}
        />
      </>
    );
  } else if (isModifyPost) {
    const post = allPosts.find((post) => {
      return post.id === editPostId;
    });
    return (
      <ModifyPost
        title={post.title}
        content={post.content}
        updatePost={updatePost}
        savePostTitleToState={savePostTitleToState}
        savePostContentToState={savePostContentToState}
        savePostLikesToState={savePostLikesToState}
      />
    );
  }



  return (
    <>
      {!allPosts.length ? (
        <section className="no-post">
          <h1>No Post Found!</h1>
          <h3>Create a new Post!</h3>
          <br />
          <br />
          <section className="button-wrapper">
            <button onClick={toggleCreateNewPost} className="button">
              Create New
            </button>
          </section>
        </section>
      ) : (
        <div>
          <h1>Blogs</h1>
          <section className="all-post">
            {allPosts.map((eachPost) => {
              return (
                <Post
                  id={eachPost.id}
                  key={eachPost.id}
                  title={eachPost.title}
                  content={eachPost.content}
                  editPost={editPost}
                  deletePost={deletePost}
                  likePost={likePost}
                  likes={eachPost.likes}
                />
              );
            })}
            <section className="button-wrapper">
              <button onClick={toggleCreateNewPost} className="button">
                Create New
              </button>
            </section>
          </section>
        </div>
      )}
    </>
  );
};
export default DisplayAllPosts;
