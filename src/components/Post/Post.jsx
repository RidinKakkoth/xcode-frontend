// import React, { useState } from 'react';

// const Post = ({ post }) => {
//   const [showFullDescription, setShowFullDescription] = useState(false); // State to toggle caption view

//   const maxDescriptionLength = 100; // Maximum characters before truncating

//   const handleToggleDescription = () => {
//     setShowFullDescription(!showFullDescription); // Toggle caption view
//   };

//   const renderDescription = () => {
//     if (showFullDescription || post.description.length <= maxDescriptionLength) {
//       return (
//         <>
//           {post.description}
//           {post.description.length > maxDescriptionLength && (
//             <span
//               onClick={handleToggleDescription}
//               className="text-blue-500 cursor-pointer ml-2"
//             >
//               See Less
//             </span>
//           )}
//         </>
//       );
//     } else {
//       return (
//         <>
//           {post.description.substring(0, maxDescriptionLength)}...
//           <span
//             onClick={handleToggleDescription}
//             className="text-blue-500 cursor-pointer ml-2"
//           >
//             See More
//           </span>
//         </>
//       );
//     }
//   };

//   return (
//     <div className="bg-white p-4 rounded-md shadow-md mb-4">
//       <div className="flex items-center mb-4">
//         <div className="w-12 h-12 rounded-full bg-gray-300"></div>
//         <span className="ml-2 font-semibold">{post.user.name}</span>
//       </div>
//       <p className='font-semibold'>{post.caption}</p>
//       <img
//         src={post.image}
//         alt="Post image"
//         className="w-full h-64 object-cover rounded-md mb-4 shadow-md"
//       />
//       <p className="font-semibold">{renderDescription()}</p>
//     </div>
//   );
// };

// export default Post;

import React, { useState, useRef, useEffect } from 'react';
import { deletePost } from '../../api/api'; // Assuming you have an API call for deleting posts

const Post = ({ post, editable, setShowModal, setPostToEdit, setIsEditing,setPosts })=> {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const [showFullDescription, setShowFullDescription] = useState(false); // State for "See More" feature
  const dropdownRef = useRef(null); // Ref for dropdown handling

  // Close dropdown on clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleEdit = () => {

    
    setPostToEdit(post); // Pass current post data
    setIsEditing(true);
    setShowModal(true); // Open modal
    setDropdownOpen(false);
  };


  const handleDelete = async () => {
    try {
      console.log("Deleting post:", post);
      
      // Call the deletePost API to delete the post
      const response = await deletePost(post._id);
      
      if (response.success) {
        setDropdownOpen(false);
        
        setPosts((prev) => prev.filter((item) => item._id !== post._id));
        alert('Post deleted successfully');
      } else {
        alert('Failed to delete the post: ' + response.message);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting the post');
    }
  };
  

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-4 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          <span className="ml-2 font-semibold">{post.user.name}</span>
        </div>
        {editable && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="text-gray-600 hover:text-gray-900"
          >
            ...
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md z-10">
              <button onClick={handleEdit} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                Edit
              </button>
              <button onClick={handleDelete} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
    <p className='font-semibold'>{post.caption}</p>
      <img
        src={post.image}
        alt="Post"
        className="w-full h-64 object-cover rounded-md mb-4 shadow-md"
      />
      {/* Description handling with 'See More' */}
      <p className="font-semibold">
        {post.description.length > 100 && !showFullDescription
          ? `${post.description.slice(0, 100)}... `
          : post.description}
        {post.description.length > 100 && (
          <button
            onClick={() => setShowFullDescription((prev) => !prev)}
            className="text-blue-500 hover:underline"
          >
            {showFullDescription ? "Show Less" : "See More"}
          </button>
        )}
      </p>
    </div>
  );
};

export default Post;
