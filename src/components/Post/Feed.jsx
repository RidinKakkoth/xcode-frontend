import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import AddPostModal from "./AddPostModal";
import { getAllPosts, getUsersPosts } from "../../api/api";
import { setPosts } from "../../features/postSlice";

const Feed = ({ profile }) => {

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const [showModal, setShowModal] = useState(false);
  // const [posts, setPosts] = useState([]);
  const [editable, setEditable] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = profile ? await getUsersPosts() : await getAllPosts();
        // setPosts(response.posts);
        dispatch(setPosts(response.posts)); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    setEditable(profile ? true : false);
    fetchPosts();
  }, [profile, trigger]);

  const handleAddPost = () => {
    setPostToEdit(null);
    setIsEditing(false);
    setShowModal(true);
  };

  return (
    <div className="relative md:flex  justify-center bg-[#f3f3f3]">
      <p className="text-xl ml-2 font-medium ">{profile ? "Timeline" : "Feed"}</p>
      <div className="p-10">
        {posts?.map((post) => (
          <Post
            key={post?._id}
            post={post}
            editable={editable}
            setPosts={setPosts}
            setShowModal={setShowModal}
            setPostToEdit={setPostToEdit}
            setIsEditing={setIsEditing}
          />
        ))}
      </div>

      <button
        onClick={handleAddPost}
        className="fixed bottom-10 right-20  w-14 h-14 hover:scale-110 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white text-3xl rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition duration-300 z-50"
      >
        +
      </button>

      {showModal && (
        <AddPostModal
          profile={profile}
          setTrigger={setTrigger}
          setShowModal={setShowModal}
          postToEdit={postToEdit}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default Feed;
