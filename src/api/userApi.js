import axiosClient from "@/api/axiosClient";

const userApi = {
  async getUserProfile(id) {
    try {
      const url = `/user/profile/${id}`;
      const response = await axiosClient.get(url, {
        withCredentials: true,
      });

      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async getCreatedLocation(nextCursor) {
    try {
      const url = nextCursor
        ? `/location/created/me?next_cursor=${nextCursor}`
        : `/location/created/me`;

      console.log("calling get created location with url: ", url);
      const response = await axiosClient.get(url, {
        withCredentials: true,
      });

      console.log("response of  ", url, response);

      return response;
    } catch (error) {
      console.log(error);
      const statusCode = error.response.status;
      if (statusCode === 404) {
        console.log("navigate");
      }
    }
  },

  async getLikedLocation(nextCursor) {
    try {
      const url = nextCursor
        ? `/location/liked/me?next_cursor=${nextCursor}`
        : `/location/liked/me`;

      console.log("calling get liked location with url: ", url);
      const response = await axiosClient.get(url, {
        withCredentials: true,
      });

      console.log("response of  ", url, response);

      return response;
    } catch (error) {
      console.log(error);
      if (statusCode === 404) {
        console.log("navigate");
      }
    }
  },

  async editProfile(info, notify) {
    try {
      const url = `/user/profile/me`;
      const response = await axiosClient.patch(url, info, {
        withCredentials: true,
      });

      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data));
      notify();

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userApi;
