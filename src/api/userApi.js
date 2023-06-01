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
};

export default userApi;
