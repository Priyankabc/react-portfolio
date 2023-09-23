import { postsUrl, uploadImageUrl } from "../Constants/BaseUrl";

export const getUserList = async (currentPage, itemsPerPage) => {
    try {
      const response = await postsUrl.get(`/user?page=${currentPage}&limit=${itemsPerPage}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getIndividualUserDeatils = async (userId) => {
    try {
      const response = await postsUrl.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const createNewUser = async (postData) => {
    try {
      const response = await postsUrl.post(`/user/create`, postData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const editUserDetails = async (userId,userData) => {
    try {
      const response = await postsUrl.put(`/user/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const deleteUserDetails = async (userId) => {
    try {
      const response = await postsUrl.delete(`/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const imageUpload = async (uploadImgData) => {
    try {
      const response = await uploadImageUrl.post(`/upload/`, uploadImgData);
      console.log(response.data, "image uploaded")
      return response.data;
    } catch (error) {
      throw error;
    }
  };