import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import AddPostModal from "./AddPostModal";
import { getAllPosts, getUsersPosts } from "../../api/api";
import { setPosts } from "../../features/postSlice";
import { useLocation } from "react-router-dom";

const Feed = ({profile}) => {


  console.log(profile,"2");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const activePage = useSelector((state) => state.post.activePage);
  
  

  const [showModal, setShowModal] = useState(false);
  // const [posts, setPosts] = useState([]);
  const [editable, setEditable] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const[isProfile,setIsProfile]=useState(false)
  // const [trigger, setTrigger] = useState(false);

  const location = useLocation();  
  
  useEffect(()=>{
    const isProfilePage = location.pathname === '/profile'; 
    console.log(isProfilePage,"ooooooo");
    
    isProfilePage||profile?setIsProfile(true):setIsProfile(false)
    console.log(isProfilePage,"ii",profile,"]]]");
    
  },[])


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = isProfile ? await getUsersPosts() : await getAllPosts();
        // setPosts(response.posts);
        dispatch(setPosts(response.posts)); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    setEditable(isProfile ? true : false);
    fetchPosts();
  }, [isProfile]);
  // }, [profile, trigger]);

  const handleAddPost = () => {
    setPostToEdit(null);
    setIsEditing(false);
    setShowModal(true);
  };

  return (
    <div className="relative justify-center bg-[#f3f3f3]">
      <p className="text-xl ml-2 font-medium ">{isProfile ? "Timeline" : "Feed"}</p>
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
          profile={isProfile}
          // setTrigger={setTrigger}
          setShowModal={setShowModal}
          postToEdit={postToEdit}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default Feed;
