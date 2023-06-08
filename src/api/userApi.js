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

  async getCreatedLocation(nextCursor) {
    try {
      const url = nextCursor
        ? `/location/created/me?next_cursor=${nextCursor}`
        : `/location/created/me`;
      const response = await axiosClient.get(url, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async editProfile(info) {
    try {
      const url = `/user/profile/me`;
      const response = await axiosClient.patch(url, info, {
        withCredentials: true,
      });

      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userApi;
