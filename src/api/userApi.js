import axiosClient from "@/api/axiosClient";

const userApi = {
  async getUserProfile(id) {
    try {
      const url = `/user/profile/${id}`;
      const response = await axiosClient.get(url, {
        withCredentials: true,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },

  async getCreatedLocation() {
    try {
      const url = `/location/created/me`;
      const response = await axiosClient.get(url, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userApi;
