import React, { useState, useEffect } from "react";
import { IoIosCamera } from "react-icons/io"; // Camera icon from react-icons
import { addPost, updatePost } from "../../api/api"; // Add updatePost API
import { useNavigate } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const AddPostModal = ({setTrigger, setShowModal, postToEdit, isEditing,profile }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  // Prefill data if editing
  useEffect(() => {
    if (isEditing && postToEdit) {
      setCaption(postToEdit.caption);
      setDescription(postToEdit.description);
      setImagePreview(postToEdit.image);
    }
  }, [isEditing, postToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption || !description || (!image && !imagePreview)) {
      alert("Please add all required fields!");
      return;
    }

    try {
      if (isEditing) {
        // Update post
        const formData = new FormData();
        
        formData.append("image", image || postToEdit.image); // Use existing image if no new one is provided
        formData.append("caption", caption);
        formData.append("description", description);
        const response=await updatePost(postToEdit._id, formData); 
        

        if(response.success){
          setShowModal(false);
          alert("updated")
      
     
        }
        
      } else {
        // Add post
        const formData = new FormData();
        formData.append("image", image);
        formData.append("caption", caption);
        formData.append("description", description);
        const response= await addPost(formData); 
        if (response.success) {
          setTrigger((prev)=>!prev)
          alert("added");
        }
        
      }

      setShowModal(false); // Close modal
      
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{isEditing ? "Edit Post" : "Add New Post"}</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-600 hover:text-black"
          >
             <IoCloseCircle size={28} className="text-red-500" />
          </button>
        </div>

        {/* Image Upload Section */}
        <div className="flex justify-center mb-4">
          {!imagePreview ? (
            <label htmlFor="file-input" className="cursor-pointer">
              <div className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md">
                <IoIosCamera className="text-4xl text-gray-600" />
              </div>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            <div className="relative w-full h-64 ">
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover max-w-full max-h-full shadow-md   rounded-md"
              />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 text-white bg-black p-1 rounded-full"
              >
             <IoMdClose />
              </button>
            </div>
          )}
        </div>

        {/* Caption Input */}
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          rows="2"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />

        {/* Description Input */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a description..."
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-md hover:bg-blue-600"
        >
          {isEditing ? "Update Post" : "Post"}
        </button>
      </div>
    </div>
  );
};

export default AddPostModal;
