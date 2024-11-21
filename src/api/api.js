import axiosInstanceWithInterceptor from "../config/axios";

const axiosInstance=axiosInstanceWithInterceptor()



export const userLogin=async(email,password)=>{
    try {
        const{data}=await axiosInstance.post('api/auth/login',{email,password})
        return data
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
          }
    }
}
export const userSignUp=async(name,email,password)=>{
    try {
        const{data}=await axiosInstance.post('api/auth/register',{name,email,password})
        return data
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
          }
    }
}
export const addPost=async(formData)=>{
    try {
        const{data}=await axiosInstance.post('api/posts/add',formData)
        return data
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
          }
    }
}
export const updatePost=async(id,formData)=>{
    try {
        formData.forEach((value, key) => {
            console.log(key, value); // Log key-value pairs of the FormData
          });
        
        const{data}=await axiosInstance.put(`api/posts/update/${id}`,formData)
        console.log(data,"//////:");
        
        return data
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
          }
    }
}
export const deletePost=async(id,formData)=>{
    try {
        const{data}=await axiosInstance.delete(`api/posts/delete/${id}`)
        return data
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
          }
    }
}
export const getAllPosts=async()=>{
    try {
        const{data}=await axiosInstance.get('api/posts')
        return data
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
          }
    }
}
export const getUsersPosts=async()=>{
    try {
        const{data}=await axiosInstance.get('api/posts/userPosts')
        return data
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
          }
    }
}
