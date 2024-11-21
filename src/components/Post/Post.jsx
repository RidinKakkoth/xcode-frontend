
import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { deletePost } from '../../api/api';

const Post = ({ post, editable, setShowModal, setPostToEdit, setIsEditing,setPosts })=> {
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const [showFullDescription, setShowFullDescription] = useState(false); 
  const dropdownRef = useRef(null); 

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
          <div className="w-12 h-12 rounded-full bg-gray-300"><img src="https://res.cloudinary.com/ddymh3cnk/image/upload/v1727781671/CureConnect/admin/upload_area_zhqtbm.svg" alt="" /></div>
          <span className="ml-2 font-normal">{post.user.name}</span>
          
        </div>
        {editable && (
        <div className="absolute top-5 right-0 " ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="text-gray-600 rotate-90 text-3xl  hover:text-gray-900"
          >
            ...
          </button>
          {dropdownOpen && (
            <div className="absolute right-3  mt-2 bg-white border rounded-md shadow-md z-10">
              <button onClick={handleEdit} className="block px-5  py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                Edit
              </button>
              <button onClick={handleDelete} className="block px-5  py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
    <hr className='h-2 w-full' />
    <p className='font-normal mb-4 ml-2'>{post.caption}</p>
      <img
        src={post.image}
        alt="Post"
        className="w-full h-64 object-cover rounded-md mb-4 shadow-md"
      />
      {/* Description handling with 'See More' */}
      <p className="font-normal">
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
      <p className='font-light text-sm text-gray-400'>{moment(post.updatedAt).fromNow()}</p>
    </div>
  );
};

export default Post;
