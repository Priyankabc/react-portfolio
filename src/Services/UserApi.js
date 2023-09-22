import { postsUrl } from "../Constants/BaseUrl";

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
      // console.log(response.data, "checkapi")
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const createNewUser = async (postData) => {
    try {
      const response = await postsUrl.post(`/user/create`, postData);
      console.log(response.data, "check submit data")
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const editUserDetails = async (userId,userData) => {
    try {
      const response = await postsUrl.put(`/user/${userId}`, userData);
      console.log(response.data, "check submit data")
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const deleteUserDetails = async (userId) => {
    try {
      const response = await postsUrl.delete(`/user/${userId}`);
      console.log(response.data, "check submit data")
      return response.data;
    } catch (error) {
      throw error;
    }
  };