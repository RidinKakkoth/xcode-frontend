// import React, { useEffect, useState } from 'react';
// import Post from './Post';
// import AddPostModal from './AddPostModal';
// import { getAllPosts, getUsersPosts } from '../../api/api';

// const Feed = ({profile}) => {
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility
//   const [posts, setPosts] = useState([]); // State to hold posts
//   const[editable,setEditable]=useState(false)

//   useEffect(() => {

//     const fetchPosts = async () => {
//       try {
//         const response =profile?await getUsersPosts() :await getAllPosts(); // Await the response
//         console.log(response, "posts fetched");
//         setPosts(response.posts); // Set the fetched posts in state
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };
    
//    profile?setEditable(true):setEditable(false)
      
//       fetchPosts();
    
//   }, [showModal,profile]);

//   return (
//     <div className="relative">
//       {/* Post feed */}
//       <div className="p-4">
//         {posts?.map((post) => (
//           <Post key={post?.id} post={post} editable={editable} />
//         ))}
//       </div>

//       {/* Floating + Button */}
//       <button
//         onClick={() => setShowModal(true)}
//         className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white text-3xl rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition duration-300 z-50"
//       >
//         +
//       </button>

//       {/* Add Post Modal */}
//       {showModal && <AddPostModal setShowModal={setShowModal} />}
//     </div>
//   );
// };

// export default Feed;

import React, { useEffect, useState } from "react";
import Post from "./Post";
import AddPostModal from "./AddPostModal";
import { getAllPosts, getUsersPosts } from "../../api/api";

const Feed = ({ profile }) => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [posts, setPosts] = useState([]); // State to hold posts
  const [editable, setEditable] = useState(false); // Editable state
  const [postToEdit, setPostToEdit] = useState(null); // Post data to edit
  const [isEditing, setIsEditing] = useState(false); // Edit mode

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = profile
          ? await getUsersPosts()
          : await getAllPosts(); // Fetch posts
        setPosts(response.posts); // Update state with posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // Set editability based on profile
    setEditable(profile ? true : false);
    fetchPosts();
  }, [ profile]);

  // Function to handle opening the modal for adding posts
  const handleAddPost = () => {
    setPostToEdit(null); // Clear postToEdit
    setIsEditing(false); // Set editing to false
    setShowModal(true); // Show modal
  };

  return (
    <div className="relative">
      {/* Post feed */}
      <div className="p-4">
        {posts?.map((post) => (
          <Post
            key={post?.id}
            post={post}
            editable={editable}
            setPosts={setPosts}
            setShowModal={setShowModal}
            setPostToEdit={setPostToEdit}
            setIsEditing={setIsEditing}
          />
        ))}
      </div>

      {/* Floating + Button */}
      <button
        onClick={handleAddPost}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white text-3xl rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition duration-300 z-50"
      >
        +
      </button>

      {/* Add Post Modal */}
      {showModal && (
        <AddPostModal
        profile={profile}
          setShowModal={setShowModal}
          postToEdit={postToEdit}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default Feed;
